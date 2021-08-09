import React from "react";
import bill from "./bill.jpg";

const Home = () => {
  return (
    <div align="center">
      <h1>Welcome to the Billing App</h1>
      <img alt="homeImage" src={bill} width="1500px" height="700px" />
    </div>
  );
};
export default Home;
