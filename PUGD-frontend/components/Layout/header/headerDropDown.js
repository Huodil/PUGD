import React, { useEffect, useRef } from 'react';

const headerDropDown = ({ icon, ...props }) => {
  const translationButton = useRef();
  useEffect(() => {
    // var elems = document.querySelectorAll('.notification-button, .profile-button, .translation-button, .dropdown-settings');
    var instances = M.Dropdown.init(translationButton.current, {
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false,
      //hover: false,
      gutter: 0,
      coverTrigger: false,
      alignment: "right",
      hover: false,
      closeOnClick: true,
    });
  }, [])
  return (
    <React.Fragment>


      <li className="dropdown-language">
        <a
          className="waves-effect waves-block waves-light notification-button "
          href="#"
          data-target={props.id}
          ref={translationButton} >
            {icon}
         </a>
          
        <ul className="dropdown-content black-text" id={props.id}>
          {props.children}
        </ul>


      </li>

    </React.Fragment>
  )
}
export default headerDropDown