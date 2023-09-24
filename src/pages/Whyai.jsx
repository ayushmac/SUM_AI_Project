import pic1 from "../assets/whyaifirst.jpg";
import pic2 from "../assets/whyaisecond.jpg";
import pic3 from "../assets/whyaithird.png";
import React, { useRef, useState, useEffect } from "react";
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs";
// import "swiper/swiper-bundle.css";
import "./Whyai.css";

const Whyai = () => {
  const swiperRef = useRef(null);
  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        autoplay: true,

        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: false,
        },
        pagination: {
          el: ".swiper-pagination",
        },
      });
    }
  }, []);
  return (
    <div id="whysumai" className="swiper-body">
      <h1 className="whysum-title"> Why Sum A.I ?</h1>
      <section ref={swiperRef} className="swiper mySwiper">
        <div className="swiper-wrapper">
          <div className="card swiper-slide">
            <div className="card__image">
              <img src={pic1} alt="card image" />
            </div>
            <div className="card__content">
              <span className="card__title">
                Efficient Information Digestion
              </span>

              <p className="card__text">
                In today's information-rich world, an AI article summarizer
                helps users quickly grasp essential information from lengthy
                articles, saving time and reducing overload.
              </p>
            </div>
          </div>
          <div className="card swiper-slide">
            <div className="card__image">
              <img src={pic2} alt="card image" />
            </div>
            <div className="card__content">
              <span className="card__title">Enhanced Content Relevance</span>

              <p className="card__text">
                AI summarizers extract the most pertinent details from articles,
                ensuring users receive focused summaries that highlight key
                messages and findings.
              </p>
            </div>
          </div>
          <div className="card swiper-slide">
            <div className="card__image">
              <img src={pic3} alt="card image" />
            </div>
            <div className="card__content">
              <span className="card__title">
                Time-Saving Productivity Boost
              </span>

              <p className="card__text">
                Users can efficiently scan and summarize numerous articles,
                making them more productive by saving time and enabling quicker
                access to critical information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Whyai;
