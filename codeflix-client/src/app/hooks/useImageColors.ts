import { useState, useEffect } from 'react';
import { extractColors } from 'extract-colors';

export interface ExtractedColor {
  hex: string;
  red: number;
  green: number;
  blue: number;
  area: number;
  saturation: number;
}

export interface ImageColors {
  primary: string | null;
  secondary: string | null;
  accent: string | null;
  background: string | null;
  allColors: ExtractedColor[];
}

export function processExtractedColors(extractedColors: ExtractedColor[]): ImageColors | null {
  if (extractedColors.length === 0) return null;

  const sortedColors = [...extractedColors].sort((a, b) => {
    const scoreA = a.saturation * 0.7 + a.area * 0.3;
    const scoreB = b.saturation * 0.7 + b.area * 0.3;
    return scoreB - scoreA;
  });

  const vibrantColors = sortedColors.filter(c => c.saturation > 0.4);
  const mutedColors = sortedColors.filter(c => c.saturation > 0.2 && c.saturation <= 0.4);

  return {
    primary: sortedColors[0]?.hex || null,
    secondary: sortedColors[1]?.hex || null,
    accent: vibrantColors[0]?.hex || sortedColors[0]?.hex || null,
    background: mutedColors[0]?.hex || sortedColors[sortedColors.length - 1]?.hex || null,
    allColors: extractedColors
  };
}

export function useImageColors(imageUrl: string | null) {
  const [colors, setColors] = useState<ImageColors | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imageUrl) {
      setColors(null);
      return;
    }

    setLoading(true);
    setError(null);

    extractColors(imageUrl, {
      pixels: 10000,
      distance: 0.2,
      colorValidator: (red, green, blue, alpha = 255) => {
        const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
        return alpha > 250 && brightness > 30 && brightness < 220;
      }
    })
      .then((extractedColors: ExtractedColor[]) => {
        const processedColors = processExtractedColors(extractedColors);
        setColors(processedColors);
      })
      .catch(err => {
        console.error('Erro ao extrair cores:', err);
        setError(err.message);
        setColors(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [imageUrl]);

  const getAccentColor = () => {
    if (!colors) return null;
    return colors.accent || colors.primary;
  };

  const getBackgroundColor = () => {
    if (!colors) return null;
    return colors.background || colors.secondary;
  };

  return {
    colors,
    loading,
    error,
    accentColor: getAccentColor(),
    backgroundColor: getBackgroundColor()
  };
}
