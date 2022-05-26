# simple-app
simple implementation backend


## Installation
> Clone the repository

```sh
git clone https://github.com/defecode/simple-auth-app.git
```
> go inside the folder and install the dependencies.
```sh
cd simple-app
npm install
```

## Configuration
> All configuration are located in .env file. Please change the attribute with bracket. Auth0 account, mysql database and backend host are required.

setup the database & table (please make sure database configuration already correct):
```sh
npm run dbreset
```

## Running the application
> Run the application, make sure the backend service already up.
```sh
npm start
```
or
> Run locally with nodemon

```sh
npm run local
```

> API endpoint default

```sh
http://localhost:3002
```

> Swagger doc

```sh
http://localhost:3002/swagger
```