import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PracticePage from "./pages/PracticePage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import PostDetailPage from "./pages/PostDetailPage";
import Posts from "./pages/PostPage";
import RegisterUserPage from "./pages/RegisterUserPage";
import RequestResetPasswordPage from "./pages/RequestResetPasswordPage";
import SendActivationEmailSuccessPage from "./pages/SendActivationEmailSuccess";
import UserAccountPage from "./pages/UserAccountPage";
import UserActivationPage from "./pages/UserActivationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login/", element: <LoginPage /> },
      { path: "register/", element: <RegisterUserPage /> },
      { path: "activate/:uid/:token", element: <UserActivationPage /> },
      {
        path: "resend_activation/",
        element: <SendActivationEmailSuccessPage />,
      },
      {
        path: "request/reset/password/",
        element: <RequestResetPasswordPage />,
      },
      {
        path: "/password/reset/confirm/:uid/:token",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      { path: "posts/", element: <Posts /> },
      { path: "posts/:id", element: <PostDetailPage /> },
      { path: "exercise-player/", element: <PracticePage /> },
      { path: "account/", element: <UserAccountPage /> },
    ],
  },
]);

export default router;
