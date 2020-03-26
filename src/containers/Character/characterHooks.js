import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import {
    getCharacterDetails,
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
    useEffect(() => {
        dispatch(resetCurrentCharacter());
        dispatch(getCharacterDetails(id));
    }, [id]);
    return {
        characterData: useSelector(getCharacterData, shallowEqual)
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
