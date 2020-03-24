import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { getCharacterDetails } from 'containers/Character/characterConstants';
import {
    getCharacterData,
    getCurrentCharacterStaticData
} from 'containers/Character/characterSelectors';

export const useCharacterDetails = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
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
