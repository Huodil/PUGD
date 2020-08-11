import React from 'react';
// import Router from 'next/router' ;
// import styles from './sidebar.module.css' 

const SideBarNavigationHeader = ({ Label }) => {
 
  return (
    <li className="navigation-header">
      <a className="navigation-header-text">
        {Label}
        </a>
        <i className="navigation-header-icon material-icons">
          more_horiz
          </i>
    </li>
         
  )
}
export default SideBarNavigationHeader