# server-cli_public
para o projeto é muito simples iniciar após o clone basta navegar até o client e server e executar npm install em ambos .
Apos baixar as dependencias precisaremos conectar com o banco no seu terminal rode o comando : 
-> npm install --save-dev sequelize-cli 
-> npx sequelize-cli init 
Logo apos navegue até a pasta config db.config e coloque os dados de conexao do seu banco. 
Ao terminar de preencher os campos necessarios execute 
-> "npx sequelize-cli db:migrate" 
Ao fim desse processo seu sistema ja á capaz de rodar o projeto server-cli
