import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "172.18.0.2"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database: 
        process.env.NODE_ENV === "test" ? "rentx_test" : defaultOptions.database
    })
  );
}

// antes de subir a aplicação para produção
// export default async (host = "172.18.0.2"): Promise<Connection> => {
//   const defaultOptions = await getConnectionOptions();

//   return createConnection(
//     Object.assign(defaultOptions, {
//       host: process.env.NODE_ENV === "test" ? "localhost" : host,
//       database: 
//         process.env.NODE_ENV === "test" ? "rentx_test" : defaultOptions.database
//     })
//   );
// }

