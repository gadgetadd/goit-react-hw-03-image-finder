import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ link, descr, openModal }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={openModal}>
      <img className={css['ImageGalleryItem-image']} src={link} alt={descr} />
    </li>
  );
};
