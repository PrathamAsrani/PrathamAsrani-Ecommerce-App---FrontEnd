import React, {useState, useEffect} from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const getProduct = async() => {
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.slug}`)
            console.log(data)
            setProduct(data?.product)
        }catch(err){
            console.log(`Error in Product Deatils fetching, please check: ProductDetails\nerr: ${err}`)
        }
    }
    useEffect(() => {
        if(params?.slug) getProduct()
    }, [params?.slug])
    return (
        <Layout title={`Product Details`}>
            {/* {JSON.stringify(product, null, 4)} */}
            <div className="row container mt-4">
                <div className="col-md-6 text-center">
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} alt="product image" />
                </div>
                <div className="col-md-6">
                    <h1>Product Details</h1>
                    <hr />
                    <h5>Name: {product?.name}</h5>
                    <h5>Description: {product?.description}</h5>
                    <h5>Price: {product?.price}$</h5>
                </div>
            </div>
            <div className="row container">
                Similar Products
            </div>
        </Layout>
    )
}

export default ProductDetails