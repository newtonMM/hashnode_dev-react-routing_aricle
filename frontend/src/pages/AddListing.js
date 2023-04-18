import React from "react";
import ListingForm from "../components/ListingForm";
import { redirect, json } from "react-router-dom";

const AddListing = () => {
  return (
    <>
      <ListingForm method="POST" />
    </>
  );
};

export default AddListing;

// export async function action({ request, params }) {
//   const data = await request.formData();

//   const listingData = {
//     name: data.get("name"),
//     description: data.get("description"),
//     price: data.get("price"),
//   };

//   const response = await fetch("http://localhost:8080/listings", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(listingData),
//   });
//   console.log(response);
//   if (response.status !== 201) {
//     throw json({ message: "Could not save listing." }, { status: 500 });
//   }

//   return redirect("/listings");
// }
