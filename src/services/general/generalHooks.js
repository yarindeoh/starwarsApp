import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useCallback } from 'react';
import { getLoading } from './generalSelectors';

export const useLoading = () => {
    const isLoading = useSelector(getLoading, shallowEqual);
    const dispatch = useDispatch();
    const startLoading = useCallback(() => {
        dispatch(startLoadingAction());
    }, [dispatch]);
    const stopLoading = useCallback(() => {
        dispatch(stopLoadingAction());
    }, [dispatch]);
    return {
        isLoading,
        startLoading,
        stopLoading
    };
};
