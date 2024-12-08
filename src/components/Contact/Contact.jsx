import { Box, Link, TextField, Typography } from "@mui/material";
import Style from "./style.jsx";
import Button from "@mui/material/Button";
import { useState } from "react";
import ButtonStyle from "../../theme/Button/ButtonStyle.jsx";
import emailjs from "emailjs-com";
import Titles from "../../theme/Style/Titles";
import SuccessIcon from "../../assets/success.gif";
import { Fade } from "easy-reveal";


const titles = Titles();

const style = Style();
const btnStyle = ButtonStyle();
const Contact = (props) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [fullNameError, setFullNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [subjectError, setSubjectError] = useState(false);
    const [messageError, setMessageError] = useState(false);

    const [sendingMail, setSendingMail] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const parms = {
            fullName: fullName,
            email: email,
            subject: subject,
            message: message
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let setted = true;

        if(fullName == "") {
            setFullNameError(true);
            setted = false;
        }
        if(!emailRegex.test(email)) {
            if(email == "" || isNaN(email)) {
                setEmailError(true);
                setted = false;
            }
        }
        if(subject == "") {
            setSubjectError(true);
            setted = false;
        }
        if(message == "") {
            setMessageError(true);
            setted = false;
        }


        if(setted) {
            setSendingMail(true);
            emailjs.send("service_jd2xuy9", "template_1v3zp2u", parms,"TH8hYsR3Yi-fugbCb")
            .then((result) => {
                if(result){
                    setTimeout(() => {
                        setSendingMail(false);
                    }, 3500)
                }
            }, (error) => {
                console.log(error.text);
            });
            return true;
        }
        return false;
    }

    return(
        <Box>
            <Box sx={style.body}>

                {/* Background */}
                <video
                    autoPlay
                    loop
                    muted
                    poster={props.data.poster}
                    style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    minHeight: 'inherit',
                    objectFit: 'cover',
                    objectPosition: '20%',
                    zIndex: -1,
                    }}
                >
                    <source src={props.data.wall} type="video/mp4" />
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
               <Box sx={style.main}>
                    <Box>
                        <Fade left duration={1500}>
                            <Typography variant="h3" sx={titles.title}>
                            contact <Typography variant="body" sx={{
                                color: 'var(--accent)',
                            }}>us</Typography>
                            </Typography>
                        </Fade>
                    </Box>

                    <Box sx={style.contact}>
                        <Box className="card1" sx={{
                            flex: 1, 
                            maxWidth: {
                                xs: '99%',
                                md: '400px',
                            },
                            marginTop: {xs: '2rem', md: '0'},
                            padding: {xs: '1.5rem 0', md: '1.5rem 2rem'}
                        }}>
                            <Fade bottom duration={1500} delay={300}>
                                <Typography variant="h6" sx={{fontSize: '20px', marginBottom: '7px'}}><strong>Get in touch </strong></Typography>
                            </Fade>
                            <Fade bottom duration={1500} delay={700}>
                                <Typography variant="body2" sx={{fontSize: '15px'}}><strong>Address:</strong> Mar Chrysostom College Paranthal, Adoor </Typography>
                            </Fade>
                                {/* <Fade bottom duration={1500} delay={700}>
                                <Typography variant="body2" sx={{fontSize: '15px'}}><strong>Phone:</strong> </Typography>
                                </Fade> */}
                            <Fade bottom duration={1500} delay={1100}>
                                <Typography variant="body2" sx={{fontSize: '15px'}}><strong>Email:</strong> bcadepartment.mcc@gmail.com </Typography>
                            </Fade>
                        </Box>

                        <Box component="form" sx={style.formMain}>
                            <Fade up duration={1500} distance="60px">
                            {
                                !sendingMail ? (
                                    <>
                                        <Box>
                                            <Typography variant="h6">
                                                We'd love to here from you <br />
                                                Let's get in touch. 
                                            </Typography>
                                        </Box>
                                        <Box sx={{
                                            ...style.form,
                                        }}>
                                            <TextField 
                                                error={fullNameError}
                                                helperText={fullNameError ? "Enter your full name": ""}
                                                onInput={()=> {setFullNameError(false)}}
                                                onChange={(e) => setFullName(e.target.value)}
                                                sx={style.input}
                                                name="name"
                                                type="text"
                                                id="filled-basic" 
                                                label="Full name" 
                                                variant="filled" 
                                            />

                                            <TextField 
                                                error={emailError}
                                                helperText={emailError ? "Enter a valid email id or phone number": ""}
                                                onInput={()=> {setEmailError(false)}}
                                                name="email"
                                                type="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                sx={style.input}
                                                id="filled-basic" 
                                                
                                                label="Email or phone" 
                                                variant="filled" 
                                            />

                                            <TextField 
                                                error={subjectError}
                                                type="text"
                                                helperText={subjectError ? "Enter a subject": ""}
                                                onInput={()=> {setSubjectError(false)}}

                                                onChange={(e) => setSubject(e.target.value)}
                                                sx={style.input}
                                                id="filled-basic" 
                                                label="Subject" 
                                                name="subject"
                                                variant="filled" 
                                            />

                                            <TextField 

                                                error={messageError}
                                                helperText={messageError ? "Enter a message to send!": ""}
                                                onInput={()=> {setMessageError(false)}}

                                                sx={{
                                                    ...style.input,
                                                    '& .MuiInputBase-input': {
                                                        color: 'var(--color1)',  // Set the input text color
                                                    },
                                                }}
                                                onChange={(e) => setMessage(e.target.value)}
                                                id="filled-basic" 
                                                multiline
                                                rows={5}
                                                fullWidth
                                                label="Message" 
                                                variant="filled" 
                                                name="message"
                                            />
                                        </Box>
                                        <Button
                                            sx={btnStyle.button}
                                            onClick={handleSubmit}
                                            variant="contained"
                                            
                                            
                                        >
                                            Send email
                                        </Button>
                                    </>
                                ): (
                                    <>
                                        <Box
                                            sx={{
                                                maxWidth: '240px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: '2rem',
                                                margin: '0 auto',
                                                background: 'var(--dark)',
                                                borderRadius: '5px',
                                                padding: '2rem 0'
                                            }}
                                        >
                                            <Box
                                                width="74px"
                                            >
                                                <img 
                                                    src={SuccessIcon}
                                                    style={{maxWidth: '100%', maxHeight: '100%', display: 'block'}}
                                                />
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" sx={{color: 'var(--color1)'}}>Email send successfully</Typography>
                                            </Box>
                                        </Box>
                                    </>
                                )}
                            </Fade>
                        </Box>
                    </Box>
               </Box>
               
               <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '7px 4%'
               }}>
                    <Typography sx={style.cp} variant="body2">Developed by <strong><Link href="https://ajinvarughese.github.io" underline="hover" target="_blank">Ajin Varughese</Link></strong></Typography>
                    <Typography sx={style.cp} variant="body2">&copy; Ajin Varughese, 2024</Typography>
                    <Typography sx={style.cp} variant="body2">UI designing by <strong><Link href="https://www.instagram.com/midhun_sunil_" underline="hover" target="_blank">Midhun Sunil</Link></strong></Typography>
               </Box>
            </Box>
        </Box>
    )
}

export default Contact;