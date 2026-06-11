# Testes Automatizados SQL Server com Node.js, Jest e TypeScript

Este projeto demonstra como executar testes automatizados contra uma base de dados SQL Server utilizando:

- **Node.js**
- **Jest**
- **TypeScript**
- **mssql**
- **Docker** (para SQL Server local)

O objetivo é fornecer uma base sólida para testes de integração de BD em pipelines CI/CD.

---

## 🚀 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/gugamartinho/jest_sqlserver.git
cd sqlserver-tests
```

### 2. Instalar dependências

```bash
npm install
```

---

## 🐳 Subir SQL Server com Docker

Este projeto usa SQL Server em Docker para garantir um ambiente limpo e consistente.

```bash
docker run -e "ACCEPT_EULA=Y" \
-e "SA_PASSWORD=Password123!" \
-p 1433:1433 \
--name sqlserver \
-d mcr.microsoft.com/mssql/server:2022-latest
```

### Verificar se está a correr:

```bash
docker ps
```

---

## 📊 Criar Base de Dados e Tabelas

Ligue-se ao SQL Server com DBeaver ou Azure Data Studio:

- **Server:** localhost
- **User:** sa
- **Password:** Password123!

### Execute o script:

```sql
CREATE DATABASE MinhaDB;

USE MinhaDB;

CREATE TABLE Users (
  Id INT IDENTITY PRIMARY KEY,
  Name NVARCHAR(100) NOT NULL,
  Email NVARCHAR(200) NOT NULL UNIQUE,
  CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Orders (
  Id INT IDENTITY PRIMARY KEY,
  UserId INT NOT NULL,
  Total DECIMAL(10,2) NOT NULL,
  CreatedAt DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE TABLE OrderItems (
  Id INT IDENTITY PRIMARY KEY,
  OrderId INT NOT NULL,
  ProductName NVARCHAR(200) NOT NULL,
  Quantity INT NOT NULL,
  Price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (OrderId) REFERENCES Orders(Id)
);
```

---

## 🔐 Configurar variáveis de ambiente

Crie um ficheiro `.env` na raiz do projeto:

```env
DB_USER=sa
DB_PASSWORD=Password123!
DB_SERVER=localhost
DB_DATABASE=MinhaDB
```

---

## 🧪 Executar Testes

### Correr todos os testes:

```bash
npm test
```

### Correr um teste específico:

```bash
npm test -- users.test.ts
```

---

## 📁 Estrutura do Projeto

```
sqlserver-tests/
├── src/
│   └── db.ts                 # Configuração da conexão com SQL Server
├── tests/
│   └── users.test.ts         # Testes de exemplo
├── .env                      # Variáveis de ambiente
├── jest.config.js            # Configuração do Jest
├── tsconfig.json             # Configuração do TypeScript
├── package.json              # Dependências do projeto
└── README.md                 # Este ficheiro
```
