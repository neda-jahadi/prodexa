import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  type UIMatch,
} from "react-router-dom";
import "./App.css";
import { Box } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { Toaster } from "./components/ui/toaster";
import RootLayout from "./layout/RootLayout";
import NotFound from "./components/NotFound";
import ProductsLayout from "./layout/ProductsLayout";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails, { productDetailsLoader } from "./components/ProductDetails";
import Error from "./components/Error";
import type { ProductDetailsResponse } from "./types/product";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<RootLayout />}
        handle={{ crumb: () => ({ to: "/", label: "Home" }) }}
      >
        <Route index element={<HomePage />} />
        <Route
          path="create"
          element={<CreatePage />}
          handle={{ crumb: () => ({ to: "/create", label: "Create product" }) }}
        />
        <Route
          path="products"
          element={<ProductsLayout />}
          handle={{ crumb: () => ({ to: "/products", label: "Products" }) }}
        >
          <Route index element={<ProductsPage />} />
          <Route
            path=":id"
            element={<ProductDetails />}
            loader={productDetailsLoader}
            errorElement={<Error />}
            handle={{
              crumb: (match: UIMatch<ProductDetailsResponse>) => ({
                label: match.data?.data?.name ?? "Product",
              }),
            }}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <Box minH={"100vh"}>
      <RouterProvider router={router} />
      <Toaster />
    </Box>
  );
}

export default App;
