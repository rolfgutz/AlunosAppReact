# CRUD de Cadastro de Alunos - Frontend
Este projeto é um aplicativo React que implementa um sistema CRUD (Criar, Ler, Atualizar, Excluir) para gerenciar alunos. O front-end é preparado para integrar-se com uma API de backend que gerencia as informações dos alunos.

## Funcionalidades
- **Sistema de Login**: O aplicativo possui um sistema de login onde os usuários podem autenticar-se usando seu e-mail e senha.
- **CRUD de Alunos**: Após o login, os usuários podem:
  - **Cadastrar novos alunos**
  - **Visualizar a lista de alunos**
  - **Editar informações de alunos existentes**
  - **Excluir alunos**

## Pré-requisitos
Antes de executar o projeto, verifique se você tem as seguintes ferramentas instaladas:
- [Node.js](https://nodejs.org/) (v14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente já vem com o Node.js)

## Instalação
1. Clone o repositório:
    ```bash
    git clone https://github.com/rolfgutz/clientreact.git
    cd NOME_DO_REPOSITORIO
    ```
2. Instale as dependências do projeto:
    ```bash
    npm install
    ```

## Configuração
Para que o sistema de login funcione, você precisa ter uma API backend que gerencie os usuários e os dados dos alunos. O endpoint para o login é:
``` 
POST api/Account/LoginUser
``` 
O retorno do login deve incluir um token de autorização, que será armazenado no localStorage para uso em futuras requisições. As requisições à API de alunos precisam de autorização, como exemplificado no código abaixo:
```javascript
await api.delete(`api/alunos/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
```

## Execução
Para iniciar o aplicativo, execute:
```bash
npm start
```
O aplicativo será aberto em `http://localhost:3000`.


## Estrutura do Projeto
``` 
/src
  /assets # Imagens e outros recursos
  /components # Componentes React do aplicativo
  /services # Configuração da API para chamadas HTTP
  /styles # Estilos CSS do aplicativo
```

## Contribuição
Se você quiser contribuir para este projeto, fique à vontade para fazer um fork do repositório e enviar um pull request.

## Licença
Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
