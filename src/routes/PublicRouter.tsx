import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { withCommonLayout } from "../hoc";

const MainPage = lazy(() => import("../pages/MainPage"));
const ProductPage = lazy(() => import("../pages/ProductPage"));
const WrappedComponent = withCommonLayout;
const WrappedMainPage = WrappedComponent(MainPage);
const WrappedProductPage = WrappedComponent(ProductPage);

function PublicRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WrappedMainPage />} />
        <Route path="/products" element={<WrappedProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PublicRouter;
