import React from 'react';

import { useCharacterDetails } from 'containers/Character/characterHooks';

const CharacterView = (props) => {
    const { characterData, characterStaticData } = useCharacterDetails(
        props.match.params.characterId
    );
    console.log(characterStaticData);
    return (
        <div>
            <h3>Character Details</h3>
            {characterData &&
                Object.keys(characterData).map((key, index) => {
                    return Array.isArray(characterData[key]) ? (
                        <div key={`${key}${index}`}>
                            {key} :
                            <ol>
                                {characterData[key].map((item, innerIndex) => (
                                    <li key={`${item}${innerIndex}`}>{item}</li>
                                ))}
                            </ol>
                        </div>
                    ) : (
                        <div key={`${key}${index}`}>
                            {key} : {characterData[key]}
                        </div>
                    );
                })}
            {characterStaticData &&
                Object.keys(characterStaticData).map((key, index) => {
                    return Array.isArray(characterStaticData[key]) ? (
                        <div key={`${key}${index}`}>
                            {key} :
                            <ol>
                                {characterStaticData[key].map(
                                    (item, innerIndex) => (
                                        <li key={`${item}${innerIndex}`}>
                                            {item}
                                        </li>
                                    )
                                )}
                            </ol>
                        </div>
                    ) : (
                        <div key={`${key}${index}`}>
                            {key} : {characterStaticData[key]}
                        </div>
                    );
                })}
        </div>
    );
};

export default CharacterView;
