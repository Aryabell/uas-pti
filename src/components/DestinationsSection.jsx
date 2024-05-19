// Import React and any necessary components
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"; // Correct import path for ScrollTrigger
import Modal from "./Modal";

// Make sure to register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Create a functional component for Box
const Box = ({ image, title, description, onClick }) => {
  const handleClick = () => {
    console.log("Clicked on image:", title);
    onClick(image, title);
  };

  return (
    <div className="box" onClick={handleClick} style={{ opacity: 0, transform: "translateX(-100px)" }}>
      <img src={image} alt={title} />
      <div className="text">
        <h2>{title}</h2>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

// Create functional components for animations
const SwipeAnimation = ({ triggerSelector, boxSelectors }) => {
  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerSelector,
        start: "top 50%",
        end: "top 100%",
        scrub: 3,
      },
    });

    boxSelectors.forEach((boxSelector) => {
      timeline.to(boxSelector, {
        x: 0,
        duration: 1,
        opacity: 1,
      });
    });

    return () => {
      timeline.kill();
    };
  }, [triggerSelector, boxSelectors]);

  return null;
};

const GalleryAnimation = ({ triggerSelector, boxSelectors }) => {
  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerSelector,
        start: "top 100%",
        end: "bottom 100%",
        scrub: 1,
      },
    });

    boxSelectors.forEach((boxSelector) => {
      timeline.to(boxSelector, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
      });
    });

    return () => {
      timeline.kill();
    };
  }, [triggerSelector, boxSelectors]);

  return null;
};

// Create the main DestinationsSection component
const DestinationsSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");

  const openModal = (image, title) => {
    setSelectedImage(image);
    setSelectedTitle(title);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="destinations" id="destinations">
      <div className="container">
        <div className="container-box" style={{ opacity: 0, transform: "translateX(-100px)" }}>
          <h1 style={{ fontSize: '35px', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>Destinations</h1>
          <div className="content" style={{ opacity: 0, transform: "translateX(-100px)" }}>
            {/* Uncomment this paragraph if you want to include it */}
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero culpa pariatur iusto sequi, ut expedita soluta nihil est quaerat itaque corporis maiores in, at id officiis tempore. Harum vitae fugit itaque expedita asperiores vero delectus?</p> */}
          </div>
        </div>
        <div className="gallery">
          {/* Create Box component for each destination */}
          <Box
            image="assets/Telaga.jpg"
            title="Telaga Biru Cisoka"
            description="A stunning blue lake perfect for relaxing and enjoying nature."
            onClick={openModal}
          />
          <Box
            image="assets/Sawarna.jpeg"
            title="Pantai Sawarna"
            description="A beautiful beach with pristine waters and scenic views."
            onClick={openModal}
          />
          <Box
            image="assets/Anyer.jpeg"
            title="Pantai Anyer"
            description="A popular beach destination known for its sunsets and activities."
            onClick={openModal}
          />
          <Box
            image="assets/UjungKulon.jpeg"
            title="Taman Nasional Ujung Kulon"
            description="A national park offering diverse wildlife and lush greenery."
            onClick={openModal}
          />
          <Box
            image="assets/Carita.jpeg"
            title="Pantai Carita"
            description="A family-friendly beach with calm waves and beautiful views."
            onClick={openModal}
          />
        </div>
        {/* Display modal if modalOpen is true */}
        {modalOpen && (
          <Modal image={selectedImage} title={selectedTitle} closeModal={closeModal} />
        )}
      </div>
      {/* Animation components */}
      <SwipeAnimation
        triggerSelector=".destinations"
        boxSelectors={[".destinations .container-box", ".destinations .container-box .content"]}
      />
      <GalleryAnimation
        triggerSelector=".destinations .gallery"
        boxSelectors={[
          ".destinations .gallery .box:nth-child(1)",
          ".destinations .gallery .box:nth-child(2)",
          ".destinations .gallery .box:nth-child(3)",
          ".destinations .gallery .box:nth-child(4)",
          ".destinations .gallery .box:nth-child(5)",
        ]}
      />
    </section>
  );
};

// Export the DestinationsSection component
export default DestinationsSection;
