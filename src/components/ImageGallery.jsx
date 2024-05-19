import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'IGgtPcg0K1c7vj6GkzUL8PgNbL1oJaIws_zgM0bQBDs';

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchedImageIds, setFetchedImageIds] = useState(new Set());

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=${page}&query=banten&per_page=4&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const filteredImages = response.data.results.filter(image => !fetchedImageIds.has(image.id));
      setImages(prevImages => [...prevImages, ...filteredImages]);
      setFetchedImageIds(prevIds => new Set([...prevIds, ...filteredImages.map(image => image.id)]));
    } catch (error) {
      console.error('Error fetching images from Unsplash', error);
    }
    setLoading(false);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '35px', fontWeight: 'bold' }}>Banten Image Gallery</h1>
      <div className="image-gallery" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {images.map(image => (
          <div key={image.id} className="image-card" style={{ width: '300px', margin: '10px', overflow: 'hidden', borderRadius: '10px' }}>
            <img src={image.urls.small} alt={image.description || 'Banten'} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && <button onClick={loadMoreImages} style={{ margin: '20px', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Load More</button>}
    </div>
  );
}

export default App;
