import { Typography ,TextField,IconButton, InputAdornment} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
export default function TextFieldsForm({formik ,showPassword ,handleClickShowPassword}){
    return(
        <>
        <TextField 
          variant="standard"
          InputLabelProps={{
          style: { color: 'white' },
          }}
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
            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{input: { color: 'white' },
            '& .MuiInput-underline:before': { borderBottomColor: formik.errors.password?'red':''},}}x
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
        </>
    )
}