import { Box, Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import Style from './styleHome';
import Wall from '../../assets/wall.mp4';
import DownIcon from '@mui/icons-material/KeyboardArrowDown';
import Instagram from '@mui/icons-material/Instagram';
import X from '@mui/icons-material/X';
import About from '../About/About';
import Gallery from '../Gallery/Gallery';

const style = Style();
function Home() {
    return (
        <>
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
                    background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
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
                            <Typography variant='h2' sx={{...style.subTitle, marginTop: '2rem'}}>department of</Typography>
                            <Typography variant='h1' sx={style.title}>computer <br /> application</Typography>     
                        </Box>          
                        <Box sx={style.scDown}>
                            <Typography variant='h6'>Scroll Down</Typography>
                            <DownIcon sx={style.down} />
                        </Box> 
                    </Box>
                </Box>
            </Box>
            <Box>
                <About />
            </Box>
            <Box>
                <Gallery />
            </Box>
        </>
    );
}

export default Home;