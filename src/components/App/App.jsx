import { Component } from 'react';
import { ProgressBar } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Searchbar } from '../Searchbar/Searchbar';

import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { fetchImages } from 'services/API';
import css from './App.module.css';

export class App extends Component {
  state = {
    search: '',
    total: null,
    images: [],
    page: 1,
  };

  showNotification = () => {
    const { total, images, search } = this.state;
    toast(
      `We found ${images.length} out of ${total} images matching "${search}"`
    );
  };

  handleFetch = async () => {
    const { search, page } = this.state;
    try {
      const searchData = await fetchImages(search, page);
      this.setState(
        prev => ({
          images: [...prev.images, ...searchData.results],
          total: searchData.total,
        }),
        this.showNotification
      );
    } catch {
      toast.error('Something went wrong. Please, try again');
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      search: e.target.elements.search.value,
      page: 1,
      images: [],
    });
    e.target.reset();
    await this.handleFetch();
  };

  handleLoadMore = async () => {
    this.setState(prev => ({ page: prev.page + 1 }));
    await this.handleFetch();
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
        <ImageGallery images={this.state.images} />
        <Button onLoadMore={this.handleLoadMore} />
        <ToastContainer />
      </div>
    );
  }
}
