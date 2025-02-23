import Background from "../../theme/Background/Background";
import { Box, Divider, Link, Typography } from "@mui/material";
import Navbar from "../../theme/Navbar/Navbar";
import Titles from "../../theme/Style/Titles";
import AboutUsImg from "../../assets/about.png";
import { Fade } from "easy-reveal";
import Athena from "../../assets/old-athena.jpg"
import Data from "../../Hooks/Data";
import Contact from "../../components/Contact/Contact";
import { Helmet } from "react-helmet";

const data = Data().about;
const themeContact = Data().theme;
const titles = Titles();

const AboutUs = () => {
    return (
        <>
            <Helmet>
                <title>About Us - BCA Department MCC</title>
                <meta name="description" content="Learn about the BCA Department at MCC. Explore our programs, faculty, and activities like coding competitions, tech workshops, and more." />
                <meta name="keywords" content="mccbca, BCA Department, MCC, coding competitions, tech workshops, computer science, IT industry" />
            </Helmet>
            <Background
                b1
                b1Color="var(--accent2)"
            >
                <Navbar />
                <Box
                    sx={{
                        minHeight: '569px',
                        padding: {
                            xs: '9rem 4% 3rem 4%',
                            md: '11rem 7% 4rem 7%',
                        },
                    }}
                >
                    <Box sx={{
                        textAlign: {
                            xs: 'center',
                            md: 'left',
                        },
                    }}>
                        <Fade duration={1500} up>
                            <Typography variant="h3" sx={titles.title}>
                            About <Typography variant="body" sx={{
                                color: 'var(--accent)',
                            }}>Us</Typography>
                            </Typography>
                        </Fade>
                        <Box
                            sx={{
                                display: {
                                    md: 'flex',
                                },
                                flexDirection: 'row-reverse',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <Fade duration={1500} distance="40px" up delay={300}>
                                <Box
                                    sx={{
                                        maxWidth: '420px',
                                        width: '100%',
                                        margin: '0 auto',
                                    }}
                                >
                                    <img style={{maxWidth: '100%', maxHeight: '100%'}} src={AboutUsImg} alt="" />
                                </Box>
                            </Fade>
                            <Fade duration={1500} up delay={400} distance="40px">
                                <Typography variant="body2" sx={{marginTop: '2rem', maxWidth: '700px', color: "var(--text)"}}>
                                    The Department of Bachelor of Computer Applications (BCA) at MCC is committed to providing a comprehensive and dynamic learning environment for students who aspire to pursue careers in the rapidly evolving field of computer science and information technology. Our department strives to blend theoretical knowledge with practical application, equipping students with the skills and knowledge necessary to thrive in the global IT industry. <br />
                                    The BCA program offers a diverse and rigorous curriculum that covers a wide range of subjects, including programming languages, web development, database management, computer networks, software engineering, and mobile app development. Our faculty comprises experienced professionals and industry experts who ensure that the content remains relevant and up-to-date with the latest technological advancements.
                                    <br />
                                    <br />
                                    "𝚆𝚎 𝚎𝚡𝚒𝚜𝚝𝚜 𝚒𝚗 𝚖𝚘𝚖𝚎𝚗𝚝𝚜"
                                </Typography>
                            </Fade>
                        </Box>                        
                    </Box>

                    {/* OTHERS */}


                    <Fade left duration={1500}>
                        <Box>
                            <hr style={{margin: '4rem 0',}} />
                        </Box>
                    </Fade>

                    <Box sx={{
                        textAlign: {
                            xs: 'center',
                            md: 'left',
                        },
                    }}>
                        <Fade duration={1500} up>
                            <Typography variant="h3" sx={titles.title}>
                            Other <Typography variant="body" sx={{
                                color: 'var(--accent)',
                            }}>Activities</Typography>
                            </Typography>
                        </Fade>
                        <Box
                            sx={{
                                marginTop: '4.5rem',
                                display: {
                                    md: 'flex',
                                },
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <Fade up duration={1500} distance="60px">
                                <Box
                                    sx={{
                                        maxWidth: '520px',
                                        width: '92%',
                                        margin: '0 auto',
                                    }}
                                >
                                    <img style={{maxWidth: '100%', maxHeight: '100%', borderRadius: '6px'}} src={Athena} alt="" />
                                </Box>
                            </Fade>
                            <Box>
                                <Fade up duration={1500} delay={500} distance="60px">
                                    <Typography variant="h5" 
                                    sx={{ 
                                        marginTop: '2rem', 
                                        fontFamily: 'var(--titleFont)', 
                                        color: 'var(--accent)'
                                    }}>
                                        AthenA
                                    </Typography>
                                </Fade>

                                <Fade up duration={1500} distance="60px" delay={200}>
                                    <Typography variant="body2" sx={{ marginTop: '2rem', maxWidth: '700px', color: "var(--text)" }}>
                                        We host a range of programs, including coding competitions, hackathons, tech workshops, and seminars on emerging technologies. Annual events like <Link href='/athena' sx={{fontWeight: 'bold', textDecoration: 'none'}}>Athena</Link> offers platforms for students to showcase their talents and problem-solving skills. Beyond academics, we organize cultural activities, talent hunts, and community outreach programs to promote holistic development. <br /> Through active participation in these activities, students not only gain practical knowledge but also develop essential soft skills such as teamwork, leadership, and communication, empowering them to excel in their careers.
                                    </Typography>
                                </Fade>
                            </Box>
                        </Box>



                        {
                            data.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        marginTop: '4.5rem',
                                        display: {
                                            md: 'flex',
                                        },
                                        flexDirection: index % 2 === 0 ? 'row-reverse' : 'row',
                                        alignItems: 'center',
                                        width: '100%',
                                    }}
                                >
                                <Fade up duration={1500} distance="60px">
                                    <Box
                                        sx={{
                                            maxWidth: '520px',
                                            width: '92%',
                                            margin: '0 auto',
                                        }}
                                    >
                                        <img style={{maxWidth: '100%', maxHeight: '100%', borderRadius: '6px'}} src={item.img} alt="" />
                                    </Box>
                                </Fade>
                                
                                    <Box>
                                        <Fade up duration={1500} delay={500} distance="60px">
                                            <Typography variant="h5" 
                                            sx={{ 
                                                marginTop: '2rem', 
                                                fontFamily: 'var(--titleFont)', 
                                                color: 'var(--accent)'
                                            }}>
                                                {item.title}
                                            </Typography>
                                        </Fade>
                                        <Fade up duration={1500} delay={800} distance="60px">
                                            <Typography variant="body2" sx={{ marginTop: '2rem', maxWidth: '700px', color: "var(--text)" }}>
                                                {item.paragraph}
                                            </Typography>
                                        </Fade>
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
                <Contact data={themeContact.contact} />
            </Background>
        </>
    );
}

export default AboutUs;