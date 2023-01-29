import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImages } from 'shared/services/posts-api';
import Button from 'shared/components/Button';

import styles from '../SearchImages/SearchImages.module.css';

class SearchImages extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    err: null,
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
      const { hits } = await fetchImages(search, page);
      this.setState(({ items }) => ({ items: [...items, ...hits] }));
    } catch (err) {
      this.setState({ err: err.errorMessage });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImages = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { items, loading, err } = this.state;
      const { searchImages, loadMore } = this;
      
        const isImages = Boolean(items.length);

    return (
      <>
        <Searchbar onSubmit={searchImages} />
        <ImageGallery items={items} />
        {loading && <p>...Loading...but you must CHANGE this component</p>}
        {err && <p className={styles.errorMessage}>{err}</p>}
        {isImages && (
          <Button onLoadMore={loadMore} text={'Load more'} />
        )}
      </>
    );
  }
}

export default SearchImages;
