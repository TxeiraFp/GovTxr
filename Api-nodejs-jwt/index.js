const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/index');

dotenv.config();

const app =  express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.static("public"));
app.use(routes);

 const connectDB =  async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado ao MongoDB com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:',  error);
    }
};

connectDB();


const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`servidor rodando na porta http://localhost:${PORT}`);
});