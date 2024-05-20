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

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '35px', fontWeight: 'bold' }}>Banten Image Gallery</h1>
      <div className="image-gallery" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {images.map(image => (
          <div key={image.id} className="image-card" style={styles.imageCard}>
            <img src={image.urls.small} alt={image.description || 'Banten'} style={styles.image} />
            <div className="caption" style={styles.caption}>{image.description || 'Banten'}</div>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && images.length < 16 && (
        <button onClick={loadMoreImages} style={styles.button}>Load More</button>
      )}
    </div>
  );
}

const styles = {
  imageCard: {
    width: '300px',
    height: '200px',
    margin: '10px',
    overflow: 'hidden',
    borderRadius: '10px',
    position: 'relative',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '10px',
    transition: 'transform 0.3s ease-in-out',
  },
  button: {
    margin: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  caption: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    padding: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    textAlign: 'center',
    opacity: '0',
    transition: 'opacity 0.3s ease-in-out',
    borderRadius: '0 0 10px 10px',
  },
};

// Inject the CSS into the document head
const css = `
.image-card:hover img {
  transform: scale(1.3);
}
.image-card:hover .caption {
  opacity: 1;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

export default ImageGallery;