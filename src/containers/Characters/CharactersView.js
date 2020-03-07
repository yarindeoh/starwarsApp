import React from "react";
import { I18n } from "react-redux-i18n";

import {
  useCharacters,
  useCharacterData
} from "containers/Characters/charactersHooks";
import Table from "components/Table";

const Characters = props => {
  useCharacters("https://swapi.co/api/people");
  const { data } = useCharacterData();
  console.log(data);
  return (
    <div className="app">
      {/* <div className="title">{I18n.t("app.title")}</div>
      <div className="section"></div> */}
      {data && (
        <Table
          data={data}
          columns={[
            {
              Header: "Name",
              accessor: "name"
            },
            {
              Header: "Height",
              accessor: "height"
            }
          ]}
        />
      )}
    </div>
  );
};

export default Characters;
