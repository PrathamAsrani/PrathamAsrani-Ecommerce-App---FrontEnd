import { Layout } from 'antd'
import React from 'react'
import { useSearch } from '../Components/searchAuth'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate()
    const [values, setValues] = useSearch()
    console.log(`vales: `, values)
    return (
        <Layout title={`Search results`}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>
                        {values?.results.length < 1 ? `No Product Found` : `Found: ${values?.results?.length}`}
                    </h6>
                    <div className="d-flex flex-wrap mt-4">
                        {values?.results.map(p => (
                            <div className="card m-2 p-2" style={{ width: '18rem' }} key={p._id}>
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className='card-img-top' alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}</p>
                                    <p className="card-text">${p.price}</p>
                                    <button href="#" className='btn ms-1 btn-primary' onClick={() => {navigate(`product/${p.name}`)}} >More Details</button>
                                    <button href="#" className='btn ms-1 btn-secondary'>Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search