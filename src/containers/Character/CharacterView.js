import React from 'react';

import CharacterLists from 'containers/Character/components/CharacterLists';
import CharacterPrimitive from 'containers/Character/components/CharacterPrimitive';
import { useGetCurrentCharacterDetails } from 'containers/Character/characterHooks';

const CharacterView = React.memo((props) => {
    const characterId = props.match.params.characterId;
    useGetCurrentCharacterDetails(characterId);
    return (
        <div className="characterDetails">
            <h3>Character Details</h3>
            <CharacterPrimitive id={characterId} />
            <CharacterLists />
        </div>
    );
});

export default CharacterView;
