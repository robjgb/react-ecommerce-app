import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { ProductContext } from '../context/products';


const Books = () => {
    const { products } = useContext(ProductContext);
    console.log(products)

    if (!products.length) {
        return <h3>No Products Available</h3>
    }

    return (
        <section className="books">
            {products.map(({ image: image, id, name }) => (
                <article key={id} className="book">
                    <div className="book-image">
                        <img src={image} alt={name} />
                    </div>
                    <Link to={`books/${id}`} className="btn book-link">details</Link>
                </article>
            ))}
        </section>
    )
}

export default Books
