import React from "react";
import Hero from './components/Hero';
import Scrollingsticker from "./components/Scrollingsticker";
import AboutComp from "./components/AboutComp";
import ServicesComp from "./components/ServicesComp";
import WhyChooseUs from "./components/whychooseus";
import PricingComp from "./components/PricingComp";
import TeamComp from "./components/TeamComp";
import Cta from "./components/Cta";
import Faq from "./components/Faq";
import Testimonials from "./components/Testimonials";

const IndexPage = () => {
  return (
    <>
      <Hero/>
      <Scrollingsticker/>
      <AboutComp/>
      <ServicesComp/>
      <WhyChooseUs/>
      <PricingComp/>
      <TeamComp/>
      <Faq/>
      <Testimonials/>
      <Cta/>
      <Scrollingsticker/>

    </>
  );
};

export default IndexPage;
