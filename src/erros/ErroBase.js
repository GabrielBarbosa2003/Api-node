class ErroBase extends Error{ // Error é uma classe já nativa do js;
  constructor(mensagem = "Erro interno no servidos", status = 500){
    super();
    this.message = mensagem;
    this.status = status;

  }
  enviarResposta(res){
    res.status(this.status).send({
      mensagem: this.message,
      status: this.status
    });

  }

}
export default ErroBase;