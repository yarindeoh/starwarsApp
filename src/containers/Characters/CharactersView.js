import React from 'react';
import { I18n } from 'react-redux-i18n';

import {
    useCharacterData,
    useGetPeople,
    useSearch
} from 'containers/Characters/charactersHooks';
import Pagination from 'components/Pagination';

const Characters = (props) => {
    // Call getAllCharacters initialization
    const data = useCharacterData('https://swapi.co/api/people');
    const { getPrev, getNext } = useGetPeople();
    const getSearch = useSearch();
    const changeLocation = (characterRequest) => {
        let characterIdPrefix = characterRequest.split('/people')[1];
        props.history.push(`/characterDetails${characterIdPrefix}`);
    };
    return (
        <div className="app">
            {/* TODO: make it a component */}
            {/* TODO:: think about useEffect */}
            <div>
                Search
                <input
                    onChange={(event) => {
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
            <Pagination nextPage={getNext} previousPage={getPrev} />
        </div>
    );
};

export default Characters;
