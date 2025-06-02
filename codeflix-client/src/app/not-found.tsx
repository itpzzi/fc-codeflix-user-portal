'use client';

import clsx from 'clsx';
import { MapPinOff } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TerminalLine } from '@/components/TerminalLine';

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md mx-auto">
        <MapPinOff className="w-32 h-32 mx-auto mb-6 animate-bounce" />

        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 mb-6">
          <h1 className="text-3xl font-bold mb-4">404 — Cena Perdida</h1>

          <div className="bg-black/70 p-4 rounded font-mono text-sm space-y-2 text-left">
            <TerminalLine
              prompt="🎬"
              text={`VÍDEO: "Banco, procurei por '${pathname}' e... nada."`}
              color="text-yellow-300"
            />

            <TerminalLine
              prompt="🗄️"
              text='BANCO: "Verifiquei meus índices... esse título nunca passou por aqui."'
              color="text-red-400"
            />

            <TerminalLine
              prompt="🎬"
              text='VÍDEO: "Será que fui removido da grade?"'
              color="text-blue-300"
            />

            <TerminalLine
              prompt="🗄️"
              text='BANCO: "Ou talvez você nunca existiu. Às vezes o cache sonha."'
              color="text-purple-300"
            />

            <TerminalLine
              prompt="🧠"
              text="CACHE: 'Quem sou eu? Onde estou?'"
              color="text-pink-300"
            />
          </div>
        </div>

        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-full font-bold transition-colors"
        >
          Voltar ao Catálogo
        </Link>
      </div>
    </div>
  );
}
