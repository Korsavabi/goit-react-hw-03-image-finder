import React from 'react';
import Loader from 'react-loader-spinner';

const LoaderSpinner = () => {
    return (
           <div>
               <Loader  type="Bars" color="#00BFFF" height={100} width={100} timeout={15000} className="center" />
           </div> 
    );
};

export default LoaderSpinner;