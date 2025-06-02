"use client";

import { AlertTriangle, Projector } from 'lucide-react';
import { TerminalLine } from '@/components/TerminalLine';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-rose-900 to-red-800 text-white">
      <div className="max-w-md mx-auto">
        <AlertTriangle className="w-32 h-32 mx-auto mb-6 animate-pulse" />

        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 mb-6">
          <h1 className="text-3xl font-bold mb-4">ERRO: Sessão Interrompida</h1>

          <div className="bg-black/70 p-4 rounded font-mono text-sm space-y-2 text-left">
            <TerminalLine
              prompt="🔥"
              text="PROJETOR: 'Falha catastrófica no rolo 42!'"
              color="text-red-400"
            />

            <TerminalLine
              prompt="🎭"
              text="ATORES: 'Ninguém nos avisou desse plot twist!'"
              color="text-yellow-300"
            />

            <TerminalLine
              prompt="📽️"
              text={`TÉCNICO: '${error.message.substring(0, 50)}...'`}
              color="text-amber-300"
            />

            <TerminalLine
              prompt="🛠️"
              text="EQUIPE: 'Tentando religar os disjuntores...'"
              color="text-blue-300"
            />
          </div>
        </div>

        <button
          onClick={reset}
          className="inline-flex items-center px-6 py-3 rounded-full font-bold bg-rose-700 hover:bg-rose-600 transition-colors"
        >
          <Projector className="mr-2 h-5 w-5" />
          Tentar Nova Exibição
        </button>
      </div>
    </div>
  );
}