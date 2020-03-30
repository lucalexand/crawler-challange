# crawler-challange
# Necessário ter:
- Node e Yarn
- Docker
- Postman

# Para rodar o projeto:
- Clone o projeto
- Rode docker build -t lucasale/crawlerchallange .
- Rode docker run -p 3000:3000 -d lucasale/crawlerchallange

Então basta ir no Postman e importar a coleção (https://www.getpostman.com/collections/50fecee2efee0421690e), 
para ver as rotas:
- Rode a rota Criação de Usuario, preenchendo o body com outras informações válidas
- Rode a rota Sessão, colocando no body o email e a senha do usuario criado
- Na resposta dessa rota terá um token importante para o próximo passo
- Rode a rota Feed Reader colocando o Bearer Token no Authorization

Assim terá o JSON estruturado como pedido.

# Para rodar os testes:
- Vá no arquivo .env
- Comente a linha 1
- Descomente as linhas 3 e 4
- No terminal rode yarn test

Assim terá o resultado dos testes feitos.
