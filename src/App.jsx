import { Route, Routes } from "react-router";

import { AddBeanDashboardPage } from "./pages/dashboard/beans/AddBeanDashboardPage";
import { AddSellerDashboardPage } from "./pages/dashboard/sellers/AddSellerDashboardPage";
import { AuthLayout } from "./layout/AuthLayout";
import { BeansDashboardPage } from "./pages/dashboard/beans/BeansDashboardPage";
import { BeansPage } from "./pages/beans/BeansPage";
import { DashboardLayout } from "./layout/DashboardLayout";
import { EditBeanDashboardPage } from "./pages/dashboard/beans/EditBeanDashboardPage";
import { EditSellerDashboardPage } from "./pages/dashboard/sellers/EditSellerDashboardPage";
import { Home } from "./pages/Home";
import { HomeDashboardPage } from "./pages/dashboard/HomeDashboardPage";
import { NotFound } from "./pages/error/NotFound";
import { SellerPage } from "./pages/sellers/SellersPage";
import { SellersDashboardPage } from "./pages/dashboard/sellers/SellersDashboardPage";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/Signup";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="beans" element={<BeansPage />} />
        <Route path="sellers" element={<SellerPage />} />

        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<SignUp />} />
        </Route>

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<HomeDashboardPage />} />

          <Route path="beans">
            <Route index element={<BeansDashboardPage />} />
            <Route path="add" element={<AddBeanDashboardPage />} />
            <Route path="edit" element={<EditBeanDashboardPage />} />
          </Route>

          <Route path="sellers">
            <Route index element={<SellersDashboardPage />} />
            <Route path="add" element={<AddSellerDashboardPage />} />
            <Route path="edit" element={<EditSellerDashboardPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
