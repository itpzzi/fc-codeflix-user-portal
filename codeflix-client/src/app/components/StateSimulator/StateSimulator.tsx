'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AlertTriangle, Film, MapPinOff, RotateCw } from 'lucide-react';

export function StateSimulator() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const triggerNotFound = () => {
    router.push('/rota-inexistente-' + Math.random().toString(36).substring(7));
  };

  const triggerError = () => {
    router.push('/force-error-server')
  };

  const triggerLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-amber-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
        <Film className="w-20 h-20 mb-4 animate-pulse text-amber-200" />
        <div className="text-amber-100 text-xl font-medium">
          Carregando demonstração...
        </div>
        <button 
          onClick={() => setIsLoading(false)}
          className="mt-4 px-4 py-2 bg-amber-700 rounded-lg text-amber-50 hover:bg-amber-600 transition-colors"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-lg z-50">
      <h2 className="text-xl font-bold mb-4 text-white">Simulador de Estados</h2>
      
      <div className="grid grid-cols-1 gap-3">
        <button
          onClick={triggerNotFound}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors text-white"
        >
          <MapPinOff className="w-5 h-5" />
          Disparar 404
        </button>

        <button
          onClick={triggerError}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-500 rounded-lg transition-colors text-white"
        >
          <AlertTriangle className="w-5 h-5" />
          Disparar Erro
        </button>

        <button
          onClick={triggerLoading}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors text-white"
        >
          <RotateCw className="w-5 h-5" />
          Simular Loading
        </button>
      </div>
    </div>
  );
}