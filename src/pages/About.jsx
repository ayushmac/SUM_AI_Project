import "./About.css";
import aboutlogo from "../assets/aboutpageimg.jpeg";
const About = () => {
  return (
    <div id="about" className="about-container">
      <div className="about-logo-container">
        <img
          src={aboutlogo}
          // height="400px"
          // width="400px"
          alt="about logo here"
          className="about-img"
        />
      </div>
      <div className="about-content-container">
        <div className="about-title">
          Introducing SUM A.I: Your Gateway to Efficient Content Mastery
        </div>
        <div className="about-desc">
          Welcome to SUM A.I, where cutting-edge artificial intelligence meets
          your insatiable appetite for knowledge. Our web application is your
          passport to streamlined content consumption, offering intelligent
          article summarization, and seamless information sharing. Get ready to
          revolutionize the way you interact with information{" "}
        </div>
        <span className="sub-desc">
          – SUM A.I is here to elevate your digital experience.
        </span>
      </div>
    </div>
  );
};
export default About;
