## create-react-app-light

### If you are a begginer 
You probably used create-react-app for your projects and had no idea which dependency doing what or got lost in scripts folder. How many time you've a encounter an error and had no idea where it came from and why ?

### If you are a master 
How many time you tried to kick off a project and waisted a lot of time setting up lint ? babel ? jest config ? 
or got stock with configuration errors? 

### If you are a pro
You probably own your nice boilerplate with your own tricks and style. But still, why won't you take a look and raise enhancements, PRS or issues ?


Instead of using the original create-react-app, this is a boilerplate to build a frontend app as tiny and basic as possible using react-redux.

#### Whats included?

- webpack-dev-server
- webpack 4
- eslint configuration + prettier 
- redux
- redux-saga
- sass
- jest
- babel
- hot reload


## Quick Use

Run in locally - webpack-dev-server

```
yarn start
```

Run tests / test in dev mode (--watch)

```
yarn test
```

Fix eslint issues

```
yarn lint-fix
```

#### swapi api sagas middleware
Since the structure of SWAPI api returns a pattern of key value pairs that containts
either a primitive string as a value or a list of https requests, apiSaga is a generic way
to hanfle this async pattern.

// maps in the store

- An http response is being received in a container saga e.g characterSagas, an is being send to 
a middleware with a container prefix in order to be proccesed and filtered to a primitive response and 
an asyn response.

- A primitive response is dispatched with the recieved prefix.
- An async response is dispatched with the recieved prefix.
- Container saga is catching the action and sending required fields for this async response, 
the contianer configurations: store selectors, properties to extract and store related actions for updating. 

- Api saga is proccesing store maps values and excecuting non existing http requests, in the end, 
fires a fulfilled fetching action which is being consumed in container's view.

