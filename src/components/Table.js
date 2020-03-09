import React from "react";
import { useTable, usePagination } from "react-table";

function Table({ columns, data, nextPage, previousPage }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    canPreviousPage,
    rows
  } = useTable(
    {
      columns,
      data
    },
    usePagination
  );
  return (
    <>
      {/* TODO:: handle next prev pagination state*/}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={false}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={false}>
          {">"}
        </button>{" "}
      </div>
    </>
  );
}

export default Table;
