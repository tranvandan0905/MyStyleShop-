import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { fetchAllProduct, deleteProduct } from '../../services/ProductServices';
import AddProductForm from "./ProductAddForm";
import ProductEditForm from "./ProductEditForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetchAllProduct();
      if (response && response.errorCode === 0) {
        setProducts(response.data);
      } else {
        console.error("Lỗi khi lấy dữ liệu:", response.message);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(id);
        await getProducts();
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  return (
    <>
      {editingProduct ? (
        <ProductEditForm product={editingProduct} onEditSuccess={() => { setEditingProduct(null); getProducts(); }} />
      ) : showForm ? (
        <AddProductForm onProductAdded={() => { setShowForm(false); getProducts(); }} />
      ) : (
        <>
          <Button variant="primary" className="mb-3" onClick={() => setShowForm(true)}>
            Add New Product
          </Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Description</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Final Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => {
                  const finalPrice = product.price * (1 - product.discount / 100);
                  return (
                    <tr key={`product-${index}`}>
                      <td>
                        {product.images && product.images.length > 0 ? (
                          <img src={product.images[0]} alt={product.name} width="50" height="50" />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td>{product.name}</td>
                      <td>{product.brand || "N/A"}</td>
                      <td>{product.description || "No description"}</td>
                      <td>${product.price}</td>
                      <td>{product.discount}%</td>
                      <td>${finalPrice.toFixed(2)}</td>
                      <td>{product.stock}</td>
                      <td>{product.category?.name || "N/A"}</td>
                      <td>{product.gender}</td>
                      <td>
                        <Button variant="warning" size="sm" onClick={() => handleEdit(product)}>Edit</Button>{' '}
                        <Button variant="danger" size="sm" onClick={() => handleDelete(product._id)}>Delete</Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="11" className="text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductList;
