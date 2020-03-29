import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import {
    setCharacterDetails,
    handleAsyncCharacterDetails,
    handleCurrentCharacterChange,
    resetCurrentCharacter
} from 'containers/Character/characterConstants';
import {
    getCharacterData,
    getCurrentCharacterStaticData
} from 'containers/Character/characterSelectors';

// TODO:: fix
export const useCharacterDetails = () => {
    return {
        characterData: useSelector(getCharacterData, shallowEqual)
    };
};

export const useGetCurrentCharacterDetails = (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleCurrentCharacterChange(id));
    }, [id]);
};

export const useSetCurrentCharacter = () => {
    const dispatch = useDispatch();
    return {
        setCurrentCharacter: useCallback((data) => {
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
