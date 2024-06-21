import React, { useState, useEffect } from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';


const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

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

  const handleCreate = async (e) => {
    e.preventDefault();
    try{
      const productData = new FormData()
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("photo", photo);
      let data = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData);
      if(data){
        data = data.data;
      }
      if(data?.success === true){
        toast.success("Product created successfully");
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setShipping("");
        setPhoto("");
        navigate('/dashboard/admin/products')
      }else{
        toast.error(data?.message);
      }
    }catch(err){
      console.log(`Error in Creating Product: ${err}`);
      toast.error(`Error: ${err}`);
    }
  }

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
            <h1>Create Product</h1>
            <div className="m-1">
              <Select variant={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value) => { setCategory(value) }}>
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
                {photo && (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)} alt={photo.name} height={"200px"} className="img img-responsive"
                    />
                  </div>
                )}
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
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className='btn btn-primary col-md-12' onClick={handleCreate}>Create Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct