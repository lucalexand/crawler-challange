# crawler-challange

Para rodar o projeto:
- clone o projeto
- rode com yarn dev

Para testar as rotas:
Vá no postman e importe a coleção (https://www.getpostman.com/collections/50fecee2efee0421690e), então:
- Rode a rota Criação de Usuario, preenchendo o body com outras informações válidas
- Rode a rota Sessão, colocando no body o email e a senha do usuario criado
- Na resposta dessa rota terá um token importante para o próximo passo
- Rode a rota Feed Reader colocando o Bearer Token no Authorization
assim terá o JSON estruturado como pedido.
