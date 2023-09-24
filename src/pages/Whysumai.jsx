import pic1 from "../assets/whyaifirst.jpg";
import pic2 from "../assets/whyaisecond.jpg";
import pic3 from "../assets/whyaithird.png";
import "./Whysumai.css";

const Whysumai = () => {
  return (
    <div id="whysumai" className="whysumai-container">
      <div className="whysumai-title">Why Sum A.I ?</div>
      <div className="whysumai-cards">
        <div className="card-container">
          <div className="card-img1"></div>
          <div className="card-title">Efficient Information Digestion</div>
          <div className="card-desc">
            {" "}
            In today's information-rich world, an AI article summarizer helps
            users quickly grasp essential information from lengthy articles,
            saving time and reducing overload.
          </div>
        </div>
        <div className="card-container">
          <div className="card-img2"></div>
          <div className="card-title">Enhanced Content Relevance</div>
          <div className="card-desc">
            {" "}
            AI summarizers extract the most pertinent details from articles,
            ensuring users receive focused summaries that highlight key messages
            and findings.
          </div>
        </div>
        <div className="card-container">
          <div className="card-img3"></div>
          <div className="card-title">Time-Saving Productivity Boost</div>
          <div className="card-desc">
            Users can efficiently scan and summarize numerous articles, making
            them more productive by saving time and enabling quicker access to
            critical information.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whysumai;
