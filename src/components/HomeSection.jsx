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
    const close = document.querySelectorAll(".close");

    bars.forEach((bar) => {
      bar.addEventListener("click", handleBarsClick);
    });

    close.forEach((closeBtn) => {
      closeBtn.addEventListener("click", handleCloseClick);
    });

    return () => {
      bars.forEach((bar) => {
        bar.removeEventListener("click", handleBarsClick);
      });
      close.forEach((closeBtn) => {
        closeBtn.removeEventListener("click", handleCloseClick);
      });
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
    <section className="home" id="home">
      <div
        className="home-box"
        style={{ backgroundImage: backgroundImages[backgroundIndex] }}
      >
        <nav>
          <div className="logo bars">
            <div className="bar">
              <i className="fas fa-bars"></i> {/* Update FontAwesome class */}
            </div>
            <h3>BANTEN</h3>
          </div>
          <div className="menu">
            <div className="close">
              <i className="fas fa-times"></i>
            </div>
            <ul>
              <li>
                <a href="#home">home</a>
              </li>
              <li>
                <a href="#youtube">about</a>
              </li>
              <li>
                <a href="#destinations">destinations</a>
              </li>
              <li>
                <a href="#footer">about us</a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="content">
          <h1>Banten, The Land of Serenity</h1>
          <p>
            Experience the Natural Beauty. Embrace the Cultural Diversity, And
            Seek Adventurous Opportunities
          </p>
          <div className="App">
            {/* <h2>Current Time in Banten</h2> */}
            <p>
              {/* UTC DateTime:{" "} */}
              {liveDate &&
                moment(liveDate).format("dddd, DD-MM-YYYY hh:mm:ss A")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
