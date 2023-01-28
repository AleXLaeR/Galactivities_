import React from "react";
import ReactDOM from "react-dom/client";

import { store, StoreContext } from "./app/stores/root.store";

import { router } from "app/router/Routes";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <StoreContext.Provider value={store}>
        <RouterProvider router={router}/>
    </StoreContext.Provider>
);