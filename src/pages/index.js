import { Hero, NavBar } from '@/components'
import 'mapbox-gl/dist/mapbox-gl.css';
import Head from 'next/head';

export default function Home() {
  return (
    <main className='min-h-screen bg-slate-100'>
      <Head>
        <title>MFŞ Burulaş Hizmet</title>
        <meta name="description" content="Bursa Otobüs Takip Aracı, Sitesi" />
        <meta property="og:title" content="MFŞ Burulaş Hizmet" />
        <meta property="og:description" content="Bursa Otobüs Takip Aracı, Sitesi" />
      </Head>
      <NavBar />
      <Hero />
    </main>
  )
}
