'use client';

import { Movie } from '@/types/movie';
import Image from 'next/image';
import { BannerContent } from '@/components/FeaturedSection/BannerContent';

interface BannerFeaturedProps extends Movie { }

export function BannerFeatured(props: BannerFeaturedProps) {
  return (
    <div className="relative glass-surface h-[40vh] xl:h-[60vh] p-6 flex flex-col justify-end overflow-hidden">
      {/* Vídeo de fundo */}
      <video
        src={props.videoFileURL}
        autoPlay
        loop
        muted
        poster={props.bannerFileURL}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60 hidden lg:block"
      />

      {/* Imagem fallback para mobile */}
      <div className="absolute top-0 left-0 w-full h-full block lg:hidden">
        <Image
          src={props.bannerFileURL}
          alt={props.title}
          fill
          className="object-cover object-top opacity-60"
        />
      </div>

      {/* Overlay de gradiente */}
      <div className="absolute top-0 left-0 w-full h-full glass-overlay" />

      {/* Conteúdo textual e interativo do banner */}
      <BannerContent {...props} />
    </div>
  );
}