import React from 'react';
import { Link } from "react-router-dom";


const FooterBanner = ({footerBanner: {id, discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image}}) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>

        <div className='left'>
          <p>{discount}</p>
          <h3>{largeText2}</h3>
          <h3>{largeText1}</h3>
          <p>{saleTime}</p>
        </div>

        <img src={image} alt="product-image" className="footer-banner-image"></img>

          <div className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link to ={`/product/${id}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default FooterBanner