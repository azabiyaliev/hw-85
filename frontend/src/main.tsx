import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {CssBaseline} from "@mui/material";
import {Provider} from "react-redux";
import {persistor, store} from "./app/store.ts";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {addInterceptors} from "./axiosAPI.ts";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";

addInterceptors(store);

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <CssBaseline/>
                <ToastContainer/>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>,
)
