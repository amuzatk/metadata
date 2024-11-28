// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import DynamicMeta from '@/components/HeadMeta3';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DynamicMeta />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;