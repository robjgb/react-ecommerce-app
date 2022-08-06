import React from 'react'
import { Link } from "react-router-dom";

const Product = ({product: {image, name, id, price}}) => {

  return (
    <div>
      <Link to={`/product/${id}`} onClick={()=> {window.scrollTo(0, 0)}}>
        <div className='product-card'>
          <img 
            src = {image}
            width={250}
            height={250}
            className="product-image"
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>

        </div>
      </Link>
    </div>
  )
}

export default Product