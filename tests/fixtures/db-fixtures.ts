import { getConnection } from "../../src/db";
import sql from "mssql";

export async function resetDatabase() {
  const db = await getConnection();

  // Limpar tabelas (ordem importa)
  await db.request().query("DELETE FROM OrderItems");
  await db.request().query("DBCC CHECKIDENT ('OrderItems', RESEED, 0)");

  await db.request().query("DELETE FROM Orders");
  await db.request().query("DBCC CHECKIDENT ('Orders', RESEED, 0)");

  await db.request().query("DELETE FROM Users");
  await db.request().query("DBCC CHECKIDENT ('Users', RESEED, 0)");

  // Inserir Users (Id = 1 e 2)
  await db.request().query(`
    INSERT INTO Users (Name, Email) VALUES
    ('João Silva', 'joao@example.com'),
    ('Maria Santos', 'maria@example.com');
  `);

  // Inserir Orders (UserId = 1 e 2)
  await db.request().query(`
    INSERT INTO Orders (UserId, Total) VALUES
    (1, 59.90),
    (2, 120.50);
  `);

  // Inserir OrderItems
  await db.request().query(`
    INSERT INTO OrderItems (OrderId, ProductName, Quantity, Price) VALUES
    (1, 'Teclado Mecânico', 1, 59.90),
    (2, 'Monitor 27"', 1, 120.50);
  `);
}

// Exportar a função de fechar conexão para ser usada nos testes
export async function closeConnection() {
  const db = await getConnection();
  await db.close(); // fecha o pool corretamente
}
