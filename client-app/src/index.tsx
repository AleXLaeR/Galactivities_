import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/app/App.component";

import { store, StoreContext } from "./app/stores/root.store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <StoreContext.Provider value={store}>
            <App />
        </StoreContext.Provider>
    </React.StrictMode>
);