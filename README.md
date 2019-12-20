# solar-tech-app


Para iniciar a aplicação será preciso ter o docker-compose, e editar as váriaveis de ambiente no arquivo `docker-compose.yml`:

`SMTP_TRANSPORT_URL`: com a url smtp para receber emails de notificação

`EMAIL_TARGET`: com o email que deverá receber as notificações

Depois rode o comando `docker-compose up --build`

O app vai estar disponivel na porta `8080`.

