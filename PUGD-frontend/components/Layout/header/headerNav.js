import React from 'react';
import HeaderDropDown from './headerDropDown';
import DropDownItem from '@/components/ui/dropdown/dropdownItem';
import  Router   from 'next/router';
import { useTranslation } from 'react-i18next';
const headerNav = () => {
const logoutHandle = ()=>{
  localStorage.removeItem("token")
  Router.push("/")
  console.log("loggn out");
  
  
}
const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
      <header className="page-topbar" id="header">
        <div className="navbar navbar-fixed" >
          <nav
            className={`"navbar-main navbar-color nav-collapsible navbar-dark gradient-45deg-purple-deep-orange gradient-shadow nav-expanded"`}>
            <div className="nav-wrapper">
              <ul className="navbar-list right">
                <HeaderDropDown icon={<span className="flag-icon flag-icon-gb" style={{ lineHeight: "64px" }}></span>} id="translation-dropdown" >
                  <DropDownItem className="dropdown-item black-text" href="#!">
                    <i className="flag-icon flag-icon-gb"></i>
                    <span className="grey-text text-darken-1"
                      onClick={
                        e=>i18n.changeLanguage('en')
                      }
                    >English</span>
                  </DropDownItem>
                  <DropDownItem className="dropdown-item black-text" href="#!">
                    <i className="flag-icon flag-icon-fr"></i>
                    <span className="grey-text text-darken-1"
                    onClick={
                      e=>i18n.changeLanguage('fr')
                    }
                    >French</span>
                  </DropDownItem>
                  <DropDownItem className="dropdown-item black-text" href="#!">
                    <i className="flag-icon flag-icon-pt"></i>
                    <span className="grey-text text-darken-1">Portuguese</span>
                  </DropDownItem>
                </HeaderDropDown>

                <li className="hide-on-med-and-down"><a className="waves-effect waves-block waves-light toggle-fullscreen"
                  href="#"><i className="material-icons">settings_overscan</i></a></li>

                <HeaderDropDown icon={<i className="material-icons" >notifications_none</i>} id="notification-dropdown">
                  <DropDownItem className="dropdown-item black-text" href="#!">
                    <h6>NOTIFICATIONS<span className="new badge">5</span></h6>
                  </DropDownItem>
                  <DropDownItem className="divider" href="#!">
                  </DropDownItem>
                  <DropDownItem className="dropdown-item black-text" href="#!">
                    <span
                      className="material-icons icon-bg-circle cyan small">add_shopping_cart</span> A new order has been
                placed!
                  </DropDownItem>
                </HeaderDropDown>


                <HeaderDropDown icon={<i className="material-icons">person_outline</i>} id="avatar-dropdown">
                  <DropDownItem className="dropdown-item black-text" href="#!">
                    <i className="material-icons">person_outline</i> Profile
                  </DropDownItem>
                  <DropDownItem className="dropdown-item black-text" href="#!" onClick={logoutHandle}>
                    <i className="material-icons" >keyboard_tab</i> Logout
                  </DropDownItem>

                </HeaderDropDown>


                <li><a className="waves-effect waves-block waves-light sidenav-trigger" href="#"
                  data-target="slide-out-right"><i className="material-icons">format_indent_increase</i></a></li>
              </ul>


            </div>

          </nav>
        </div>
      </header>
    </React.Fragment>
  )
}
export default headerNav