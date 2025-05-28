"use client";
import React from 'react';
import './AnimatedBackground.css';

interface AnimatedBackgroundProps {
  theme?: 'default' | 'blue' | 'green';
  bubbleCount?: number;
  accentColor?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  theme = 'default',
  bubbleCount = 4,
  accentColor = '229, 9, 20'
}) => {
  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor);
    document.documentElement.style.setProperty('--bubble-count', bubbleCount.toString());
  }, [accentColor, bubbleCount]);

  return (
    <div className={`animated-background theme-${theme}`}>
      {/* Bolhas - geradas dinamicamente baseadas em --bubble-count */}
      {[...Array(bubbleCount)].map((_, i) => (
        <div key={i} className="bubble" />
      ))}
      
      {/* Faixas de luz */}
      <div className="light-strip" />
      <div className="light-strip" />
      
      {/* Gradiente animado */}
      <div className="gradient-overlay" />
    </div>
  );
};