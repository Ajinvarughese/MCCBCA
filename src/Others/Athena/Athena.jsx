import { Box, Divider, List, ListItem, Typography, useMediaQuery, useTheme } from "@mui/material";
import Data from "../../Hooks/Data";
import { Fade } from "easy-reveal";
import Button from "../../theme/Button/Button";
import Contact from "../../components/Contact/Contact";
import AthenaIcon from "../../assets/athena.png";
import { Helmet } from "react-helmet";
import mainIcon from "../../assets/logoMain.png";
import AthenaHarry from "../../assets/athenaHarry.png";
import { use, useEffect, useState } from "react";
import rulePDF from "../../assets/athena/athena_rules.pdf";

const data = Data().athena;
const themeContact = Data().theme;

const desc = [
    { label: "DATE", value: ["11", "th FEB 2025"] },
    { label: "GENRE", value: ["FEST"] },
    { label: "VENUE", value: ["MAR CHRYSOSTOM COLLEGE"] }
];



function isEnded() {
    const now = new Date();
    const targetDate = new Date("2025-02-07T20:30:00");
    const targetStart = new Date("2025-02-05T10:00:00");
    
    if(now.getTime() >= targetDate.getTime() || now.getTime() <= targetStart.getTime()) {
        return true;
    }
    return false;
}

const downloadPDF = () => {
    window.open(rulePDF, '_blank');
}

const Athena = () => {
    const theme = useTheme();
    const isMdOrGreater = useMediaQuery(theme.breakpoints.up("md"));
    const [isClosed, setIsClosed] = useState(isEnded());

    useEffect(() => {
        const interval = setInterval(() => {
            setIsClosed(isEnded());
        }, 100);

        return () => clearInterval(interval);
    }, []);

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
                    <Button style={{ 
                            marginTop: '1rem', 
                            background: "none",
                            border: "1px solid var(--athenaColor)",
                            '&:hover': { 
                                background: "var(--athenaColor)",
                                transform: 'scale(1.09)',
                            },
                            color: "var(--color1) !important",
                        }} 
                        text="Download Rules" 
                        onClick={downloadPDF}
                    />
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
                    {desc.map((item, index) => (
                        <Box key={index} sx={{ textAlign: "center" }}>
                            <Typography variant="h6" sx={{ fontFamily: "var(--athena)", fontWeight: 'light', color: "var(--athenaColor)" }}>
                                {item.label}
                            </Typography>
                            <Typography sx={{ fontSize: '1rem', color: "#bdbdbd" }}>
                                {item.value.length > 1 ? (
                                    <>
                                        {item.value[0]}
                                        <sup style={{ fontSize: '0.7rem', color: "#bdbdbd" }}>{item.value[1].split(" ")[0]}</sup> {item.value[1].split(" ").slice(1).join(" ")}
                                    </>
                                ) : item.value[0]}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
            
            <Box sx={{ padding: "4rem 5%" }}>
                <Typography variant="h3" sx={{ fontFamily: "var(--athena)", fontWeight: 300, textAlign: "center", textTransform: "uppercase", letterSpacing: 1.5, color: "#f5f5f5" }}>OUR EVENTS</Typography>
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
                                                opacity: !isClosed ? 1 : 0.5,
                                            }} 
                                            text={!isClosed ? "REGISTER NOW" : "WE'RE CLOSED"} 
                                            disabled={isClosed}
                                            onClick={() => 
                                                window.open(item.link, "_blank")}
                                        />
                                    </Fade>
                                </Box>
                            </Fade>
                        </Box>
                    ))
                }
                <Box
                    sx={{
                        marginTop: '7rem',
                    }}
                >
                    <Typography variant="h3" sx={{ fontFamily: "var(--athena)", fontWeight: 300, textAlign: "center", textTransform: "uppercase", letterSpacing: 1.5, color: "#f5f5f5" }}>OTHER EVENTS</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: {xs: 'column', md: 'row'},
                            alignItems: 'center',
                            gap: '3rem',
                            marginTop: "2rem",
                            justifyContent: "center",
                        }}
                    >
                        {[
                            {
                                label: "VR SHOW",
                                link: "https://res.cloudinary.com/dohwjrsvl/image/upload/v1738570524/Athena/fdtbar0ql05o6zu8fwsq.jpg"
                            },  
                            {   
                                label: "ARCADE",
                                link: "https://res.cloudinary.com/dohwjrsvl/image/upload/v1738475170/Athena/pw2ynvl2u4gpk3tgze1y.jpg"
                            }
                        ].map((item, index) => (
                            <Fade duration={1000} up distance="40px" delay={100 * index}>
                            <Box>
                                <Box sx={{ 
                                maxWidth: '300px',
                                height: "500px",
                                overflow: 'hidden',
                                borderRadius: '10px',
                            }}>
                                <Box
                                    component="img"
                                    src={item.link}
                                    alt={item.label}
                                    sx={{
                                        width: '100%',
                                        height: "100%",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                        borderRadius: '10px',
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: {
                                                xs: 'scale(1.1)',
                                                md: 'scale(1.3)',
                                            }
                                        },
                                        boxShadow: "rgba(255, 255, 255, 0.1) 0px 4px 12px",
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography variant="h5" sx={{ 
                                textAlign: 'center', 
                                marginTop: '1rem', 
                                fontFamily: "var(--athena)", 
                                fontWeight: 'light', 
                                color: "var(--athenaColor)" 
                            }}>
                                {item.label}
                            </Typography>
                            </Box>
                            </Box>
                        </Fade>
                    ))}
                    </Box>
                </Box>

                <Box
                    sx={{
                        marginTop: '7rem',
                    }}
                >
                    <Typography variant="h3" sx={{ fontFamily: "var(--athena)", fontWeight: 300, textAlign: "center", textTransform: "uppercase", letterSpacing: 1.5, color: "#f5f5f5" }}>GENERAL GUIDELINES</Typography>
                    <Typography
                        sx={{
                            marginTop: '1rem'
                        }}
                    >
                        <ul style={{ listStyle: "none", padding: 0, maxWidth: '600px', margin: '0 auto'}}>
                            {[
                            "All participants should compulsorily carry their ID Card.",
                            "Every event has a separate set of rules, and all are requested to abide by them.",
                            "Participants must be present at the venue at least 15 minutes prior to the time scheduled, and late entry will not be allowed.",
                            "The decisions of the judges would be final, and no further queries shall be entertained.",
                            "Registration fees are not refundable.",
                            "Any misbehavior will lead to disqualification of the participant.",
                            "Organizers are free to make any changes in the rules at any point in time.",
                            ].map((rule, index) => (
                            <li key={index} style={{ marginBottom: "5px", opacity: "0.8"}}>
                                {index + 1}. {rule}
                            </li>
                            ))}
                        </ul>
                    </Typography>

                    
                </Box>
            </Box>
            <Contact data={themeContact.contact} />

        </Box>
    );
}

export default Athena;