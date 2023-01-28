import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../Searchbar/searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({
      search: '',
    });
  }

  render() {
    const { search } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.Button}>
            <span className={styles.Label}>Search</span>
          </button>

          <input
            name="search"
            value={search}
            className={styles.Input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
