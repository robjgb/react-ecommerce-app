import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { API, graphqlOperation, Storage } from "aws-amplify";
import { Authenticator } from '@aws-amplify/ui-react';
import { createProduct } from '../api/mutations'
import '@aws-amplify/ui-react/styles.css';
import config from '../aws-exports'

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config


const Admin = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({ name: "", details: "", image: "", author: "", price: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!productDetails.name || !productDetails.price) return
            await API.graphql(graphqlOperation(createProduct, { input: productDetails }))
            setProductDetails({ name: "", details: "", image: "", author: "", price: "" })
        } catch (err) {
            console.log('error creating todo:', err)
        }
    }

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const extension = file.name.split(".")[1];
        const name = file.name.split(".")[0];
        const key = `images/${uuidv4()}${name}.${extension}`;
        const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
        try {
            // Upload the file to s3 with public access level. 
            await Storage.put(key, file, {
                level: 'public',
                contentType: file.type
            });
            // Retrieve the uploaded file to display
            const image = await Storage.get(key, { level: 'public' })
            setImage(image);
            setProductDetails

({ ...productDetails, image: url });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className="admin-wrapper">
            <Authenticator loginMechanisms={['email']} >
            {({ signOut, user }) => (
                <section>
                    <header className="form-header">
                        <h3>Add New Product</h3>
                        <button onClick={signOut}> Sign Out</button>
                    </header>
                    <form className="form-wrapper" onSubmit={handleSubmit}>
                        <div className="form-image">
                            {image ? <img className="image-preview" src={image} alt="" /> : <input
                                type="file"
                                accept="image/jpg"
                                onChange={(e) => handleImageUpload(e)} />}

                        </div>
                        <div className="form-fields">
                            <div className="title-form">
                                <p><label htmlFor="title">Name</label></p>
                                <p><input
                                    name="email"
                                    type="title"
                                    placeholder="Type the name of the product"
                                    onChange={(e) => setProductDetails

({ ...productDetails, name: e.target.value })}
                                    required
                                /></p>
                            </div>
                            <div className="description-form">
                                <p><label htmlFor="description">Description</label></p>
                                <p><textarea
                                    name="description"
                                    type="text"
                                    rows="8"
                                    placeholder="Type the description of the product"
                                    onChange={(e) => setProductDetails

({ ...productDetails, details: e.target.value })}
                                    required
                                /></p>
                            </div>
                            <div className="author-form">
                                <p><label htmlFor="author">Brand</label></p>
                                <p><input
                                    name="author"
                                    type="text"
                                    placeholder="Type the brand name"
                                    onChange={(e) => setProductDetails

({ ...productDetails, author: e.target.value })}
                                    required
                                /></p>
                            </div>
                            <div className="price-form">
                                <p><label htmlFor="price">Price ($)</label>
                                    <input
                                        name="price"
                                        type="text"
                                        placeholder="What is the Price of the product (USD)"
                                        onChange={(e) => setProductDetails

({ ...productDetails, price: e.target.value })}
                                        required
                                    /></p>
                            </div>
                            <div className="featured-form">
                                <p><label>Featured?</label>
                                    <input type="checkbox"
                                        className="featured-checkbox"
                                        checked={productDetails.featured}
                                        onChange={() => setProductDetails

({ ...productDetails, featured: !productDetails.featured })}
                                    />
                                </p>
                            </div>
                            <div className="submit-form">
                                <button className="btn" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </section>
            )}
            </Authenticator >
        </section>
    )
}

export default Admin
