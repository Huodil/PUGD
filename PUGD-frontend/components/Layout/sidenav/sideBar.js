
import React, { useRef, useEffect, useState } from "react";
import SideBarDropDown from "./sideBarDropDown";
import SideBarNavigationHeader from "./sideBarNavigationHeader";
import SideBarDropDownItem from "./sideBarDropDownItem";
// import AuthoritiesSideItems from "../../admin/SidebarItems";
import Router from "next/router";
import menuBuilder from "@/static_api/menu.json";
const sideBar = ({ collapsedState: [collapsed, setcollapsed] }) => {
  // State : Side nav hovred
  const [hoverClass, setHoverClass] = useState("");
  // State of side nav in collapsed state
  const [collapsedClass, setcollapsedClass] = useState("nav-lock");
  
  // toggle the Hover state of the sidenav
  const sideBarToggle = (inside) => {
    setcollapsedClass("")
    if (inside)
      setHoverClass("nav-expanded");
    else
      setHoverClass("nav-collapsed")
  }
  // toggle the collapsed state of the sidenav
  const toggleCollapsed = () => {
    setHoverClass("")
    if (collapsedClass === "nav-collapsed" || collapsedClass === "")
      setcollapsedClass("nav-lock")
    else
      setcollapsedClass("nav-collapsed")
    setcollapsed(!collapsed)
  }
  // Element ref to init the collapsible
  const collapsibleHeader = useRef();
  useEffect(() => {
    var instances = M.Collapsible.init(collapsibleHeader.current,
      {
        accordion: false,
        onOpenStart: () => disableWindowScroll(),
        onOpenEnd: () => enableWindowScroll(),
        onCloseStart: () => disableWindowScroll(),
        onCloseEnd: () => enableWindowScroll(),

      });
  }, [])
  return (
    <aside className={`sidenav-main nav-expanded nav-lock nav-collapsible sidenav-light navbar-full sidenav-active-rounded ${collapsedClass} ${hoverClass}`}
      onMouseEnter={() => collapsed && sideBarToggle(true)}
      onMouseLeave={() => collapsed && sideBarToggle(false)}>
      <div className="brand-sidebar">
        <h1 className="logo-wrapper">
          <a className="brand-logo darken-1" href="#" >
            <img className="hide-on-med-and-down " src="/app-assets/images/logo/materialize-logo.png" alt="materialize logo" />
            <img className="show-on-medium-and-down hide-on-med-and-up" src="/app-assets/images/logo/materialize-logo-color.png" alt="materialize logo" />
            <span className="logo-text hide-on-med-and-down">
              PUGD
            </span>
          </a>
          <a className="navbar-toggler" href="#" onClick={toggleCollapsed}>
            <i className="material-icons">
              {collapsed ? "radio_button_unchecked" : "radio_button_checked"}
            </i>
          </a>
        </h1>
      </div>
      <ul
        className="sidenav sidenav-collapsible leftside-navigation collapsible sidenav-fixed menu-shadow"
        id="slide-out"
        data-menu="menu-navigation"
        data-collapsible="menu-accordion"
        ref={collapsibleHeader}
        style={{ "overflow-y": "scroll" }}
      >

        <React.Fragment>
          {Object.keys(menuBuilder).map((e) => {
            return (<React.Fragment key={e}>
              <SideBarNavigationHeader Label={menuBuilder[e].label} />
              {menuBuilder[e].menu.map((item, index) => {
                return (
                  <SideBarDropDown
                    Label={item.Label}
                    key={index}
                    icon={item.Icon}
                  >
                    {item.Children.map((subItem, index) => {
                      return (
                        <SideBarDropDownItem
                          Label={subItem.Label}
                          key={index}
                          href={subItem.href}
                        />
                      );
                    })}
                  </SideBarDropDown>
                );
              })}
            </React.Fragment>

            );
          })}

        </React.Fragment>

      </ul>
      <div className="navigation-background"/>
      <a
        className="sidenav-trigger btn-sidenav-toggle btn-floating btn-medium waves-effect waves-light hide-on-large-only"
        href="#"
        data-target="slide-out"
      >
        <i className="material-icons">menu</i>
      </a>
    </aside>
  );
};
if (typeof window !== "undefined") {
  var winX = null, winY = null;
  window.addEventListener('scroll', function () {
    if (winX !== null && winY !== null) {
      window.scrollTo(winX, winY);
    }
  });

}
function disableWindowScroll() {
  winX = window.scrollX;
  winY = window.scrollY;
}
function enableWindowScroll() {
  winX = null;
  winY = null;
}
export default sideBar;