import React from "react";
import { Link, useSubmit } from "react-router-dom";

const Listing = ({ listing }) => {
  const submit = useSubmit();

  function deleteHandler() {
    const confirm = window.confirm("are you sure you want to delete");
    if (confirm) {
      submit(null, { method: "DELETE" });
    }
  }
  return (
    <div>
      <h2>{listing.name}</h2>
      <p>{listing.description}</p>
      <p>{listing.price}</p>
      <Link to="edit">Edit </Link>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
};

export default Listing;
