import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImages} from 'shared/services/posts-api';

import styles from '../SearchImages/SearchImages.module.css';

class SearchImages extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const {hits} = await fetchImages(search, page);
      this.setState(({ items }) => ({ items: [...items, ...hits] }));
    } catch (err) {
      this.setState({ err: err.errorMessage });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImages = ({ search }) => {
    this.setState({ search, items:[], page:1 });
  };

  render() {
    const { items, loading, error } = this.state;
    const { searchImages } = this;

    return (
      <>
        <Searchbar onSubmit={searchImages} />
        <ImageGallery  items={items} />
        {loading && <p>...Loading...but you must CHANGE this component</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </>
    );
  }
}

export default SearchImages;
