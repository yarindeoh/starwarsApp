import React from 'react';

const CharacterRow = React.memo(({ data, changeLocation }) => {
    return (
        <React.Fragment>
            {data &&
                data.map((character, index) => {
                    return (
                        <div
                            key={`${character.name}${index}`}
                            item-value={character.url}
                            onClick={(event) => {
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
