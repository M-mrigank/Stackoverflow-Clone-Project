import React from 'react'
import "./LeftSidebar.css"
import Globe from "../../assets/Globe.svg"
import {NavLink} from "react-router-dom"

const LeftSidebar = () => {
  return (
    <div className='left-sidebar'>
      <div className='side-nav'>
        <NavLink to={'/'} className="side-nav-links" activeClassname="active">
          <p>Home</p>
        </NavLink>
        <div className='side-nav-div'>
          <div><p>PUBLIC</p></div>
          <NavLink to={'/Questions'} className="side-nav-links" activeClassname="active">
            <img src={Globe} alt='Globe'/>
            <p style={{paddingLeft:"10px"}}>Questions</p>
          </NavLink>
          <NavLink to={'/Tags'} style={{paddingLeft:"40px"}} className="side-nav-links" activeClassname="active">
            <p>Tags</p>
          </NavLink>
          <NavLink to={'/Users'} style={{paddingLeft:"40px"}} className="side-nav-links" activeClassname="active">
            <p>Users</p>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar
