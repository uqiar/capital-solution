import Login from "../screens/login";
import Home from "../screens/home";
import ManageDST from "../screens/manageDST";
import ADDDST from "../screens/addDSTs";
import ManageDstDetails from "../screens/DST-details";
import ManageProperties from "../screens/manageProperties";
import AddProperties from "../components/addProperties";

export const RoutingList = [
  {
    route: "/login",
    element: <Login />,
    is_protected: false,
  },
  {
    route: "/*",
    element: <Home />,
    is_protected: true,
  },
  {
    route: "/manage-dst",
    element: <ManageDST />,
    is_protected: true,
  },
  {
    route: "/add-dst/:id?",
    element: <ADDDST />,
    is_protected: true,
  },
  {
    route: "/manage-dst/:id",
    element: <ManageDstDetails />,
    is_protected: true,
  },
  {
    route: "/manageProperties",
    element: <ManageProperties />,
    is_protected: true,
  },
  {
    route: "/addProperties",
    element: <AddProperties />,
    is_protected: true,
  },
];
