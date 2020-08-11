import React from 'react';
// import Router from 'next/router' ;
// import styles from './sidebar.module.css' 
import Link from "next/link"
const DropDownItem = ({className,href,children,...props}) => { 
  
  return (
          <li  {...props}>
            <Link href={href}>
            <a className={`${className}`}>
                {children}
            </a>
            </Link>
      
          </li>
         
  )
}
export default DropDownItem