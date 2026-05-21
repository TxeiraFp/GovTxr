const { json } = require('body-parser');
const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserController ={

    async createUser(req, res) {
        const { email, username, phone, password, role } = req.body;

        try {
            // Verifica se o usuário já existe
            const existe = await User.findOne({ email });
            if (existe) {
            return res.status(400).json({ error: 'Usuário já existe' });
            }

            // Criptografa a senha
            const senhaCriptografada = await bcrypt.hash(password, 10);

            // Cria o usuário com a senha criptografada e role (se fornecida)
            const novoUsuario = await User.create({
            email,
            username,
            phone,
            password: senhaCriptografada,
            role: role || 'cliente' // valor padrão se não for enviado
            });

            // Retorna os dados do usuário (sem a senha)
            res.status(201).json({
            id: novoUsuario._id,
            email: novoUsuario.email,
            username: novoUsuario.username,
            role: novoUsuario.role
            });

            console.log('✅ Usuário cadastrado com sucesso');
        } catch (error) {
            res.status(500).json({
            error: 'Erro ao cadastrar usuário',
            detalhes: error.message
            });
        }
    },


    async userList(req, res){
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({error: "Erro ao listar usuarios"})
        }
    }, 


    async getUserById(req, res) {
        try {
            const { user_id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ error: "ID inválido" });
            }

            const user = await User.findById(user_id);

            if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar o usuário", detalhes: error.message });
        }
    }

}

module.exports = UserController;