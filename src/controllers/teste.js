import livros from "../models/Livro.js";
import naoEncontrado from "../erros/naoEncontrado.js";

class LivroController{
  static listarLivros = async (req, res, next) => {
   
    try {

      const listaLivros = await livros.find()
        .populate("autor") // lista o autor que está relacionado ao livro
        .exec();
      res.status(200).json(listaLivros);
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    const id = req.params.id;
    try {
      const listaLivroPorId = await livros.findById(id) 
        .populate("autor","nome") // lista o autor relacionado ao livro por id, porem só o nome do autor e nao o objeto todo de autor
        .exec();

      if(listaLivroPorId !== null){
        res.status(200).send(listaLivroPorId);
      }else{
        next(new naoEncontrado("Id do livro não localizado."));
      }
    } catch (error) {
      next(error);
      
    }
  };
    
  static cadastrarLivro = async (req, res, next) => {
    let livro = new livros(req.body);
    const cadastraLivro = await livro.save();
    try {
      res.status(201).send(cadastraLivro.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    const id = req.params.id;

    await livros.findByIdAndUpdate(id, {$set: req.body}); // set é uma palavra reservada do mongodb, q ent seta o req.body
    try {
      res.status(200).send({message:"Livro atualizado com sucesso"});
    } catch (error) {
      next(error);
    }
  
  };

  static excluirLivro = async (req, res, next) => {
    const id = req.params.id;

    await livros.findByIdAndDelete(id);
    try {
      res.status(200).send({message:"Livro excluido com sucesso"});
    } catch (error) {
      next(error);
    }
  };

  static buscarLivroPorEditora = async (req, res, next) => {
    const editora = req.query.editora; 
    const livrosPorEditora = await livros.find({"editora": editora}, {}); // forma de acessar pela url: http://localhost:3000/livros/busca?editora=[marvel] -> o parametro de busca
    try {
      res.status(200).send(livrosPorEditora);
    } catch (error) {
      next(error);
    }
  };

}

export default LivroController;