import { createYoga } from "graphql-yoga";
import { schema } from "./graphql/schema.js";
import { useGraphQLMiddleware } from "@envelop/graphql-middleware";
import { permissions } from "./permissions.js";
import { db } from "./config.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { v4 as uuidv4 } from 'uuid';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import dotenv from "dotenv";
dotenv.config();

import { initDatabase } from "./data/init.js";
await initDatabase();

const signingKey = process.env.JWT_SECRET;
import jwt from "jsonwebtoken";

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/",
  plugins: [useGraphQLMiddleware([permissions])],
  context: async ({ request }) => {
    const authorization = request.headers.get("authorization") ?? "";

    if (authorization.startsWith("Bearer")) {
      const token = authorization.substring(7, authorization.length);
      jwt.verify(token, signingKey, function (error, decoded) {
        let user = null;
        if (!error) {
          user = decoded;
        }

        return {
          db: db,
          user: user,
        };
      });
    }
    return {
      db: db,
    };
  },
});

const app = express();
app.get("/img/:filename", (req, res) => {
  const filename = req.params.filename;
  const pathDir = path.join(__dirname, "/img/" + filename);

  // TODO: kiểm tra file tồn tại hay không
  res.sendFile(pathDir);
});

app.use(yoga.graphqlEndpoint, yoga);
//const server = createServer(yoga);

const PORT = 4000; // process.env.PORT
app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});

