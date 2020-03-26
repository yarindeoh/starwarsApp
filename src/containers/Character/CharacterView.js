import React from 'react';

import CharacterLists from 'containers/Character/components/CharacterLists';
import CharacterPrimitive from 'containers/Character/components/CharacterPrimitive';

const CharacterView = React.memo((props) => {
    return (
        <div className="characterDetails">
            <h3>Character Details</h3>
            <CharacterPrimitive id={props.match.params.characterId} />
            <CharacterLists />
        </div>
    );
});

export default CharacterView;
