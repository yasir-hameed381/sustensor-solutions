import { Check, X } from 'lucide-react';

interface StatusToastProps {
  tone: 'success' | 'error';
  message: string;
}

export function StatusToast({ tone, message }: StatusToastProps) {
  const isError = tone === 'error';
  return (
    <div
      role={isError ? 'alert' : 'status'}
      className={`fixed bottom-5 left-1/2 z-[110] flex -translate-x-1/2 items-center gap-3 border bg-forest px-4 py-3 text-xs text-mist shadow-lg ${
        isError ? 'border-gold' : 'border-sage'
      }`}
    >
      {isError ? <X aria-hidden="true" className="h-4 w-4 text-gold" /> : <Check aria-hidden="true" className="h-4 w-4 text-mint" />}
      {message}
    </div>
  );
}
