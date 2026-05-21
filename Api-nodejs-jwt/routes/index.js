const {Router} = require('express');
const User = require('../models/User');
const UserController = require('../controllers/UserController');
const LoginController = require('../controllers/login');
const { autenticarToken, somenteAdmin } = require('../middlewares/auth');
const Product = require('../models/Product');
const ProductController = require('../controllers/productController');
const CartController = require('../controllers/cartController');
const LogController = require('../controllers/logController');
const path = require('path');


const routes = Router();

routes.get('/', (req, res) => {
    res.send('Hello World api on-line na relikia do tx!');
})

//ROTAS CADASTRAR E LISTAR USUARIOS
routes.post('/users', UserController.createUser);
routes.get('/users', UserController.userList);
//buscar pelo id
routes.get('/users/:user_id', UserController.getUserById);

//rota de login
routes.post('/session', LoginController.login);

//criar  produto por usuario
routes.post('/product/:user_id', autenticarToken, somenteAdmin, ProductController.createProduct);
routes.patch('/product/:user_id/:product_id', autenticarToken, somenteAdmin, ProductController.updateProduct);
routes.get('/product/:user_id', autenticarToken, ProductController.getProductsByUser);
//deletar
routes.delete('/product/:user_id/:product_id', autenticarToken, somenteAdmin, ProductController.deleteProduct);

routes.get('/products', ProductController.getProducts);
routes.get('/products/:product_id', ProductController.getProductById);

routes.post('/cart/:user_id', CartController.createCart);
routes.get('/cart/:user_id', CartController.getCartByUser);
routes.get('/cart/:user_id/:cart_id', autenticarToken, CartController.getCartById);


routes.post('/log', LogController.createLog);
routes.get('/logs', LogController.getLogs);
/*
*/

// Rota protegida para usuários autenticados
routes.get('/perfil', autenticarToken, (req, res) => {
  res.json({ mensagem: 'Perfil acessado com sucesso', usuario: req.user });
});

// Rota protegida apenas para admin
routes.get('/admin', autenticarToken, somenteAdmin, (req, res) => {
  res.json({ mensagem: 'Área administrativa acessada com sucesso' });
});


console.log(__dirname)

routes.get('/gov', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});



module.exports = routes;