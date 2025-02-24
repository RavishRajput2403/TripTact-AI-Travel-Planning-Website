import React from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-5">
      <h1 className="font-extrabold text-[50px] text-center pl-16">
        <span className="text-[#f56551]">Discover Your Next Adventure With AI:</span>
        <br />
        Personalized Itineraries At Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center p-8">Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget</p>

      <Link to={'/create-trip'}><Button>Get Started,Its's Free</Button></Link>

      <img src="/landing.png" className="mt-10 w-[800px]" />
    </div>
  );
}

export default Hero;
