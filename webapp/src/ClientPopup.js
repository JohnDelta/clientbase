import React, { useEffect, useState } from "react";
import './App.css';
import { Countries, API_ENDPOINTS } from "./Static";

const ClientPopup = ({client, toggleFlag, SetToggleFlag, SetClients}) => {

    const [isUpdateForm, SetUpdateForm] = useState(client !== null);
    const [name, SetName] = useState('');
    const [surname, SetSurname] = useState('');
    const [email, SetEmail] = useState('');
    const [country, SetCountry] = useState(Countries[0]);
    const [city, SetCity] = useState('');
    const [addressLine, SetAddressLine] = useState('');
    const [mobilePhoneNumber, SetMobilePhoneNumber] = useState('');
    const [homePhoneNumber, SetHomePhoneNumber] = useState('');
    const [workPhoneNumber, SetWorkPhoneNumber] = useState('');

    useEffect(() => {
        if (isUpdateForm) {
            SetName(client.name);
            SetSurname(client.surname);
            SetEmail(client.email);
            SetCountry(client.country);
            SetCity(client.city);
            SetAddressLine(client.addressLine);
            SetMobilePhoneNumber(client.mobilePhoneNumber);
            SetHomePhoneNumber(client.homePhoneNumber);
            SetWorkPhoneNumber(client.workPhoneNumber);
        }
    }, []);

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

    const IsFormValid = () => {
        let isFormValid = GetPhoneNumberValidation();

        let form = document.getElementById('newClientForm');
        let inputsDictionary = GetFormInputsDictionary();
        
        for(let input of Object.values(inputsDictionary)) {
            if (!input.checkValidity()) isFormValid = false;
        }

        form.classList.add('was-validated');
        return isFormValid;
    }

    const HaveValuesChanged = () => {
        let valuesChanged = (
            name !== client.name ||
            surname !== client.surname ||
            email !== client.email ||
            country !== client.country ||
            city !== client.city ||
            addressLine !== client.addressLine ||
            mobilePhoneNumber !== client.mobilePhoneNumber ||
            workPhoneNumber !== client.workPhoneNumber ||
            homePhoneNumber !== client.homePhoneNumber);
        return valuesChanged;
    }

    const AddClient = () => {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "name": name,
            "surname": surname,
            "email": email,
            "country": country,
            "city": city,
            "addressLine": addressLine,
            "mobilePhoneNumber": mobilePhoneNumber,
            "homePhoneNumber": homePhoneNumber,
            "workPhoneNumber": workPhoneNumber
        });
        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw
        };
        fetch(API_ENDPOINTS.CreateClient, requestOptions)
        .then(response => {
            if (response.status !== 200) { console.error(response); }
            else {
                response.text().then(res => {
                    let jsonObj = JSON.parse(res);
                    SetClients(prev => [...prev, jsonObj]);
                    SetToggleFlag(!toggleFlag);
                });
            }})
        .catch(error => { console.error(error); });
    }

    const UpdateClient = () => {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "userId": client.userId,
            "name": name,
            "surname": surname,
            "email": email,
            "country": country,
            "city": city,
            "addressLine": addressLine,
            "mobilePhoneNumber": mobilePhoneNumber,
            "homePhoneNumber": homePhoneNumber,
            "workPhoneNumber": workPhoneNumber
        });
        var requestOptions = {
            method: 'PUT',
            headers: headers,
            body: raw
        };
        fetch(API_ENDPOINTS.UpdateClient, requestOptions)
        .then(response => {
            if (response.status !== 200) { console.error(response); }
            else {
                response.text().then(res => {
                    let jsonObj = JSON.parse(res);
                    SetClients(prev => [...prev.filter(client => client.userId !== jsonObj.userId)]);
                    SetClients(prev => [...prev, jsonObj]);
                    SetToggleFlag(!toggleFlag);
                });
            }})
        .catch(error => { console.error(error); });
    }

    const SubmitForm = () => {
        if (!IsFormValid()) return;
        if (!isUpdateForm) {
            AddClient();
        } else if (HaveValuesChanged()) {
            UpdateClient();
        }
    }
    
    return (
        <div className='popup-wrapper'>
            <div className='bg-popup'></div>
            <div className='popup container bg-white w-50 p-4 rounded-1'>
                <div className='d-flex justify-content-between'>
                    <h2>{!isUpdateForm ? 'New Client' : 'Update Client'}</h2>
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
                                maxLength={48} minLength={3} required value={name} onChange={(e) => {SetName(e.target.value)}} />
                            <div className='invalid-feedback'>This field is required and accepts names between 3 to 24 characters</div>
                        </div>
                        <div className='col-6'>
                            <label htmlFor="newSurnameInput" className="form-label" title='required field'>Surname*</label>
                            <input type="text" className="form-control" id="newSurnameInput" aria-describedby="newSurnameHelp" 
                                maxLength={48} minLength={3} required value={surname} onChange={(e) => {SetSurname(e.target.value)}} />
                            <div className='invalid-feedback'>This field is required and accepts surnames between 3 and 24 characters</div>
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-6'>
                            <label htmlFor="newEmailInput" className="form-label" title='required field'>Email*</label>
                            <input type="email" className="form-control" id="newEmailInput" aria-describedby="newEmailHelp" 
                                required maxLength={48} minLength={7} value={email} onChange={(e) => {SetEmail(e.target.value)}} />
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
                                        <input type="text" className="form-control" id="newMobilePhoneNumberInput" aria-describedby="newMobilePhoneNumberHelp" maxLength={48} minLength={3}
                                            onChange={(e) => { SetMobilePhoneNumber(e.target.value); GetPhoneNumberValidation(); }} value={mobilePhoneNumber} />
                                    </div>
                                    <div className='row mt-2'>
                                        <label htmlFor="newWorkPhoneNumberInput" className="form-label ps-0" title='required field'>Work</label>
                                        <input type="text" className="form-control" id="newWorkPhoneNumberInput" aria-describedby="newWorkPhoneNumberHelp" maxLength={48} minLength={3}
                                            onChange={(e) => { SetWorkPhoneNumber(e.target.value); GetPhoneNumberValidation(); }} value={workPhoneNumber} />
                                    </div>
                                    <div className='row mt-2'>
                                        <label htmlFor="newHomePhoneNumberInput" className="form-label ps-0" title='required field'>Home</label>
                                        <input type="text" className="form-control" id="newHomePhoneNumberInput" aria-describedby="newHomePhoneNumberHelp" maxLength={48} minLength={3}
                                            onChange={(e) => { SetHomePhoneNumber(e.target.value); GetPhoneNumberValidation(); }} value={homePhoneNumber} />
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
                                        <select className='form-select' aria-label='newCountryInput' id='newCountryInput' required value={country} onChange={(e) => {SetCountry(e.target.value)}}>
                                            {Countries.map((country, index) => 
                                                <option key={index} value={country}>
                                                    {country}
                                                </option>)}
                                        </select>
                                    </div>
                                    <div className='row mt-2'>
                                        <label htmlFor="newAddressLineInput" className="form-label ps-0" title='required field'>Address Line*</label>
                                        <input type="text" className="form-control" id="newAddressLineInput" aria-describedby="newAddressLineHelp" 
                                            maxLength={48} minLength={3} required value={addressLine} onChange={(e) => {SetAddressLine(e.target.value)}} />
                                        <div className='invalid-feedback'>This field accepts Address Lines between 3 and 24 characters</div>
                                    </div>
                                    <div className='row mt-2'>
                                        <label htmlFor="newCityInput" className="form-label ps-0" title='required field'>City*</label>
                                        <input type="text" className="form-control" id="newCityInput" aria-describedby="newCityHelp" 
                                            maxLength={48} minLength={3} required value={city} onChange={(e) => {SetCity(e.target.value)}} />
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