import React from "react";
import Hero from "../components/Hero";
import Trusted from "../components/Trusted";
import Services from "../components/Services";
// import Featured from "../components/Featured";
const Home = () => {
  return (
    <>
      <Hero
        text={"The Untimate Shopping Experience"}
        inner={"“Shop with us because you’re worth it!”"}
      />
      {/* <Featured /> */}
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
