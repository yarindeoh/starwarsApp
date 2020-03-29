import { useCallback, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import {
    getAllCharacters,
    getCharactersPage
} from 'containers/Characters/charactersConstants';
import {
    getCurrentCharacters,
    getNextCharactersRequest,
    getPrevCharactersRequest
} from 'containers/Characters/charactersSelectors';

export const useCharacterData = () => {
    const dispatch = useDispatch();
    //TODO:: check before render
    useEffect(() => {
        dispatch(getAllCharacters(''));
    }, []);
    return useSelector(getCurrentCharacters, shallowEqual);
};

export const useGetPeople = () => {
    const dispatch = useDispatch();
    let nextPageUrl = useSelector(getNextCharactersRequest, shallowEqual);
    let prevPageUrl = useSelector(getPrevCharactersRequest, shallowEqual);
    return {
        getNext: useCallback(() => {
            dispatch(getCharactersPage(nextPageUrl));
        }, [nextPageUrl]),
        getPrev: useCallback(() => {
            dispatch(getCharactersPage(prevPageUrl));
        }, [prevPageUrl])
    };
};

export const useSearch = () => {
    const dispatch = useDispatch();
    return useCallback((querySearch) => {
        dispatch(getAllCharacters(querySearch));
    }, []);
};
