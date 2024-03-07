import { Typography ,Box } from '@mui/material';
const style = {
width:'70%',
textAlign:'center',
textDecoration:'underline',
cursor:'pointer'
}
export default function PrivacyTerms(){
    return(
        <>
         <Box sx={{ mt:3,display:'flex',justifyContent:'center',alignItems:'center',gap:2}}>
          <Typography variant="contained" type='sumbit' sx={style}>Terms of Services</Typography>
            |
          <Typography variant="" type='sumbit' sx={style} >Privacy Policy</Typography>
        </Box></>
    )
}