import {Button} from '@mui/material';
import React from 'react';

ButtonForm.propTypes = {};

function ButtonForm({mode}) {
     return (
          <div style={{display: 'flex', justifyContent: 'center'}}>
               <Button
                    style={{width: '80px'}}
                    type='submit'
                    variant='contained'
               >
                    {mode === false ? 'save' : 'edit'}
               </Button>
          </div>
     );
}

export default ButtonForm;
