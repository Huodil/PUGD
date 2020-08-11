import React, { useRef, useEffect, useState } from 'react'
const Modal = ({label, children, open,onClose, ...props }) => {
    //The modal needs a unique id to work properly 
    const id = "modal" + 100
    // the ref for the modal
    const modalElement = useRef();
    // initialize the modal
    useEffect(() => {
        // Initialize the modal and store the instance in the component instance
        Modal.instance = M.Modal.init(modalElement.current, {
            preventScrolling: true,
            onCloseEnd:onClose
        });
        document.body.appendChild(modalElement.current)
    }, [])
    // Handle the change of the open state
    useEffect(() => {
        if (open)
            openModal()
        else
            closeModal()
    }, [open])

    const openModal = () => {
        Modal.instance.open()
    }
    const closeModal = () => {
        Modal.instance.close()
    }
    return (
        <React.Fragment>
            {/* <a className="waves-effect waves-light btn modal-trigger" href={`#${id}`}>
                {label}
            </a> */}
            <div id={`${id}`} className="modal custom-modal" ref={modalElement}>
                <div className="modal-content">
                    {children}
                </div>
            </div>
            <style jsx>
                {` .custom-modal{
                    top:0 !important;
                    bottom:0 !important;
                    width: 80% !important;
                }`}
            </style>
        </React.Fragment>
    )
}
export default Modal

