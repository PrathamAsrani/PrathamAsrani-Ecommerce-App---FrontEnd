import React, { useState, useEffect } from 'react'
import AdminMenu from '../../Layout/AdminMenu';
import Layout from '../../Layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products`);
            if (data?.success === true) {
                setProducts(data?.products);
                toast.success(data?.message);
            }
        } catch (err) {
            console.log(`Error in Fetching Product: ${err}`);
            toast.error(`Error: ${err}`);
        }
    }

    // lifecycle method
    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className='text-center'>All Products List</h1>
                    <div className="d-flex">
                        {products?.map(p => (
                            <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                                <div className="card m-2 p-2" style={{ width: '18rem' }}>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className='card-img-top' alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {/* 
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Product Name</th>
                                <th>Product Description</th>
                                <th>Product Price</th>
                                <th>Product Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td><img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
*/}
                </div>
            </div>
        </Layout>
    )
}

export default Products