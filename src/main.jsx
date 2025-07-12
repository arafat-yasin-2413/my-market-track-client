import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/routes.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Slide, ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <div className="font-urbanist">
            <ToastContainer
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                toastClassName="custom-toast-position"
                transition={Slide}
            ></ToastContainer>

            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <RouterProvider router={router}></RouterProvider>
                </AuthProvider>
            </QueryClientProvider>
        </div>
    </StrictMode>
);
