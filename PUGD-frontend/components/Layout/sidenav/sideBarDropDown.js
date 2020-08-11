import React  from 'react';
const SideBarDropDown = ({ Label,icon,...props }) => {
  return (
    <li >
      <a className="collapsible-header waves-effect waves-cyan " href="#" >
        <i className="material-icons">{icon}</i>
        <span className="menu-title">

          {Label}
        </span>
        
      </a>
      <div className="collapsible-body">
        <ul className="collapsible collapsible-sub" data-collapsible="accordion">
            {props.children}
        </ul>
      </div>
    </li>
  )
}
export default SideBarDropDown