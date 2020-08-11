import React from 'react';
import { Button, Popper, Grow, Paper, ClickAwayListener } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ButtonStyles from '../HeaderButton/HeaderButton.module.css'
import Dropdowntyles from './HeaderDropDown.module.css'
const HeaderDropDown = ({ children}) => {

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };



  return (
    <React.Fragment>
      <Button className={ButtonStyles.my_button} color="primary"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <AccountCircleIcon style={{ fontSize: "24px" }} />

      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition disablePortal
        placement="bottom-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <React.Fragment>
              <ClickAwayListener onClickAway={handleClose}>
                <Paper className={Dropdowntyles.drop_down}>
                  {children}
                </Paper>
              </ClickAwayListener>
            </React.Fragment>

          </Grow>
        )}
      </Popper>
    </React.Fragment>
  )
}

export default HeaderDropDown