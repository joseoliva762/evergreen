import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProviderUser } from "./hooks/useUser";
import { ProviderRoles } from "./hooks/useRoles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProviderUser>
      <ProviderRoles>
        <App classNama="app" />
      </ProviderRoles>
    </ProviderUser>
  </React.StrictMode>
);
