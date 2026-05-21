const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function autenticarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  console.log("🔐 Cabeçalho Authorization recebido:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("⚠️ Token não fornecido ou mal formatado.");
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    console.warn("⚠️ Token ausente após split.");
    return res.status(401).json({ message: "Token ausente ou mal formatado" });
  }

  try {
    console.log("🔍 Verificando token...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Token verificado com sucesso:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Erro ao verificar token:");
    console.error("   • Tipo:", error.name);
    console.error("   • Mensagem:", error.message);
    return res.status(403).json({ message: "Token inválido ou expirado" });
  }
}

function somenteAdmin(req, res, next) {
  console.log("🔒 Verificando permissão de administrador...");
  if (!req.user) {
    console.warn("⚠️ Nenhum usuário encontrado na requisição.");
    return res.status(403).json({ message: "Usuário não autenticado" });
  }

  console.log("👤 Usuário autenticado:", req.user);

  if (req.user.role !== "admin") {
    console.warn("⛔ Acesso negado. Usuário não é admin.");
    return res.status(403).json({ message: "Acesso restrito ao administrador" });
  }

  console.log("✅ Acesso autorizado para administrador.");
  next();
}

module.exports = {
  autenticarToken,
  somenteAdmin
};
