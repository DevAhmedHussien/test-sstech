// MyProvider.js
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import MyContext from '../Context/Context';
import { useFormik } from 'formik';
import basicSchema from '../scheme/index'
const MyProvider = ({ children }) => {
    const[open,setOpen]= useState(false) //for Login Alert
    const [ msg ,setMsg] = useState('') // msg in Alert
    const [Username, setUsername] = useState("harendra.kumar@sstech.us");// email that i geet from local storage
    const [password, setPassword] = useState("Welcome@123"); // password that i get from locl storage 
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
          Username:apiFormData.Username,
          password:apiFormData.password,
        },
        config
        );
        // Handle successful login
        console.log(response)
        setOpen(true)
        setMsg('Login successful')
        // Store credentials in localStorage (base64 encoded)
        if(formik.values.checked){
          localStorage.setItem('email', btoa(apiFormData.Username));
          localStorage.setItem('password', btoa(apiFormData.password));
        }
        formik.resetForm()
        } catch (error) {
        // Handle login failure
        console.error('Login failed:', error);
        setOpen(true)
        setMsg('be sure to write right email and password')
        }
    }
    // quick login 
    const handleLoginAccess = async (Username,password)=>{
      try {
        // Make API call using axios
        const response = await axios.post('http://dev.ar.client.sstech.us:8080/api/Auth/login', {
          Username : Username ,
          password : password,
        },
        config
        );
        console.log('Login successful:', response.data);
        setOpen(true)
        setMsg('Login successful')
      // formik.resetForm()
      } catch (error) {
        // Handle login failure
        console.error('Login failed:', error);
        setOpen(true)
        setMsg('be sure to write right email and password')
      }
    }
    console.log('Username',Username)
    console.log('password',password)

    useEffect(() => {
      // Check if credentials are stored in localStorage
      if(localStorage.getItem('email')!== null && 
          localStorage.getItem('password')!== null ){
        const storedEmail = localStorage.getItem('email')
        const storedPassword = localStorage.getItem('password')
        if (storedEmail && storedPassword) {
          setUsername(atob(storedEmail)); // Decode from base64
          setPassword(atob(storedPassword));
        }
        // setTimeout(()=>{
        handleLoginAccess(Username,password)
        // },5000)
      }
      else{
        return null
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
