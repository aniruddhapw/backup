import * as React from 'react'
import useAutocomplete, {
  AutocompleteGetTagProps,
} from '@mui/base/useAutocomplete'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import { autocompleteClasses } from '@mui/material/Autocomplete'

const Root = styled('div')(
  ({ theme }) => `
  color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
  };
  font-size: 14px;
`,
)

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`

const InputWrapper = styled('div')(
  ({ theme }) => `
//   width: 400px;
margin-top:12px;
   border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};

//   padding: 1px;
  padding: 8px 12px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 4px;
// border: 2px solid var(--new-primary-50, #1691AE);
background: var(--new-neutral-white, #FFF);
box-shadow: 0px 0px 0px 3px rgba(58, 87, 188, 0.15);


  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border: 2px solid var(--new-primary-50, #1691AE);
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
   
    color: ${
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.65)'
        : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
    &::placeholder {
        color: #1691AE; /* Customize the placeholder color */
        font-weight: 500;
        font-size: 14px;
        font-family:Satoshi;
      }
  }
  
 
`,
)

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string
}

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  )
}

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin-right: 20px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
  };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
//   padding: 0 4px 0 10px;
padding:4px 8px;
  outline: 0;
  overflow: hidden;
  font-family:Satoshi;
 

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 22px;
    cursor: pointer;
    padding: 4px;
    
  }
`,
)

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 427px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
  &::-webkit-scrollbar {
    width: 3px;
   
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
   
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.palette.mode === 'dark' ? '#888' : '#ccc'};
    border-radius: 4px;
    
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${theme.palette.mode === 'dark' ? '#555' : '#999'};
  }
  & li {
    padding: 6px 12px;
    display: flex;
    font-family:Satoshi;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
      
    }
    
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#EBF1F2' : '#EBF1F2'};
    cursor: pointer;
    border-radius: 3px 3px 0px 0px;

    & svg {
      color: currentColor;
      display:none;
    }
  }
`,
)

export default function DropDownWithInput() {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    defaultValue: [top100Films[1]],
    multiple: true,
    options: top100Films,
    getOptionLabel: (option) => option.title,
  })

  const [inputPlaceholder, setInputPlaceholder] =
    React.useState('+ Add new Fields')

  // ...hook and other code

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setInputPlaceholder('Type Data Fields')
  }

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setInputPlaceholder('+ Add new Fields')
  }
  //   const inputProps = getInputProps({
  //     placeholder: inputPlaceholder,
  //     onFocus: handleInputFocus,
  //     onBlur: handleInputBlur,
  //   })
  //   const { /* ... */ inputProps } = getInputProps()

  return (
    <Root>
      <div {...getRootProps()}>
        {/* <Label {...getInputLabelProps()}>Customized hook</Label> */}
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option: FilmOptionType, index: number) => (
            <StyledTag label={option.title} {...getTagProps({ index })} />
          ))}
          <input
            {...getInputProps()}
            placeholder={inputPlaceholder} // Use the placeholder state value
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            // {...inputProps}
          />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof top100Films).map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.title}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  )
}

interface FilmOptionType {
  title: string
  year: number
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
]
