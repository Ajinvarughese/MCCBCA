import { Box, Typography, Link } from '@mui/material';
import Navbar from '../../theme/Navbar/Navbar';
import Style from './styleHome';
import Wall from '../../assets/wall.mp4';
import DownIcon from '@mui/icons-material/KeyboardArrowDown';
import Instagram from '@mui/icons-material/Instagram';
import X from '@mui/icons-material/X';
import About from '../About/About';
import Gallery from '../Gallery/Gallery';
import Faculty from '../Faculty/Faculty';
import Background from '../../theme/Background/Background';
import College from '../College/College';
import Contact from '../Contact/Contact';
import { Fade } from 'easy-reveal';

import Data from '../../Hooks/Data';
const data = Data();

const style = Style();
function Home() {
    return (
        <Box>
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
                    background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8))',
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
                            <Fade up delay={500} duration={1300}>
                                <Typography variant='h2' sx={{...style.subTitle, marginTop: '2rem'}}>department of</Typography>
                                <Typography variant='h1' sx={style.title}>computer <br /> application</Typography>     
                            </Fade>
                        </Box>         
                        <Box sx={style.scDown}>
                            <Fade up delay={500} duration={1300}> 
                                <Typography variant='h6'>Scroll Down</Typography>
                                <DownIcon sx={style.down} />
                            </Fade>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingRight: '7px',
                    }}>
                        <Link href="https://x.com">
                            <X sx={{
                                width: '15px', 
                                transition: '0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                }
                            }} />
                        </Link>
                        <Link href="https://instagram.com">
                            <Instagram sx={{
                                width: '15px', 
                                transition: '0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                }
                            }} />
                        </Link>
                    </Box>
                </Box>
            </Box>
            <Box>
                <About />
            </Box>
            <Box>
                <Background
                    b2={true}
                    b2Color="var(--accent2)"
                    b2Style={true}
                >
                    <Gallery />
                    <Faculty 
                        data={data.faculty} 
                    />
                </Background>
            </Box>
            <Box>
                <College />
            </Box>
            <Box>
                <Contact />
            </Box>
        </Box>
    );
}

export default Home;