import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";

const D = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <div>
        <br></br>
        <div
          data-aos="fade-up"
          className="bg-gray-100 lg:py-12 lg:flex lg:justify-center"
        >
          <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
            <div className="lg:w-1/2">
              <div
                className="h-64 bg-cover lg:rounded-lg lg:h-full"
                style={{
                  backgroundImage:
                    'url("https://wdy.h-cdn.co/assets/16/13/4000x2666/gallery-1459452050-gettyimages-122619539.jpg")',
                }}
              />
            </div>
            <div id="k" className="py-12 px-6 max-w-xl lg:max-w-5xl lg:w-1/2">
              <h2 className="text-3xl text-gray-800 font-bold">
                Why Should You{" "}
                <span className="text-blue-500">Choose Us</span>
              </h2>
              <p id="tt" className="mt-4 text-gray-600">
                <b>1-Customer Satisfaction:</b>
                <br></br> - We prioritize customer satisfaction in every service
                we provide. <br></br>- Our goal is to create a positive and
                satisfying experience for our clients.<br></br>
                <b>2- Dedicated and Experienced Team:</b>
                <br></br>- Our team consists of dedicated and experienced
                professionals.
                <br></br>- We offer a wide range of cleaning services tailored
                to your specific requirements.
                <br></br>
                <b>3- Commitment to Quality:</b>
                <br></br>- What sets us apart is our unwavering dedication to
                quality and customer satisfaction.
                - We use the latest
                industry-standard equipment to ensure the highest cleaning
                standards.
              </p>
              <div className="mt-8">
                {/* <a href="http://">
         <button class="bn632-hover bn28" id="button">Learn More</button>
         </a>  */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default D;
