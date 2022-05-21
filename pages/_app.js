import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "../Components/Navbar.js";
import { SessionProvider } from "next-auth/react";
import React, { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    const setupDB = async () => {
      const res = await fetch("api/connectDb");
      const data = await res.json();

      console.log(data);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <NavbarComponent />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
