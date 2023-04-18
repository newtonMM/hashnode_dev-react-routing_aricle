import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import ListingForm from "../components/ListingForm";

const EditListing = () => {
  const data = useRouteLoaderData("listing-details");
  console.log(data.listing);
  return (
    <>
      <ListingForm method="PATCH" listing={data.listing} />
    </>
  );
};

export default EditListing;
