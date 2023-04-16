import { ReactComponent as GalleryIcon } from 'images/gallery.svg';
import css from './Placeholder.module.css';

export const Placeholder = () => {
  return (
    <div className={css.placeholder}>
      <GalleryIcon className={css.icon} />
    </div>
  );
};
