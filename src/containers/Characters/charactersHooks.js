import { useCallback, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { getAllCharacters } from 'containers/Characters/charactersConstants';
import {
    getCurrentCharacters,
    getNextCharactersRequest,
    getPrevCharactersRequest
} from 'containers/Characters/charactersSelectors';

export const useCharacterData = () => {
    const dispatch = useDispatch();
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
            dispatch(getAllCharacters(nextPageUrl));
        }, [nextPageUrl]),
        getPrev: useCallback(() => {
            dispatch(getAllCharacters(prevPageUrl));
        }, [prevPageUrl])
    };
};

export const useSearch = () => {
    const dispatch = useDispatch();
    return useCallback((pageNumber) => {
        dispatch(getAllCharacters(pageNumber));
    }, []);
};
