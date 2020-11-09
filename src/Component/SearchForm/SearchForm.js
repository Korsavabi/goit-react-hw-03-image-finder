import React, { Component } from 'react';
import PropTypes from "prop-types";

class SearchForm extends Component {
    state = {
        search: '',
    }
    submitHandler = (e) => {
        e.preventDefault();
        const { search } = this.state;
        this.props.onSubmit(search);
        this.setState({ search: '' })
    }

    inputHandler = (e) => {
        this.setState({ search: e.target.value })
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

SearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}