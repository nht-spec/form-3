import {InputLabel, MenuItem, TextField} from '@mui/material';
import {Box} from '@mui/system';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import ButtonForm from '../../shareComponents/Button/index';
import validationMessage from '../../utility/validationMessage';
import errors from '../../utility/validators';
import style from './style.scss';
Form.propTypes = {
     handlesubmit: PropTypes.func,
};

const genders = [
     {
          value: 'Male',
          label: 'Male',
     },
     {
          value: 'Female',
          label: 'Female',
     },
     {
          value: 'Others',
          label: 'Others',
     },
     {
          value: 'I wish not to say',
          label: 'I wish not to say',
     },
];

function Form({initialValue, handlesubmit}) {
     let valueObj = {name: '', email: '', contact: '', gender: '', notes: ''};
     const [mode, setMode] = useState(false);
     const [checkErrorsName, setcheckErrorsName] = useState(true);
     const [checkErrorsEmail, setcheckErrorsEmail] = useState(true);
     const [checkErrorsContact, setcheckErrorsContact] = useState(true);
     const [nameValue, setNameValue] = useState(initialValue.name);
     const [emailValue, setEmailValue] = useState(initialValue.email);
     const [contactValue, setContactValue] = useState(initialValue.contact);
     const [notesValue, setNotesValue] = useState(initialValue.notes);
     const [gender, setGender] = useState(initialValue.gender);

     const [name, setName] = useState(null);
     const [email, setEmail] = useState(initialValue.email);
     const [contact, setContact] = useState(null);
     const [notes, setNotes] = useState(initialValue.notes);

     const [nameMessage, setNameMessage] = useState();
     const [emailMessage, setEmailMessage] = useState();
     const [contactMessage, setContactMessage] = useState();
     const [genderMessage, setGenderMessage] = useState();
     const [notesMessage, setNotesMessage] = useState();

     const handleSubmit = (evt) => {
          evt.preventDefault();
          const checkValue =
               checkErrorsName && checkErrorsEmail && checkErrorsContact;

          const valid = Object.values(valueObj).every((x) => x !== '');

          console.log(valid, checkErrorsContact);
          for (const [key, value] of Object.entries(valueObj)) {
               if (!value) {
                    key === 'name' &&
                         setNameMessage(validationMessage.messageName.requied);
                    key === 'email' &&
                         setEmailMessage(
                              validationMessage.messageEmail.requied
                         );

                    key === 'contact' &&
                         setContactMessage(
                              validationMessage.messageContact.requied
                         );

                    key === 'gender' &&
                         setGenderMessage(
                              validationMessage.messageGender.requied
                         );

                    key === 'notes' &&
                         setNotesMessage(
                              validationMessage.messageNotes.requied
                         );
               }
          }

          if (handlesubmit && checkValue !== false && valid === true) {
               handlesubmit(valueObj);
               setMode(true);
          }
          mode && setMode(false);
     };

     const handelChange = (values) => {
          const {value, name} = values.target;

          switch (name) {
               case 'name':
                    errors.handelErrorsName(value);
                    setName(errors.handelErrorsName(value));
                    setNameValue(value);
                    break;

               case 'email':
                    errors.handelErrorsEmail(value);
                    setEmail(errors.handelErrorsEmail(value));
                    setEmailValue(value);
                    break;

               case 'contact':
                    console.log(value);
                    errors.handelErrorsContact(value);
                    setContact(errors.handelErrorsContact(value));
                    setContactValue(value);
                    break;

               case 'notes':
                    setNotes(value);
                    setNotesValue(value);
                    break;

               default:
                    values = 'dont have errors';
                    break;
          }
     };

     useEffect(() => {
          !name
               ? (valueObj['name'] = nameValue) && setcheckErrorsName(true)
               : (valueObj['name'] = nameValue) && setcheckErrorsName(false);

          !email
               ? (valueObj['email'] = emailValue) && setcheckErrorsEmail(false)
               : (valueObj['email'] = emailValue) && setcheckErrorsEmail(true);

          contact && !contact.valid && contact.range === true
               ? (valueObj['contact'] = contactValue) &&
                 setcheckErrorsContact(true)
               : (valueObj['contact'] = contactValue) &&
                 setcheckErrorsContact(false);

          gender
               ? (valueObj['gender'] = gender)
               : (valueObj['gender'] = gender);

          notes && (valueObj['notes'] = notesValue);
     }, [handleSubmit]);

     useEffect(() => {
          name
               ? setNameMessage(validationMessage.messageName.valid)
               : setNameMessage('');

          email === null
               ? setEmailMessage(validationMessage.messageEmail.valid)
               : setEmailMessage('');
          email === undefined && setEmailMessage('');

          contact && !contact.valid && setContactMessage('');
          contact &&
               contact.valid &&
               setContactMessage(validationMessage.messageContact.valid);

          contact &&
               !contact.valid &&
               contact.range === false &&
               setContactMessage(validationMessage.messageContact.range);

          gender && setGenderMessage('');
          notes && setNotesMessage('');
     }, [name, email, contact, gender, notes]);

     return (
          <div className='form-control'>
               <form onSubmit={handleSubmit}>
                    <Box
                         sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              '& .MuiTextField-root': {width: '40ch'},
                         }}
                    >
                         <div className='form-info'>
                              <div className='field'>
                                   <InputLabel>Name*</InputLabel>
                                   <TextField
                                        name='name'
                                        InputProps={{
                                             readOnly: mode,
                                        }}
                                        value={nameValue}
                                        mode={mode}
                                        margin='normal'
                                        error={nameMessage}
                                        helperText={nameMessage}
                                        onChange={handelChange}
                                   />
                              </div>
                              <div className='field'>
                                   <InputLabel>Email-Address*</InputLabel>
                                   <TextField
                                        name='email'
                                        mode={mode}
                                        InputProps={{
                                             readOnly: mode,
                                        }}
                                        value={emailValue}
                                        error={emailMessage}
                                        margin='normal'
                                        helperText={emailMessage}
                                        onChange={handelChange}
                                   />
                              </div>
                         </div>
                         <div className='form-info'>
                              <div className='field'>
                                   <InputLabel>Contact*</InputLabel>
                                   <TextField
                                        InputProps={{
                                             readOnly: mode,
                                        }}
                                        mode={mode}
                                        margin='normal'
                                        name='contact'
                                        value={contactValue}
                                        error={contactMessage}
                                        helperText={contactMessage}
                                        onChange={handelChange}
                                   />
                              </div>
                              <div className='field'>
                                   <InputLabel>Gender*</InputLabel>
                                   <TextField
                                        name='select'
                                        InputProps={{
                                             readOnly: mode,
                                        }}
                                        select
                                        mode={mode}
                                        margin='normal'
                                        value={gender}
                                        error={genderMessage}
                                        helperText={genderMessage}
                                        onChange={(e) =>
                                             setGender(e.target.value)
                                        }
                                   >
                                        {genders.map((option) => (
                                             <MenuItem
                                                  key={option.value}
                                                  value={option.value}
                                             >
                                                  {option.label}
                                             </MenuItem>
                                        ))}
                                   </TextField>
                              </div>
                         </div>
                    </Box>
                    <InputLabel>Notes*</InputLabel>
                    <TextField
                         fullWidth
                         name='notes'
                         InputProps={{
                              readOnly: mode,
                         }}
                         multiline
                         rows={6}
                         mode={mode}
                         value={notesValue}
                         error={notesMessage}
                         margin='normal'
                         helperText={notesMessage}
                         type='text'
                         onChange={handelChange}
                    />

                    <ButtonForm mode={mode} handleSubmit={handleSubmit} />
               </form>
          </div>
     );
}

export default Form;
