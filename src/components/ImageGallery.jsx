import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'IGgtPcg0K1c7vj6GkzUL8PgNbL1oJaIws_zgM0bQBDs';

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [displayedImageIds, setDisplayedImageIds] = useState(new Set());

  useEffect(() => {
    if (images.length < 16) {
      fetchImages();
    }
  }, [page]);

  const fetchImages = async () => {
    if (images.length >= 16) return; // Prevent fetching if already 16 images are loaded

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=${page}&query=banten&per_page=4&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const newImages = response.data.results.filter(image => !displayedImageIds.has(image.id));
      const shuffledResults = shuffleArray(newImages);
      const newDisplayedImageIds = new Set([...displayedImageIds, ...shuffledResults.map(image => image.id)]);

      setImages(prevImages => [...prevImages, ...shuffledResults].slice(0, 16)); // Ensure only max 16 images are stored
      setDisplayedImageIds(newDisplayedImageIds);
    } catch (error) {
      console.error('Error fetching images from Unsplash', error);
    }
    setLoading(false);
  };

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const loadMoreImages = () => {
    if (images.length < 16) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const openUnsplashLink = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="text-3xl font-bold" id='gallery'>Banten Image Gallery</h1>
      <div className="image-gallery" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {images.map(image => (
          <div key={image.id} className="image-card" onClick={() => openUnsplashLink(image.links.html)}>
            <img src={image.urls.small} alt={image.description || 'Banten'} />
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && images.length < 16 && (
        <button onClick={loadMoreImages}>Load More</button>
      )}
    </div>
  );
}

export default ImageGallery;
