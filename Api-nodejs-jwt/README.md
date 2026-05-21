# Api Node.js with JWT

Projeto criado com foco em ecommerce.

## 🚀 Tecnologias
- Node.js
- Express
- MongoDB
- JWT (autenticação)
- Insomnia (para testes de API)

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
npm install
```
# ⚙️ Configuração

Crie um arquivo .env na raiz do projeto com suas variáveis de ambiente:

```bash
PORT=8000
MONGO_URI=sua_string_de_conexao_mongodb
JWT_SECRET=sua_chave_secreta
```

## ▶️ Executando

Inicie o servidor em modo desenvolvimento:

```bash
npx nodemon index.js
```

## 📡 Testes

Use o Insomnia ou Postman para enviar requisições aos endpoints da API.

  - Cadastrar user:
  ```bash
   post http://localhost:8000/users
  ```
  - Buscar User:
  ```bash
    get http://localhost:8000/users
    get http://localhost:8000/users/:user_id
  ```
  - Fazer Login:
  ```bash
    post http://localhost:8000/session
  ```
  
  - Rotas Admin
    ```bash
      post http://localhost:8000/product/:user_id
      patch http://localhost:8000/product/:user_id/:product_id
      delete http://localhost:8000/product/:user_id/:product_id
    ```
  - Buscar Produtos
    ```bash
     get http://localhost:8000/products
     get http://localhost:8000/product/:user_id
     get http://localhost:8000/products/:product_id
    ```
  - Carrinho
    ```bash
     post http://localhost:8000/cart/:user_id
     get http://localhost:8000/cart/:user_id
     get http://localhost:8000/cart/:user_id/:cart_id
    ```
      
  
develop TxeiraDev














