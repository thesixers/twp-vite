import React from 'react'

export default function AboutUs() {
  return (
    <div >
      <section id="about" className="about-section">
        <div className="text-center">
          <div className="about-title">About Us</div>
        </div>
        <div className="about-content w-full">
          <div className="about-item">
            <h2 className="about-heading">Who We Are</h2>
            <p className="about-text">
              TWP is a global media brand built to create a platform for Christian webtoon creators to express their talents 
              to the world while entertaining and inspiring webtoon fans at little or no cost.
            </p>
          </div>
          <div className="about-item">
            <h2 className="about-heading">Our Vision</h2>
            <p className="about-text">
              To inspire and enlighten teens and young adults all over the globe with God-inspired webtoons and stories.
            </p>
          </div>
          <div className="about-item">
            <h2 className="about-heading">Our Mission</h2>
            <p className="about-text">
              To reach out to at least 25 million teens and young adults all over the globe with God-inspired webtoons and stories.
            </p>
          </div>
        </div>
      </section>
  
      {/* <!-- Contact Us Section --> */}
      <section id="contact" className="contact-section max-w-[600px] mx-auto pb-[30px]">
          <h1 className="text-[#ff0000] text-[30px] font-bold text-center">Contact Us</h1>
            <form id="contactForm" className="px-[10px] max-w-[450px] mx-auto flex flex-col gap-[20px]">
              <div className="flex flex-col text-gray-700 font-medium gap-[8px]">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" className="py-[5px] px-[10px] rounded-[8px] h-[40px] border border-gray-300 outline-none" required/>
              </div>
              <div className="flex flex-col text-gray-700 font-medium gap-[8px]">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" className="py-[5px] px-[10px] rounded-[8px] h-[40px] border border-gray-300 outline-none" required/>
              </div>
              <div className="flex flex-col text-gray-700 font-medium gap-[8px]">
                <label for="message">Message</label>
                <textarea id="message" name="message" className="py-[5px] px-[10px] rounded-[8px] h-[100px] border border-gray-300 outline-none resize-none" cols="30" rows="5" required></textarea>
              </div>
              <button type="submit" className="bg-[#ff0000] text-white p-[10px] rounded-[8px] cursor-pointer hover:bg-red-600 transition-colors duration-300 ease-in-out  w-[100%]">Send Message</button>
            </form>
      </section>
    </div>
  )
}
