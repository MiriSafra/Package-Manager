import React, { useState } from 'react';
import { observer } from 'mobx-react'
import packageStore from "../stores/PackageStore";
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, alpha, styled } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
const PackagesFilter: React.FC = observer(() => {

    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        packageStore.searchPackages(e.target.value)
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Box sx={{ minWidth: 120 }}>
             <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            type='text'
            placeholder='search...'
            value={searchQuery}
            onChange={handleSearchChange}
            inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          </Box>
          <Box sx={{ minWidth: 200, maxHeight:50}}>
          <Search>
      <FormControl fullWidth>
      
        <InputLabel id="demo-simple-select-label">show</InputLabel>
        
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="filter by:"
        >
          <MenuItem><Button size="large" fullWidth onClick={()=>{packageStore.filterPackages(null)}}>all</Button></MenuItem>
          <MenuItem><Button size="large" fullWidth onClick={()=>{packageStore.filterPackages(true)}}>collected packages</Button></MenuItem>
          <MenuItem><Button size="large" fullWidth onClick={()=>{packageStore.filterPackages(false)}}>not collected packages</Button></MenuItem>
        </Select>
      </FormControl>
      </Search>
    </Box>
        </div>
    )

})
export default PackagesFilter;