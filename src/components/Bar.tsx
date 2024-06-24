import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PackagesFilter from './PackagesFilter';
import AddPackage from './AddPackage';
import packageStore from '../stores/PackageStore';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';

const Bar: React.FC = observer(() => {
  const { packages, collectedPackagesCount } = packageStore;
 


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <PackagesFilter />
          <Typography align='right' variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <h3>num of all : {packages.length}</h3>
          </Typography>
          <Typography align='center' variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <h3>collected: {collectedPackagesCount}</h3>
          </Typography>
          <AddPackage />
          </Toolbar>
      </AppBar>
    </Box>
  );
})
export default Bar;