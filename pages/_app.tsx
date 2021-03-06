import Header from "layouts/Header";
import type { AppProps } from "next/app";
import GlobalCSS from "styles/GlobalCSS";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalCSS />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
