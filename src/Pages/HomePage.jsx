import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../Components/Supporters/Prices';

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const getTotal = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
      console.log(res);
      setTotal(res?.data?.total)
    } catch (err) {
      console.log(`error in getTotal homepage \n ${err}`)
    }
  }

  const handleFilter = async (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(item => item !== id)
    }
    setChecked(all)
  }

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product//product-list/${page}`)
      setLoading(false)
      setProducts(data?.products)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  const getAllCategory = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-categories`);
      if (data?.data?.success === true) {
        setCategories(data.data.category);
      }
    } catch (err) {
      console.log(`error in loadMore \n ${err}`);
    }
  }

  useEffect(() => {
    if (page === 1)
      return
    loadMore()
  }, [page])

  const loadMore = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product//product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (err) {
      setLoading(false)
      console.log(`error in loadMore \n ${err}`)
    }
  }

  useEffect(() => {
    getAllCategory()
    getTotal()
  }, [])

  useEffect(() => {
    if (checked.length == 0 && radio.length == 0)
      getAllProducts()
  }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length)
      filterProduct()
  }, [checked, radio])

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, { checked, radio })
      setProducts(data?.products)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Layout title={"All Products - Best offers"} >
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className='text-center mt-3'>Filter by category</h4>
          <div className="d-flex flex-column">
            {categories.map(c => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className='text-center mt-3'>Filter by prices</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}>
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className='btn btn-danger' onClick={() => window.location.reload()} >Reset Filter</button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className='text-center'>All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map(p => (
              <div className="card m-2 p-2" style={{ width: '18rem' }}>
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className='card-img-top' alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">${p.price}</p>
                  <button href="#" className='btn ms-1 btn-primary'>More Details</button>
                  <button href="#" className='btn ms-1 btn-secondary'>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button className='btn btn-warning' onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}>
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage