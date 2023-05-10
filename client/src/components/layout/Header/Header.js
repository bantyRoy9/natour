import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactNavbar } from 'overlay-navbar'
import './Header.css'
import logo from './../../../img/logo-green.png'
import { useSelector } from 'react-redux';
import UserOption from './UserOption';
import { navigationUrl } from '../../../json/navList'
const option ={
  link1Padding:"1vmax",
  link2Margin:"0",
  link3Margin:"0",
  link4Margin:"1vmax",
  link1Family:"Franklin Gothic Medium",
  searchIconMargin:"0.5vmax",
  profileIconMargin:"0.5vmax",
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "10vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Tours",
  link3Text: "Destination",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/tours",
  link3Url: "/destination",
  link4Url: "/about",
  link1Size: "1.5vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "black",
  searchIconColor: "red",
  cartIconColor: "green",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",

}
const Header = () => {

  const {user,isAuthenticated,error} = useSelector(state=>state.user)
  console.log(user,isAuthenticated,error);
  return (
      <>
      {/* <ReactNavbar {...option}  className='header-res'/> */}
      <header class="header">
        <nav class="nav nav--tours">
          <div className="logoSection">
            <img src="/img/logo-green.png" alt="" />
          </div>
          <div className="navlist">
            <ul className="nav_list">
              {navigationUrl.map((el,idx)=>(
                <li id={`menu-item-${idx}`}>
                  {el.subPage.length ? <><div className='subToggle'></div></>:<></>}
                  <NavLink to={el.pageUrl}>{el.name}</NavLink>
                  <ul className="sub-menu">
                    {el.subPage.map((ele,i)=>(
                      <li id={`subMenu-item-${i}`}>
                      <NavLink to={ele.pageUrl}>{el.name}</NavLink>                      
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>  
          </div>
          <div className="navProfile">
          <ul className="nav_list">
            <NavLink to={'/search'}><i class="fa-solid fa-magnifying-glass"></i></NavLink>
            {isAuthenticated ?
            <UserOption user={user}/>:<NavLink className={'nav-login'} to={'/login'}><i class="fa-solid fa-user"> Login</i></NavLink> }
            </ul>
          </div>
        </nav>
      </header>

      </>
  )
}

export default Header