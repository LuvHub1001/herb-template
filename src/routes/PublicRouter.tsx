import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { withCommonLayout } from "../hoc";

const MainPage = lazy(() => import("../pages/MainPage"));
const WrappedComponent = withCommonLayout;
const WrappedMainPage = WrappedComponent(MainPage);

function PublicRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WrappedMainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PublicRouter;
