import { Box, Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import Style from './styleHome';
import Wall from '../../assets/wallpaper.mp4';
import DownIcon from '@mui/icons-material/KeyboardArrowDown';

const style = Style();
function Home() {
    return (
        <Box sx={style.body}>

            {/* Background */}
            <video
                autoPlay
                loop
                muted
                style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                minHeight: 'inherit',
                objectFit: 'cover',
                zIndex: -1,
                }}
            >
                <source src={Wall} type="video/mp4" />
            </video>


            {/* Dark gradients */}
            <Box 
                sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                minHeight: 'inherit',
                background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))',
                zIndex: -1, 
                }}
            />
            <Navbar />
            <Box sx={
                {
                    display: 'flex',
                    height: '100vh',
                    minHeight: 'inherit',
                }
            }>
                <Box sx={style.hero}>
                    <Box sx={style.header}>
                        <Typography variant='h2' sx={{...style.subTitle, marginTop: '2rem'}}>DEPARTMENT OF</Typography>
                        <Typography variant='h1' sx={style.title}>BCA</Typography>     
                    </Box>          
                    <Box sx={style.scDown}>
                        <Typography variant='h6'>Scroll Down</Typography>
                        <DownIcon />
                    </Box> 
                </Box>
                <Box>Insta</Box>
            </Box>
            {/* <Box sx={style.divider}>
                <svg data-name="Layer 1" style={{
                    position: 'relative',
                    display: 'block',
                    width: 'calc(100% + 1.3px)',
                    height: '81px',
                    transform: 'rotateY(180deg)',
                }} 
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" style={{fill: '#FFFFFF'}}></path>
                </svg>
            </Box> */}
        </Box>
    );
}

export default Home;