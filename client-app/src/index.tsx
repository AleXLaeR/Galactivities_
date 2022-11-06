import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/app/App.component";
import {Provider} from "react-redux";

import {store} from "./reducers/store.provider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);