import mongoose from "mongoose";
// arquivo para fazer validaçoes globais;

mongoose.Schema.Types.String.set("validate", {
  validator:(valor) => valor !== "",
  message: ({path}) => `O campo ${path} foi fornecido em branco`
}); // validar algo para todos os campos que estao como string nos Schemas;