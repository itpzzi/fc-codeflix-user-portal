import '@vidstack/react/player/styles/base.css';
import React from "react";
import { MediaPlayer, MediaProvider, Poster } from '@vidstack/react';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { getMovieById } from '@/services/MovieService';

type PlayerProps = {
  movie: {
    title: string;
    videoFileURL: string;
    thumbFileURL: string;
    description: string;
  };
};

async function Player({ movie }: PlayerProps) {
  return (
    <div
      className="relative h-screen w-full overflow-hidden px-24 py-8 box-border"
    >
      <div className="flex h-full w-full items-center justify-center">
        <MediaPlayer
          controls
          title={movie.title}
          src={movie.videoFileURL}
          className="w-full max-w-[100%] max-h-full "
        >
          <Link href="/">
            <ArrowLeftIcon className="media-playing:opacity-0 invisible absolute left-8 top-8 z-50 h-8 cursor-pointer text-white md:visible" />
          </Link>

          {/* Título mobile */}
          <div className="media-playing:opacity-0 visible absolute left-2 top-8 z-50 transition-opacity duration-500 md:invisible">
            <div className="flex flex-row items-center gap-4">
              <Link href="/">
                <ArrowLeftIcon className="h-6" />
              </Link>
              <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
                {movie.title}
              </h1>
            </div>
          </div>

          <MediaProvider className="relative flex justify-center items-end w-full h-full">
            {/* Título em desktop */}
            <div className="media-playing:opacity-0 invisible absolute left-8 bottom-24 z-50 transition-opacity duration-500 md:visible">
              <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
                {movie.title}
              </h1>
              <p className="mt-4 max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl">
                {movie.description}
              </p>
            </div>

            <Poster
              src={movie.thumbFileURL}
              alt={`Poster for ${movie.title}`}
              className="object-cover"
            />
          </MediaProvider>
        </MediaPlayer>
      </div>
    </div>
  );
}

interface IWatchParams {
  id: string;
}

interface IWatchProps {
  params: IWatchParams;
}

export default async function Watch({ params }: IWatchProps) {
  const movie = await getMovieById(params.id);

  return (
    <Player movie={movie} />
  );
}