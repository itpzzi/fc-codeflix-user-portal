'use client';

import { clsx } from 'clsx';

export function TerminalLine({
  prompt,
  text,
  color = 'text-gray-300',
}: {
  prompt: string;
  text: string;
  color?: string;
}) {
  return (
    <div className="flex">
      <span className="text-green-400 w-6 flex-shrink-0">{prompt}</span>
      <span className={clsx('text-left break-words', color)}>{text}</span>
    </div>
  );
}