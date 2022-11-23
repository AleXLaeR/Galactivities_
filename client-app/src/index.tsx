import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/app/App.component";

import { store, StoreContext } from "./app/stores/root.store";

import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter}  from 'react-router-dom';

export const history = createBrowserHistory() as any;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <StoreContext.Provider value={store}>
            <HistoryRouter history={history}>
                <App />
            </HistoryRouter>
        </StoreContext.Provider>
    </React.StrictMode>
);