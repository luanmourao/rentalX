// extendendo a tipagem do Request do express 
declare namespace Express {

  export interface Request {
    user: {
      id: string;
    }
  }
}