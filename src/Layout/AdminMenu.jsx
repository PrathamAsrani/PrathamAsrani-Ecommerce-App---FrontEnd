import React from 'react'

const AdminMenu = () => {
    return (
        <>
            <div className="text-center list-group">
                <h4>Admin Panel</h4>
                <a href="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</a>
                <a href="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</a>
                <a href="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</a>
                <a href="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</a>
            </div>
        </>
    )
}

export default AdminMenu