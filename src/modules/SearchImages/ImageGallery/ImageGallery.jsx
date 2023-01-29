import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import styles from '../ImageGallery/ImageGallery.module.css';


const ImageGallery = ({ items, onClick }) => {
  return (
    <ul className={styles.ImageGallery}>
      {items.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          onClick={onClick}
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL }
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};