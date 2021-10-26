import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import TimePickerInput from '../TimePickerInput';
import ProjectSelect from '../ProjectSelect/ProjectSelect';
import TagInput from '../TagInput';
import './EntryList.scss';

const EntryList = () => {
  const newDatetime = new Date();
  newDatetime.setHours(11);
  newDatetime.setMinutes(30);
  return (
    <>
      <h1>Entry List</h1>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {[0, 1, 2, 3].map((value) => {
          return (
            <ListItem
              className="entryList"
              key={value}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              }}
            >
              <TimePickerInput valueTimeProp={{ newDatetime }} />
              <TimePickerInput valueTimeProp={{ newDatetime }} />

              <ProjectSelect />
              <TagInput />

              <Button
                variant="contained"
                sx={{ borderRadius: '50%', minWidth: '50px', height: '50px', width: '50px' }}
              >
                <AddCircleOutlineIcon />
              </Button>
              <Button
                color="error"
                variant="contained"
                sx={{ borderRadius: '50%', minWidth: '50px', height: '50px', width: '50px' }}
              >
                <DeleteOutlineIcon />
              </Button>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default EntryList;
