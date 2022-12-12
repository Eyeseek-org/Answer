import { flexRender } from '@tanstack/react-table';
import {useState} from 'react'
import {useTheme} from 'styled-components'
import { FilterInput } from '../../helpers/TableHelpers';
import IconToggle from '../buttons/IconToggle';
import { ArrowDown, ArrowUp, FilterFullIcon, FilterIcon } from '../icons/TableIcons';
import { HeaderCell, ImageHover } from './TableStyles';

const HeaderComponent = ({header}) => {
    const [showFilter, setShowFilter] = useState(false);
    const theme = useTheme();
  
    return (
      <>
        <HeaderCell>
          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
          {header.column.getCanFilter() && (
            <ImageHover onClick={() => setShowFilter(!showFilter)}>
                <IconToggle icon={<FilterIcon height={13} width={13} color={theme.colors.icon}/>} toggleIcon={<FilterFullIcon height={13} width={13} color={theme.colors.icon}/>} />
            </ImageHover>
          )}
            {{
          asc: <ArrowDown height={10} width={10} />,
          desc: <ArrowUp height={10} width={10} />,
        }[header.column.getIsSorted() as string] ?? null}
        {header.column.getCanFilter() && showFilter && <FilterInput column={header.column} />}
        </HeaderCell>
      </>
    );
}

export default HeaderComponent;