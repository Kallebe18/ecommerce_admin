import { Outlet, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";

import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { Products } from "../pages/Products";
import { ProductForm } from "../pages/Products/ProductForm";

const AdminPagesWrapper = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AdminPagesWrapper />}>
        <Route index element={<Dashboard />} />
        <Route path="products">
          <Route index element={<Products />} />
          <Route path="create" element={<ProductForm />} />
          <Route path="edit" element={<ProductForm />} />
        </Route>
      </Route>
    </Routes>
  );
}
