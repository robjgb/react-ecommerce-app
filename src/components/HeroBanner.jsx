import React from 'react';
import { Link } from "react-router-dom";


const HeroBanner = ({ heroBanner }) => {

  return (
    <div className='hero-banner-container'> 
        <div>
            <p className='beats-solo'> {heroBanner.smallText}</p>
            <h3> {heroBanner.midText} </h3>
            <h1> {heroBanner.largeText1} </h1>
            <img src={heroBanner.image} alt="product-image" className='hero-banner-image'/>
            <div>
                <Link to={`/product/${heroBanner.id}`}>
                    <button type="button"> {heroBanner.buttonText} </button>
                </Link>
                <div className='desc'>
                    <h5>Description</h5>
                    <p>{heroBanner.desc}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroBanner