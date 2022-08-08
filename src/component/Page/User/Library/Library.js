import { React, useState, useEffect } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import DetailsOutlinedIcon from '@mui/icons-material/DetailsOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel'
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { MdFileUpload } from 'react-icons/md';
import axios from 'axios';
import "./library.css";


const Input = styled('input')({
    display: 'none',
});

export default function TitlebarImageList() {
    const [open, setOpen] = useState(false);
    const [ope, setope] = useState(false);
    const [data, setData] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handle = () => {
        setope(true);
    }

    const handleClose = () => {
        setOpen(false);
    };
    const Close = () => {
        setope(false);
    };
    useEffect(() => {
        loadUsers();
        document.title = "Library"
    }, [])

    const loadUsers = async () => {
        const result = await axios.get("https://42db-124-253-0-141.ngrok.io/api/sportcenter/");
        setData(result.data.reverse());
    };

    return (
        <div>
            <Container maxWidth="xl">
                <Grid container spacing={3} className="library">
                    <Grid item xs={12} sm={6} style={{ padding: "28px", display: "flex" }}>
                        <h3> Library </h3>
                    </Grid>
                    <Grid item xs={12} sm={6} className="butt"
                        style={{ padding: "45px 0px", display: "flex", justifyContent: "end" }}>
                        <Button variant="contained"
                            className="size"
                            style={{
                                float: "right", marginRight: "10px", backgroundColor: "white",
                                color: "black", textTransform: "capitalize", fontWeight: "100"
                            }}>
                            <DetailsOutlinedIcon />
                            Filter
                        </Button>
                        <Button variant="contained"
                            className="size"
                            onClick={handleClickOpen}
                            style={{
                                float: "right", marginRight: "10px", backgroundColor: "white",
                                color: "black", textTransform: "capitalize", fontWeight: "100"
                            }}>
                            <CheckIcon />
                            Assign
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <div style={{ display: "flex",justifyContent:"space-between" }}>
                                <DialogTitle >Assign</DialogTitle>
                                <IconButton onClick={handleClose}>
                                    <CloseIcon style={{  color: "rgba(12,11,69,255)" }} />
                                </IconButton>
                            </div>
                            <DialogContent>
                                <InputLabel className="Input"
                                    style={{
                                        color: "rgba(12,11,69,255)",
                                        fontSize: "12px",
                                    }}>
                                    Username:
                                </InputLabel>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Username"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                />
                            </DialogContent>
                            <DialogActions style={{ justifyContent: "center", marginBottom: "15px" }}>
                                <Button variant="contained" style={{
                                    backgroundColor: "rgba(12,11,69,255)",
                                    color: "white", borderRadius: " 22px 22px", padding: "10px 65px"
                                }}>Assign</Button>
                            </DialogActions>
                        </Dialog>
                        <Button variant="contained"
                            onClick={handle}
                            className="size"
                            style={{
                                float: "right", marginRight: "10px", backgroundColor: "white",
                                color: "black", textTransform: "capitalize", fontWeight: "100"
                            }}>
                            <CloudUploadIcon />
                            Upload
                        </Button>
                        <Dialog open={ope} onClose={Close}>
                            <div style={{ display: "flex",justifyContent:"space-between" }}>
                                <DialogTitle >Upload</DialogTitle>
                                <IconButton onClick={Close}>
                                    <CloseIcon style={{ color: "rgba(12,11,69,255)" }} />
                                </IconButton>
                            </div>
                            <DialogContent>
                                <InputLabel className="Input"
                                    style={{
                                        color: "rgba(12,11,69,255)",
                                        fontSize: "12px",
                                    }}>
                                    Upload:
                                </InputLabel>
                                <div style={{
                                    height: "100px",
                                    padding: "45px",
                                    border: "1px solid ",
                                    borderStyle: "dotted",
                                    textAlign: "center",
                                }}>
                                    <MdFileUpload style={{ fontSize: "30px" }} />
                                    <p>Upload your file</p>
                                </div>
                            </DialogContent>
                            <DialogActions style={{ justifyContent: "center", marginBottom: "15px" }}>
                                <Button variant="contained" style={{
                                    backgroundColor: "rgba(12,11,69,255)",
                                    color: "white", borderRadius: " 22px 22px", padding: "10px 65px"
                                }}>Upload</Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="xl">
            <Paper elevation={3} style={{  marginBottom: "90px",padding:"30px" }}>
                <ImageList cols={4}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                style={{ borderRadius: " 22px 22px" }}
                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                style={{ background: "none", textAlign: "center" }}
                                title={item.title}
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item.title}`}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Paper>
            </Container>
        </div>
    );
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        cols: 2,
    },
];
