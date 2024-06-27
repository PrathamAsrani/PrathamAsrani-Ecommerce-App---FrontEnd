import React, { useState, useEffect } from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Select } from 'antd';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const { Option } = Select;

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const params = useParams();
    const [id, setId] = useState("")
    const navigate = useNavigate();

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.slug}`);
            setName(data?.product?.name)
            setId(data?.product?._id)
            console.log(data?.product?._id);
            setDescription(data?.product?.description)
            setPrice(data?.product?.price)
            setQuantity(data?.product?.quantity)
            setShipping(data?.product?.shipping)
            setCategory(data?.product?.category?._id)
        } catch (err) {
            console.log(err);
            toast.error(`Error: ${err}`);
        }
    }

    const getAllCategory = async () => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-categories`);
            if (data?.data?.success === true) {
                setCategories(data.data.category);
            }
        } catch (err) {
            console.log(err);
            toast.error(`Error: ${err}`);
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData()
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            productData.append("shipping", shipping);
            photo && productData.append("photo", photo);
            console.log(id);
            let data = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData);
            if (data) {
                data = data.data;
            }
            if (data?.success === true) {
                toast.success("Product updated successfully");
                setName("");
                setDescription("");
                setPrice("");
                setQuantity("");
                setShipping("");
                setPhoto("");
                navigate('/dashboard/admin/products')
            } else {
                toast.error(data?.message);
            }
        } catch (err) {
            console.log(`Error in Updating Product: ${err}`);
            toast.error(`Error: ${err}`);
        }
    }

    const handleDelete = async () => {
        try {
            let answer = false;
            answer = window.confirm("Are you sure you want to delete this product?");
            if(!answer) return ;
            let { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/product-delete/${id}`);
            if (data?.success === true) {
                toast.success("Product deleted successfully");
                setName("");
                setDescription("");
                setPrice("");
                setQuantity("");
                setShipping("");
                setPhoto("");
                navigate('/dashboard/admin/products')
            } else {
                toast.error(data?.message);
            }
        } catch (err) {
            console.log(`Error in Deleting Product: ${err}`);
            toast.error(`Error: ${err}`);
        }
    }

    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        getAllCategory();
    }, []);


    return (
        <Layout title='DashBoard - Create Product'>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m-1">
                            <Select
                                variant={false}
                                placeholder="Select a Category"
                                size='large'
                                showSearch
                                className='form-select mb-3'
                                onChange={(value) => { setCategory(value) }}
                                value={category}
                            >
                                {
                                    categories?.map(c => (
                                        <option value={c._id} key={c._id}>{c.name}</option>
                                    ))
                                }
                            </Select>
                            <div className="mb-3">
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type="file" name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo ?
                                    (
                                        <div className="text-center">
                                            <img src={URL.createObjectURL(photo)} alt={photo.name} height={"200px"} className="img img-responsive"
                                            />
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="text-center">
                                            <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`} alt={photo ? photo.name : "No Photo"} height={"200px"} className="img img-responsive"

                                            />
                                        </div>
                                    )
                                }
                            </div>
                            <div className="mb-3">
                                <input type='text' value={name} placeholder='Enter the product name' className='form-control' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                {/* <input type='text-area' value={description} placeholder='Enter the product description' className='form-control' onChange={(e) => setDescription(e.target.value)} /> */}
                                <textarea value={description} placeholder='Enter the product description' className='form-control' onChange={(e) => setDescription(e.target.value)} rows="4" cols="50"></textarea>
                            </div>
                            <div className="mb-3">
                                <input type='number' value={price} placeholder='Enter the product price' className='form-control' onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type='number' value={quantity} placeholder='Enter the product quantity' className='form-control' onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <Select
                                    variant={false}
                                    placeholder="Select Shipping"
                                    size="large"
                                    showSearch
                                    className="form-select"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                    value={shipping ? "yes" : "no"}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-primary col-md-12' onClick={handleUpdate}>Update Product</button>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-danger col-md-12' onClick={handleDelete}>Delete Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct