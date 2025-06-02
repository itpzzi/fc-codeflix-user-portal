'use client';

import { Film, Clapperboard, Popcorn } from 'lucide-react';
import { TerminalLine } from '@/components/TerminalLine';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-amber-900 to-orange-800 text-white">
      <div className="max-w-md mx-auto">
        <Film className="w-32 h-32 mx-auto mb-6 animate-pulse" />

        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 mb-6">
          <h1 className="text-3xl font-bold mb-4">Preparando o Espetáculo</h1>

          <div className="bg-black/70 p-4 rounded font-mono text-sm space-y-2 text-left">
            <TerminalLine
              prompt="🎥"
              text="DIRETOR: 'Posicionando câmeras...'"
              color="text-amber-300"
            />

            <TerminalLine
              prompt="🍿"
              text="PLATÉIA: 'Fazendo pipoca...'"
              color="text-yellow-300"
            />

            <TerminalLine
              prompt="💡"
              text="ILUMINAÇÃO: 'Ajustando os holofotes...'"
              color="text-blue-300"
            />

            <TerminalLine
              prompt="📊"
              text="BANCO DE DADOS: 'Buscando roteiro nos arquivos...'"
              color="text-purple-300"
            />

            <div className="flex items-center pt-2">
              <Clapperboard className="animate-spin mr-2 h-4 w-4" />
              <span className="text-green-400">Sistema: Carregando próxima cena...</span>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center px-6 py-3 text-orange-100">
          <Popcorn className="mr-2 h-5 w-5 animate-bounce" />
          Por favor, aguarde...
        </div>
      </div>
    </div>
  );
}