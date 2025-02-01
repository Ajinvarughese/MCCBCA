import { Box, Typography, Link } from '@mui/material';
import Navbar from '../../theme/Navbar/Navbar';
import Style from './styleHome';
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
import Logo from "../../assets/logoMain.png";
import OldAthena from "../../assets/old-athena.jpg";



import Data from '../../Hooks/Data';
import { Helmet } from 'react-helmet';
const data = Data();

const style = Style();
function Home() {
    return (
        <>
            <Helmet>
                <title>BCA Department MCC</title>
                <link rel="icon" href={Logo} />
                <meta 
                    name="description" 
                    content="Welcome to the official BCA Department portal. Explore the world of computer applications, our faculty, gallery, and more." 
                />
                <meta 
                    name="keywords" 
                    content="mccbca, BCA, Computer Applications, Faculty, Gallery, About BCA, BCA College, BCA Department" 
                />
                <meta name="author" content="BCA Department" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>
        
            <Box>
                <Box sx={style.body}>

                    {/* Background */}
                    <video
                        autoPlay
                        loop
                        muted
                        poster={data.theme.home.poster}
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
                        <source src={data.theme.home.wall} type="video/mp4" />
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
                                <Box>
                                    <Typography variant='h2' sx={{...style.subTitle, marginTop: '2rem'}}>department of</Typography>
                                    <Typography variant='h1' sx={style.title}>coMputer <br /> ApplicAtion</Typography>     
                                </Box>
                                <Link href="/athena">
                                    <Box sx={style.event}>
                                        <Box sx={{flex: 1}}>
                                            <Typography sx={{fontWeight: 'bold', marginBottom: '0.5rem'}}>Athena 2.0</Typography>
                                            <Typography sx={{fontSize: '0.8rem'}} variant='body2'>February 11, 2025 at 9:30 AM</Typography>
                                            <Typography sx={{fontSize: '0.8rem'}} variant='body2'>Venue: Mar Chrysostom College Paranthal, Adoor</Typography>
                                        </Box>
                                        <Box sx={{maxWidth: '100px', maxHeight: '100px'}}>
                                            <img style={{maxWidth: '100%', maxHeight: '100%'}} src={OldAthena} alt="Athena" />
                                        </Box>
                                    </Box>
                                </Link>

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
                            <Link href="https://x.com/tm_bcaflix">
                                <X sx={{
                                    width: '15px', 
                                    transition: '0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    }
                                }} />
                            </Link>
                            <Link href="https://instagram.com/tm.bcaflix">
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
                    <Contact data={data.theme.contact} />
                </Box>
            </Box>
        </>
    );
}

export default Home;