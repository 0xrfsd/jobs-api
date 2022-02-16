const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const authRoutes = require("./routes/Auth");
const vagaRoutes = require("./routes/Vaga");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = "ricardo";
const password = "Azd202020";
const database = "dbOne";
const server = `mongodb+srv://${user}:${password}@cluster0.94tuo.mongodb.net/${database}?retryWrites=true&w=majority`;
const config = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(server, config).then(() => {
  console.log("Database connection successfully!");
});

const port = 5556;
const version = 0;

app.use(`/api/V${version}/auth`, authRoutes);
app.use(`/api/V${version}/core`, vagaRoutes);

// [ POST ] vernagro.com.br/api/v0/auth/login
// [ POST ] vernagro.com.com/api/v0/auth/produtor
// [ POST ] vernagro.com.com/api/v0/auth/consultor
// [ POST ] vernagro.com.com/api/v0/auth/diretor
// [ POST ] vernagro.com.com/api/v0/auth/comercial

// [ POST ] vernagro.com.com/api/v0/core/empresa
// [ GET ] vernagro.com.com/api/v0/core/empresa
// [ DELETE ] vernagro.com.com/api/v0/core/empresa
// [ GET ] vernagro.com.com/api/v0/core/empresas

// [ POST ] vernagro.com.com/api/v0/core/filial
// [ GET ] vernagro.com.com/api/v0/core/filial
// [ DELETE ] vernagro.com.com/api/v0/core/filial
// [ GET ] vernagro.com.com/api/v0/core/filiais

// [ POST ] vernagro.com.com/api/v0/core/pde
// [ GET ] vernagro.com.com/api/v0/core/pde
// [ DELETE ] vernagro.com.com/api/v0/core/pde
// [ GET ] vernagro.com.com/api/v0/core/pdes

app.listen(port, () => {
  console.log("Servidor rodando na porta", port);
});
