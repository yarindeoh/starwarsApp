import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCharacterDetails } from "containers/Character/characterConstants";

export const useCharacterDetails = id => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCharacterDetails(id));
  }, [id]);
  return useSelector(state => state.character.currentCharacter);
};
