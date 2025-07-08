import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./router/routes.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <div className="font-urbanist">
            <AuthProvider>
                <RouterProvider router={router}></RouterProvider>
            </AuthProvider>
        </div>
    </StrictMode>
);
