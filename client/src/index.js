import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { StoreProvider } from "./state";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <StoreProvider>
      <App tab="home" />
    </StoreProvider>
  </React.StrictMode>
);
