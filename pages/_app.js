import { StoreContextProvider } from "../global/StoreContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <StoreContextProvider>
      <Component {...pageProps} />
    </StoreContextProvider>
  );
}
