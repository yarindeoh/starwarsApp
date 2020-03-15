import { useCallback, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import {
  getAllCharacters,
  getCharacterDetails
} from "containers/Characters/charactersConstants";

export const useCharacterData = url => {
  const dispatch = useDispatch();
  console.log('hook');
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

export const useCharacterDetails = id => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCharacterDetails(id));
  }, [id]);
  return useSelector(state => state.characters.currentCharacter);
};
