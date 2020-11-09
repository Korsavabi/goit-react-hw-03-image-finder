import React, { Component } from 'react';
import { withCredentials, request } from '../../helpers/request';
import ListItem from '../ListItem/ListItem';
import SearchForm from '../SearchForm/SearchForm';
import LoaderSpinner from '../Loader/LoaderSpinner';
import Loader from 'react-loader-spinner';

class List extends Component {
    state = {
        images: [],
        loader: false,
        err: false,
        pages: 1,
        perPage: 9,
        message: '',
        searchQuery: ''
    }

    loaderToggle = (status) => {
        this.setState({ loader: status })
    }
    errorToggle = (status) => {
        this.setState({ error: status })
    }
    featchImages = async () => {
        const { searchQuery, pages, } = this.state
        const url = withCredentials(`https://pixabay.com/api/?q=${searchQuery}&image_type=photo&per_page=9&page=${pages}&`)
        try {
            this.loaderToggle(true)
            const result = await request('get', url);
            this.setState(prevState => ({
                images: [...prevState.images, ...result.hits],
                pages: prevState.pages + 1,
            }))
           
        } catch (error) {
            this.setState({
                message: 'Some Eror, try later'
            })
            this.errorToggle(true)
            this.loaderToggle(false)

        } finally {
            this.loaderToggle(false)
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
        }

    }
    hendleSearchQuerySybmit = async search => {
      await this.setState({ searchQuery: search, pages: 1, images: []})
    }
    componentDidUpdate(prevProps, prevState) {
        const nextSerch = this.state.searchQuery;
        const prevSerch = prevState.searchQuery;

        if (nextSerch !== prevSerch) {
            this.featchImages();
        }
    }

    render() {
        const { images, loader, error, message } = this.state;
        return (
            <>
                <SearchForm onSubmit={this.hendleSearchQuerySybmit} />
                {error && <h1>{message}</h1>}
                {/* {!error && !loader && <ListItem key={images.id} images={images} />} */}
                {/* {loader && <Loader  type="Bars" color="#00BFFF" height={100} width={100} timeout={15000} className="center" />}
                {!error && !loader && <ListItem images={images} />} */}
                {loader ? <LoaderSpinner /> : <ListItem images={images} />}
                {images.length > 0 && <button type="button" onClick={this.featchImages}>Load More...</button>}
                {/* {!error && !loader && <ListItem images={images} />} */}


            </>
        );
    }
}

export default List;