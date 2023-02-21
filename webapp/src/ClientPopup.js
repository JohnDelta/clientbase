import React from "react";
import './App.css';
import { Countries } from "./Static";

const ClientPopup = ({client, toggleFlag, SetToggleFlag}) => {

    const GetFormInputsDictionary = () => {
        let nameInput = document.getElementById('newNameInput');
        let surnameInput = document.getElementById('newSurnameInput');
        let emailInput = document.getElementById('newEmailInput');
        let addressLineInput = document.getElementById('newAddressLineInput');
        let cityInput = document.getElementById('newCityInput');
        let countryInput = document.getElementById('newCountryInput');
        let mobilePhoneNumberInput = document.getElementById('newMobilePhoneNumberInput');
        let homePhoneNumberInput = document.getElementById('newHomePhoneNumberInput');
        let workPhoneNumberInput = document.getElementById('newWorkPhoneNumberInput');
        let inputs = {
            nameInput: nameInput,
            surnameInput: surnameInput,
            emailInput: emailInput,
            addressLineInput: addressLineInput,
            cityInput: cityInput,
            countryInput: countryInput,
            mobilePhoneNumberInput: mobilePhoneNumberInput,
            homePhoneNumberInput: homePhoneNumberInput,
            workPhoneNumberInput: workPhoneNumberInput
        };
        return inputs;
    }

    const GetPhoneNumberValidation = () => {
        let message = 'Atleast one of the contact numbers is required.';
        let inputsDictionary = GetFormInputsDictionary();
        if (inputsDictionary.mobilePhoneNumberInput.value === '' &&
            inputsDictionary.workPhoneNumberInput.value === '' &&
            inputsDictionary.homePhoneNumberInput.value === '') {
                inputsDictionary.mobilePhoneNumberInput.setCustomValidity(message);
                inputsDictionary.workPhoneNumberInput.setCustomValidity(message);
                inputsDictionary.homePhoneNumberInput.setCustomValidity(message);
                return false;
        }
        inputsDictionary.mobilePhoneNumberInput.setCustomValidity('');
        inputsDictionary.workPhoneNumberInput.setCustomValidity('');
        inputsDictionary.homePhoneNumberInput.setCustomValidity('');
        return true;
    }

    const IsFormValidated = () => {
        let isFormValidated = GetPhoneNumberValidation();

        let form = document.getElementById('newClientForm');
        let inputsDictionary = GetFormInputsDictionary();
        
        for(let input of Object.values(inputsDictionary)) {
            if (!input.checkValidity()) isFormValidated = false;
        }

        form.classList.add('was-validated');
        return isFormValidated;
    }

    const HaveValuesChanged = () => {
        let inputsDictionary = GetFormInputsDictionary();
        let valuesChanged = (inputsDictionary.nameInput.value !== client.name ||
            inputsDictionary.surnameInput.value !== client.surname ||
            inputsDictionary.emailInput.value !== client.email ||
            inputsDictionary.countryInput.value !== client.country ||
            inputsDictionary.cityInput.value !== client.city ||
            inputsDictionary.addressLineInput.value !== client.addressLine ||
            inputsDictionary.mobilePhoneNumberInput.value !== client.mobilePhoneNumber ||
            inputsDictionary.workPhoneNumberInput.value !== client.workPhoneNumber ||
            inputsDictionary.homePhoneNumberInput.value !== client.homePhoneNumber);
        return valuesChanged;
    }

    const SubmitForm = () => {
        if (!IsFormValidated()) return;
        if (client === null) {
            console.log('add');
        } else if (HaveValuesChanged()) {
            console.log('update');
        }
    }
    
    return (
        <div className='popup-wrapper'>
            <div className='bg-popup'></div>
            <div className='popup container bg-white w-50 p-4 rounded-1'>
                <div className='d-flex justify-content-between'>
                    <h2>New Client</h2>
                    <button type='button' className='ms-2 btn btn-close' style={{width: '40px', height: '40px'}} 
                        onClick={() => { SetToggleFlag(!toggleFlag) }} title='close' aria-label="Close">
                    </button>
                </div>
                <hr />
                <form id='newClientForm' noValidate>
                    <div className='row'>
                        <div className='col-6'>
                            <label htmlFor="newNameInput" className="form-label" title='required field'>Name*</label>
                            <input type="text" className="form-control" id="newNameInput" aria-describedby="newNameHelp" 
                                maxLength={48} minLength={3} required defaultValue={client !== null ? client.name : ''} />
                            <div className='invalid-feedback'>This field is required and accepts names between 3 to 24 characters</div>
                        </div>
                        <div className='col-6'>
                            <label htmlFor="newSurnameInput" className="form-label" title='required field'>Surname*</label>
                            <input type="text" className="form-control" id="newSurnameInput" aria-describedby="newSurnameHelp" 
                                maxLength={48} minLength={3} required defaultValue={client !== null ? client.surname : ''} />
                            <div className='invalid-feedback'>This field is required and accepts surnames between 3 and 24 characters</div>
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-6'>
                            <label htmlFor="newEmailInput" className="form-label" title='required field'>Email*</label>
                            <input type="email" className="form-control" id="newEmailInput" aria-describedby="newEmailHelp" 
                                required maxLength={48} minLength={7} defaultValue={client !== null ? client.email : ''} />
                            <div className='invalid-feedback'>This field is required and accepts emails</div>
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-6'>
                            <fieldset className='border p-4'>
                                <legend className='float-none w-auto fs-6'>Contact Number*</legend>
                                <div className='container'>
                                    <div className='row'>
                                        <label htmlFor="newMobilePhoneNumberInput" className="form-label ps-0" title='required field'>Mobile</label>
                                        <input type="text" className="form-control" id="newMobilePhoneNumberInput" aria-describedby="newMobilePhoneNumberHelp" 
                                            onChange={() => { GetPhoneNumberValidation() }} defaultValue={client !== null ? client.mobilePhoneNumber : ''} />
                                    </div>
                                    <div className='row mt-2'>
                                        <label htmlFor="newWorkPhoneNumberInput" className="form-label ps-0" title='required field'>Work</label>
                                        <input type="text" className="form-control" id="newWorkPhoneNumberInput" aria-describedby="newWorkPhoneNumberHelp" 
                                            onChange={() => { GetPhoneNumberValidation() }} defaultValue={client !== null ? client.workPhoneNumber : ''} />
                                    </div>
                                    <div className='row mt-2'>
                                        <label htmlFor="newHomePhoneNumberInput" className="form-label ps-0" title='required field'>Home</label>
                                        <input type="text" className="form-control" id="newHomePhoneNumberInput" aria-describedby="newHomePhoneNumberHelp" 
                                            onChange={() => { GetPhoneNumberValidation() }} defaultValue={client !== null ? client.homePhoneNumber : ''} />
                                        <div className='invalid-feedback'>Atleast one of the contact numbers is required.</div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className='col-6'>
                            <fieldset className='border p-4'>
                                <legend className='float-none w-auto fs-6'>Home Address</legend>
                                <div className='container'>
                                    <div className='row'>
                                        <label htmlFor="newCountryInput" className="form-label ps-0">Country</label>
                                        <select className='form-select' aria-label='newCountryInput' id='newCountryInput' required defaultValue={(client === null ? Countries[0] : client.country)}>
                                            {Countries.map((country, index) => 
                                                <option key={index} value={country}>
                                                    {country}
                                                </option>)}
                                        </select>
                                    </div>
                                    <div className='row mt-2'>
                                        <label htmlFor="newAddressLineInput" className="form-label ps-0" title='required field'>Address Line</label>
                                        <input type="text" className="form-control" id="newAddressLineInput" aria-describedby="newAddressLineHelp" 
                                            maxLength={48} minLength={3} defaultValue={client !== null ? client.addressLine : ''} />
                                        <div className='invalid-feedback'>This field accepts Address Lines between 3 and 24 characters</div>
                                    </div>
                                    <div className='row mt-2'>
                                        <label htmlFor="newCityInput" className="form-label ps-0" title='required field'>City*</label>
                                        <input type="text" className="form-control" id="newCityInput" aria-describedby="newCityHelp" 
                                            maxLength={48} minLength={3} required defaultValue={client !== null ? client.city : ''} />
                                        <div className='invalid-feedback'>This field is required and accepts cities between 3 and 24 characters</div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </form>
                <div className='d-flex justify-content-end mt-4'>
                    <button type='button' className='ms-2 btn btn-secondary' onClick={() => { SetToggleFlag(!toggleFlag) }} title='close'><i className='fa fa-times'/> Cancel</button>
                    <button type='button' className='ms-2 btn btn-primary' title='save' onClick={() => { SubmitForm() }}><i className='fa fa-save'/> Save</button>
                </div>
            </div>
        </div>
    );
};

export default ClientPopup;