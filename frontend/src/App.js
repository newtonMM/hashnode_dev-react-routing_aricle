import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Listings, { loader as listingsLoader } from "./pages/Listings";
import ListingDetails, {
  loader as detailsLoader,
  action as deleteAction,
  action,
} from "./pages/ListingDetails";
import ErrorPage from "./pages/ErrorPage";
import EditListing from "./pages/EditListing";
import AddListing, { action as newListing } from "./pages/AddListing";
import { action as addData } from "./components/ListingForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "listings",
        children: [
          {
            index: true,
            element: <Listings />,
            loader: listingsLoader,
          },
          {
            path: ":listId",
            id: "listing-details",
            loader: detailsLoader,
            children: [
              {
                index: true,
                element: <ListingDetails />,
                action: deleteAction,
              },
              { path: "edit", element: <EditListing />, action: addData },
            ],
          },
          { path: "new", element: <AddListing />, action: addData },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
