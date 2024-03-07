import { Box,Button } from '@mui/material';
const style={ mt:3,display:'flex',flexDirection:'column',alignItems:'center',gap:1}
export default function Buttons(){
    return(
        <>
        <Box sx={style}>
          <Button variant="contained" type='sumbit' sx={{width:'70%'}}>Login</Button>
          <Button variant="" type='sumbit'sx={{width:'70%'}} >Sign up</Button>
        </Box>
        </>
    )
}