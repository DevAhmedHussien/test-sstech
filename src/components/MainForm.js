import {useContext } from 'react';
import { Typography ,Box, Snackbar} from '@mui/material';
import bImage from '../images/abstract-dark-blue-futuristic-digital-grid-background.jpg'
import HeaderForm from './HeaderForm';
import TextFieldsForm from './TextField';
import RememberMe from './RememberMe';
import PrivacyTerms from './PrivacyTerms';
import Buttons from './Buttons';
import MyContext from '../Context/Context';

export default function MainForm() {
    const { formik,open,msg,showPassword,handleCLose,handleClickShowPassword} = useContext(MyContext);
  return (
    <>
    <Box
      component="div"
      sx={{
        height:'100vh',
        display:'flex',justifyContent:'center',alignItems:"center",
        backgroundImage: `url(${bImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box component="form" 
      sx={{
        width:'30vw',
        p:3,
        border:formik.errors.email ||formik.errors.password || msg === 'be sure to write right email and password'?'1px solid red':'1px solid blue',
        m:'100px auto',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        gap:2,
        boxShadow: '1px 2px 20px rgb(145, 151, 189)',
        borderRadius:4,
      }}
      onSubmit={formik.handleSubmit}
      >
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
            Copytight 0 2019 Test-Sstec h, UC. ScedBred™is a
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