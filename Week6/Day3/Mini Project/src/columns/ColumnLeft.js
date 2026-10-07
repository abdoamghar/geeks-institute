import { useState } from 'react';

function ColumnLeft() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function getImages() {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        'https://dog.ceo/api/breeds/image/random/2',
      );

      if (!response.ok) {
        throw new Error(`Image request failed (${response.status}).`);
      }

      const result = await response.json();
      if (!Array.isArray(result.message)) {
        throw new Error('The image service returned an unexpected response.');
      }

      setImages(result.message);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="column column-left">
      <h1>Left column</h1>
      <button
        className="button button-blue"
        onClick={getImages}
        disabled={isLoading}
      >
        {isLoading ? 'Loading…' : 'Get images'}
      </button>
      {error && <p className="request-error" role="alert">{error}</p>}
      {images.length > 0 && (
        <div className="image-list">
          {images.map((image) => (
            <img key={image} src={image} alt="A dog" />
          ))}
        </div>
      )}
    </section>
  );
}

export default ColumnLeft;
