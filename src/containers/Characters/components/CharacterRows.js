import React from 'react';
import { useSetCurrentCharacter } from 'containers/Character/characterHooks';

const CharacterRow = React.memo(({ data, changeLocation }) => {
    const { setCurrentCharacter } = useSetCurrentCharacter();
    return (
        <div className="characters-list">
            {data &&
                data.map((character, index) => {
                    return (
                        <div
                            className="character-row"
                            key={`${character.name}${index}`}
                            item-value={character.url}
                            onClick={(event) => {
                                //TODO:: check if needs to replace in processSwapiApiData
                                // also reset before set
                                setCurrentCharacter(character);
                                changeLocation(
                                    event.target.getAttribute('item-value')
                                );
                            }}
                        >
                            {character.name}
                        </div>
                    );
                })}
        </div>
    );
});

export default CharacterRow;
