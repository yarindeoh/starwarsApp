import React from "react";

import { useCharacterDetails } from "containers/Characters/charactersHooks";

const CharacterDetails = props => {
  const characterData = useCharacterDetails(props.match.params.characterId);
  console.log(characterData);
  return (
    <div>
      <h3>Character Details</h3>
      {characterData &&
        Object.keys(characterData).map((key, index) => {
          return (
            <div key={`${key}${index}`}>
              {key} : {characterData[key]}
            </div>
          );
        })}
    </div>
  );
};

export default CharacterDetails;
