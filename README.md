# README #

This README documents the list of frameworks, their implementation and usage.

### Content of the solution ###

* This solution consists of two separate project. 
* For backend, I choose [Nestjs](https://nestjs.com/) framework with typescript because it is based on classic Nodejs and express.js. 
* For frontend, I used [Reactjs](https://reactjs.org/) framework with typescript and hooks.
* I did some research about serving reactjs web app inside nestjs backend. I found single [decent solution](https://medium.com/geekculture/nestjs-react-next-js-in-one-mvc-repo-for-rapid-prototyping-faed42a194ca) but because of the version differences and the workarounds that was provided in the solution was not compatible. That is why I go with two separate solution.

### Nestjs Backend ###

* [Backend Application](https://blockchain-backend-app.herokuapp.com/) is deployed to heroku.
* [Swagger document](https://blockchain-backend-app.herokuapp.com/) included in the project.
* [Nestjs's Default Caching](https://docs.nestjs.com/techniques/caching) implemented to api calls.
* [Axios](https://axios-http.com/) is used for HttpClient.

### Reactjs Frontend ###

* [Frontend Application](https://blockchain-frontend-client.herokuapp.com/) is deployed to heroku.
* [React Router](https://reactrouter.com/) is used for routing.
* [React Bootstrap](https://react-bootstrap.github.io/) is used for simple design.
* [React Spinner](https://mhnpd.github.io/react-loader-spinner/) is used for loader.
* [Axios](https://axios-http.com/) is used for HttpClient.

### How to Use? ###

* To Start Backend Application `npm run start:prod`
* To Test Backend Application `npm run test`
* To Test End To End Backend Application `npm run test:e2e`
* To Start Frontend Application `npm run start`

### Who do I talk to? ###

* Deniz Gokce
* denizgokce93@gmail.com

