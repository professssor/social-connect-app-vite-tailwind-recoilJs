import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { makeServer } from "./server";
import React from "react";
import { RecoilRoot } from "recoil";
import AuthProvider from "./Services/AuthService";
import { BrowserRouter } from "react-router-dom";
// Call make Server
makeServer();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <AuthProvider>
          <App />
        </AuthProvider>
      </RecoilRoot>
    </BrowserRouter>
  </StrictMode>
);
