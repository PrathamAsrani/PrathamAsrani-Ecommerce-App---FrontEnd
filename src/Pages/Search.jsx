import { Layout } from 'antd'
import React from 'react'
import {useSearch} from '../Components/searchAuth'

const Search = () => {
    const {values, setValues} = useSearch()
    return (
        <Layout title={`Search results`}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>

                    </h6>
                </div>
            </div>
        </Layout>
    )
}

export default Search