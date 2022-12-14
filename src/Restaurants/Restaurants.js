import React from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import { Box, Button, Paper } from '@mui/material';
import { Typography } from '@mui/material';
import { Card,CardMedia,CardContent,CardActions } from '@mui/material';
import { Directions } from '@mui/icons-material';


function Restaurant(){

    const handleRes=()=>{

    }

    return <div sx={{display:'flex'}}>        
       <div style={{backgroundImage:`url('https://www.mapsofindia.com/maps/tamilnadu/chennai-map.jpg')`,width:"600px",height:800,'background-position': 'center center','overflow':'hidden','backgroundRepeat':'no-repeat'}}>
            <Button onClick={handleRes}><PlaceIcon fontSize='large' sx={{color:'orange'}}/></Button>
       </div>
       <div>
       <Card sx={{ maxWidth: 345,ml:90}}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
       </div>
       
    </div>
}

export default Restaurant;