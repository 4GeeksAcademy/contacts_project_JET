import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom"
import { router } from "./routes";
import { StoreProvider } from './hooks/useGlobalReducer'

const Main = () => {
    return (
        <React.StrictMode>
            <StoreProvider>
                <RouterProvider router={router} />
            </StoreProvider>
        </React.StrictMode>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Main />)