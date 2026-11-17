import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center max-w-[600px] mx-auto min-h-screen">
      <Outlet />
    </div>
  );
};
