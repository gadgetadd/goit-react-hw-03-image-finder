import PropTypes from "prop-types"
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ link, descr, openModal }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={openModal}>
      <img className={css['ImageGalleryItem-image']} src={link} alt={descr} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  descr: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
