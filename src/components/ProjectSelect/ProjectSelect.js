import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

const projectsArray = ['FirmaTest1', 'FirmaTest2', 'FirmaTest3'];

const ProjectSelect = () => {
  const [projectState, setProjectState] = useState('');

  const handleChange = (event) => {
    setProjectState(event.target.value);
  };

  return (
    <Box sx={{ width: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Projekt</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={projectState}
          label="Projekt"
          onChange={handleChange}
        >
          {projectsArray.map((project, index) => {
            return (
              <MenuItem key={index.toString()} value={(index + 1) * 10}>
                {project}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProjectSelect;
