import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

// interface para forçar o método verify a retornar um objeto do tipo IPayload e então possamos desestruturar a propriedade sub
interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  // pegar o token que está vindo pelo header na propriedade "authorization"
  const authHeader = req.headers.authorization;

  // verificar se "authorization" veio vazio
  if (!authHeader) {
    throw new AppError("Missing token", 401);
  }

  // a string do "authorization" vem no formato "Bearer token"
  // então vamos quebra essa string em elementos de array, separando no espaço
  // ignorando a primeira posição e colocando a segunda posição na variável "token"
  const [, token] = authHeader.split(" ");

  try {
    // método verify para confrontar o token com a frase secreta que criamos no momento da geração do token
    // este método, quando a verificação tem sucesso, retorna um objeto com a data de criação, data de expiração e o id do usuário. 
    // em caso de sucesso, queremos pegar a propriedade "sub", onde consta o id do usuário cujo token foi validado
    // este usuário deve portanto ser autenticado para as rotas que exigem tal autenticação
    // se a verificação falhar, uma exceção é lançada
    const { sub: user_id } = verify(token, "2a0f30d1f57a06d3c490a51cbe23c2be") as IPayload;
    
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}