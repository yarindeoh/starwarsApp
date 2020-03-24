import React from 'react';

import { useCharacterDetails } from 'containers/Character/characterHooks';

const CharacterPrimitive = React.memo(({ id }) => {
    const { characterData } = useCharacterDetails(id);
    return (
        <React.Fragment>
            {characterData &&
                Object.keys(characterData).map((key, index) => {
                    return (
                        <div key={`${key}${index}`}>
                            {key} : {characterData[key]}
                        </div>
                    );
                })}
        </React.Fragment>
    );
});

export default CharacterPrimitive;
