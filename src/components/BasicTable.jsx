import { useMemo } from "react";
import { COLUMN } from "./COLUMN";
import { useTable } from "react-table";
import MOCK_DATA from "../data/MOCK_DATA.json";
import "./table.css";

export const BasicTable = () => {
  const columns = useMemo(() => COLUMN, []);
  const data = useMemo(() => MOCK_DATA, []);

  const DemoTable = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    DemoTable;

  return (
    <div>
      <h1>Table</h1>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((header) => (
            <tr {...header.getHeaderGroupProps()}>
              {header.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
