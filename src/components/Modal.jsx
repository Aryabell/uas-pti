import React from "react";
import WeatherMap from "./WeatherMap";

const Modal = ({ title, closeModal }) => {
    const handleMapClick = () => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title)}`; // API untuk Google Maps
        window.open(googleMapsUrl, '_blank');
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2 className="text-2xl font-bold">{title}</h2>
                <WeatherMap name={title}/>
                <button 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" 
                    onClick={handleMapClick}
                >
                    Open in Google Maps
                </button>
            </div>
        </div>
    );
};

export default Modal;
