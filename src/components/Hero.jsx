import React from "react";

import Navbar from "../components/Navbar";
const Hero = () => {
  return (
    // <header className="w-full flex justify-center items-center flex-col">
    <header id="usesumai" className="header-container">
      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient ">Sum A.I</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Sum-AI, an article summarizer that transforms
        lengthy articles into clear and concise summaries.
      </h2>
    </header>
  );
};

export default Hero;
