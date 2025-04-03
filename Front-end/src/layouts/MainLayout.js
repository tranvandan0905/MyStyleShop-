import React from 'react';
import UserLayouts from './UserLayouts';
import AdminLayouts from './AdminLayouts';
function MainLayout() {
    const userRole = localStorage.getItem("role");

    return (
        <div>
          
            {userRole === "admin" ? <AdminLayouts /> : <UserLayouts />}
        </div>
    );
}

export default MainLayout;
