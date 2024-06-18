import React, { useState, useEffect } from 'react'
import AdminMenu from '../../Layout/AdminMenu'
import Layout from '../../Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Modal } from 'antd';
import CategoryForm from './../../Components/Forms/CategoryForm';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name });
      toast.success(`${capitalize(name)} category added successfully`)
      console.log(data);
      getAllCategory();
    } catch (err) {
      console.log(err);
      toast.error(`Error: ${err}`);
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log('hii');
    try {
      let data = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName });
      data = data.data;
      console.log(data.success);
      if (data.success) {
        toast.success(`${capitalize(updatedName)} category updated successfully`)
        setUpdatedName("");
        setSelected(null);
        setVisible(false);
        getAllCategory();
      }
    } catch (err) {
      console.log(err);
      toast.error(`Error: ${err}`);
    }
  }

  const handleDelete = async(id) => {
    try {
      let data = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`);
      data = data.data;
      console.log(data);
      if (data.success) {
        toast.success(`Deleted successfully`)
        getAllCategory();
      }
    } catch (err) {
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
            <div className="p-3 w-50">
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
                      <td>
                        <button className='btn btn-primary ms-2' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c)}}>Edit</button>
                        <button className='btn btn-danger ms-2' onClick={() => {handleDelete(c._id);}}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default CreateCategory