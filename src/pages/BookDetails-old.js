import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ProductContext } from "../context/products";
import { CartContext } from "../context/cart";

const BookDetails = () => {
  const { products } = useContext(ProductContext);
  const { id } = useParams();
  const history = useHistory();
  const { addToCart } = useContext(CartContext);

  const product = products.find((product) => {
    return product.id === id;
  });

  if (!product) {
    return <h3>Loading...</h3>;
  }

  const { image: url, name, details, author, price } = product;

  return (
    <section className="book-details">
      <div className="detail-image">
        <img src={url} alt="10x Rule" />
      </div>
      <div className="detail-description">
        <h2>{name}</h2>
        <p>{details}</p>
        <h3>{author}</h3>
        <h4>Price - $ {price}</h4>
        <button
          className="btn"
          onClick={() => {
            addToCart({ ...product, id });
            history.push("/cart");
          }}
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
};
  
export default BookDetails;
