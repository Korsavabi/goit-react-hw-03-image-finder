import React, { Component } from 'react';
import { withCredentials, request } from '../../helpers/request';
import ListItem from '../ListItem/ListItem';
import Loader from 'react-loader-spinner';
import SearchForm from '../SearchForm/SearchForm';

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

    hendleSearchQuerySybmit = search => {
        this.setState({ searchQuery: search })
    }

    featchImages = async () => {
        const { searchQuery, pages, } = this.state
        const url = withCredentials(`https://pixabay.com/api/?q=${searchQuery}&image_type=photo&per_page=9&page=${pages}&`)
        try {
            const result = await request('get', url);

            this.setState(prevState => ({
                images: [...prevState.images, ...result.hits],
                loader: false,
                pages: prevState.pages + 1
            }))
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
        } catch (error) {
            this.setState({
                error: true,
                loader: false,
                message: 'Some Eror, try later'
            })
        }
        
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
       
                {loader && <Loader  type="Bars" color="#00BFFF" height={100} width={100} timeout={3000} className="center" />}
                {!error && loader && <ListItem key={images.id} images={images} />}
                {images.length > 0  && !loader && <button type="button" onClick={this.featchImages}>Load More...</button>}
   

            </>
        );
    }
}

export default List;