import React from "react";
import WeatherMap from "./WeatherMap";

const Modal = ({ title, closeModal }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>{title}</h2>
                <WeatherMap name={title}/>
            </div>
        </div>
    );
};

export default Modal;
