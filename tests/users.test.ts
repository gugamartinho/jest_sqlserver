import { resetDatabase, closeConnection } from "./fixtures/db-fixtures";
import { getConnection } from "../src/db";

beforeEach(async () => {
  await resetDatabase();
});

afterAll(async () => {
  await closeConnection();
});

test("Users deve ter 2 utilizadores iniciais", async () => {
  const db = await getConnection();
  const result = await db.request().query("SELECT * FROM Users");

  expect(result.recordset.length).toBe(2);
});

test("Orders deve estar ligada a Users", async () => {
  const db = await getConnection();
  const result = await db.request().query(`
    SELECT o.Id, u.Name
    FROM Orders o
    JOIN Users u ON u.Id = o.UserId
  `);

  expect(result.recordset.length).toBe(2);
});
