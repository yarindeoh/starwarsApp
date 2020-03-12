import { useCallback, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { getAllCharacters } from "containers/Characters/charactersConstants";

export const useCharacterData = url => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCharacters(url));
  }, [url]);
  return {
    data: useSelector(state => state.characters.currCharacters)
  };
};

export const useGetPeople = () => {
  const dispatch = useDispatch();
  let nextPageUrl = useSelector(state => state.characters.nextCharacterRequest);
  let prevPageUrl = useSelector(state => state.characters.prevCharacterRequest);
  const getNext = useCallback(() => {
    dispatch(getAllCharacters(nextPageUrl));
  }, [nextPageUrl]);
  const getPrev = useCallback(() => {
    dispatch(getAllCharacters(prevPageUrl));
  }, [prevPageUrl]);
  return {
    getNext,
    getPrev
  };
};

export const useSearch = () => {
  const dispatch = useDispatch();
  const getSearchResults = useCallback(
    url => {
      dispatch(getAllCharacters(url));
    },
    []
  );
  return {
    getSearch: getSearchResults
  };
};
