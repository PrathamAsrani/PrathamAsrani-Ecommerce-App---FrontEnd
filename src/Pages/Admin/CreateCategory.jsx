import React, { useState, useEffect } from 'react'
import AdminMenu from '../../Layout/AdminMenu'
import Layout from '../../Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import CategoryForm from '../../Components/Forms/CategoryForm';


const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const data = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {name});
      toast.success(`${name.capitalize()} category added successfully`)
      console.log(data);
    }catch(err){
      console.log(err);
      toast.error(`Error: ${err}`);
    }
  }
  
  const getAllCategory = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-categories`);
      if (data.data.success === true) {
        setCategories(data.data.category);
      }
    } catch (err) {
      console.log(err);
      toast.error(`Error: ${err}`);
    }
  }
  useEffect(() => {
    getAllCategory();
  }, [])
  return (
    <Layout title='DashBoard - Create Category'>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3">
              <CategoryForm value={name} setValue={setName} handleSubmit={handleSubmit} />
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map(c => (
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td><button className='btn btn-primary'>Edit</button></td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default CreateCategory