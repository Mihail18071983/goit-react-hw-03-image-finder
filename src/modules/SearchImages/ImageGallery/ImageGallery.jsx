import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import styles from '../ImageGallery/ImageGallery.module.css';


const ImageGallery = ({ items }) => {
  return (
    <ul className={styles.ImageGallery}>
      {items.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          src={webformatURL}
          bigImage={largeImageURL}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};