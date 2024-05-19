import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube'; // Change alias from 'ReactYouTube' to 'YouTube'


const YouTubePlayer = ({ videoId }) => {
  const [videoInfo, setVideoInfo] = useState(null);

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
    <div className="flex flex-col max-w-full items-center justify-center">
      <div className="flex mx-auto" id='youtube'>
        {videoInfo && <YouTube videoId={videoId} style={{ margin: 'auto',  marginTop: '30px'}}/>}
      </div>
      <div className="text-content md:w-1/2 md:pl-4">
        <p style={{fontSize: '16px', marginTop: '30px'}}>Banten, Provinsi Di Barat Pulau Jawa, Terkenal Dengan Sejarahnya Yang Kaya Dan Keindahan Alamnya. Dari Situs Bersejarah Seperti Keraton Surosowan Hingga Destinasi Alam Memukau Seperti Taman Nasional Ujung Kulon Dan Pantai Anyer, Banten Menawarkan Perpaduan Unik Antara Budaya, Alam, Dan Tradisi. Keindahannya Menjadikan Banten Tempat Yang Sempurna Untuk Petualangan Dan Relaksasi.</p>
      </div>
    </div>
  );
};

export default YouTubePlayer;