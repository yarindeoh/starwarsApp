## Starwars

### Scope
First drop of the application includes 2 main pages that represent starwars characters.
Home page takes you to the list of all characters dividing by pages, and a search box that filters the list when typing.
When clicking on a character, you'll redirecting to character page and get all the details of this character (e.g name,
height,hair color, skin color, films he/she participat, starships, etc..)

### Technical Stack (latest versions)
- react (latest + hooks)
- redux (latest + hooks)
- redux-saga middleware
- react router
- webpack-dev-server
- webpack
- eslint configuration + prettier 
- sass
- jest
- babel
- reselect

## Quick Use

Run locally in dev mode - webpack-dev-server

```
npm run start
```
Run in prod mode - a script that runs webpack production mode and a basic node webserver
that serves static file (index.html)

```
npm run start-server
```

Run tests / test in dev mode (--watch)

```
npm run test
```
### Project Structure And Standarts
components - reusable components, in the future needs to be in separate repo.
containers - Characters page, Character page
services - general middlewares, constants and hooks, generic SWAPI api middleware (see explanation above)
resources - images, scss.

Each container has a view file, reducer, selectors, constants, api file and custom hooks.
Checkout me blog post for explanation of container's structure : 
https://blog.usejournal.com/react-redux-the-one-with-the-hooks-502f5111a17

### Technical Flow
#### Characters List Page
Pagination - SWAPI api already implemented pagination flow, when requesting a characters list we're receving a json with the results array with a chatacter count, and next + prev http urls. Prev and next requests are being saved in the store and when clicking on their buttons a new getPeople http request is being fired. 
Search - When typing an input in the search box, saga middleware is catching those events and debouncing it's callback every 500ms in order to decrease unccesary http requests with search query. 

#### Character Details Page
Character data in the store is dividing to primitive data and async data in order to smooth the UX, when clicking on a character it's primitive data will be displaying and http calls will run in the background.

#### swapi api sagas middleware
Since the structure of SWAPI api returns a pattern of key value pairs that containts
either a primitive string as a value or a list of https requests, apiSaga is a generic way
to handle this async pattern.

##### Redux store structure
Nested http calls are a common value in SWAPI api response. Instead of requesting static content that is not changing for each character get request(e.g films, species, vehicles etc), a list of maps is being saved in the store and on every asyn call there is a check for this value in the map. Only if it dosent exist, there's an http request.

##### Flow
- An http response is being received in a container saga e.g characterSagas, an is being send to 
a middleware with a container prefix in order to be proccesed and filtered to a primitive response and 
an asyn response.

- A primitive response is dispatched with the recieved prefix.
- An async response is dispatched with the recieved prefix.
- Container saga is catching the action and sending required fields for this async response, 
the contianer configurations: store selectors, properties to extract and store related actions for updating. 

- Api saga is proccesing store maps values and excecuting non existing http requests, in the end, 
fires a fulfilled fetching action which is being consumed in container's view.

This way, you can create new SWAPI feature easily. 
