import React from 'react';
import * as basicLightbox from 'basiclightbox';
import '../../../node_modules/basiclightbox/dist/basicLightbox.min.css';
const ListItem = ({ images, largeImageURL, type }) => {
    const modal = (e) => {
        e.preventDefault();
        // if(e.code === "Escape"){
        const instance = basicLightbox.create(`
        <div class="modal">
        <img src="${e.target.dataset.src}" alt="${e.target.alt}" class="js-modal-img">
        </div>
    `)
        instance.show()
        // }  

    }

    return (
        <>
            {/* <img src={largeImageURL} alt={type} className="ImageGalleryItem-image" /> */}
            <ul className="ImageGallery">
                {
                    images.map(card => <li><img src={card.webformatURL} data-src={card.largeImageURL} onClick={modal} alt={card.type} className="ImageGalleryItem-image" /> </li>)
                }
            </ul>


        </>
    );
};

export default ListItem;