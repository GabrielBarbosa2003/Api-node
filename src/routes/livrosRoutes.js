import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();
// SEMPRE que estiver formando as rotas, por conta do express, a ordem das rotas sempre precisa ser da rota mais especifica para a menos especifica;

router
  .get("/livros", LivroController.listarLivros, paginar)
  .get("/livros/busca", LivroController.buscarLivroPorFiltro,paginar)
  .get("/livros/:id", LivroController.listarLivroPorId)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro) // os dois pontos significa que vai chegar o parametro 
  .delete("/livros/:id", LivroController.excluirLivro);

export default router;