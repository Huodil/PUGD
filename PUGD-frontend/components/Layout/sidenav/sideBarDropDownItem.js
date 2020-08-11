import React from 'react';
 
import DropDownItem from '@/components/ui/dropdown/dropdownItem';
import Router from 'next/router';
import styles from './sidebar.module.css'
 
const SideBarDropDownItem = ({ Label, href, ...props }) => {
  let active = ""
  if (typeof window != "undefined" && Router.pathname.toLowerCase().startsWith(href.toLowerCase())) {
    active = `${styles.selected}`
  }
  return (
    <DropDownItem className={active} href={href}>
      <i className="material-icons">
        radio_button_unchecked
      </i>
      <span>
        {Label}
      </span>
    </DropDownItem>
  )
}
export default SideBarDropDownItem