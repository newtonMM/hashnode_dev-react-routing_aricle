import React from "react";
import { Form, json, redirect, useFetcher } from "react-router-dom";

const ListingForm = ({ method, listing }) => {
  const fetcher = useFetcher();
  fetcher.state;
  return (
    <Form method={method}>
      <p>
        <label htmlFor="title">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={listing ? listing.name : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          required
          defaultValue={listing ? listing.description : ""}
        />
      </p>
      <p>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="text"
          name="price"
          required
          defaultValue={listing ? listing.price : ""}
        />
      </p>

      <div>
        <button type="button">Cancel</button>
        <button>Save</button>
      </div>
    </Form>
  );
};

export default ListingForm;
export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const listingData = {
    name: data.get("name"),
    price: data.get("price"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/listings";

  if (method === "PATCH") {
    const listId = params.listId;
    url = "http://localhost:8080/listings/" + listId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listingData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save listing." }, { status: 500 });
  }

  return redirect("/listings");
}
