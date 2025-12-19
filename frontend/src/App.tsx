import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { Box } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { Toaster } from "./components/ui/toaster";
import RootLayout from "./layout/RootLayout";
import NotFound from "./components/NotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="create" element={<CreatePage />} />
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
