import React, { Component } from 'react';

class SearchForm extends Component {
    state = {
        search: '',
    }
    submitHandler = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.search);
        this.setState({search: ''})
    }

    inputHandler = (e) => {
        this.setState({search: e.target.value})
        }
    render() {
        const { search } = this.state;

        return (
            <header className="Searchbar">
            <form className="SearchForm" onSubmit={this.submitHandler}>
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                </button>
    
                <input
                    className="SearchForm-input"
                    type="text"
                    // autofocus
                    // autocomplete="on"
                    name='search'
                    value={search}
                    onChange={this.inputHandler}
                    placeholder="Search images and photos"
                />
            </form>
        </header>
        );
    }
}

export default SearchForm;