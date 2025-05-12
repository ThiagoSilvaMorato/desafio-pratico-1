import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "@/pages/NotFound";
import Redirecting from "@/pages/Redirecting";

const appRoutes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/url/not-found",
    element: NotFound,
  },
  {
    path: "*",
    element: Redirecting,
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {appRoutes.map(({ path, element: Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
