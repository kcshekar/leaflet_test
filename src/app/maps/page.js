'use client';

import dynamic from 'next/dynamic';
import json from './locations.json';

const WebGLMap = dynamic(() => import('./WebGLMap'), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <WebGLMap points={json} />
    </main>
  );
}
