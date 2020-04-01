import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import {
    setCharacterPrimitiveDetails,
    asyncCharacterDetails,
    handleCurrentCharacterChange
} from 'containers/Character/characterConstants';
import {
    getCharacterData,
    getCurrentCharacterStaticData
} from 'containers/Character/characterSelectors';

export const useCharacterDetails = () => {
    return useSelector(getCharacterData, shallowEqual);
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
            //Set primitive key value pairs in the store (name, eye_color etc)
            dispatch(setCharacterPrimitiveDetails(data));
            // send async properties to CharacterSaga middleware to handle
            dispatch(asyncCharacterDetails(data));
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
