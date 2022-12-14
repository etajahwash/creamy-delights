import "../styling/Navbar.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import icon from "../imgs/iconpng.png";
import icecreambg from "../imgs/copy.jpg";
import profile from "../imgs/profile.png";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export default function Navbar() {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  function aboutList() {
    setIsActive(false);
    navigate("/about");
  }

  function aboutMenu() {
    setIsActive(false);
    navigate("/menu");
  }

  function aboutTestimonies() {
    setIsActive(false);
    navigate("/testimonies");
  }

  function aboutCart() {
    setIsActive(false);
    navigate("/checkout");
  }

  function aboutProfile() {
    setIsActive(false);
    if (auth._id) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  }

  return (
    <div
      className="navbar"
      style={{
        backgroundImage: `url(${icecreambg})`,
        backgroundSize: "100% 300%",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="navbarSection">
        <div className="leftSection col-4">
          <Link to="/about" className="about col-4">
            ABOUT
          </Link>
          <Link to="/testimonies" className="testimonies col-4">
            TESTIMONIES
          </Link>
          <Link to="/menu" className="menu col-4">
            MENU
          </Link>
        </div>
        <div className="middleSection col-4">
          <div className="iconSection">
            <Link to="/">
              <img src={icon} className="icon" alt="icon" />
            </Link>
          </div>
          <div className="titleSection">
            <Link to="/">
              <h1 className="title">Creamy Delights</h1>
            </Link>
          </div>
        </div>
        <div className="rightSection col-4">
          {/* <Link to='/order' className='order col-4'>ORDER</Link> */}
          <div className="checkout col-6">
            <Link to="/checkout" className="cartTextSection">
              <p className="cartText">CART</p>
            </Link>
            <Link to="/checkout" className="cartSection">
              <ShoppingCartIcon className="cart" />
              <div className="cartBadge">
                <p>{cartTotalQuantity}</p>
              </div>
            </Link>
          </div>
          {auth._id ? (
            <Link to="/profile" className="order col-6">
              <img src={profile} className="profile" alt="profile pic" />
            </Link>
          ) : (
            <Link to="/login" className="order col-6">
              <img src={profile} className="profile" alt="profile pic" />
            </Link>
          )}
        </div>
        <div className="dropDownMenu">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setIsActive(true)}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor="right"
            color="palevioletred"
            open={isActive}
            onClose={() => setIsActive(false)}
            onOpen={() => {}}
          >
            <div
              style={{
                backgroundColor: "palevioletred",
                height: "100vh",
                width: "10rem",
              }}
            >
              <Box textAlign="center" p={2}>
                🍨 🍨 🍨
              </Box>
              <Divider />
              <List>
                <ListItemButton onClick={aboutMenu}>
                  <ListItemText primary={"Menu"} />
                </ListItemButton>
                <div className="navHidden">
                  <ListItemButton onClick={aboutCart}>
                    <ListItemText primary={"Cart"} />
                  </ListItemButton>
                </div>
                <ListItemButton onClick={aboutProfile}>
                  <ListItemText primary={"Profile"} />
                </ListItemButton>
                <ListItemButton onClick={aboutTestimonies}>
                  <ListItemText primary={"Testimonies"} />
                </ListItemButton>
                <ListItemButton onClick={aboutList}>
                  <ListItemText primary={"About"} />
                </ListItemButton>
              </List>
            </div>
          </SwipeableDrawer>
        </div>
      </div>
    </div>
  );
}
