import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import validator from 'validator';

import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const HandleFormValidation = e => {
    e.preventDefault();
    const search = e.target.elements.search.value;
    const isValid =
      validator.isAlphanumeric(search, 'en-US', {
        ignore: ' ,.-/',
      }) && validator.isLength(search, { min: 3, max: 50 });
    if (isValid) {
      onSubmit(search);
    } else {
      toast.info(
        'Please enter a valid search query in Latin containing 3 to 50 characters'
      );
    }
    e.target.reset();
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={HandleFormValidation}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={css['SearchForm-input']}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
