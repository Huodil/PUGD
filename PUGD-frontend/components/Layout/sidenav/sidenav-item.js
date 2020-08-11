import React from 'react';
import Link from 'next/link'
import Router from 'next/router'
import { Typography } from '@material-ui/core';
import styles from './sidebar.module.css'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const SidenavItem = (props) => {
  let active = ""
  if (Router.pathname.toLowerCase().startsWith(props.href.toLowerCase())) {
    active = `${styles.sidebar_list_active}`
  }
  return (
    <Link href={props.href}  >
      <a >
        <Typography className={`${styles.sidebar_list} ${active}`}>
          <RadioButtonUncheckedIcon className={styles.sidebar_list_icon} /> {props.Label}
        </Typography>
      </a>
    </Link>
  )
}
export default SidenavItem