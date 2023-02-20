import React from "react";
import './App.css';

const DialogPopup = ({message, Callback, toggleFlag, SetToggleFlag}) => {
    return (
        <div className='popup-wrapper'>
            <div className='bg-popup'></div>
            <div className='popup container bg-white w-50 p-4 rounded-1'>
                <div className='d-flex justify-content-between'>
                    <h3>Warning</h3>
                    <button type='button' className='ms-2 btn btn-close' style={{width: '40px', height: '40px'}} 
                        onClick={() => { SetToggleFlag(!toggleFlag) }} title='close' aria-label="Close">
                    </button>
                </div>
                <hr />
                <div className='alert alert-warning' role='alert'>{message}</div>
                <div className='d-flex justify-content-end mt-4'>
                    <button type='button' className='ms-2 btn btn-secondary' onClick={() => { SetToggleFlag(!toggleFlag); }} title='close'><i className='fa fa-times'/> Cancel</button>
                    <button type='button' className='ms-2 btn btn-primary' title='save' onClick={() => { Callback(); SetToggleFlag(!toggleFlag); }}><i className='fa fa-save'/> Proceed</button>
                </div>
            </div>
        </div>
    );
};

export default DialogPopup;