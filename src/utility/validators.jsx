const REGEX_NAME = /\d+/g;
const REGEX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const REGEX_CONTACT = /\D+/g;
const REGEX_CONTACT_RANGE = /\d+/g;

const handelErrorsName = (values) => {
     if (values !== '') return values.match(REGEX_NAME);
};

const handelErrorsEmail = (values) => {
     if (values !== '') return values.match(REGEX_EMAIL);
};

const handelErrorsContact = (values) => {
     let obj = {};
     const getLength = values.match(REGEX_CONTACT_RANGE);
     const checkRange =
          getLength?.[0].length >= 6 && getLength?.[0].length <= 12;

     if (values !== '') {
          obj['valid'] = values.match(REGEX_CONTACT);
          obj['range'] = checkRange;
     }

     return obj;
};

const errors = {
     handelErrorsName,
     handelErrorsEmail,
     handelErrorsContact,
};

export default errors;
