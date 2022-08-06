import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/products";
import {AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar} from 'react-icons/ai'
import { Product } from '../components';
import { useStateContext} from '../context/StateContext'

const ProductDetails = () => {
    const { products } = useContext(ProductContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const { decreaseQty, increaseQty, qty, onAdd} = useStateContext();

    const product = products.find((product) => {
        return product.id === id;
      });

    if (!product) {
    return <h3>Loading...</h3>;
    }

    const { image: url, name, details, author, price } = product;
    // const [index, setIndex] = useState(0);

    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img src={url} alt="image" className='product-detail-image'/>
                    </div>
                    {/* <div className='small-images-container'>
                        <img src={url} alt="image" 
                        className={i === index ? 'small-image select-image':
                        'small-image'}
                        onMouseEnter={()  => setIndex(i)}/>
                    </div> */}
                </div>
                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <div>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiOutlineStar/>
                        </div>
                        <p>
                        (20)
                        </p>
                    </div>
                    <h4>Details:</h4>
                    <p>{details}</p>
                    <p className='price'>${price}</p>
                    <div className='quantity'>
                        <h3>Quantity:</h3>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={decreaseQty}>
                                <AiOutlineMinus/>
                            </span>
                            <span className='num' onClick="">
                                {qty}
                            </span>
                            <span className='plus' onClick={increaseQty}>
                                <AiOutlinePlus/>
                            </span>
                        </p>
                    </div>
                    <div className='buttons'>
                        <button type='button' className='add-to-cart' onClick={()=> onAdd(product, qty)}>Add to Cart</button>
                        <button type='button' className='buy-now' onClick="">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {products.map((item)=> (
                            <Product key={item.id}
                            product = {item}/>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDetails