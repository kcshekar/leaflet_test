'use client';

import dynamic from 'next/dynamic';

// Dynamically load the LeafletMap to avoid SSR
const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <LeafletMap />
    </main>
  );
}
