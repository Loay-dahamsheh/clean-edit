
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../App.css'; 
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // عدد الشرائح الإجمالي  

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  // const prevSlide = () => {
  //   setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  // };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); 
    return () => {
      clearInterval(interval);
    };
  }, [currentSlide]);

  return (
    <div>
      <Carousel
        showStatus={false}
        showArrows={false}
        selectedItem={currentSlide}
        onChange={setCurrentSlide}
      >
        <div>
          <div className="hero-slide" style={{ backgroundImage: 'url("https://www.stonemountainadventures.com/wp-content/uploads/2022/10/cleaning-experts-essentials-buys-1657632352.jpg")' }}>
            <div className="hero-text">
              <h1>Welcome to Hourly Cleaning CleanWave Website</h1>
              <p>Discover amazing features and services that await you.</p>
              <Link to ="/BookNow">
                <button className="bn632-hover bn28" id="button">Book Now</button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="hero-slide" style={{ backgroundImage: 'url("https://pennstatehealthnews.org/wp-content/uploads/2019/05/050119-spring-clean.jpg")' }}>
            <div className="hero-text">
              <h1>Welcome to One Visit CleanWave Website</h1>
              <p>Discover amazing features and services that await you.</p>
              <Link to ="/BookNow">
                <button className="bn632-hover bn28" id="button">Book Now</button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="hero-slide" style={{ backgroundImage: 'url("https://www.saharacleaningservices.com/wp-content/uploads/slider/cache/9144cfbcd50d03b57fc3e8604d0b4297/person-taking-care-office-cleaning.jpg")' }}>
            <div className="hero-text">
              <h1>Welcome to Holiday package CleanWave Website</h1>
              <p>Discover amazing features and services that await you.</p>
              <Link to ="/BookNow">
                < button className="bn632-hover bn28" id="button" >Book Now </button>
              </Link>
            </div>
           
          </div>
        </div>
      </Carousel>
    </div>
  );
}; {/* <Link to="/Oss" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">Book now</Link> */}


export default Hero;






