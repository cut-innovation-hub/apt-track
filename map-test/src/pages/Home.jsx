import React from "react";
import HeroSection from "../components/PageSections/Home/HeroSection";
import PackagesSection from "../components/PageSections/Home/PackagesSection";
import SecondSection from "../components/PageSections/Home/SecondSection";
import ThirdHomeSection from "../components/PageSections/Home/ThirdHomeSection";
import GeneralLayout from "../layouts/GeneralLayout";

function Home() {
  return (
    <GeneralLayout>
        <HeroSection />
        <SecondSection />
        <ThirdHomeSection />
        <PackagesSection />

    </GeneralLayout>
  );
}

export default Home;
