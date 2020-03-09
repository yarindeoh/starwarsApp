import React from "react";
import { I18n } from "react-redux-i18n";

import {
  useCharacterData,
  useGetPeople
} from "containers/Characters/charactersHooks";
import Table from "components/Table";

const Characters = props => {
  const { data } = useCharacterData("https://swapi.co/api/people");
  const { getPrev, getNext } = useGetPeople();
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
            },
            {
              Header: "Hair Color",
              accessor: "hair_color"
            },
            {
              Header: "Eye Color",
              accessor: "eye_color"
            },
            {
              Header: "Birth Year",
              accessor: "birth_year"
            },
            {
              Header: "Gender",
              accessor: "gender"
            },
            {
              Header: "Planet",
              accessor: "homeworld"
            }
          ]}
          nextPage={getNext}
          previousPage={getPrev}
        />
      )}
    </div>
  );
};

export default Characters;
