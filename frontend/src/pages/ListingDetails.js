import React, { Suspense } from "react";
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import Listing from "../components/Listing";

const ListingDetails = () => {
  const { listing } = useRouteLoaderData("listing-details");
  console.log("this is the", listing);

  return (
    <>
      <Suspense fallback={<p>Loading .....</p>}>
        <Await resolve={listing}>
          {(loadedListing) => <Listing listing={loadedListing} />}
        </Await>
      </Suspense>
    </>
  );
};

export default ListingDetails;

export async function getDetails(id) {
  const response = await fetch("http://localhost:8080/listings/" + id);
  console.log(response);

  if (response.status !== 200) {
    throw json(
      { message: "Could not fetch listings." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    console.log("this is the res data", resData);
    return resData.listing;
  }
}

export async function loader({ request, params }) {
  const id = params.listId;
  return defer({
    listing: getDetails(id),
  });
}

export async function action({ request, params }) {
  const id = params.listId;
  const method = request.method;
  const response = await fetch("http://localhost:8080/listings/" + id, {
    method: "DELETE",
  });
  console.log(response);

  if (response.status !== 200) {
    throw json(
      { message: "Could not delete listing." },
      {
        status: 500,
      }
    );
  } else {
    return redirect("/listings");
  }
}
