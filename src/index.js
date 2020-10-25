import React, { useState } from 'react';

import ReactDOM from 'react-dom';

const _ = require('lodash');

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}

function PhoneBookForm({ addEntryToPhoneBook }) {
  const initialValue = {
    userFirstname: 'Coder',
    userLastname: 'Byte',
    userPhone: 8885559999
  }
  const defaultValue = {
    userFirstname: '',
    userLastname: '',
    userPhone: ''
  }
  const [formData, setFormData]= useState(initialValue);
  const handleSubmit= (e) =>{
    e.preventDefault();
    if(!_.isEqual(formData, defaultValue)){
      addEntryToPhoneBook(curFormData => [...curFormData, formData]);
      setFormData(defaultValue);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname' 
        value={formData.userFirstname}
        onChange={e => 
          setFormData({...formData, userFirstname: e.target.value})}
        type='text'
      />
      <br/>
      <label>Last name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userLastname'
        name='userLastname' 
        type='text' 
        value={formData.userLastname}
        onChange={e => 
          setFormData({...formData, userLastname: e.target.value})}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone' 
        name='userPhone' 
        type="number"
        value={formData.userPhone}
        onChange={e => 
          setFormData({...formData, userPhone: e.target.value})}
      />
      <br/>
      <input 
        style={style.form.submitBtn} 
        className='submitButton'
        type='submit' 
        value='Add User' 
      />
    </form>
  )
}

function InformationTable({entryToPhoneBook}) {
  return (
    <table style={style.table} className='informationTable'>
      <thead> 
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead> 
      <tbody>
        {entryToPhoneBook.sort((a,b) => a.userLastname.localeCompare(b.userLastname)).map((phoneBook, index) =>
          <tr key ={index}>
            <th style={style.tableCell}>{phoneBook.userFirstname}</th>
            <th style={style.tableCell}>{phoneBook.userLastname}</th>
            <th style={style.tableCell}>{phoneBook.userPhone}</th>
        </tr>
        )}
      </tbody>
    </table>
  );
}

function Application(props) {
  const [entryToPhoneBook, addEntryToPhoneBook] = useState([]);
  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook}/>
      <InformationTable entryToPhoneBook={entryToPhoneBook}/>
    </section>
  );
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);