import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Header from '@/components/Header';
import 'react-datepicker/dist/react-datepicker.css';
import '../lib/styles/datepicker.css';
import { useRouter } from 'next/router';
import '../lib/styles/global.css';

const colors = {
  myColor: {
    100: '#F6F1F1',
    200: '#19A7CE',
    300: '#146C94',
  },
};

const defaultTheme = {
  styles: {
    global: {
      body: {
        bg: 'cyan.400',
      },
    },
  },
};

const theme = extendTheme({ colors }, defaultTheme);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        {router.pathname !== '/' ? <Header /> : null}
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
