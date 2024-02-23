import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Login } from "./login.tsx";
import AppContainer from "./components/appcontainer.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContainer />
    </QueryClientProvider>
  </React.StrictMode>
);
