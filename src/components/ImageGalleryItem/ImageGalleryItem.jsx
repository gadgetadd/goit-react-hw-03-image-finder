import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ link, descr }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css['ImageGalleryItem-image']} src={link} alt={descr} />
    </li>
  );
};
