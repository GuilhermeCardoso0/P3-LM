# 🚀 API de Usuários Full Stack

API REST completa para gerenciamento de usuários com autenticação JWT, sistema de permissões e interface responsiva.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)

---

## 📋 Índice

- [Instalação e Execução](#-instalação-e-execução)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura e Design Patterns](#-arquitetura-e-design-patterns)
- [Endpoints da API](#-endpoints-da-api)
- [Autenticação e Permissões](#-autenticação-e-permissões)
- [Testes](#-testes)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)

---

## 🚀 Instalação e Execução

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** (gerenciador de pacotes)

### Passo 1: Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd api_usuario
```

### Passo 2: Instalar Dependências

```bash
npm install
```

Este comando instalará todas as dependências necessárias listadas no `package.json`, incluindo:
- Express.js para o servidor
- TypeScript para tipagem estática
- Jest para testes
- bcrypt para hash de senhas
- jsonwebtoken para autenticação JWT
- E outras bibliotecas essenciais

### Passo 3: Executar em Modo Desenvolvimento

```bash
npm run dev
```

O servidor será iniciado em: **http://localhost:3000**

A aplicação possui hot-reload, então qualquer alteração no código será refletida automaticamente.

### Passo 4: Acessar a Interface

Abra seu navegador e acesse:

```
http://localhost:3000
```

Você verá a interface de gerenciamento de usuários com design moderno e responsivo.

### Passo 5: Executar os Testes

```bash
npm test
```

Este comando executa todos os testes automatizados utilizando Jest.

### Passo 6: Build para Produção (Opcional)

```bash
npm run build
npm start
```

O comando `build` compila o TypeScript para JavaScript na pasta `dist/`, e `start` executa a versão compilada.

---

## ✨ Funcionalidades

### 1️⃣ Implementação de API REST

A API foi desenvolvida seguindo os princípios REST (Representational State Transfer):

- **Arquitetura Cliente-Servidor**: Separação clara entre frontend e backend
- **Stateless**: Cada requisição contém todas as informações necessárias
- **Interface Uniforme**: URIs padronizadas e uso correto dos métodos HTTP
- **Sistema em Camadas**: Middleware para logging, autenticação, validação e tratamento de erros

**Estrutura do Projeto:**

```
src/
├── app.ts                  # Configuração do Express
├── index.ts                # Entry point da aplicação
├── controllers/            # Controladores (lógica de requisição/resposta)
│   ├── AuthController.ts
│   └── UserController.ts
├── services/               # Camada de serviços (lógica de negócio)
│   └── UserService.ts
├── repositories/           # Camada de dados (acesso ao banco)
│   └── UserRepository.ts
├── models/                 # Modelos de dados
│   └── User.ts
├── middlewares/            # Middlewares personalizados
│   ├── authMiddleware.ts
│   ├── authorize.ts
│   ├── errorHandler.ts
│   ├── requestLogger.ts
│   └── validate.ts
├── routes/                 # Definição de rotas
│   ├── auth.routes.ts
│   └── user.routes.ts
├── db/                     # Gerenciamento de banco de dados
│   └── Database.ts
└── events/                 # Sistema de eventos
    └── eventBus.ts
```

### 2️⃣ Endpoints Básicos

A API disponibiliza endpoints completos para gerenciamento de usuários:

#### **Autenticação**

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/auth/register` | Registrar novo usuário | ❌ |
| POST | `/auth/login` | Fazer login e obter token JWT | ❌ |

#### **Usuários**

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/users` | Listar todos os usuários | ❌ |
| GET | `/users/:id` | Buscar usuário por ID | ❌ |
| POST | `/users` | Criar novo usuário | ❌ |
| PUT | `/users/:id` | Atualizar usuário | ❌ |
| DELETE | `/users/:id` | Deletar usuário | ✅ Admin apenas |

**Exemplos de Requisições:**

```bash
# Registrar usuário
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123",
    "role": "user"
  }'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'

# Listar usuários
curl http://localhost:3000/users

# Deletar usuário (requer token de admin)
curl -X DELETE http://localhost:3000/users/123 \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

### 3️⃣ Responsividade da Interface

A interface foi desenvolvida com design **mobile-first** e totalmente responsiva:

**Características:**

- ✅ **Fonte Moderna**: Google Font "Inter" para melhor legibilidade
- ✅ **Gradientes Vibrantes**: Esquema de cores moderno com gradientes suaves
- ✅ **Border Radius**: Bordas arredondadas em todos os elementos (12px-50px)
- ✅ **Centralização Perfeita**: Flexbox para alinhamento preciso
- ✅ **Animações Suaves**: Transições de 0.3s em hover e interações
- ✅ **Notificações Visuais**: Sistema de toast personalizado substituindo alerts
- ✅ **Sistema de Grid Responsivo**: Formulários adaptáveis a diferentes telas
- ✅ **Media Queries**: Breakpoint em 768px para dispositivos móveis
- ✅ **Touch-Friendly**: Botões e inputs dimensionados para toque

**Breakpoints:**

```css
/* Desktop: 768px+ */
- Container: 1000px max-width
- Padding: 40px
- Formulários: grid multi-coluna

/* Mobile: < 768px */
- Container: full width
- Padding: 24px
- Formulários: single column
- AuthBox: full width
```

### 4️⃣ Autenticação de Usuário

Sistema completo de autenticação baseado em **JWT (JSON Web Tokens)**:

**Fluxo de Autenticação:**

1. **Registro**: Usuário cria conta com email e senha
2. **Hash de Senha**: Senha é hasheada com bcrypt (10 rounds)
3. **Login**: Sistema valida credenciais
4. **Geração de Token**: JWT é gerado com informações do usuário
5. **Armazenamento**: Token é salvo no localStorage do navegador
6. **Requisições Protegidas**: Token é enviado no header `Authorization`
7. **Logout**: Token é removido do localStorage

**Estrutura do Token JWT:**

```json
{
  "sub": "user-id",
  "role": "admin",
  "email": "user@example.com",
  "iat": 1638360000,
  "exp": 1638388800
}
```

**Validade do Token:** 8 horas

**Segurança:**

- ✅ Senhas hasheadas com bcrypt (salt rounds: 10)
- ✅ Senhas nunca são retornadas nas respostas da API
- ✅ Tokens com expiração configurável
- ✅ Validação de token em todas as rotas protegidas
- ✅ Verificação de permissões baseada em roles

### 5️⃣ Banco de Dados

O sistema utiliza um **banco de dados JSON file-based** para persistência:

**Características:**

- 📁 **Arquivo**: `data/db.json`
- 🔄 **Operações**: Leitura e escrita síncrona
- 🎯 **Pattern**: Singleton para garantir única instância
- 💾 **Estrutura**: JSON formatado com indentação (2 espaços)

**Estrutura do Banco:**

```json
{
  "users": [
    {
      "id": "uuid-v4",
      "name": "João Silva",
      "email": "joao@example.com",
      "password": "$2b$10$hash...",
      "role": "user",
      "createdAt": "2025-12-04T10:30:00.000Z",
      "updatedAt": "2025-12-04T15:45:00.000Z"
    }
  ]
}
```

**Vantagens:**

- ✅ Fácil de configurar (não requer servidor de banco)
- ✅ Portátil (arquivo único)
- ✅ Ideal para desenvolvimento e protótipos
- ✅ Dados legíveis e editáveis

**Migração para Banco Real:**

Para produção, o sistema pode ser facilmente migrado para bancos reais (PostgreSQL, MongoDB, MySQL) alterando apenas a implementação do `UserRepository`, mantendo a interface inalterada graças ao **Repository Pattern**.

### 6️⃣ CRUD de Usuários

Implementação completa das operações CRUD (Create, Read, Update, Delete):

**Create (Criar):**
- Endpoint: `POST /auth/register` ou `POST /users`
- Validações: Nome mínimo 3 caracteres, email válido, senha mínima 6 caracteres
- Hash automático de senha com bcrypt
- Verificação de email duplicado
- Evento emitido: `user.created`

**Read (Ler):**
- Endpoint: `GET /users` - Lista todos os usuários
- Endpoint: `GET /users/:id` - Busca usuário específico
- Senhas são removidas da resposta (segurança)
- Suporta filtros e paginação (extensível)

**Update (Atualizar):**
- Endpoint: `PUT /users/:id`
- Atualização parcial de campos
- Validação de dados com Joi
- Timestamp `updatedAt` atualizado automaticamente

**Delete (Deletar):**
- Endpoint: `DELETE /users/:id`
- **PROTEGIDO**: Requer autenticação e role `admin`
- Retorna 204 No Content em sucesso
- Retorna 403 Forbidden se não for admin

**Validações com Joi:**

```typescript
// Schema de criação
{
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'manager', 'user').required()
}

// Schema de atualização
{
  name: Joi.string().min(3),
  email: Joi.string().email(),
  role: Joi.string().valid('admin', 'manager', 'user')
}
```

### 7️⃣ Permissões de Acesso

Sistema de controle de acesso baseado em **roles (RBAC - Role-Based Access Control)**:

**Roles Disponíveis:**

1. **user** - Usuário comum
   - Pode visualizar usuários
   - Pode editar seu próprio perfil

2. **manager** - Gerente
   - Todas as permissões de `user`
   - Pode gerenciar usuários comuns

3. **admin** - Administrador
   - Todas as permissões de `manager`
   - Pode deletar qualquer usuário
   - Acesso total ao sistema

**Implementação de Permissões:**

```typescript
// Middleware de autorização
router.delete('/:id', 
  authMiddleware,                    // 1. Verifica se está autenticado
  authorize(['admin']),              // 2. Verifica se tem role admin
  UserController.delete              // 3. Executa a ação
);
```

**Fluxo de Autorização:**

1. ✅ **authMiddleware**: Valida token JWT
2. ✅ **authorize(['roles'])**: Verifica se o usuário tem uma das roles permitidas
3. ✅ Se autorizado, executa o controller
4. ❌ Se não autorizado, retorna 403 Forbidden

**Mensagens Personalizadas:**

- 🚫 `"Acesso negado! Apenas administradores podem deletar usuários."`
- ⚠️ `"Sua sessão expirou. Faça login novamente."`
- ❌ `"Você precisa estar logado para deletar usuários!"`

### 8️⃣ TDD (Test-Driven Development)

Testes automatizados implementados com **Jest** e **Supertest**:

**Configuração:**

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setup.ts']
};
```

**Suites de Teste:**

1. **auth.test.ts** - Testes de autenticação
   - ✅ Registro de usuário
   - ✅ Login com credenciais válidas
   - ✅ Geração de token JWT

2. **authDelete.test.ts** - Testes de permissões
   - ✅ Impedir usuário comum de deletar
   - ✅ Retornar 403 para não-admin
   - ✅ Validar token de autenticação

**Executar Testes:**

```bash
# Rodar todos os testes
npm test

# Rodar em modo watch
npm test -- --watch

# Rodar com coverage
npm test -- --coverage
```

**Cobertura de Testes:**

- ✅ Autenticação (registro e login)
- ✅ Autorização (permissões de roles)
- ✅ Validação de dados
- ✅ Middlewares
- ✅ Controllers

**Princípios TDD:**

1. 🔴 **Red**: Escrever teste que falha
2. 🟢 **Green**: Implementar código mínimo para passar
3. 🔵 **Refactor**: Melhorar o código mantendo testes passando

### 9️⃣ Design Patterns

O projeto implementa diversos **design patterns** para garantir código limpo, manutenível e escalável:

#### **1. Singleton Pattern**

**Localização:** `src/db/Database.ts`

**Propósito:** Garantir que apenas uma instância do banco de dados existe na aplicação.

```typescript
export class Database {
  private static instance: Database;
  
  private constructor() { /* ... */ }
  
  public static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
```

**Benefícios:**
- Evita múltiplas conexões/instâncias
- Economia de recursos
- Ponto único de acesso aos dados

#### **2. Factory Pattern**

**Localização:** `src/repositories/UserRepository.ts`

**Propósito:** Encapsular a criação de objetos complexos.

```typescript
export const UserRepositoryFactory = {
  create() {
    return new UserRepository();
  }
};
```

**Benefícios:**
- Desacoplamento da criação
- Facilita testes (mock factories)
- Flexibilidade para diferentes implementações

#### **3. Repository Pattern**

**Localização:** `src/repositories/UserRepository.ts`

**Propósito:** Abstrair a camada de acesso aos dados.

```typescript
export class UserRepository {
  async list(): Promise<User[]> { /* ... */ }
  async findById(id: string): Promise<User | null> { /* ... */ }
  async create(payload: Omit<User, 'id'>): Promise<User> { /* ... */ }
  async update(id: string, payload: Partial<User>): Promise<User | null> { /* ... */ }
  async delete(id: string): Promise<boolean> { /* ... */ }
}
```

**Benefícios:**
- Separação de responsabilidades
- Facilita mudança de banco de dados
- Testes unitários mais simples

#### **4. Service Layer Pattern**

**Localização:** `src/services/UserService.ts`

**Propósito:** Centralizar a lógica de negócio.

```typescript
export class UserService {
  private repo = UserRepositoryFactory.create();
  
  async create(data: CreateUserDTO) {
    // Validações de negócio
    const exists = await this.repo.findByEmail(data.email);
    if (exists) throw new Error('E-mail já cadastrado');
    
    // Hash de senha
    const hashed = await bcrypt.hash(data.password, 10);
    
    // Criação e evento
    const user = await this.repo.create({ ...data, password: hashed });
    eventBus.emit('user.created', user);
    
    return user;
  }
}
```

**Benefícios:**
- Lógica de negócio isolada
- Reutilização entre controllers
- Mais fácil de testar

#### **5. Middleware Pattern**

**Localização:** `src/middlewares/*`

**Propósito:** Interceptar e processar requisições antes dos controllers.

```typescript
// authMiddleware.ts
export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });
  
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
}
```

**Middlewares Implementados:**
- `authMiddleware` - Validação de token JWT
- `authorize` - Verificação de permissões
- `errorHandler` - Tratamento global de erros
- `requestLogger` - Log de requisições
- `validate` - Validação de schemas com Joi

**Benefícios:**
- Código reutilizável
- Separação de preocupações
- Pipeline de processamento flexível

#### **6. Observer Pattern**

**Localização:** `src/events/eventBus.ts`

**Propósito:** Permitir comunicação entre componentes sem acoplamento direto.

```typescript
import { EventEmitter } from 'events';

export const eventBus = new EventEmitter();

// Listener
eventBus.on('user.created', (user) => {
  console.log('[Event] user.created ->', user.email);
  // Poderia enviar email, notificações, etc.
});

// Emitter (no service)
eventBus.emit('user.created', user);
```

**Benefícios:**
- Desacoplamento entre módulos
- Extensibilidade (novos listeners)
- Processamento assíncrono de eventos

#### **7. MVC Pattern (Adaptado)**

**Estrutura:**

- **Model** (`src/models/User.ts`): Define a estrutura de dados
- **Controller** (`src/controllers/*`): Lida com requisições HTTP
- **View** (`client/index.html`): Interface do usuário

```typescript
// Controller
export class UserController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await service.list();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
}
```

**Benefícios:**
- Organização clara do código
- Separação de responsabilidades
- Facilita manutenção e escalabilidade

---

## 📡 Endpoints da API

### Autenticação

#### POST /auth/register

Registra um novo usuário no sistema.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123",
  "role": "user"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid-v4",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "user",
  "createdAt": "2025-12-04T10:30:00.000Z"
}
```

#### POST /auth/login

Autentica usuário e retorna token JWT.

**Request Body:**
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-v4",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "user"
  }
}
```

### Usuários

#### GET /users

Lista todos os usuários (senhas omitidas).

**Response (200 OK):**
```json
[
  {
    "id": "uuid-v4",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "user",
    "createdAt": "2025-12-04T10:30:00.000Z"
  }
]
```

#### GET /users/:id

Busca usuário específico por ID.

**Response (200 OK):**
```json
{
  "id": "uuid-v4",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "user",
  "createdAt": "2025-12-04T10:30:00.000Z"
}
```

#### PUT /users/:id

Atualiza dados de um usuário.

**Request Body:**
```json
{
  "name": "João Silva Santos",
  "role": "manager"
}
```

**Response (200 OK):**
```json
{
  "id": "uuid-v4",
  "name": "João Silva Santos",
  "email": "joao@example.com",
  "role": "manager",
  "updatedAt": "2025-12-04T15:45:00.000Z"
}
```

#### DELETE /users/:id 🔒

Deleta um usuário (apenas administradores).

**Headers:**
```
Authorization: Bearer <token-jwt>
```

**Response (204 No Content):**
```
(sem corpo)
```

**Response (403 Forbidden):**
```json
{
  "message": "Permissão negada"
}
```

---

## 🔐 Autenticação e Permissões

### Como Usar Token JWT

1. **Fazer Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"senha123"}'
```

2. **Copiar o Token da Resposta**

3. **Usar em Requisições Protegidas:**
```bash
curl -X DELETE http://localhost:3000/users/123 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Matriz de Permissões

| Ação | user | manager | admin |
|------|------|---------|-------|
| Visualizar usuários | ✅ | ✅ | ✅ |
| Criar usuário | ✅ | ✅ | ✅ |
| Editar usuário | ✅* | ✅ | ✅ |
| Deletar usuário | ❌ | ❌ | ✅ |

\* Apenas próprio perfil

---

## 🧪 Testes

### Executar Testes

```bash
# Todos os testes
npm test

# Com cobertura
npm test -- --coverage

# Modo watch (desenvolvimento)
npm test -- --watch

# Teste específico
npm test -- auth.test.ts
```

### Estrutura de Testes

```
tests/
├── setup.ts              # Configuração inicial dos testes
├── auth/
│   └── auth.test.ts     # Testes de autenticação
└── user/
    └── authDelete.test.ts # Testes de autorização
```

### Exemplo de Teste

```typescript
describe('Auth', () => {
  it('should register and login', async () => {
    // Registrar usuário
    const reg = await request(app)
      .post('/auth/register')
      .send({ 
        name: 'Admin', 
        email: 'admin@example.com', 
        password: 'secret123', 
        role: 'admin' 
      });
    expect(reg.status).toBe(201);
    
    // Fazer login
    const login = await request(app)
      .post('/auth/login')
      .send({ 
        email: 'admin@example.com', 
        password: 'secret123' 
      });
    expect(login.status).toBe(200);
    expect(login.body).toHaveProperty('token');
  });
});
```

---

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Superset JavaScript com tipagem
- **bcrypt** - Hash de senhas
- **jsonwebtoken** - Autenticação JWT
- **Joi** - Validação de schemas
- **uuid** - Geração de IDs únicos
- **cors** - Controle de acesso CORS

### Frontend

- **HTML5** - Estrutura
- **CSS3** - Estilização (Flexbox, Grid, Animations)
- **JavaScript Vanilla** - Lógica do cliente
- **Google Fonts (Inter)** - Tipografia

### Testes

- **Jest** - Framework de testes
- **ts-jest** - Preset TypeScript para Jest
- **Supertest** - Testes de HTTP/API

### DevOps

- **ts-node-dev** - Hot reload em desenvolvimento
- **ESLint** (opcional) - Linting de código
- **Prettier** (opcional) - Formatação de código

---

## 📂 Estrutura de Arquivos

```
api_usuario_full_updated/
├── client/
│   └── index.html              # Interface web
├── data/
│   └── db.json                 # Banco de dados JSON
├── src/
│   ├── app.ts                  # Configuração Express
│   ├── index.ts                # Entry point
│   ├── controllers/
│   │   ├── AuthController.ts   # Controle de autenticação
│   │   └── UserController.ts   # Controle de usuários
│   ├── db/
│   │   └── Database.ts         # Singleton de banco
│   ├── events/
│   │   └── eventBus.ts         # Sistema de eventos
│   ├── middlewares/
│   │   ├── authMiddleware.ts   # Validação JWT
│   │   ├── authorize.ts        # Controle de permissões
│   │   ├── errorHandler.ts     # Tratamento de erros
│   │   ├── requestLogger.ts    # Log de requisições
│   │   └── validate.ts         # Validação Joi
│   ├── models/
│   │   └── User.ts             # Modelo de usuário
│   ├── repositories/
│   │   └── UserRepository.ts   # Acesso aos dados
│   ├── routes/
│   │   ├── auth.routes.ts      # Rotas de autenticação
│   │   └── user.routes.ts      # Rotas de usuários
│   └── services/
│       └── UserService.ts      # Lógica de negócio
├── tests/
│   ├── setup.ts                # Setup dos testes
│   ├── auth/
│   │   └── auth.test.ts        # Testes de auth
│   └── user/
│       └── authDelete.test.ts  # Testes de permissões
├── jest.config.js              # Configuração Jest
├── package.json                # Dependências
├── tsconfig.json               # Configuração TypeScript
└── README.md                   # Documentação
```

---

## 🎨 Interface

### Características Visuais

- **Design Moderno**: Gradientes roxos/azuis
- **Notificações Toast**: Sistema personalizado de mensagens
- **Botões Animados**: Hover effects e transições
- **Formulários Elegantes**: Inputs com focus states
- **Cards de Usuários**: Layout em grid responsivo
- **Botão de Logout**: Funcionalidade completa

### Mensagens Personalizadas

- 🎉 `"Bem-vindo, [nome]! Conta criada com sucesso."`
- 👋 `"Olá, [nome]! Login realizado com sucesso."`
- 📧 `"Este e-mail já está cadastrado. Tente fazer login!"`
- 🔒 `"E-mail ou senha incorretos. Verifique suas credenciais!"`
- 🚫 `"Acesso negado! Apenas administradores podem deletar usuários."`
- ✅ `"Usuário deletado com sucesso!"`
- 👋 `"Logout realizado com sucesso. Até breve!"`

---

## 🚀 Próximos Passos

### Melhorias Sugeridas

- [ ] Implementar refresh tokens
- [ ] Adicionar paginação na listagem
- [ ] Integrar com banco de dados real (PostgreSQL/MongoDB)
- [ ] Implementar rate limiting
- [ ] Adicionar upload de avatar
- [ ] Criar dashboard administrativo
- [ ] Implementar recuperação de senha
- [ ] Adicionar logs estruturados (Winston/Pino)
- [ ] Implementar CI/CD pipeline
- [ ] Adicionar documentação Swagger/OpenAPI

---

## 📝 Licença

Este projeto é disponibilizado para fins educacionais.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ utilizando as melhores práticas de desenvolvimento de software.

---

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Versão:** 1.1.0  
**Última Atualização:** Dezembro 2025
