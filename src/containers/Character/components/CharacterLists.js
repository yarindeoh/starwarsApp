import React from 'react';

import { useCharacterComplexDetails } from 'containers/Character/characterHooks';

const CharacterLists = () => {
    const { characterStaticData } = useCharacterComplexDetails();
    return (
        <React.Fragment>
            {characterStaticData &&
                Object.keys(characterStaticData).map((key, index) => {
                    return (
                        <div key={`${key}${index}`}>
                            {key} :
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
        </React.Fragment>
    );
};

export default CharacterLists;
