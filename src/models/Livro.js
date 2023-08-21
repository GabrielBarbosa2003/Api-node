import mongoose from "mongoose";
// o schema sao a coluna da tabela, e ent por aqui dá pra fazer validaçoes tbm;
const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: {
      type: String,
      required: [true, "O titulo do livro é obrigatório"]
    },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "O autor é obrigatório"] }, // aqui está vinvulando o autor com o livro. Vamos receber um id em formato de objeto.
    editora: {
      type: String,
      required: [true, "A editoria é obrigatória"],
      enum: {
        values: ["marvel", "DC","alice livros"],
        message: "A editora {VALUE} nao é permitida"

      }// esse enum possibilida somente a entrada dos valores que estao em values dentro do bd;
    },
  
    numeroPaginas: {
      type: Number,
      min: [10, "O numero de páginas deve estar entre 10 e 1000"],
      max: [1000, "O numero de páginas deve estar entre 10 e 1000"] // o segundo parametro do array é a mensagem de erro que ira aparecer;
    }
  
  });



const livros = mongoose.model("livros", livroSchema);

export default livros;