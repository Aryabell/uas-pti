// App.js

import React from 'react';
import HomeSection from './components/HomeSection';
import DestinationsSection from './components/DestinationsSection';
import Footer from './components/Footer';
import YouTubePlayer from './components/Youtube';
import ImageGallery from './components/ImageGallery';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import './index';

function App() {
  return (
    <div className="App">
      <HomeSection />
      <YouTubePlayer videoId="yKpx5HulCgE" />
      <DestinationsSection />
      <ImageGallery/>
      <Footer />
    </div>
  );
}

export default App;
