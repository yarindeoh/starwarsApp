import React from 'react';

import { useCharacterDetails } from 'containers/Character/characterHooks';

const CharacterPrimitive = React.memo(({ id }) => {
    const characterData = useCharacterDetails(id);
    return (
        <div className="primitive">
            {characterData &&
                Object.keys(characterData).map((key, index) => {
                    return (
                        <div key={`${key}${index}`}>
                            <span className="key">{key} </span>:
                            {characterData[key]}
                        </div>
                    );
                })}
        </div>
    );
});

export default CharacterPrimitive;
