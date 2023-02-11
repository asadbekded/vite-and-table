import { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { COLUMN } from "./COLUMN";
import MOCK_DATA from "../data/MOCK_DATA.json";
import "./table.css";

export const PaginationTable = () => {
  const columns = useMemo(() => COLUMN, []);
  const data = useMemo(() => MOCK_DATA, []);

  const DemoTable = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
    canNextPage,
    canPreviousPage,
    pageCount,
    state,
    gotoPage
  } = DemoTable;

  const { pageIndex } = state;

  return (
    <div className="text-center">
      <h1 className="mt-3 mb-3">PaginationTable</h1>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((header) => (
            <tr {...header.getHeaderGroupProps()}>
              {header.headers.map((column) => (
                <th className="text-center" {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mx-auto mt-3">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="btn btn-warning me-3" >Start</button>

        <button
          className="btn btn-primary"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Prev
        </button>

        <span className="ms-4">
            <strong>Page: {pageIndex + 1} Off: {pageCount}</strong>
        </span>

        <button
          className="btn btn-primary ms-4"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>

        <button onClick={() => gotoPage(pageCount -1)} disabled={!canNextPage} className="btn btn-warning ms-3" >End</button>

        <span>
            Page: <input type="number" onChange={(evt) => {
                gotoPage(evt.target.value ? evt.target.value -1 : 0)
            }} value={pageIndex + 1}  />
        </span>
      </div>
    </div>
  );
};
