import { Provider } from "@/components/Provider";
import { Layout as AppLayout } from "@/index";

// fonts
import "@fontsource-variable/plus-jakarta-sans";

import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <AppLayout></AppLayout>
    </Provider>
  </React.StrictMode>
);
