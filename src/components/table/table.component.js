import React, { useMemo, useCallback } from "react";
import { useTable, useSortBy, useFilters, useBlockLayout } from "react-table";
import { FixedSizeList } from "react-window";

import { DefaultColumnFilter } from "./filters.component";

const Table = ({ rows: rowsProp = [], columns: columnsProp = [] }) => {
  const data = useMemo(() => rowsProp, []);
  const columns = useMemo(() => columnsProp, []);

  const defaultColumn = useMemo(
    () => ({
      width: 150,
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const filterTypes = useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable(
    { columns, data, defaultColumn, filterTypes },
    useBlockLayout,
    useFilters,
    useSortBy
  );

  const tableHeader = () => (
    <div>
      {headerGroups.map((headerGroup) => (
        <div {...headerGroup.getHeaderGroupProps()} className="tr">
          {headerGroup.headers.map((column) => (
            <div
              {...column.getHeaderProps(column.getSortByToggleProps())}
              className="th"
            >
              {column.render("Header")}
              <div onClick={(e) => e.stopPropagation()}>
                {column.canFilter ? column.render("Filter") : null}
              </div>
              <span>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <>&#8593;</>
                  ) : (
                    <>&#8595;</>
                  )
                ) : null}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map((cell) => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render("Cell")}
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows]
  );

  return (
    <div {...getTableProps()} className="table">
      {tableHeader()}
      <div {...getTableBodyProps()}>
        <FixedSizeList
          height={400}
          itemCount={rows.length}
          itemSize={35}
          width={totalColumnsWidth}
        >
          {renderRow}
        </FixedSizeList>
      </div>
    </div>
  );
};

export default Table;
