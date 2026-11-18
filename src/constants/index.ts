export const ROUTES = {
  HOME: "/",
  BEANS: "/beans",
  SELLERS: "/sellers",

  AUTH: {
    ROOT: "/auth",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },

  DASHBOARD: {
    ROOT: "/dashboard",
    HOME: "/dashboard",
    BEANS: {
      ROOT: "/dashboard/beans",
      ADD: "/dashboard/beans/add",
      EDIT: "/dashboard/beans/edit",
    },
    SELLERS: {
      ROOT: "/dashboard/sellers",
      ADD: "/dashboard/sellers/add",
      EDIT: "/dashboard/sellers/edit",
    },
  },
};
