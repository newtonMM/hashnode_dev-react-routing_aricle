import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>Welcome to Exotic Homes </h1>
      <p>discover the hottest properties in the market </p>
      <Link to="listings">View Listings</Link>
    </>
  );
};

export default HomePage;
