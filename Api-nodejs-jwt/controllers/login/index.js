const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const dotenv = require('dotenv');

dotenv.config();

const LoginController = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Verifica se o usuário existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Verifica se a senha é válida
      const senhaValida = await bcrypt.compare(password, user.password);
      if (!senhaValida) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      // Gera o token JWT
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });


      // Retorna os dados do usuário e o token
      return res.status(200).json({
        usuario: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role
        },
        token
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({
        error: 'Erro ao realizar o login',
        detalhes: error.message
      });
    }
  }
};

module.exports = LoginController;
