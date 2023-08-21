import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
async function paginar(req, res, next){
  try {
    let { limite=5, pagina=1, ordenacao="_id:-1" } = req.query;
    let [campoOrdenacao, ordem] = ordenacao.split("");

    limite = parseInt(limite); // verificamos se o valor recebido é um inteiro msm;
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;

    if(limite > 0 && pagina > 0){
      const resultadoPaginado = await resultado.find()
        .sort({ [campoOrdenacao]: ordem }) // com o -1 lista os livros em ordem decrescente, os mais novos primeiro;
        .skip((pagina -1) * limite) // quantos livros vamos pular da pg
        .limit(limite) // limite dos resultados
        .exec();
      res.status(200).json(resultadoPaginado);

    }else{
      next(new RequisicaoIncorreta());
    }
    
  } catch (erro) {
    next(erro);

    
  }

    
}
export default paginar;