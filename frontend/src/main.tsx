import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import {persistor, store} from "./app/store.ts";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {addInterceptors} from "./axiosAPI.ts";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";

addInterceptors(store);

const theme = createTheme({
    typography: {
        fontFamily: '"Lora", serif',
    },
});

createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <CssBaseline/>
                    <ToastContainer/>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </ThemeProvider>,
)
