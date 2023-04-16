import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { fetchImages } from 'services/API';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { Placeholder } from '../Placeholder/Placeholder';
import css from './App.module.css';

export class App extends Component {
  state = {
    search: '',
    total: null,
    images: [],
    page: 1,
    loading: false,
    showModal: false,
    modal: {},
  };

  componentDidUpdate(_, prevState) {
    const { total, images, search, page, loading } = this.state;
    const isFetch = prevState.search !== search || prevState.page !== page;
    const isFetched =
      prevState.images !== images && prevState.loading !== loading;
    isFetch && this.handleFetch();
    isFetched &&
      toast(
        `We found ${images.length} out of ${total} images matching "${search}"`
      );
  }

  handleOpenModal = id => {
    this.setState(({ images }) => ({
      modal: images.find(img => img.id === id),
      showModal: true,
    }));
  };

  handleCloseModal = () => this.setState({ showModal: false });

  handleFetch = async () => {
    const { search, page } = this.state;
    this.setState({ loading: true });
    try {
      const searchData = await fetchImages(search, page);
      this.setState(({ images }) => ({
        images: [...images, ...searchData.results],
        total: searchData.total,
      }));
    } catch {
      toast.error('Something went wrong. Please, try again');
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSubmit = search => {
    if (this.state.search !== search) {
      this.setState({
        search,
        page: 1,
        images: [],
      });
    } else {
      toast(
        `We've already searched for images matching "${search}".
        Please enter another request.`
      );
    }
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { images, loading, total, showModal, modal } = this.state;
    const isMore = images.length !== 0 && images.length < total && !loading;
    const isEmpty = images.length === 0 && !loading;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        {isEmpty ? (
          <Placeholder />
        ) : (
          <ImageGallery
            images={this.state.images}
            openModal={this.handleOpenModal}
          />
        )}
        {loading && <Loader />}
        {isMore && <Button onLoadMore={this.handleLoadMore} />}
        <ToastContainer />
        {showModal && (
          <Modal
            link={modal.largeImageURL}
            descr={modal.tags}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
