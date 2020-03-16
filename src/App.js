import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Characters from "containers/Characters/CharactersView";
import CharacterView from "containers/Character/CharacterView";
import starwars from "resources/images/starwars-logo.png";
import "resources/scss/style.scss";

export const App = withRouter(() => {
  return (
    <div>
      <div className="centered">
        <img className="logoImage" src={starwars} />
      </div>
      <Switch>
        <Route path="/" exact={true} component={Characters} />
        <Route
          path="/characterDetails/:characterId"
          exact={true}
          component={CharacterView}
        />
      </Switch>
    </div>
  );
});
