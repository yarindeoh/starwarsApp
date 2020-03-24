import React from 'react';
import { I18n } from 'react-redux-i18n';

import {
    useCharacterData,
    useGetPeople,
    useSearch
} from 'containers/Characters/charactersHooks';
import Pagination from 'components/Pagination';
import CharacterRow from 'containers/Characters/components/CharacterRow';

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
            <div>
                Search
                <input
                    onChange={(event) => {
                        getSearch(event.target.value);
                    }}
                />
            </div>
            <CharacterRow data={data} changeLocation={changeLocation} />
            <Pagination nextPage={getNext} previousPage={getPrev} />
        </div>
    );
};

export default Characters;
