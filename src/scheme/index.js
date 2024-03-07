import * as yup from 'yup';
const passwordRules = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

 const basicScheme = yup.object().shape({
    email:yup.string().email("please enter email").required('Required*'),
    password:yup.string().min(5).matches( passwordRules ,{ message :'wrong password'}).required('Required*')
})
export default basicScheme ;
