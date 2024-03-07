import { Typography ,Box } from '@mui/material';
import i from '../images/Screenshot_1.png'

export default function HeaderForm(){
    return (
        <>
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
        </>
    )
}