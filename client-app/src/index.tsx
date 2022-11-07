import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/app/App.component";

import { store, StoreContext } from "./app/stores/root.store";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <StoreContext.Provider value={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StoreContext.Provider>
    </React.StrictMode>
);