import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Header from '@/components/Header';
import 'react-datepicker/dist/react-datepicker.css';
import '../lib/styles/datepicker.css';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <RecoilRoot>
      <ChakraProvider>
        {router.pathname !== '/' ? <Header /> : null}
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
