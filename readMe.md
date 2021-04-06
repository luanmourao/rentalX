![landingPage](diagrama.png)
</br>
</br>

# RentalX
API para uma plataforma de aluguel de carros 
</br></br>

**Modelo de negócio** </br>
Login, cadastro de veículos, categorias, especificações, upload de arquivo (documentos e imagens), usuários, registros de aluguéis etc.

**Especificações**</br>
# Cadastro de Veículos
**RF**</br>
- Deve ser possível cadastrar um novo veículo;
- Deve ser possível listar todas as categorias
</br>

**RN**</br>
- Não deve ser possível cadastrar um veículo com uma placa já existente;
- Não deve ser possível alterar a placa de um veículo já cadastrado;
- O veículo deve ser cadastrado, por padrão, com disponibilidade; 
- O usuário responsável pelo cadastro deve ser um usuário-administrador
</br>

# Listagem de Veículos
**RF**</br>
- Deve ser possível listar todos os veículos disponíveis;
- Deve ser possível listar todos os veículos disponíveis pelo nome da categoria;
- Deve ser possível listar todos os veículos disponíveis pelo nome da marca;
- Deve ser possível listar todos os veículos disponíveis pelo nome do veículo;
</br>

**RN**
- Para listar os veículos disponíveis, o usuário não precisa estar logado no sistema
</br>

# Cadastro de Especificação de Veículos
**RF**</br>
- Deve ser posssível cadastrar uma especificação para um veículo;
- Deve ser possível listar todas as especificações; 
- Deve ser possível listar todos os carros
</br>

**RN**</br>
- Não deve ser possível cadastrar uma especificação para um veículo não cadastrado;
- Não deve ser possível cadastrar uma especificação que já existe para o mesmo veículo;
- O usuário responsável pelo cadastro deve ser um usuário-administrador
</br>

# Cadastro de Imagens de Veículos 
**RF**</br>
- Deve ser possível cadastrar a imagem do veículo;
- Deve ser possível listar todos os veículos
</br>

**RNF**</br>
- Utilizar a biblioteca Multer para realizar o upload dos arquivos
</br>

**RN**</br>
- O usuário deve poder cadastrar mais de uma imagem para o mesmo veículo;
- O usuário responsável pelo cadastro deve ser um usuário-administrador
</br>

# Aluguel de Veículos
**RF**</br>
- Deve ser possível cadastrar um aluguel
</br>

**RN**</br>
- O aluguel deve ter duração mínima de 24 horas;
- Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel em aberto para o mesmo usuário;
- Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel em aberto para o mesmo veículo;

**Status** </br>
Em desenvolvimento 
</br>
</br>

**Tecnologias**</br>
- TypeScript
- Node (express)
- Postgres
- TypeORM
- Docker
- Jest e Supertest (testes automatizados)
