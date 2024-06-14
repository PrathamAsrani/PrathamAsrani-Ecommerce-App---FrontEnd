import React from 'react'

const UserMenu = () => {
    return (
        <>
            <div className="text-center list-group">
                <h4>DashBoard</h4>
                <a href="/dashboard/user/Profile" className="list-group-item list-group-item-action">Profile</a>
                <a href="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</a>
            </div>
        </>
    )
}

export default UserMenu