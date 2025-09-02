'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';

function useIsDemo() {
  const sp = useSearchParams();
  return (sp.get('demo') === '1');
}

export default function DemoToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const demo = useIsDemo();

  const nextHref = useMemo(() => {
    const p = new URLSearchParams(sp.toString());
    if (demo) p.delete('demo'); else p.set('demo','1');
    const q = p.toString();
    return q ? `${pathname}?${q}` : pathname;
  }, [demo, pathname, sp]);

  const onClick = () => router.replace(nextHref); // cambia el query param y re-renderiza

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        // posición arriba-derecha
        'fixed top-3 right-3 z-50',
        // estilo Matrix
        'px-3 py-1 rounded border',
        'border-green-500 text-green-300',
        'bg-black/40 hover:bg-green-900/30',
        'shadow-[0_0_10px_#00ff00] transition'
      ].join(' ')}
      aria-label={demo ? 'Exit Demo' : 'Use Demo'}
    >
      {demo ? 'Exit Demo' : 'Use Demo'}
    </button>
  );
}
