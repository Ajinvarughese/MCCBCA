import { Box, TextField, Typography } from "@mui/material";
import Background from "../../theme/Background/Background";
import Titles from "../../theme/Style/Titles";
import Navbar from "../../theme/Navbar/Navbar";
import Button from "../../theme/Button/Button"
import { useState } from "react";
import URL from "../../Hooks/URL";

const titles = Titles();
const style = {
    input: {
        width: {
            xs: '100%',
            md: '80%',
            maxWidth: '480px',
        },
        '& .MuiFilledInput-root': {
            backgroundColor: 'var(--surface77)', // Default background color
            '&:hover': {
                backgroundColor: 'var(--surface99)', // Hover background color
            },
            '&.Mui-focused': {
                backgroundColor: 'var(--surface99)', // Focused background color
            },
            '&:before': {
                borderBottomColor: 'var(--accent)', // Default underline color
            },
            '&:hover:not(.Mui-disabled):before': {
                borderBottomColor: 'var(--accent)', // Underline color on hover
            },
            '&:after': {
                borderBottomColor: 'var(--color1)', // Underline color when focused
            },
            '& input': {
                color: 'var(--color1)', // Text color
            },
        },
        '& .MuiInputLabel-root': {
            color: 'var(--color1)', // Label color
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--accent)', // Label color when focused
        },
    },
}

const api = URL();

const Admin = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const [userIdError, setUserIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [wrongPass, setWrongPass] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(userId == "") {
            setUserIdError(true);
            return;
        }
        if(password == "") {
            setPasswordError(true);
            return
        }
        setLoading(true);
        const data = {
            "userId": userId,
            "password": password
        }

        console.log(data);
        console.log(JSON.stringify(data))

        fetch(api.api + "admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            if (!res.ok) {
                if(res.status == 500) {
                    setWrongPass(true);    
                    setUserId("");
                    setPassword("");
                }
                throw new Error("Password or username is incorrect!");
            }
            setWrongPass(false);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error:", error);
            setLoading(false);
        });
 
    }
    return (
        <Background
            b1={true}
            b2={true}
            b1Color="var(--accent2)"
            b2Color="var(--accent)"
        >
            <Box
                sx={{
                    height: '100vh'
                }}
            >
                <Box
                    sx={{
                        padding: {
                            xs: '7rem 4% 3rem 4%',
                            md: '8rem 7% 4rem 7%',
                        }, 
                    }} 
                >   
                    <Navbar />
                    <Box sx={{
                        textAlign: 'center',
                        
                    }}>
                        <Typography variant="h3" sx={titles.title}>
                        AdMin <Typography variant="body" sx={{
                            color: 'var(--accent)',
                        }}>Login</Typography>
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: '360px',
                            margin: '3rem auto',
                            padding: '0rem 4% 2.5rem 4%',
                            gap: '12px',
                            background: 'var(--dark)',
                            borderRadius: '6px'
                        }}
                    >
                        <Typography 
                            sx={{
                                textAlign: 'center',
                                margin: '1rem'
                            }}
                        variant="h5">
                            Welcome Admin
                        </Typography>
                        <TextField
                            sx={style.input}
                            variant="filled" 
                            label="admin id"
                            name="id"
                            onChange={(e) => {setUserId(e.target.value)}}
                            onInput={()=> setUserIdError(false)}
                            error={userIdError}
                            helperText={userIdError ? "Please enter your user id" : ""}
                        />
                        <TextField 
                            sx={style.input}
                            variant="filled"
                            type="password"
                            label="password"
                            name="password"
                            onInput={()=>{setPasswordError(false); setWrongPass(false)}}
                            onChange={(e) => {setPassword(e.target.value)}}
                            error={passwordError || wrongPass}
                            helperText={wrongPass ? "UserId or password is incorrect!" :passwordError ? "Please enter your password" : ""}
                        />
                        <Button 
                            text="Log In"
                            onClick={handleSubmit}
                        />
                    </Box>
                </Box>
            </Box>
        </Background>
    );
}

export default Admin;