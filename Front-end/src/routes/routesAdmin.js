import { Routes, Route } from 'react-router-dom';
import { UserAddForm, UserEditForm, UserList } from '../Admin/User';
import { ProductAddForm, ProductEditForm, ProductList } from '../Admin/product';
import { CategoryList, CategoryAddForm, CategoryEditForm } from '../Admin/categorys';
import Logout from '../pages/logout';
import { HomeAdmin } from '../pages/HomeAdmin';

const RoutesAdmin = () => {
    return (
        <Routes>
            {/* Routes dành cho quản lý user */}
            <Route path="" element={<HomeAdmin />} />
            <Route path="user/list" element={<UserList />} />
            <Route path="user/add" element={<UserAddForm />} />
            <Route path="user/edit/:id" element={<UserEditForm />} />

            {/* Routes dành cho quản lý sản phẩm */}
            <Route path="product/list" element={<ProductList />} />
            <Route path="product/add" element={<ProductAddForm />} />
            <Route path="product/edit/:id" element={<ProductEditForm />} />

            {/* Routes dành cho quản lý danh mục */}
            <Route path="category/list" element={<CategoryList />} />
            <Route path="category/add" element={<CategoryAddForm />} />
            <Route path="category/edit/:id" element={<CategoryEditForm />} />

            {/* Route logout */}
            <Route path="logout" element={<Logout />} />
        </Routes>
    );
};

export default RoutesAdmin;
