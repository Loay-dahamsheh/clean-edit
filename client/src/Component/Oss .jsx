import { Link } from 'react-router-dom'
import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

const Oss  = () => {

  useEffect(() => {
    AOS.init();
    
  }, []);

  return (
    <div><div>
        <br></br>
    <div data-aos="fade-up" className="bg-gray-100 lg:py-12 lg:flex lg:justify-center">
      <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
        <div className="lg:w-1/2">
          <div
            className="h-64 bg-cover lg:rounded-lg lg:h-full"
            style={{
              backgroundImage:
                'url("https://thumbs.dreamstime.com/b/smiling-cleaning-lady-smiling-cleaning-lady-green-uniform-yellow-rubber-gloves-work-114114560.jpg")'
            }}
          />
        </div>
        <div id='k' className="py-12 px-6 max-w-xl lg:max-w-5xl lg:w-1/2">
          <h2 className="text-3xl text-gray-800 font-bold">
           <span className="text-blue-500">Book</span> a Cleaning
          Sevice Today
          </h2>
          <p id='tt' className="mt-4 text-gray-600">
           
         Ordering our service now is your first step towards enjoying a spotless and refreshing living space. At our cleaning website, we prioritize your convenience and satisfaction. With just a few clicks, you can schedule a professional cleaning service that fits your needs and busy lifestyle. Our experienced team of cleaning experts will arrive promptly and transform your home into a pristine haven, allowing you to reclaim your precious time and energy for the things that matter most to you. Say goodbye to the hassle of cleaning chores and hello to a cleaner, more comfortable environment. Order our service today, and relish the peace of mind that comes with a sparkling home.
          </p>
          <div className="mt-8">
          <Link to="/BookNow">
         <button class="bn632-hover bn28" id="button">Book Now</button>
         </Link> 
          </div>
        </div>
      </div>
    </div>
  </div>
  <br></br><br></br>
  </div>
  )
}

export default Oss 