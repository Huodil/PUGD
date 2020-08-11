import React from 'react'; 
const SidenavHeader = (props) => {

  return (
    <li >
          
          <a className="sidenav-header">
            {props.Label}
            </a>
       
      <style jsx>{`
 .sidenav-header{
    font-size: 1rem;
    font-weight: 600;
    line-height: 30px;
    height: 30px;
    margin: 0;
    padding: 0!important;
    color: #969696!important;
    display: block!important;
}
  
            `}
      </style>
    </li>
  )
}
export default SidenavHeader