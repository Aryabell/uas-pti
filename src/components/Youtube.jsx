import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube'; // Change alias from 'ReactYouTube' to 'YouTube'

// Fungsi Youtube Player
const YouTubePlayer = ({ videoId }) => {
  const [videoInfo, setVideoInfo] = useState(null);

  // API KEY untuk YouTube
  const API_KEY = "AIzaSyDQYC_9ttytFPMdBhhNf0V7ldIeoS58Ph4";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`
        );
        if (response.data.items && response.data.items.length > 0) {
          setVideoInfo(response.data.items[0]);
        } else {
          console.error('No video data found');
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchData();
  }, [videoId, API_KEY]);

  return (
    <section id="about">
      <div className="flex flex-col max-w-full items-center justify-center mt-11">
        <h1 className="text-3xl font-bold mt-12">About Banten</h1>
        <div className="youtube-container" id="youtube">
          {videoInfo && (
            <YouTube 
              videoId={videoId} 
              opts={{
                width: '100%',
                height: '390px',
                playerVars: {
                  autoplay: 0,
                },
              }} 
              className="youtube-player"
            />
          )}
        </div>
        <div className="text-content mt-4 md:w-3/4 lg:w-1/2 text-center">
          <p>Banten, a province in the west of Java, is famous for its rich history and natural beauty. From historical sites such as the Surosowan Palace to stunning natural destinations such as Taman Nasional Ujung Kulon and Pantai Anyer, Banten offers a unique blend of culture, nature and tradition. Its beauty makes Banten the perfect place for adventure and relaxation.</p>
        </div>
      </div>
    </section>
  );
};

export default YouTubePlayer;