'use client'

import Image from 'next/image';
// 
import signature from '@/public/signature.svg'

export default function Home() {
  return (
    <main>
      <Image src={signature} alt=''/>
    </main>
  );
}
