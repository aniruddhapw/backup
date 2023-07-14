import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./Select.scss"
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
interface MultipleSelectPlaceholderProps {
    initialSelectedOptions: string[];
    onSelect: (personName: string[]) => void;
  }
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectPlaceholder({initialSelectedOptions, onSelect }: MultipleSelectPlaceholderProps) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [jsonView, setJsonView] = React.useState(true);
  const handleJsonViewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJsonView(event.target.checked);
  };

  const renderSelectedFields = () => {
    if (jsonView) {
      return JSON.stringify(personName);
    }
    return personName.join(', ');
  };
 

  React.useEffect(() => {
    setPersonName(initialSelectedOptions);
  }, [initialSelectedOptions]);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    onSelect(value as string[]);
  };

  return (
    <div>
      <FormControl sx={{ m: 0, width: 495, mt: 0 }}>
        <Select className='scroll'
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          sx={{ height:30 }}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Placeholder</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <div className="selectedFields">
      
        {renderSelectedFields()}
      </div> */}
    </div>
  );
}
// import React from 'react';

// function Dropdown({ selectedFields, onChange }) {
//   const handleFieldChange = (event) => {
//     const selectedValue = event.target.value;
//     onChange(selectedValue);
//   };

//   return (
//     <select multiple value={selectedFields} onChange={handleFieldChange}>
//       <option value="field1">Field 1</option>
//       <option value="field2">Field 2</option>
//       <option value="field3">Field 3</option>
//     </select>
//   );
// }

// export default Dropdown;

