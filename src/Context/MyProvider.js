// MyProvider.js
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import MyContext from '../Context/Context';
import { useFormik } from 'formik';
import basicSchema from '../scheme/index'


const MyProvider = ({ children }) => {
    const[open,setOpen]= useState(false) //for Login Alert
    const [ msg ,setMsg] = useState('') // msg in Alert
    const [Username, setUsername] = useState('');// email that i geet from local storage
    const [password, setPassword] = useState(''); // password that i get from locl storage 
    const [showPassword, setShowPassword] = useState(false); // eye Icon to show pass
    // function to show password and disapear 
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleCLose = ()=>{
      setOpen(false)
    }
    // Set the Content-Type header to application/json
    const config = {
      headers: {
          'Content-Type': 'application/json',
      },
    };
    // on sumbit for formik
    const onSubmit = async()=>{
      try {
        const apiFormData = {
          Username: formik.values.email,
          password: formik.values.password,
          // Checkbox:false
        }
        // Make API call using axios
        const response = await axios.post('http://dev.ar.client.sstech.us:8080/api/Auth/login', 
        {
          Username:apiFormData.Username ,
          password:apiFormData.password,
        },
        config
        );
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
        localStorage.setItem('email', btoa(Username));
        localStorage.setItem('password', btoa(password));
        } catch (error) {
        // Handle login failure
        console.error('Login failed:', error);
        setOpen(true)
        setMsg('be sure to write right email and password')
        console.error('Error Status:', error.response.status);
        console.error('Error Message:', error.response.data.Message);
        }
    }
    // quick login 
    const handleLoginAccess = async ()=>{
      try {
        // Make API call using axios
        const response = await axios.post('http://dev.ar.client.sstech.us:8080/api/Auth/login', {
          Username ,
          password,
        },
        );
      console.log('Login successful:', response.data);
      formik.resetForm()
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
          setUsername(atob(storedUser.email)); // Decode from base64
          setPassword(atob(storedUser.passwor));
        }
        handleLoginAccess()
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
    <MyContext.Provider 
    value={{open,formik,msg,showPassword,handleClickShowPassword,handleCLose,onSubmit}}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
