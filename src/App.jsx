import React from "react";
import "./App.css";
import Hero from "./components/Hero";
import Demo from "./components/Demo";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Whyai from "./pages/Whyai";
// import Whysumai from "./pages/whysumai";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <About />
      {/* <Whysumai /> */}
      <Whyai />
      <Hero />
      <Demo />
    </div>
  );
};

export default App;
