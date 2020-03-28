import React from 'react';

import {
    useCharacterData,
    useGetPeople,
    useSearch
} from 'containers/Characters/charactersHooks';
import Pagination from 'components/Pagination';
import CharacterRows from 'containers/Characters/components/CharacterRows';

const Characters = (props) => {
    const data = useCharacterData();
    const { getPrev, getNext } = useGetPeople();
    const getSearch = useSearch();
    const changeLocation = (characterRequest) => {
        let characterIdPrefix = characterRequest.split('/people')[1];
        props.history.push(`/characterDetails${characterIdPrefix}`);
    };
    return (
        <div className="app">
            {/* TODO:: make a hash for peoples */}
            <div>
                Search
                <input
                    onChange={(event) => {
                        getSearch(event.target.value);
                    }}
                />
            </div>
            <CharacterRows data={data} changeLocation={changeLocation} />
            <Pagination nextPage={getNext} previousPage={getPrev} />
        </div>
    );
};

export default Characters;
