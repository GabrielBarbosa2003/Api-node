
import naoEncontrado from "../erros/naoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = autores.find();
      req.resultado=autoresResultado;
      next();
    } catch (error) {
      next(error);
    }

  };

  static listarAutorPorId = async (req, res, next) => { 
    try {
      const id = req.params.id;
      const autorPorId = await autores.findById(id);
      if(autorPorId !== null){
        res.status(200).send(autorPorId);
      }else{
        next(new naoEncontrado("Id do autor nao localizado"));
      }
    } catch (error) {
      next(error);
      
    }
  };


  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      const cadastraAutor = await autor.save();
      res.status(201).send(cadastraAutor.toJSON());
    } catch (error) {
      next(error);
    }
  
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndUpdate(id, { $set: req.body }); // set é uma palavra reservada do mongodb, q ent seta o req.body
      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (error) {
      next(error);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndDelete(id); 
      res.status(200).send({ message: "Autor excluido com sucesso" });
    } catch (error) {
      next(error);
    }
  };
}


export default AutorController;