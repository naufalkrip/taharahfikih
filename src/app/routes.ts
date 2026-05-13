import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Wudhu } from "./pages/Wudhu";
import { Ghusl } from "./pages/Ghusl";
import { Tayammum } from "./pages/Tayammum";
import { Najis } from "./pages/Najis";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "wudhu", Component: Wudhu },
      { path: "ghusl", Component: Ghusl },
      { path: "tayammum", Component: Tayammum },
      { path: "najis", Component: Najis },
    ],
  },
]);
