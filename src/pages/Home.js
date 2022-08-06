import React from 'react'
import { useContext } from 'react'
import { Product, FooterBanner, HeroBanner } from '../components' 
import { BannerContext } from '../context/banner';
import { ProductContext } from '../context/products';


const Home = () => {
  const { banner } = useContext(BannerContext);
  const { featured } = useContext(ProductContext);

  if (!featured.length) {
    return <div></div>
  }
  return (
    <>
    {banner.length === 0? 
    <div></div> :     
    <HeroBanner heroBanner={banner && banner[0]}/>
    }

    <div className='products-heading'> 
      <h2>Featured Items</h2>
      <p> Check out these popular items</p>
    </div> 

    {featured.length === 0? 
    <div> No featured items </div> : 
    <>
    <div className='products-container'>
      {featured?.map(
        (product) => <Product key={product.id} product={product}/>)}
    </div>
    </>
    }
    {banner.length === 0? 
    <div></div> :     
    <FooterBanner footerBanner={banner && banner[0]}/>
    }
    </>
  )
}

export default Home