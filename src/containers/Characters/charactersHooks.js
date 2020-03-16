import { useCallback, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { getAllCharacters } from "containers/Characters/charactersConstants";
import { getCharacterDetails } from "containers/Character/characterConstants";

export const useCharacterData = url => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCharacters(url));
  }, [url]);
  return useSelector(state => state.characters.currentCharacters);
};

export const useGetPeople = () => {
  const dispatch = useDispatch();
  //TODO:: add reselect
  let nextPageUrl = useSelector(state => state.characters.nextCharacterRequest);
  let prevPageUrl = useSelector(state => state.characters.prevCharacterRequest);
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
  return useCallback(url => {
    dispatch(getAllCharacters(url));
  }, []);
};

