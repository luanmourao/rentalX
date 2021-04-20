![landingPage](diagrama2.png)
</br>
</br>

# RentalX
API para uma plataforma de aluguel de carros 
</br></br>

**Modelo de negócio** </br>
Login, cadastro de veículos, categorias, especificações, upload de arquivo (documentos e imagens), usuários, registros de aluguéis etc.

**Status** </br>
Em desenvolvimento 
</br>
</br>

**Tecnologias**</br>
- TypeScript
- NodeJS (express)
- Postgres
- TypeORM
- Docker
- Jest e Supertest (testes automatizados)</br>

**------------------------------------------------ Especificações -----------------------------------------------**</br>
# Cadastro de Veículos
**RF**</br>
- Deve ser possível cadastrar um novo veículo
</br>

**RN**</br>
- Não deve ser possível cadastrar um veículo com uma placa já existente;
- O veículo deve ser cadastrado, por padrão, com disponibilidade para aluguel; 
- O usuário responsável pelo cadastro deve ser um usuário-administrador*
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
</br>

**RN**</br>
- Não deve ser possível cadastrar uma especificação para um veículo não cadastrado;
- Não deve ser possível cadastrar uma especificação que já existe para o mesmo veículo;
- O usuário responsável pelo cadastro deve ser um usuário-administrador
</br>

# Cadastro de Imagens de Veículos 
**RF**</br>
- Deve ser possível cadastrar a imagem do veículo
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
- O usuário deve estar autenticado para registrar um aluguel;
- Ao realizar o cadastro de aluguel, a propriedade 'available' do veículo deve ser alterada para 'false'
</br>

# Devolução de Veículos 
**RF**</br>
- Deve ser possível realizar a devolução de um veículo alugado
</br>

**RN**</br>
- Para efetivar a devolução, o usuário precisa estar autenticado
- Se o veículo for devolvido em menos de 24 horas, deverá ser cobrada a diária completa;
- Ao efetivar a devolução, o veículo deverá ser liberado para outro aluguel;
- Ao efetivar a devolução, o usuário deverá ser liberado para outro aluguel;
- Ao efetivar a devolução, deverá ser calculado o total do aluguel;
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrada multa proporcional;
- Caso haja multa, esta deverá ser somada ao total do aluguel
</br>

# Listagem de aluguéis para usuário 
**RF**</br>
- Deve ser possível realizar a busca de todos os aluguéis realizados pelo usuário
</br>

**RN**</br>
- Para efetivar a busca, o usuário precisa estar autenticado