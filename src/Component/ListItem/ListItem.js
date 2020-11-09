import React from 'react';
import * as basicLightbox from 'basiclightbox';
import '../../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import PropTypes from "prop-types";

const ListItem = ({ images }) => {
    const modal = (e) => {
        e.preventDefault();

        const instance = basicLightbox.create(`
        <div class="modal">
        <img src="${e.target.dataset.src}" alt="${e.target.alt}" class="js-modal-img">
        </div>
    `)
        instance.show()
    }

    return (
        <>
            <ul className="ImageGallery">
                {
                    images.map(card => <li key={card.id}><img src={card.webformatURL} data-src={card.largeImageURL} onClick={modal} alt={card.type} className="ImageGalleryItem-image" /> </li>)
                }
            </ul>
        </>
    );
};

export default ListItem;

ListItem.propTypes = {
    images: PropTypes
}