import { autores, livros } from "../models/index.js";
import naoEncontrado from "../erros/naoEncontrado.js";

class LivroController {
  static listarLivros = async (req, res, next) => {

    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;

      next();
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next) => {

    try {
      const id = req.params.id;
      const listaLivroPorId = await livros.findById(id)
      
        .populate("autor", "nome") // lista o autor relacionado ao livro por id, porem só o nome do autor e nao o objeto todo de autor
        .exec();

      if (listaLivroPorId !== null) {
        res.status(200).send(listaLivroPorId);
      } else {
        next(new naoEncontrado("Id do livro não localizado."));
      }
    } catch (error) {
      next(error);

    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      const cadastraLivro = await livro.save();

      res.status(201).send(cadastraLivro.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static atualizarLivro = async (req, res, next) => {

    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, { $set: req.body }); // set é uma palavra reservada do mongodb, q ent seta o req.body
      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new naoEncontrado("Id do livro não localizado."));
      }

    } catch (error) {
      next(error);
    }

  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);
      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro excluido com sucesso" });
      } else {
        next(new naoEncontrado("Id do livro não localizado."));
      }

    } catch (error) {
      next(error);
    }
  };

  static buscarLivroPorFiltro = async (req, res, next) => {
    try {

      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosPorFiltro = livros  // forma de acessar pela url: http://localhost:3000/livros/busca?editora=[marvel] -> o parametro de busca 
          .find(busca)
          .populate("autor"); 

        req.resultado = livrosPorFiltro;
        next();

      }else{
        res.status(200).send([]);
      }

    } catch (error) {
      next(error);
    }
  };

}

async function processaBusca(params) {

  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;
  let busca = {};

  const regex = new RegExp(titulo, "i"); // possibilita fazer buscas atraves de apenas um nome que contenha no titulo, e nao precisa escrever td o nome do livro certinho

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = regex; // ou {$regex:titulo, $options: "i" //case sensitive}

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  //$gte = Greater Than or Equal = Maior ou igual que
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  //$lte = Less Than or Equal = Menor ou igual que
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor }); // nome é o campo que tem em autor, e nomeAutor o campo que recebemos pela url;

    if (autor !== null) {
      busca.autor = autor._id;
      console.log(busca);

    } else {
      busca = null;
    }

  }

  return busca;


}

export default LivroController;