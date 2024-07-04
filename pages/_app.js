import "@/styles/globals.css";
import { UserProvider } from "@/contexts/UserContext";

function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default App;
