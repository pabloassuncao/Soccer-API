# Soccer API!

Neste projeto foi feita uma API que baseado num banco de Clubes e Partidas jogadas alimenta um front-end com todas as partidas, seus status e a tabela de classificação geral ou baseada apenas nas partidas dentro ou fora de casa.

Ele se encontra dividido em containers no Docker e apresenta testes de integração para o back-end desenvolvidos com Mocha, Chai e Sinon.

Neste projeto foi utilizado o [Express](https://expressjs.com/) como framework para o back-end e o [Sequelize](https://sequelize.org) como ORM para o banco de dados. Ademais, foi utilizado Joi para validação de dados e TSLint para o linting de código.

# Como rodar a aplicação?

Basta na pasta geral do projeto dar um `npm install` e em seguida um `npm run compose:up` que os containers estarão rodando nas seguintes portas.

- Front-end: 3000
- Back-end: 3001
- Database: 3002

Para acesssr o site com o front-end basta acessar o caminho http://localhost:3000/leaderboard pela sua máquina.

# Endpoints

## POST - /login
Realiza a autenticação do usuário pelo email e senha e retorna o usuário da seguinte maneira:

Body :
```json
{
	"email": "teste@teste.com",
	"password": "algumaSenhaAqui"
}
```

Resposta :
```json
  {
    "user": {
      "id": 1,
      "username": "Admin",
      "role": "admin",
      "email": "admin@admin.com"
    },
    "token": "//algum token aqui//"
  }
 ```

## GET - /login/validate
Exige um token e retorna o cargo ('role') do usuário dono do token.

## GET - /clubs
Retorna um array com os clubs e seus ID's, exemplo:
```json
[
	{
		"id": 1,
		"clubName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"clubName": "Bahia"
	},
	{
		"id": 3,
		"clubName": "Botafogo"
	},
	...
]
```

## GET - /clubs/:id
Retorna o clube correspondente ao ID determinado junto com suas partidas jogadas, exemplo:

```json
{
  "id": 12,
  "clubName": "Palmeiras",
  "awayTeam": [
    {
      "id": 9,
      "homeTeam": 1,
      "homeTeamGoals": 0,
      "awayTeam": 12,
      "awayTeamGoals": 3,
      "inProgress": false
    },
    {
      "id": 30,
      "homeTeam": 3,
      "homeTeamGoals": 0,
      "awayTeam": 12,
      "awayTeamGoals": 4,
      "inProgress": false
    },
    {
      "id": 46,
      "homeTeam": 4,
      "homeTeamGoals": 1,
      "awayTeam": 12,
      "awayTeamGoals": 1,
      "inProgress": true
    }
  ],
  "homeTeam": [
    {
      "id": 7,
      "homeTeam": 12,
      "homeTeamGoals": 2,
      "awayTeam": 6,
      "awayTeamGoals": 2,
      "inProgress": false
    },
    {
      "id": 18,
      "homeTeam": 12,
      "homeTeamGoals": 4,
      "awayTeam": 5,
      "awayTeamGoals": 2,
      "inProgress": false
    },
    {
      "id": 40,
      "homeTeam": 12,
      "homeTeamGoals": 4,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false
    }
  ]
}
```

##  GET - /matchs

Ele retorna todas as partidas cadastradas no banco de dados , exemplo:
```json
[
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeClub": {
      "clubName": "São Paulo"
    },
    "awayClub": {
      "clubName": "Grêmio"
    }
  },
  ...
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeClub": {
      "clubName": "São Paulo"
    },
    "awayClub": {
      "clubName": "Internacional"
    }
  }
]
```

##  GET - /matchs?inProgress=true

Ele retorna todas as partidas cadastradas no banco de dados que estão em andamento , exemplo:
  ```json
  [
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeClub": {
        "clubName": "São Paulo"
      },
      "awayClub": {
        "clubName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeam": 6,
      "homeTeamGoals": 1,
      "awayTeam": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeClub": {
        "clubName": "Ferroviária"
      },
      "awayClub": {
        "clubName": "Avaí/Kindermann"
      }
    }
  ]
  ```
## POST - /matchs
Adiciona uma partida ao banco de dados com o status `inProgress = true`;

Body :
 ```json
  {
    "homeTeam": 16, // O valor deve ser o id do time
    "awayTeam": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  }
```

Resposta :
  ```json
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  }
  ```

## PATCH - /matchs/:id/finish
Finaliza a partida pelo id, ou seja, marca o `inProgress` como `false`

## PATCH - /matchs/:id
Edita a partida no banco de dados, exemplo:

Body :
  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```

Resposta :
```json
{
  "id": 45,
  "homeTeam": 5,
  "homeTeamGoals": 3,
  "awayTeam": 3,
  "awayTeamGoals": 1,
  "inProgress": true,
  "awayClub": {
    "id": 3,
    "clubName": "Botafogo"
  },
  "homeClub": {
    "id": 5,
    "clubName": "Cruzeiro"
  }
}
```

## GET - /leaderboard/home
Retorna a classificação baseada nas partidas como Mandante dos times (Partidas em casa), exemplo:
  ```json
  [
	{
		"name": "Santos",
		"totalPoints": 9,
		"totalGames": 3,
		"totalVictories": 3,
		"totalDraws": 0,
		"totalLosses": 0,
		"goalsFavor": 9,
		"goalsOwn": 3,
		"goalsBalance": 6,
		"efficiency": 100
	},
	{
		"name": "Palmeiras",
		"totalPoints": 7,
		"totalGames": 3,
		"totalVictories": 2,
		"totalDraws": 1,
		"totalLosses": 0,
		"goalsFavor": 10,
		"goalsOwn": 5,
		"goalsBalance": 5,
		"efficiency": 77.78
	},
	{
		"name": "Corinthians",
		"totalPoints": 6,
		"totalGames": 2,
		"totalVictories": 2,
		"totalDraws": 0,
		"totalLosses": 0,
		"goalsFavor": 6,
		"goalsOwn": 1,
		"goalsBalance": 5,
		"efficiency": 100
	},
  ...
  ]
  ```

## GET - /leaderboard/away
Retorna a classificação baseada nas partidas como Visitante dos times (Partidas fora de casa), exemplo:
 ```json
  [
    {
		"name": "Palmeiras",
		"totalPoints": 6,
		"totalGames": 2,
		"totalVictories": 2,
		"totalDraws": 0,
		"totalLosses": 0,
		"goalsFavor": 7,
		"goalsOwn": 0,
		"goalsBalance": 7,
		"efficiency": 100
	},
	{
		"name": "Corinthians",
		"totalPoints": 6,
		"totalGames": 3,
		"totalVictories": 2,
		"totalDraws": 0,
		"totalLosses": 1,
		"goalsFavor": 6,
		"goalsOwn": 2,
		"goalsBalance": 4,
		"efficiency": 66.67
	},
	{
		"name": "Internacional",
		"totalPoints": 6,
		"totalGames": 2,
		"totalVictories": 2,
		"totalDraws": 0,
		"totalLosses": 0,
		"goalsFavor": 3,
		"goalsOwn": 0,
		"goalsBalance": 3,
		"efficiency": 100
	},
  ...
  ]
  ```

## GET - /leaderboard
Retorna a classificação geral, exemplo:
  ```json
  [
    {
      "name": "Palmeiras",
      "totalPoints": 13,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 17,
      "goalsOwn": 5,
      "goalsBalance": 12,
      "efficiency": 86.67
    },
    {
      "name": "Corinthians",
      "totalPoints": 12,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 12,
      "goalsOwn": 3,
      "goalsBalance": 9,
      "efficiency": 80
    },
    {
      "name": "Santos",
      "totalPoints": 11,
      "totalGames": 5,
      "totalVictories": 3,
      "totalDraws": 2,
      "totalLosses": 0,
      "goalsFavor": 12,
      "goalsOwn": 6,
      "goalsBalance": 6,
      "efficiency": 73.33
    },
    ...
  ]
  ```