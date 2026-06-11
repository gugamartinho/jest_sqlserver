import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER!,
  database: process.env.DB_DATABASE!,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  return await sql.connect(config);
}

export async function closeConnection() {
  const db = await getConnection();
  await db.close(); // fecha o pool corretamente
}