import React from "react";
import { useLoaderData, json } from "react-router-dom";
import { Link } from "react-router-dom";

const Listings = () => {
  const data = useLoaderData();
  const listings = data.listings;

  const properties = listings.map((lst, index) => (
    <div key={index}>
      <h2>{lst.name}</h2>
      <p>{lst.price}</p>
      <Link to={lst.id}> View Details</Link>
    </div>
  ));

  return (
    <>
      <Link to="new">Add new </Link>
      <h2>Here are the properties on sale </h2>
      {properties}
    </>
  );
};

export default Listings;

export async function loader() {
  const response = await fetch("http://localhost:8080/listings");
  // console.log(response.status !);
  console.log(response);

  if (response.status !== 200) {
    throw json(
      { message: "Could not fetch listing." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}
