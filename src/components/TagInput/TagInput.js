import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const tagsArray = [
  { name: 'Se7en' },
  { name: 'The Silence of the Lambs' },
  { name: "It's a Wonderful Life" },
  { name: 'Life Is Beautiful' },
  { name: 'The Usual Suspects' },
  { name: 'Léon: The Professional' },
];

// tag structure
// name: String!
// description: String
// creatorId: MongoID
// _id: MongoID!
// updatedAt: Date
// createdAt: Date
// creator: Profile

const filter = createFilterOptions();

const TagInput = () => {
  const [value, setValue] = useState(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            name: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            name: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={tagsArray}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="Wybierz tag lub dodaj nowy tag" />}
    />
  );
};

export default TagInput;
