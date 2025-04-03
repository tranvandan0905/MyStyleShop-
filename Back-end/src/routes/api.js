const express = require("express");
const multer = require('multer');
const routerAPI = express.Router();
const { postUser, getUser, deleteUser, restoreUser, searchUser, putUser } = require('../controllers/useController')
const { postProduct, getProduct, deleteProduct, searchProduct, putProduct,filterProducts } = require('../controllers/productController')
const { postCategory, getCategory, deleteCategory, putCategory } = require('../controllers/categoryController')
const { postCart, getCart, deleteCart } = require('../controllers/cartController')
const { loginPages, logout,SignupPages} = require('../controllers/AuthController')
const {authenticateToken} = require("../middleware/authenticateToken");
const {postOrder, getOrders}=require("../controllers/orderController")
const {Getcontact,Postcontact,deletecontact}=require("../controllers/contactController")
// User
routerAPI.post('/user', postUser)
routerAPI.get('/user', getUser)
routerAPI.delete('/user', deleteUser)
routerAPI.put('/user/restore', restoreUser)
routerAPI.get('/user/search', searchUser)
routerAPI.put('/user', putUser)
// Products
const storage = multer.memoryStorage(); // Lưu ảnh vào bộ nhớ RAM
const upload = multer({ storage });
routerAPI.post("/product", upload.fields([{ name: "images", maxCount: 10 }]), postProduct);
routerAPI.get('/product', getProduct)
routerAPI.delete('/product/:id', deleteProduct)
routerAPI.get('/product/search', searchProduct)
routerAPI.put("/product/:id", upload.array("images", 10), putProduct);
routerAPI.get('/product/filter', filterProducts)
//category
routerAPI.get("/category", getCategory);
routerAPI.post("/category", postCategory);
routerAPI.delete("/category/:id", deleteCategory);
routerAPI.put("/category/:id", putCategory);
//cart 
routerAPI.post('/cart', postCart)
routerAPI.get('/cart', getCart)
routerAPI.delete('/cart/:id', deleteCart)
//auth
routerAPI.post('/login', loginPages)
routerAPI.post('/logout', logout)
routerAPI.post('/signup', SignupPages)
//order
routerAPI.post('/order',authenticateToken,postOrder)
routerAPI.get('/order',getOrders)
//contact
routerAPI.get('/contacts', Getcontact);
routerAPI.post('/contacts', Postcontact);
routerAPI.delete('/contacts/:id',deletecontact);
module.exports = routerAPI;
