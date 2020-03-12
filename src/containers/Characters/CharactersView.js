import React from "react";
import { I18n } from "react-redux-i18n";

import {
  useCharacterData,
  useGetPeople,
  useSearch
} from "containers/Characters/charactersHooks";
import Pagination from "components/Pagination";

const Characters = props => {
  // Call getAllCharacters initialization 
  const { data } = useCharacterData("https://swapi.co/api/people");
  const { getPrev, getNext } = useGetPeople();
  const { getSearch } = useSearch();
  return (
    <div className="app">
      {/* TODO: make it a component */}
      <div>
        Search
        <input
          onChange={event => {
            //TODO:: make url dynamic in hooks
            getSearch(
              `https://swapi.co/api/people/?search=${event.target.value}`
            );
          }}
        />
      </div>
      {data &&
        data.map((character, index) => {
          return (
            //TODO:: make it a component
            <div
              key={`${character.name}${index}`}
              item-value={character.url}
              onClick={event =>
                console.log(event.target.getAttribute("item-value"))
              }
            >
              {character.name}
            </div>
          );
        })}
      <Pagination nextPage={getNext} previousPage={getPrev} />
    </div>
  );
};

export default Characters;
