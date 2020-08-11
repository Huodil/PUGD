import React, { useRef, useEffect } from 'react';
const rightNav = () => {
  const rightNavElement = useRef();
  useEffect(() => {

    var instance = M.Sidenav.init(rightNavElement.current, {
      edge: "right"
    }); 
    
  }, [])

  return (

    <aside id="right-sidebar-nav">
      <div id="slide-out-right" className="slide-out-right-sidenav sidenav rightside-navigation" ref={rightNavElement}>
        <div className="row">
          <div className="col s2 pr-0 center">
            <i className="material-icons vertical-text-middle"><a href="#" className="sidenav-close">clear</a></i>
          </div>
        </div>
        Right nav content should go here
      </div>


    </aside>

  )
}
export default rightNav