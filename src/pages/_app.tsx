import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Breadcrumbs, Progress } from 'common/components';
import { usePageLoading } from 'common/utils/usePageLoading';

import 'common/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const { isPageLoading } = usePageLoading();

  return (
    <>
      <Head>
        <title>SpecPort</title>
      </Head>

      <div style={{ display: 'flex' }}>
        <Breadcrumbs />
        {isPageLoading && <Progress size="lg" style={{ marginLeft: '7px' }} />}
      </div>

      {!isPageLoading && <Component {...pageProps} />}
    </>
  );
};

export default App;
