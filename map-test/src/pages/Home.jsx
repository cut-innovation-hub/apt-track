import React from "react";
import HeroSection from "../components/PageSections/Home/HeroSection";
import SecondSection from "../components/PageSections/Home/SecondSection";
import ThirdHomeSection from "../components/PageSections/Home/ThirdHomeSection";
import GeneralLayout from "../layouts/GeneralLayout";

function Home() {
  return (
    <GeneralLayout>
        <HeroSection />
        <SecondSection />
        <ThirdHomeSection />

    </GeneralLayout>
  );
}

export default Home;
