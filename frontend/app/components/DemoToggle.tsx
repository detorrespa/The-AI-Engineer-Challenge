'use client';

import { useRouter } from 'next/navigation';

function isDemoMode() {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('demo') === '1';
}

export default function DemoToggle() {
  const router = useRouter();
  const demo = isDemoMode();

  const toggle = () => {
    const url = new URL(window.location.href);
    if (demo) url.searchParams.delete('demo');
    else url.searchParams.set('demo', '1');
    router.push(url.pathname + url.search);
  };

  return (
    <button onClick={toggle} className="px-3 py-1 border rounded">
      {demo ? 'Exit Demo' : 'Use Demo'}
    </button>
  );
}
