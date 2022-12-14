import { AppBar, Button, Checkbox, Chip, ListItemText, Menu, MenuItem, MenuList, Tab, TextField, Typography } from "@mui/material";
import { Box, typography } from "@mui/system";
import { Paper } from "@mui/material";
import VerifiedIcon from '@mui/icons-material/Verified';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import { Dialog } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import { Select } from "@mui/material";
import Modal from "@mui/material/Modal";
import List from '@mui/material/List';
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useState } from 'react';
import * as React from 'react';
import { useEffect } from 'react';

import { Avatar } from "@mui/material";
import { fetchAllToppings, fetchMenu, fetchOneMenu, fetchToppings } from "./store/Menu.action";
import { useDispatch, useSelector } from 'react-redux';
function MenuPage() {
  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
  };
  const [menuName, setMenuName] = useState([]);
  const [num, setNum] = useState(0);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [TotalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [BillReceipt, setBillReceipt] = React.useState(false);
  const [Cartopen, setCartOpen] = React.useState(false);
  const handleCartOpen = () => setCartOpen(true);
  const handleBillReceiptOpen = () => setBillReceipt(true);
  const handleBillReceiptClose = () => setBillReceipt(false);
  const handleCartClose = () => setCartOpen(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = React.useState([]);
  const menus = useSelector((state) => state.Menu.menus);
  const onemenu = useSelector((state) => state.Menu.onemenu);
  const toppings = useSelector((state) => state.Menu.toppings);
  const alltoppings = useSelector((state) => state.Menu.alltoppings);
  const QuantityHandler = (event) => {
    setQuantity(event.target.value);
  }
  React.useEffect(() => {
    dispatch(fetchMenu());
  }, []);
  React.useEffect(() => {
    // console.log(menus);
  }, [menus]);


  React.useEffect(() => {
    setData([...data, toppings]);
  }, [toppings]);
  console.log(data);

  const handleToppings = (id) => {
    dispatch(fetchOneMenu({
      id: id
    }))
    dispatch(fetchAllToppings());
    handleOpen();
  }
  React.useEffect(() => {
    onemenu.map((item) => {
      item.AvailableToppings.map((topping) => {
        dispatch(fetchToppings({
          id: topping
        }))

      })
    })
  }, [onemenu]);

  useEffect(() => {
    cart.map((item) => {
      setTotalPrice(parseFloat(TotalPrice) + item.price)
    })
  }, [cart])

  const AddCart = (data) => {
    setCart((oldcart) => {
      return [...oldcart, data]
    })

  }
  const handleOrderCart = (cart, price) => {
    handleCartClose();
    handleBillReceiptOpen();
  }
  function handleCartDelete(menu) {
    console.log(menu)
  }
  const handleOrder = (Name, Itemprice, toppings) => {
    if (quantity == 0) {
      alert("select quantity of item")
    }
    else {
      var price = 0;
      toppings.map((item) => {
        price = price + item.price;
      })
      price = price + Itemprice;
      console.log(price + Itemprice);
      console.log(quantity);
      var data = {
        "name": Name,
        "price": price * quantity,
        "quantity": quantity
      };
      setNum(num + 1);
      AddCart(data);
    }

  }
  // const handleListItemClick=(value)=>{
  //   setSelectedToppings(value);
  //   console.log(selectedToppings)
  // }
  useEffect(() => {
    console.log(alltoppings)
  }, [alltoppings]);
  const handleChange = (event) => {
    //event.preventDefault();
    const {
      target: { value },
    } = event;
    setSelectedToppings(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return <div style={{ backgroundImage: `url('https://i.pinimg.com/originals/5c/3f/d9/5c3fd9952bbd0235c4911da8d9fdac5e.webp')`, 'background-position': 'center center' }}>
    <AppBar sx={{ p: 1 }} >
      <Typography textAlign={'left'} variant="h6" component="div" sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        WiWi Food App(Capstone) <Button variant="contained" onClick={handleCartOpen}><Chip label="yourCart" color="primary"></Chip>{num}</Button>
      </Typography>

    </AppBar>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          ml: 25,
          mt: 13,
          width: 800,
          height: 128,
        },
      }}
    >
      <Paper elevation={3}><Typography textAlign={'center'} variant="h6">Good Food, Good Time</Typography> <Typography>our chefs at WiWi make delicious food selections every week - you pick,we cook and deliver.</Typography> </Paper>
    </Box>
    <Dialog open={BillReceipt}>
      <List sx={{
        ml: 30, pt: 0, width: 800,
        height: 500
      }}>
        <VerifiedIcon color="success" sx={{ fontSize: 70 }} />

        {cart.map((res) => (
          <ListItem button key={res} sx={{ ml: -10 }}>
            <ListItemText primary={"ITEM NAME:" + res.name} secondary={""} />
          </ListItem>
        ))}
        <Typography sx={{ ml: -5 }}>TOTAL PRICE: ${parseInt(TotalPrice)}</Typography>
        <Typography sx={{ ml: -5 }}><Typography> Thank you Enjoy the food </Typography>
          <RestaurantMenuIcon sx={{ fontSize: 30 }} /><RamenDiningIcon sx={{ fontSize: 30 }} /><LunchDiningIcon sx={{ fontSize: 30 }} /></Typography>
        <Button onClick={handleBillReceiptClose} color="error">Close</Button>
      </List>

    </Dialog>
    <Dialog open={Cartopen}>
      <List sx={{
        pt: 0, width: 800,
        height: 128,
      }}>
        {cart.map((res) => (
          <ListItem button key={res}>
            <ListItemText primary={res.name} />
            <ListItemText primary={"$" + res.price} secondary={res.quantity} />
            <Button onClick={() => { handleCartDelete(res.name) }} color="error">Delete</Button>
          </ListItem>
        ))}
        <Typography sx={{ ml: 1, color: 'orangered' }}>TotalPrice: ${TotalPrice}</Typography>
        <Typography sx={{ ml: 20 }}><Button onClick={handleCartClose} color="error">Close</Button>
          <Button onClick={() => { handleOrderCart(cart, TotalPrice) }} color="success">Order</Button></Typography>
      </List>

    </Dialog>

    <Dialog onClose={handleClose} open={open}>
      <List sx={{ pt: 0 }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Select the Toppings</InputLabel>
          <Select multiple value={selectedToppings} onChange={handleChange} input={<OutlinedInput label="Tag" />}
          >
            {alltoppings.map((m, i) => (
              <MenuItem
                key={i} value={{ "name": m.toppingname, "price": parseFloat(m.price) }}
              >
                <Checkbox />
                <ListItemAvatar>

                  <Avatar src={m.top_image}></Avatar>

                </ListItemAvatar>
                <ListItemText primary={m.toppingname} /><ListItemText primary={m.price} /></MenuItem>))}
          </Select>
        </FormControl>
        <Tab /><Button variant="contained" color="success" onClick={handleClose}>Done</Button>
      </List></Dialog>

    {menus.map((item) => {
      return (
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            ml: 15,
            mt: 1,
            width: 1000,
            height: 145,
          },
        }}>
          <Paper elevation={3}>
            <Typography sx={{ ml: 1, display: 'flex', width: '100%', justifyContent: 'space-between' }}>{item.Name}
              <Typography variant="body2" sx={{ mr: 2 }}>Amount<TextField required type="number" size="small" sx={{ width: 50 }} onChange={QuantityHandler} /></Typography></Typography>
            <Typography sx={{ ml: 1 }} textAlign={'left'}>{item.Description}</Typography>
            <Typography sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }} >
              <Typography sx={{ ml: 1, color: 'orangered' }} textAlign={'left'} variant="h5">${item.price}<Button size="small" variant="contained" sx={{ ml: 1 }} onClick={() => handleToppings(item._id)}>+Add toppings</Button>
              </Typography><Button sx={{ mr: 1 }} size="small" variant="contained" onClick={() => handleOrder(item.Name, item.price, selectedToppings)}>Add</Button></Typography>

          </Paper>
        </Box>
      )
    })}
  </div>
}

export default MenuPage;