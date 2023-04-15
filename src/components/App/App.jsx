import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { fetchImages } from 'services/API';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
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

  showNotification = () => {
    const { total, images, search } = this.state;
    toast(
      `We found ${images.length} out of ${total} images matching "${search}"`
    );
  };

  handleOpenModal = id => {
    this.setState(({ images }) => ({
      modal: images.find(img => img.id === id),
      showModal: true,
    }));
  };

  handleCloseModal = () => this.setState({ showModal: false });

  handleFetch = async () => {
    const { search, page } = this.state;
    try {
      const searchData = await fetchImages(search, page);
      this.setState(
        ({ images }) => ({
          images: [...images, ...searchData.results],
          total: searchData.total,
          loading: false,
        }),
        this.showNotification
      );
    } catch {
      toast.error('Something went wrong. Please, try again');
    }
  };

  handleSubmit = async search => {
    this.setState(
      {
        search,
        page: 1,
        images: [],
        loading: true,
      },
      this.handleFetch
    );
  };

  handleLoadMore = async () => {
    this.setState(
      ({ page }) => ({
        page: page + 1,
        loading: true,
      }),
      this.handleFetch
    );
  };

  render() {
    const { images, loading, total, showModal, modal } = this.state;
    const isMore = images.length !== 0 && images.length < total;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} openModal={this.handleOpenModal} />
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
