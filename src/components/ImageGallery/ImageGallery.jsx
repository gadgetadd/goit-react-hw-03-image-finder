import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          openModal={()=>{openModal(image.id)}}
          key={image.id}
          link={image.webformatURL}
          descr={image.tags}
        />
      ))}
    </ul>
  );
};
