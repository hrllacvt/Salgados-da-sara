const express = require('express');
const cors = require('cors'); // Adicione esta linha
const db = require('./db');
const app = express();

// Configuração do CORS
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 