import React from 'react'
import AdminMenu from '../../Layout/AdminMenu'
import Layout from '../../Layout/Layout'

const CreateCategory = () => {
  return (
    <Layout title='DashBoard - Create Category'>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
          <h1>Create Category</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory