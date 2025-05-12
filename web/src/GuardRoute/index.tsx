import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

function GuardRoute() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default GuardRoute;
