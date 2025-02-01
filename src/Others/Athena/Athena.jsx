import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import Data from "../../Hooks/Data";
import { Fade } from "easy-reveal";
import Button from "../../theme/Button/Button";
import Contact from "../../components/Contact/Contact";
import AthenaIcon from "../../assets/athena.png";
import { Helmet } from "react-helmet";
import mainIcon from "../../assets/logoMain.png";
import AthenaHarry from "../../assets/athenaHarry.png";

const data = Data().athena;
const themeContact = Data().theme;

const isOnline = true;

const Athena = () => {
    const theme = useTheme();
    const isMdOrGreater = useMediaQuery(theme.breakpoints.up("md"));

    return (

        <Box sx={{ background: "#222222", minHeight: "100vh", color: "white" }}>
            <Helmet>
                <title>Athena - BCA Department of MCC</title>
                <link rel="icon" href={AthenaIcon} />
            </Helmet>
            <Box sx={{
                textAlign: 'center',
                padding: '0.8rem 2%',
                boxShadow: "rgba(255, 255, 255, 0.08) 0px 4px 5px",
                display: 'flex',
                alignItems: 'center'
            }}>
                <Box 
                    onClick = {() => {
                        window.location.reload();
                    }}
                sx={{
                    transition: '0.2s ease',
                    '&:hover' : {
                        cursor: 'pointer',
                        transform: 'scale(1.1)',
                    }
                }}>
                    <img src={AthenaIcon}  alt="athena" style={{ width: "50px", height: "50px" }} />
                </Box>
                
                <Box sx={{ width: '100%',}}>
                    <img src={AthenaHarry}  alt="athena" style={{ maxWidth: "200px", }} />
                </Box>

                <Box 
                    sx={{
                        transition: '0.2s ease',
                    '&:hover' : {
                        cursor: 'pointer',
                        transform: 'scale(1.1)',
                    }
                    }}
                    onClick ={() => {
                        window.open("/", "_self");
                    }}
                >
                    <img src={mainIcon}  alt="athena" style={{ width: "50px", height: "50px" }} />
                </Box>
            </Box>
            
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                padding: '4rem 3rem',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
            }}>
                <Box sx={{ flex: 1, maxWidth: '600px' }}>
                    <Typography variant="h5" sx={{ fontFamily: "var(--athena)", fontWeight: 'light', color: "var(--athenaColor)" }}>DESCRIPTION</Typography>
                    <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, marginTop: '0.75rem', lineHeight: 1.6, color: "#bdbdbd" }}>
                        At Athena, our mission is to ignite innovation by fostering a dynamic platform for collaboration and creativity. Through diverse events and showcases, we empower individuals to push technological boundaries and inspire the next generation of innovators. 
                    </Typography>
                </Box>

                <Divider orientation={isMdOrGreater ? "vertical" : "horizontal"} sx={{
                    margin: isMdOrGreater ? "0 2rem" : "2rem 0",
                    borderColor: 'rgba(255,255,255,0.3)',
                    width: isMdOrGreater ? "2px" : "94%",
                    height: isMdOrGreater ? "300px" : "2px",
                }} />
                
                <Box sx={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1.5rem',
                }}>
                    {[{ label: "YEAR", value: "2025" }, { label: "GENRE", value: "FEST" }, { label: "VENUE", value: "MAR CHRYSOSTOM COLLEGE" }].map((item, index) => (
                        <Box key={index} sx={{ textAlign: "center" }}>
                            <Typography variant="h6" sx={{  fontFamily: "var(--athena)", fontWeight: 'light', color: "var(--athenaColor)" }}>{item.label}</Typography>
                            <Typography sx={{ fontSize: '1rem', color: "#bdbdbd" }}>{item.value}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
            
            <Box sx={{ padding: "4rem 5%" }}>
                <Typography variant="h3" sx={{ fontFamily: "var(--athena)", fontWeight: 300, textAlign: "center", textTransform: "uppercase", letterSpacing: 1.5, color: "#f5f5f5" }}>OUR EVENTS.</Typography>
                {
                    Object.values(data).map((item, index) => (
                        <Box key={index} sx={{
                            marginTop: '7rem',
                            display: 'flex',
                            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                            alignItems: 'center',
                            gap: '3rem',
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}>
                            <Fade duration={1000} up distance="40px" delay={100*index}>
                                <Box sx={{ maxWidth: '500px', width: '100%' }}>
                                    <img style={{ 
                                        width: '100%', 
                                        borderRadius: '10px',
                                        boxShadow: "rgba(255, 255, 255, 0.1) 0px 4px 12px",
                                    }} src={item.img} alt={item.name} />
                                </Box>
                            </Fade>
                            <Fade duration={1500} up distance="40px" delay={200}>
                                <Box sx={{textAlign: {xs: 'center', md: 'left'}, maxWidth: '700px'}}>
                                    <Typography variant="h5" sx={{  fontFamily: "var(--athena)", fontWeight: 'light', color: "var(--athenaColor)" }}>{item.title}</Typography>
                                    <Typography variant="subtitle1" sx={{ opacity: 0.7, fontSize: "13px", fontFamily: "var(--athena)",  fontWeight: 'light', color: "var(--color1)" }}>{item.name}</Typography>
                                    <Typography sx={{ fontSize: '1rem', marginTop: '0.5rem', lineHeight: 1.6, color: "#bdbdbd" }}>{item.description}</Typography>
                                    <Fade duration={2000} up distance="40px" delay={300}>
                                        <Button style={{ 
                                                marginTop: '1rem', 
                                                background: "none",
                                                border: "1px solid var(--athenaColor)",
                                                '&:hover': { 
                                                    background: "var(--athenaColor)",
                                                    transform: 'scale(1.09)',
                                                },
                                                color: "var(--color1) !important",
                                                opacity: isOnline ? 1 : 0.5,
                                            }} 
                                            text={isOnline ? "REGISTER NOW" : "WE'RE CLOSED"} 
                                            disabled={!isOnline}
                                            onClick={() => 
                                                window.open(item.link, "_blank")}
                                        />
                                    </Fade>
                                </Box>
                            </Fade>
                        </Box>
                    ))
                }
            </Box>
            <Contact data={themeContact.contact} />

        </Box>
    );
}

export default Athena;