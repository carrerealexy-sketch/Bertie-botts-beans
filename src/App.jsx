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
import { ROUTES } from "./constants";
import { SellerPage } from "./pages/sellers/SellersPage";
import { SellersDashboardPage } from "./pages/dashboard/sellers/SellersDashboardPage";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/Signup";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.BEANS} element={<BeansPage />} />
        <Route path={ROUTES.SELLERS} element={<SellerPage />} />

        <Route path={ROUTES.AUTH.ROOT} element={<AuthLayout />}>
          <Route path={ROUTES.AUTH.LOGIN} element={<SignIn />} />
          <Route path={ROUTES.AUTH.REGISTER} element={<SignUp />} />
        </Route>

        <Route path={ROUTES.DASHBOARD.ROOT} element={<DashboardLayout />}>
          <Route index element={<HomeDashboardPage />} />

          <Route path={ROUTES.DASHBOARD.BEANS.ROOT}>
            <Route index element={<BeansDashboardPage />} />
            <Route
              path={ROUTES.DASHBOARD.BEANS.ADD}
              element={<AddBeanDashboardPage />}
            />
            <Route
              path={ROUTES.DASHBOARD.BEANS.EDIT}
              element={<EditBeanDashboardPage />}
            />
          </Route>

          <Route path={ROUTES.DASHBOARD.SELLERS.ROOT}>
            <Route index element={<SellersDashboardPage />} />
            <Route
              path={ROUTES.DASHBOARD.SELLERS.ADD}
              element={<AddSellerDashboardPage />}
            />
            <Route
              path={ROUTES.DASHBOARD.SELLERS.EDIT}
              element={<EditSellerDashboardPage />}
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
