import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { getCharacterDetails } from 'containers/Character/characterConstants';
import { getCurrentCharacter } from 'containers/Character/characterSelectors';

export const useCharacterDetails = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCharacterDetails(id));
    }, [id]);
    return useSelector(getCurrentCharacter, shallowEqual);
};
