import React, { useState } from 'react';
import './App.css';
import ClientPopup from './ClientPopup';
import DialogPopup from './DialogPopup';

const App = () => {
  const [clientPopupFlag, SetClientPopupFlag] = useState(false);
  const [dialogPopupFlag, SetDialogPopupFlag] = useState(false);
  const [clientToEdit, SetClientToEdit] = useState(null);
  const [clientsToDelete, SetClientsToDelete] = useState([]);
  let clients = [
    {
      "clientId": "1",
      "name": "Mark",
      "surname": "Otto",
      "email": "Mark@gmail.com",
      "country": "England",
      "city": "London",
      "addressLine": "Baker street 221b",
      "homePhoneNumber": "333333333333",
      "workPhoneNumber": "44444444444",
      "mobilePhoneNumber": "6666666666"
    },
    {
      "clientId": "2",
      "name": "George",
      "surname": "Motto",
      "email": "Motto@gmail.com",
      "country": "Greece",
      "city": "Athens",
      "addressLine": "Xarayghs",
      "homePhoneNumber": "1111111111",
      "workPhoneNumber": "9999999999",
      "mobilePhoneNumber": "3333333333"
    }
  ];
  
  const OpenPopupToAddClient = () => {
    SetClientPopupFlag(!clientPopupFlag);
    SetClientToEdit(null);
  }

  const OpenPopupToEditClient = (clientId) => {
    let client = clients.filter(client => client.clientId === clientId)[0];
    SetClientToEdit(client);
    SetClientPopupFlag(!clientPopupFlag);
  }

  const OnChangeClientToDelete = (checkedToDelete, clientIdToDelete) => {
    if (checkedToDelete) {
      SetClientsToDelete(prev => [...prev, clientIdToDelete]);
    } else {
      SetClientsToDelete(prev => prev.filter(clientId => clientId !== clientIdToDelete));
    }
  }

  const DeleteClients = () => {
    console.log('delete');
    // take new clients list back and refresh
    // clear ids to delete array
  }

  const ConcatenateHomeAddress = (client) => {
    let address = [client.addressLine, client.city, client.country].join(', ');
    return address;
  }

  return (
    <div className="app container">
      {dialogPopupFlag ? <DialogPopup Callback={DeleteClients} message={'You are about to delete (' + clientsToDelete.length + ') client(s). Do you want to proceed?'} toggleFlag={dialogPopupFlag} SetToggleFlag={SetDialogPopupFlag} /> : ''}
      {clientPopupFlag ? <ClientPopup client={clientToEdit} toggleFlag={clientPopupFlag} SetToggleFlag={SetClientPopupFlag} /> : ''}
      <h2 className='mt-4 container'>Client Base</h2>
      
      <div className='container'>
        <div className='d-flex w-100 justify-content-end border p-2 mb-2'>
          <button type='button' className='btn btn-primary' onClick={() => { OpenPopupToAddClient(); }} title='new'>
            <i className='fa fa-plus'/> New
          </button>
          <button type='button' className='ms-2 btn btn-primary' disabled={clientsToDelete.length < 1} title='delete' onClick={() => { SetDialogPopupFlag(!dialogPopupFlag); }} >
            {clientsToDelete.length > 0 ? <span className="badge text-bg-secondary">{clientsToDelete.length}</span> : ''} <i className='fa fa-times'/> Delete
          </button>
        </div>
        
        <table className="table table-striped table-hover border">
          <thead>
            <tr>
              <th scope="col">Select</th>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {clients === null || clients.length < 1 
            ? <tr><td colSpan={7} className='text-center'>No records found</td></tr> 
            : clients.map((client, index) =>
              <tr key={index}>
                <td className='align-middle'><input type='checkbox' style={{marginLeft: '12px'}} onChange={(e) => { OnChangeClientToDelete(e.target.checked, client.clientId); }} /></td>
                <td className='align-middle'>{client.name}</td>
                <td className='align-middle'>{client.surname}</td>
                <td className='align-middle'>{client.email}</td>
                <td className='align-middle'>{ConcatenateHomeAddress(client)}</td>
                <td className='align-middle'>
                  <select className='form-select' aria-readonly>
                    {client.mobilePhoneNumber !== '' ? <option value={client.mobilePhoneNumber}>{'Mobile: ' + client.mobilePhoneNumber}</option> : ''}
                    {client.workPhoneNumber !== '' ? <option value={client.workPhoneNumber}>{'Work: ' + client.workPhoneNumber}</option> : ''}
                    {client.homePhoneNumber !== '' ? <option value={client.homePhoneNumber}>{'Home: ' + client.homePhoneNumber}</option> : ''}
                  </select>
                </td>
                <td className='align-middle'>
                  <button type='button' className='btn btn-primary' 
                    onClick={() => { OpenPopupToEditClient(client.clientId) }}>
                      <i className='fa fa-edit' title='edit'/> Edit
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;