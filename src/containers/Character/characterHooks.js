import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import {
    getCharacterDetails,
    setCharacterDetails,
    handleAsyncCharacterDetails,
    resetCurrentCharacter
} from 'containers/Character/characterConstants';
import {
    getCharacterData,
    getCurrentCharacterStaticData
} from 'containers/Character/characterSelectors';

export const useCharacterDetails = (id) => {
    const dispatch = useDispatch();
    // Whenever the characterId is changed, reset curr character and
    // get new character details
    const characterData = useSelector(getCharacterData, shallowEqual);
    useEffect(() => {
        dispatch(getCharacterDetails(id));
    }, [id]);
    return {
        characterData
    };
};

export const getCurrentCharacterDetails = () => {
    return {
        characterData: useSelector(getCharacterData, shallowEqual)
    };
};

export const useSetCurrentCharacter = () => {
    const dispatch = useDispatch();
    return {
        setCurrentCharacter: useCallback((data) => {
            //TODO:: add reset ?
            dispatch(resetCurrentCharacter());
            dispatch(setCharacterDetails(data));
            dispatch(handleAsyncCharacterDetails(data));
        }, [])
    };
};

export const useCharacterComplexDetails = () => {
    return {
        characterStaticData: useSelector(
            getCurrentCharacterStaticData,
            shallowEqual
        )
    };
};
