import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImages } from 'shared/services/posts-api';
import Button from 'shared/components/Button/Button';
import Loader from 'shared/components/Loader/Loader';
import Modal from 'shared/components/Modal/Modal';

import styles from '../SearchImages/SearchImages.module.css';

class SearchImages extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    err: null,
    page: 1,
    showModal: false,
    total: 0,
    imgDetails: '',
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
      const { hits, totalHits } = await fetchImages(search, page);
      this.setState(({ items }) => ({
        items: [...items, ...hits],
        total: totalHits,
      }));
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

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      imgDetails: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      imgDetails: null,
    });
  };

  render() {
    const { items, loading, err, total, page, showModal, imgDetails, tags } =
      this.state;
    const { searchImages, loadMore, closeModal, openModal } = this;
    const isImages = Boolean(items.length);
    const totalPage = Math.ceil(total / 12);

    return (
      <>
        <Searchbar onSubmit={searchImages} />
        <ImageGallery items={items} onClick={openModal} />
        {loading && <Loader />}
        {err && <p className={styles.errorMessage}>{err}</p>}
        {isImages && page < totalPage && (
          <Button onLoadMore={loadMore} text={'Load more'} />
        )}
        {showModal && (
          <Modal close={closeModal}>
            <img src={imgDetails} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}

export default SearchImages;
