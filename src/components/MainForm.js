import { useState,useEffect } from 'react';
import { Typography ,TextField,Box,Button  ,IconButton, InputAdornment, } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from 'formik';
import basicSchema from '../scheme/index'
import axios from 'axios';
import i from '../images/Screenshot_1.png'
import bImage from '../images/abstract-dark-blue-futuristic-digital-grid-background.jpg'

export default function MainForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
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
        console.log('Login successful:', response.data);
        if(formik.values.checked){
          let stringUser = JSON.stringify(apiFormData)
          localStorage.setItem("user",btoa(stringUser));
        }
        // Store credentials in localStorage (base64 encoded)
        localStorage.setItem('email', btoa(email));
        localStorage.setItem('password', btoa(password));
      } catch (error) {
        // Handle login failure
        console.error('Login failed:', error);
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
        <Box
          sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            gap:1,
          }}>
          <img src={i} alt='i' style={{width:'50px',height:'50px'}} />
          <Typography variant='h3' sx={{textAlign:'center'}}>Test-Sstech</Typography>
        </Box>
        <Typography variant='h4' sx={{textAlign:'center'}}>Login</Typography>
        <hr style={{width:'30%',marginTop:-5,marginBottom:30}}/>
        <TextField 
        variant="standard"
        sx={{
          input: { color: 'white' },'& .MuiInput-underline:before': { borderBottomColor: formik.errors.email?'red':''},}}
          id="outlined-multiline-flexible"
          label="E-mail"
        type='email' name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email ?
        <Typography variant='p' sx={{mt:'-10px',fontSize:14, color:'red'}}>{formik.errors.email}</Typography>
        :
        null
        }
          <TextField 

            variant="standard"
            sx={{input: { color: 'white' },'& .MuiInput-underline:before': { borderBottomColor: formik.errors.password?'red':''},}}x
            id="outlined-multiline-flexible"
            label="Password"
            type={showPassword ? "text" : "password"}
             name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                ),
            }}
        />
         {formik.errors.password ?
        <Typography variant='p' sx={{mt:'-10px',fontSize:14,color:'red'}}>{formik.errors.password} </Typography>
        :
        null
        }
        <Box sx={{
        display:'flex',justifyContent:'space-between',alignItems:"center",
        }}>
            <FormControlLabel 
            id='checked'
            label={
              <Box component="div" fontSize={14}>
                 Remember me
               </Box>
               }
            value={formik.values.Checkbox}
            onChange={formik.handleChange}
            name='checked'
            type='checkbox'
            data-indeterminate="false"
            control={<Checkbox />}  />
            <Typography variant='p' 
            sx={{fontSize:14,textDecoration:'underline',cursor:'pointer'}}>forget Me</Typography>
        </Box>
        <Box sx={{ mt:3,display:'flex',flexDirection:'column',alignItems:'center',gap:1}}>
          <Button variant="contained" type='sumbit' sx={{width:'70%'}}>Login</Button>
          <Button variant="" type='sumbit'sx={{width:'70%'}} >Sign up</Button>
        </Box>
        <Typography variant='p' sx={{
            textAlign:'center', fontSize:14,
            width:'100%'}} 
          >Copytight 0 2019 Test-Sstech, UC. ScedBred™is a
            trademark of Test-Sstech, LLC.
        </Typography>
        <Box sx={{ mt:3,display:'flex',justifyContent:'center',alignItems:'center',gap:2}}>
          <Typography variant="contained" type='sumbit' 
          sx={{width:'70%',textAlign:'center',textDecoration:'underline'}}>Terms of Services</Typography>
            |
          <Typography variant="" type='sumbit'
          sx={{width:'70%',textAlign:'center',textDecoration:'underline'}} >Privacy Policy</Typography>
        </Box>
      </Box>
    </Box>
  );
}