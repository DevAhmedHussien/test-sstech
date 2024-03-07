import { Typography ,Box } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
export default function RememberMe({formik}){
    return(
        <>
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
        </Box></>
    )
}