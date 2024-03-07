import { useState,useEffect } from 'react';
import { Typography ,Box, Snackbar} from '@mui/material';
import { useFormik } from 'formik';
import basicSchema from '../scheme/index'
import axios from 'axios';
import bImage from '../images/abstract-dark-blue-futuristic-digital-grid-background.jpg'
import HeaderForm from './HeaderForm';
import TextFieldsForm from './TextField';
import RememberMe from './RememberMe';
import PrivacyTerms from './PrivacyTerms';
import Buttons from './Buttons';

export default function MainForm() {
    const[open,setOpen]= useState(false)
    const [ msg ,setMsg] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleCLose = ()=>{
      setOpen(false)
    }
    // on sumbit for formik
    const onSubmit = async()=>{
      try {
        const apiFormData = {
          email: formik.values.email,
          password: formik.values.password,
          Checkbox:false
      }
        // Make API call using axios
        const response = await axios.post('http://dev.ar.client.sstech.us/login', {
          email:apiFormData.email ,
          password:apiFormData.password  ,
        });
        // Handle successful login
        setOpen(true)
        setMsg('Login successful')
        console.log('Login successful:', response.data);
        if(formik.values.checked){
          let stringUser = JSON.stringify(apiFormData)
          localStorage.setItem("user",btoa(stringUser));
        }
        formik.resetForm()
        // Store credentials in localStorage (base64 encoded)
        localStorage.setItem('email', btoa(email));
        localStorage.setItem('password', btoa(password));
      } catch (error) {
        // Handle login failure
        console.error('Login failed:', error);
        setOpen(true)
        setMsg('be sure to write right email and password')
      }
    }
    useEffect(() => {
      // Check if credentials are stored in localStorage
      if(localStorage.getItem('user')!== null){
        const storedUser = localStorage.getItem('user');
        if (storedUser.email && storedUser.password) {
          setEmail(atob(storedUser.email)); // Decode from base64
          setPassword(atob(storedUser.passwor));
        }
         axios.post('http://dev.ar.client.sstech.us/login', {
          email:email ,
          password:password ,
        });
      }
    }, []);
    // useFormik and Yup
    const formik = useFormik({
        initialValues: { 
        email:"",
        password:"",
        checked:false
        },
        validationSchema: basicSchema,
        onSubmit:onSubmit,
    });
  return (
    <>
    <Box
      component="form"
      sx={{
        display:'flex',justifyContent:'center',alignItems:"center",
        backgroundImage: `url(${bImage})`,
        backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
      }}
      onSubmit={formik.handleSubmit}
    >
      <Box component="div" 
      sx={{
        width:'30vw',
        p:3,
        border:formik.errors.email ||formik.errors.password ?'1px solid red':'1px solid blue',
        m:'100px auto',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        gap:2,
        boxShadow: '1px 2px 20px rgb(145, 151, 189)',
        borderRadius:4,
      }}>
        <HeaderForm/>
        <Typography variant='h4' sx={{textAlign:'center'}}>Login</Typography>
        <hr style={{width:'30%',marginTop:-5,marginBottom:30}}/>
        <TextFieldsForm formik={formik} showPassword={showPassword} handleClickShowPassword={handleClickShowPassword}/>
        <RememberMe formik={formik}/>
        <Buttons/>
        <Typography variant='p' 
        sx={{
            textAlign:'center', fontSize:14,
            width:'100%'}} 
          >
            Copytight 0 2019 Test-Sstech, UC. ScedBred™is a
            trademark of Test-Sstech, LLC.
        </Typography>
       <PrivacyTerms/>
      </Box>
    </Box>
    {/* snack bar */}
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCLose}
        message={ <div style={{color :msg === 'Login successful' ? 'green':'red'}}>{msg}</div>}
        // severity= 'success'
      />
    </>
  );
}