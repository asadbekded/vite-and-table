import { useMemo } from "react";
import { COLUMN } from "./COLUMN";
import { ColumnFilter } from "./ColumnFilter";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import MOCK_DATA from "../data/MOCK_DATA.json";
import "./table.css";
import { GlobalFilter } from "./GlobalFilter";

export const FilteredTable = () => {
  const columns = useMemo(() => COLUMN, []);
  const data = useMemo(() => MOCK_DATA, []);

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const DemoTable = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = DemoTable;

  const { globalFilter } = state;

  return (
    <div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <h1>Table</h1>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((header) => (
            <tr {...header.getHeaderGroupProps()}>
              {header.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}
                {column.canFilter ? (column.render("Filter")) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
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
    </div>
  );
};
