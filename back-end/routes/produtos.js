const express = require('express');
const router = express.Router();
const db = require('../db');

// GET todos os produtos
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// GET produto por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM produtos WHERE id = $1', [id]);
    res.json(rows[0] || {});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// POST criar produto
router.post('/', async (req, res) => {
  try {
    const { nome, descricao, preco, imagem } = req.body;
    const { rows } = await db.query(
      'INSERT INTO produtos (nome, descricao, preco, imagem) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, descricao, preco, imagem]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// PUT atualizar produto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, imagem } = req.body;
    const { rows } = await db.query(
      'UPDATE produtos SET nome = $1, descricao = $2, preco = $3, imagem = $4 WHERE id = $5 RETURNING *',
      [nome, descricao, preco, imagem, id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// DELETE produto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM produtos WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;