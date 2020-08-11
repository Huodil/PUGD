import React from 'react';
import { Button } from '@material-ui/core';
import styles from './HeaderButton.module.css'
const HeaderButton = ({ children, ...props }) => {
  return (
    <Button className={styles.my_button} color="primary"  {...props} >
      {children}
    </Button>

  )
}

export default HeaderButton