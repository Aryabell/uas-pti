// Impor React dan komponen yang diperlukan
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"; // Jalur impor yang benar untuk ScrollTrigger
import Modal from "./Modal";

// Pastikan mendaftarkan plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Buat komponen fungsional untuk Box
const Box = ({ image, title, description, onClick }) => {
  const handleClick = () => {
    console.log("Klik pada gambar:", title);
    onClick(image, title);
  };

  return (
    <div
      className="box"
      onClick={handleClick}
      style={{ opacity: 0 }}
    >
      <img className="box-image" src={image} alt={title} />
      <div className="text">
        <h2 className="font-bold">{title}</h2>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

// Buat komponen fungsional untuk animasi
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

// Buat komponen utama DestinationsSection
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
        <div className="container-box flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mt-50">Destination</h1>
          <div className="content opacity-0 transform -translate-x-32">
            {/* Hapus tanda komentar ini jika ingin menyertakannya */}
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero culpa pariatur iusto sequi, ut expedita soluta nihil est quaerat itaque corporis maiores in, at id officiis tempore. Harum vitae fugit itaque expedita asperiores vero delectus?</p> */}
          </div>
        </div>
        <div className="gallery">
          {/* Buat komponen Box untuk setiap destinasi */}
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
            description="A wonderful beach with calm waves and beautiful views."
            onClick={openModal}
          />
        </div>
        {/* Tampilkan modal jika modalOpen bernilai true */}
        {modalOpen && (
          <Modal
            image={selectedImage}
            title={selectedTitle}
            closeModal={closeModal}
          />
        )}
      </div>
      {/* Komponen animasi */}
      <SwipeAnimation
        triggerSelector=".destinations"
        boxSelectors={[
          ".destinations .container-box",
          ".destinations .container-box .content",
        ]}
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

// Export komponen DestinationsSection
export default DestinationsSection;
