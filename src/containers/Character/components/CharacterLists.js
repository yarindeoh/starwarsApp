import React from 'react';

import { useCharacterComplexDetails } from 'containers/Character/characterHooks';

const CharacterLists = () => {
    const { characterStaticData } = useCharacterComplexDetails();
    return (
        <div className="list">
            {characterStaticData &&
                Object.keys(characterStaticData).map((key, index) => {
                    return (
                        <div key={`${key}${index}`}>
                            <span className="key"> {key} </span>:
                            <ol>
                                {characterStaticData[key] &&
                                    characterStaticData[
                                        key
                                    ].map((item, innerIndex) => (
                                        <li key={`${item}${innerIndex}`}>
                                            {item}
                                        </li>
                                    ))}
                            </ol>
                        </div>
                    );
                })}
        </div>
    );
};

export default CharacterLists;
