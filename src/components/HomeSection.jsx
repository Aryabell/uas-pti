import React, { useState, useEffect } from "react";
import gsap from "gsap";
import axios from "axios";
import moment from "moment";

const HomeSection = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const backgroundImages = [
    "url('assets/banten1.jpg')",
    "url('assets/banten2.jpg')",
    "url('assets/banten3.jpg')",
    "url('assets/banten4.jpg')",
  ];
  const [timeData, setTimeData] = useState(null);
  const [liveDate, setLiveDate] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleBarsClick = () => {
      const menu = document.querySelector(".menu");
      menu.classList.add("active");
      gsap.from(".menu", {
        opacity: 0,
        duration: 0.3,
      });

      gsap.from(".menu ul", {
        opacity: 0,
        x: -300,
      });
    };

    const handleCloseClick = () => {
      const menu = document.querySelector(".menu");
      menu.classList.remove("active");
    };

    const bars = document.querySelectorAll(".bar");
    const menu = document.querySelector(".menu");

    bars.forEach((bar) => {
      bar.addEventListener("click", handleBarsClick);
    });

    // Add event listener to the menu itself
    menu.addEventListener("click", handleCloseClick);

    return () => {
      bars.forEach((bar) => {
        bar.removeEventListener("click", handleBarsClick);
      });
      menu.removeEventListener("click", handleCloseClick);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://worldtimeapi.org/api/timezone/Asia/Jakarta")
      .then((response) => {
        setTimeData(response.data);
        setLiveDate(timeData?.utc_datetime);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const liveDateTime = setInterval(() => {
      const addSecond = moment(liveDate).add(1, "seconds");
      setLiveDate(addSecond);
    }, 1000);

    return () => clearInterval(liveDateTime);
  }, [liveDate]);

  return (
    // Membuat home section
    <section className="home w-full h-screen p-0 m-0" id="home">
      <div
        className="home-box w-full h-full bg-cover bg-center"
        style={{ backgroundImage: backgroundImages[backgroundIndex] }}
      >
        <nav className="w-full h-12 bg-[linear-gradient(rgba(31,31,31,0.2),rgba(31,31,31,0.2))] backdrop-blur-sm flex justify-between items-center px-16 fixed top-0 left-0 z-10">
          <div className="logo flex items-center gap-4">
            <div className="bar text-2xl text-white cursor-pointer hidden">
              <i className="fas fa-bars"></i>
            </div>
            <h3 className="text-white font-normal text-xl m-0 text-shadow-lg">BANTEN</h3>
          </div>
          <div className="menu">
            <div className="close hidden">
              <i className="fas fa-times"></i>
            </div>
            <ul className="flex gap-12 list-none m-0 p-0">
              <li>
                <a href="#home" className="text-white font-normal text-xl hover:text-white/70 text-shadow-lg">home</a>
              </li>
              <li>
                <a href="#about" className="text-white font-normal text-xl hover:text-white/70 text-shadow-lg">about</a>
              </li>
              <li>
                <a href="#destinations" className="text-white font-normal text-xl hover:text-white/70 text-shadow-lg">destinations</a>
              </li>
              <li>
                <a href="#gallery" className="text-white font-normal text-xl hover:text-white/70 text-shadow-lg">Gallery</a>
              </li>
              <li>
                <a href="#footer" className="text-white font-normal text-xl hover:text-white/70 text-shadow-lg">about us</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="content w-full h-[calc(100%-65px)] flex flex-col justify-center items-center">
          <h1 className="text-6xl max-w-6xl text-white text-center font-semibold leading-tight mb-4 text-shadow-xl">
            Banten, The Land of Serenity
          </h1>
          <p className="textawal text-white font-semibold max-w-4xl text-center text-2xl mb-8 text-shadow-xl">
            Experience the Natural Beauty. Embrace the Cultural Diversity, And Seek Adventurous Opportunities
          </p>
          <div className="App text-2xl max-w-2xl text-white text-center font-semibold leading-tight mb-4 text-shadow-xl">
            <p>
              {liveDate && moment(liveDate).format("dddd, DD-MM-YYYY hh:mm:ss A")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
