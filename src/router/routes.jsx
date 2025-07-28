import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import ErrorPage from "../shared/ErrorPage/ErrorPage";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddProduct from "../pages/DashboardPages/Vendor/AddProduct/AddProduct";
import MyProducts from "../pages/DashboardPages/Vendor/MyProducts/MyProducts";
import AddAdvertisement from "../pages/DashboardPages/Vendor/AddAdvertisement/AddAdvertisement";
import MyAdvertisements from "../pages/DashboardPages/Vendor/MyAdvertisements/MyAdvertisements";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Payment from "../pages/DashboardPages/Shared/Payment/Payment";
import PaymentHistory from "../pages/DashboardPages/Shared/PaymentHistory/PaymentHistory";
import AllUser from "../pages/DashboardPages/Admin/AllUser/AllUser";
import AllOrder from "../pages/DashboardPages/Admin/AllOrder/AllOrder";
import AllAdvertisement from "../pages/DashboardPages/Admin/AllAdvertisement/AllAdvertisement";
import ForbiddenPage from "../shared/ForbiddenPage/ForbiddenPage";
import AdminRoute from "../routes/AdminRoute";
import VendorRoute from "../routes/VendorRoute";
import UpdateProduct from "../pages/UpdateProduct/UpdateProduct";
import AllProductAdmin from "../pages/DashboardPages/Admin/AllProductAdmin/AllProductAdmin";
import AllProduct from "../components/AllProduct/AllProduct";
import UserRoutesOnly from "../routes/UserRoutesOnly";
import ManageWatchlist from "../pages/DashboardPages/User/ManageWatchlist/ManageWatchlist";
import OrderList from "../pages/DashboardPages/User/OrderList/OrderList";
import ViewPriceTrends from "../pages/DashboardPages/User/ViewPriceTrends/ViewPriceTrends";

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
                path: 'allProduct',
                Component: AllProduct,
            
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
                element: <VendorRoute><AddProduct></AddProduct></VendorRoute>,
            },
            {
                path: 'updateProduct/:id',
                element: <VendorRoute><UpdateProduct></UpdateProduct></VendorRoute>,
            },
            {
                path: 'myProducts',
                element: <VendorRoute><MyProducts></MyProducts></VendorRoute>,
            },
            {
                path: 'viewPriceTrends',
                element: <UserRoutesOnly><ViewPriceTrends></ViewPriceTrends></UserRoutesOnly>,
            },
            {
                path: 'myWatchlist',
                element: <UserRoutesOnly>
                    <ManageWatchlist></ManageWatchlist>
                </UserRoutesOnly>,
            },
            {
                path: 'myOrderList',
                element: <UserRoutesOnly>
                    <OrderList></OrderList>
                </UserRoutesOnly>,
            },
            {
                path: 'addAdvertisement',
                element: <VendorRoute><AddAdvertisement></AddAdvertisement></VendorRoute>,
            },
            {
                path: 'myAdvertisements',
                element: <VendorRoute><MyAdvertisements></MyAdvertisements></VendorRoute>,
            },
            {
                path: 'payment/:productId',
                element: <UserRoutesOnly>
                    <Payment></Payment>
                </UserRoutesOnly>,
            },
            {
                path: 'paymentHistory',
                element: <UserRoutesOnly>
                    <PaymentHistory></PaymentHistory>
                </UserRoutesOnly>,
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
                path: 'allProductAdmin',
                element: <AdminRoute><AllProductAdmin></AllProductAdmin></AdminRoute>
            },
        ]
    },
    {
        path: '/*',
        Component: ErrorPage,
    }
])