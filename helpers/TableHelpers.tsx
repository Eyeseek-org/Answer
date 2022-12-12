import { Column } from "@tanstack/react-table";
import {useMemo} from 'react'
import { AbsoluteFilter, MyInput } from "../components/tables/TableStyles";

export const PAGE_SIZE = 10;

export const currenciesIdMapping = {
    1: 'USDC',
    2: 'USDT',
    3: 'DAI',
  };
  

export const FilterInput = <T,>({ column }: { column: Column<T> }) => {
    const columnFilterValue = column.getFilterValue() as string | number;
  
    const isSelectInput = column.columnDef.meta?.filter === 'select';
  
    const uniqueValues = useMemo(() => {
      let uniqueValues = Array.from(column.getFacetedUniqueValues().keys());
  
      if (column.id === 'currency_id') {
        uniqueValues = uniqueValues.map((currency) => currenciesIdMapping[currency]);
      }
  
      return uniqueValues;
    }, [column.getFacetedUniqueValues]);
  
    return isSelectInput ? <AbsoluteFilter>
      <select onChange={(e) => column.setFilterValue(e.target.value)}>
        <option value="" selected>
          All
        </option>
        {uniqueValues.map((value) => (
          <option value={value}>{value}</option>
        ))}
      </select>
      </AbsoluteFilter> : <AbsoluteFilter>
      <MyInput value={columnFilterValue ?? ''} onChange={(e) => column.setFilterValue(e.target.value)} />
      </AbsoluteFilter>
  };
