


import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import packageStore from "../stores/PackageStore";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const AddPackage: React.FC = observer(() => {
    const [name, setName] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');
    const [lng, setLng] = useState<number | null>(null);
    const [lat, setLat] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    const mapRef = useRef<google.maps.Map | null>(null);

    const handleAddPackage = () => {
        if (name && trackingNumber && lat !== null && lng !== null) {
            packageStore.addPackage({ name, trackingNumber, collected: false, lat, lng });
        }
        setName('');
        setTrackingNumber('');
        setLng(null);
        setLat(null);
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            setLat(e.latLng.lat());
            setLng(e.latLng.lng());
        }
    };

    useEffect(() => {
        if (mapRef.current && open) {
            google.maps.event.trigger(mapRef.current, 'resize');
        }
    }, [open]);

    const onLoad = (mapInstance: google.maps.Map) => {
        mapRef.current = mapInstance;
    };

    const mapContainerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: 32.0853,
        lng: 34.7818
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Package
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogTitle>Add a New Package</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Tracking Number"
                        type="text"
                        fullWidth
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                    />
                    <div style={{ height: '400px', margin: '20px 0' }}>
                        <LoadScript googleMapsApiKey='AIzaSyAYKkJ9RuUmMjrOynPQuhxiaNJf8ed81Fg'>
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={center}
                                zoom={13}
                                onClick={onMapClick}
                                onLoad={onLoad}
                            >
                                {lat !== null && lng !== null && (
                                    <Marker position={{ lat, lng }} />
                                )}
                            </GoogleMap>
                        </LoadScript>
                    </div>
                    {lat !== null && lng !== null && (
                        <div>
                            <p>Latitude: {lat}</p>
                            <p>Longitude: {lng}</p>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddPackage} color="inherit">
                        Add Package
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});

export default AddPackage;
