import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddProduct from "../pages/AddProduct/AddProduct";
import MyProducts from "../pages/MyProducts/MyProducts";
import AddAdvertisement from "../pages/AddAdvertisement/AddAdvertisement";
import MyAdvertisements from "../pages/MyAdvertisements/MyAdvertisements";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Payment from "../pages/Payment/Payment";
import PaymentHistory from "../pages/PaymentHistory/PaymentHistory";
import AllUser from "../pages/AllUser/AllUser";
import AllOrder from "../pages/AllOrder/AllOrder";
import AllAdvertisement from "../pages/AllAdvertisement/AllAdvertisement";
import AllProduct from "../pages/AllProduct/AllProduct";
import ForbiddenPage from "../pages/ForbiddenPage/ForbiddenPage";
import AdminRoute from "../routes/AdminRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'products/details/:id',
                element: <PrivateRoute>
                    <ProductDetails></ProductDetails>
                </PrivateRoute>,
            },
            {
                path: 'forbidden',
                Component: ForbiddenPage,
            },
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'register',
                Component: Register,
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                path: 'addProduct',
                Component: AddProduct,
            },
            {
                path: 'myProducts',
                Component: MyProducts,
            },
            {
                path: 'addAdvertisement',
                Component: AddAdvertisement,
            },
            {
                path: 'myAdvertisements',
                Component: MyAdvertisements,
            },
            {
                path: 'payment/:productId',
                Component: Payment,
            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory,
            },
            {
                path: 'allUser',
                element: <AdminRoute><AllUser></AllUser></AdminRoute>,
            },
            {
                path: 'allOrder',
                element: <AdminRoute><AllOrder></AllOrder></AdminRoute>,
            },
            {
                path: 'allAdvertisement',
                element: <AdminRoute><AllAdvertisement></AllAdvertisement></AdminRoute>
            },
            {
                path: 'allProduct',
                element: <AdminRoute><AllProduct></AllProduct></AdminRoute>
            },
        ]
    },
    {
        path: '/*',
        Component: ErrorPage,
    }
])