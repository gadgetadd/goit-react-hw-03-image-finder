import css from './Button.module.css';

export const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className={css.Button} onClick={onLoadMore}>
      <span className="button-more-label">Load more</span>
    </button>
  );
};
