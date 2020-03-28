import React from 'react';
import { useSetCurrentCharacter } from 'containers/Character/characterHooks';

const CharacterRow = React.memo(({ data, changeLocation }) => {
    const { setCurrentCharacter } = useSetCurrentCharacter();
    return (
        <React.Fragment>
            {data &&
                data.map((character, index) => {
                    return (
                        <div
                            key={`${character.name}${index}`}
                            item-value={character.url}
                            onClick={(event) => {
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
        </React.Fragment>
    );
});

export default CharacterRow;
