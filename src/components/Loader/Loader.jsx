import { PropagateLoader } from 'react-spinners';
import css from './Loader.module.css';

export const Loader = () => (
  <div className={css.loader}>
    <PropagateLoader color="#3f51b5" speedMultiplier={2.5} />
  </div>
);
