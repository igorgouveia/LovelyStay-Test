
<h1 align="center">
     <a href="#"> LovelyStay.com - BackEnd Test </a>
</h1>

<h3 align="center">
    Repositorie of backend test to lovelystay.com
</h3>

## About

The objective of this project is to search for users from a nickname on github, save the information in the database and show them later.
---

## Features

- [x] Fetch User by Nickname:
   - [x] Get Account Information
   - [x] Get Repositories
   - [x] Get Programming languages

- [x] Get Saveds Users:
   - [x] Get all Users Saveds
   - [x] Get Users from Location

---

### Pre-requisites

Before you begin, you will need to have the following tools installed on your machine:
[Git] (https://git-scm.com), [Node.js] (https://nodejs.org/en/), [PostgresSql] (https://www.postgresql.org/docs/current/tutorial-start.html).
In addition, it is good to have an editor to work with the code like [VSCode] (https://code.visualstudio.com/)

#### Running Application

```bash

# Clone this repository
$ git clone https://github.com/igorgouveia/LovelyStay-Test

# install the dependencies
$ yarn install

# Fill .env data

# Run the application in development mode
$ yarn start

```
### Testing application

```bash

# Fetch User by Nickname

$ ts-node src/index fetch :nickname

# Get Users From DB 

$ ts-node src/index get

# Get Users from Location

$ ts-node src/index get :location

```
