import { useCallback, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { getAllCharacters } from "containers/Characters/charactersConstants";

export const useCharacters = url => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCharacters(url));
  }, []);
};

export const useCharacterData = () => {
  const chars = useSelector(state => state.characters.currCharacters);
  return {
      data: chars
  };
};
