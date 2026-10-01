import { CheckCircle2, XCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StatusToastProps {
  tone: 'success' | 'error';
  message: string;
}

export function StatusToast({ tone, message }: StatusToastProps) {
  const isError = tone === 'error';
  const Icon = isError ? XCircle : CheckCircle2;
  return (
    <div
      role={isError ? 'alert' : 'status'}
      className="panel-in fixed bottom-6 left-1/2 z-(--z-toast) flex -translate-x-1/2 items-center gap-3 rounded-full border border-hairline-inverse-strong bg-ink-950 py-2.5 pl-3 pr-5 text-small text-fg-inverse shadow-lg"
    >
      <Icon aria-hidden="true" className={cn('size-5', isError ? 'text-sand-300' : 'text-brand-300')} />
      {message}
    </div>
  );
}
