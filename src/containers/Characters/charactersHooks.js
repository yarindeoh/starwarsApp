import { useCallback, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { getAllCharacters } from 'containers/Characters/charactersConstants';
import {
    getCurrentCharacters,
    getNextCharactersRequest,
    getPrevCharactersRequest
} from 'containers/Characters/charactersSelectors';

export const useCharacterData = (url) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCharacters(url));
    }, [url]);
    return useSelector(getCurrentCharacters, shallowEqual);
};

export const useGetPeople = () => {
    const dispatch = useDispatch();
    //TODO:: add reselect
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
    return useCallback((url) => {
        dispatch(getAllCharacters(url));
    }, []);
};
