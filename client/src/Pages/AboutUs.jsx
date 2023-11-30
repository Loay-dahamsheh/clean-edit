import React from 'react'


const AboutUs = () => {
  return (
    <div><>
    {/* component */}
    <div className="py-16 bg-white">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img id='immm'
              src="https://www.forbes.com/advisor/wp-content/uploads/2022/02/How_To_Start_A_Cleaning_Business_-_article_image.jpg"
              alt="image"
              loading="lazy"
              width=""
              height=""
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl"> About <span className="text-blue-500">Us</span>
            </h2>
            <p className="mt-6 text-gray-600">
                we are dedicated to providing top-notch cleaning services to make your life easier and your spaces spotless.
                With a team of highly trained and experienced professionals,
                we take pride in delivering impeccable cleanliness and a fresh,
                inviting atmosphere to your homes and businesses.
            </p>
            <p className="mt-4 text-gray-600">
              {" "}
              Our mission is to exceed your expectations by offering customized cleaning solutions that cater to your unique needs.
               Whether you're looking for regular house cleaning, deep cleaning, office maintenance, or special event preparation,
                we have you covered. We are committed to using eco-friendly cleaning products and industry-best practices to ensure a safe and healthy environment for our clients. 
                Trust us to transform your space into a pristine haven, so you can enjoy more free time and peace of mind.

            </p>
          </div>
        </div>
      </div>
    </div>
  </>
  </div>
  )
}

export default AboutUs