import React from 'react';
import { observer } from 'mobx-react'
import packageStore from "../stores/PackageStore";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Checkbox from '@mui/material/Checkbox';

const PackagesList: React.FC = observer(() => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const { filteredPackages} = packageStore;
  const openGoogleMap = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    const width = 600;
    const height = 400;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    window.open(url, '_blank', `width=${width},height=${height},top=${top},left=${left}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><h2>Collected</h2></TableCell>
            <TableCell align="center"><h2>Name</h2></TableCell>
            <TableCell align="center"><h2>Tracking Number</h2></TableCell>
            <TableCell align="center"><h2>Location</h2></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           
          {filteredPackages.length>0? filteredPackages.map((p) => (
            <TableRow
              key={p.trackingNumber}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center"><Checkbox {...label} defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} name="Collected"
                color="primary" checked={p.collected} onChange={() => { packageStore.toggleCollected(p.trackingNumber) }}></Checkbox></TableCell>
              <TableCell align="center" component="th"  >{p.name} </TableCell>
              <TableCell align="center">{p.trackingNumber}</TableCell>
              <TableCell align="center"><IconButton onClick={() => openGoogleMap(p.lat, p.lng)}>
                <LocationOnIcon />
              </IconButton></TableCell>

              <TableCell align="center"> <IconButton aria-label="delete" size="large" onClick={() => { packageStore.deletePackages(p.trackingNumber) }}> <DeleteIcon fontSize="inherit" /></IconButton></TableCell>
            </TableRow>
          )):<div><h1>Sorry... nothing to display</h1></div>}
        </TableBody>
      </Table>
    </TableContainer>


  );
});
export default PackagesList;

// <div>
//   {
//     filteredPackages.map(p => (
//       <div key={p.trackingNumber}>
//         <h3>{p.name}</h3>
//         <p>Tracking Number:{p.trackingNumber}</p>
//         <p><Switch name="Collected"
//         color="primary" checked={p.collected} onChange={()=>{toggleCollected(p.trackingNumber)}}></Switch></p>
//         <IconButton aria-label="delete" size="large" onClick={()=>{deletePackages(p.trackingNumber)}}> <DeleteIcon fontSize="inherit" /></IconButton>
//   </div>