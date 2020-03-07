# Starwars Application

# myStarWarAp

React Redux application that uses SWAPI api and getting StarWars characters their homeworlds. 

https://swapi.co/ 

Get chracters using the api pagination, destructure homeworld from a diffrent api call.

Every time the user is clicking on the next page, there is a get request for the next 10 characters, 
each character obj holds a homeplanet property that is url of a get request.
Using saga, each call for the chunk of characters, there is initiation of a map that get the planet name from the api and 
saves it.

Used the following stack:
- latest React
- Redux
- Saga
- Webpack
- React Router 
