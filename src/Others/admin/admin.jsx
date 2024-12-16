import { Box, MenuItem, TextField, Typography } from "@mui/material";
import Background from "../../theme/Background/Background";
import Titles from "../../theme/Style/Titles";
import Navbar from "../../theme/Navbar/Navbar";
import Button from "../../theme/Button/Button"
import { useState } from "react";
import URL from "../../Hooks/URL";
import { LoadingButton } from "@mui/lab";

const titles = Titles();
const works = [
    {
        value: "uploadNotes",
        label: "Upload Notes"
    },
    {
        value: "ImageUpload",
        label: "Gallery uploads"
    },
    {
        value: "yearBookStatus",
        label: "YearBook status"
    }
]
const style = {
    input: {
        '& .MuiFilledInput-root': {
            backgroundColor: 'white', // Default background color
            '&:hover': {
                backgroundColor: 'white', // Hover background color
            },
            '&.Mui-focused': {
                backgroundColor: 'white', // Focused background color
            },
            '&:before': {
                borderBottomColor: 'white', // Default underline color
            },
            '&:hover:not(.Mui-disabled):before': {
                borderBottomColor: 'white', // Underline color on hover
            },
            '&:after': {
                borderBottomColor: 'var(--accent)', // Underline color when focused
            },
            '& input': {
                color: 'black', // Text color
            },
        },
        '& .MuiInputLabel-root': {
            color: 'black', // Label color
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--accent)', // Label color when focused
        },
    },
    options: {
        color: "black",
        background: "var(--surface99)",
    },
}

const api = URL();

const Admin = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [action, setAction] = useState("");

    const [loading, setLoading] = useState(false);
    
    const [userIdError, setUserIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [actionError, setActionError] = useState(false);
    const [wrongPass, setWrongPass] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(userId == "") {
            setUserIdError(true);
            return;
        }
        if(action == "") {
            setActionError(true);
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

            const encoder = new TextEncoder();
            sessionStorage.setItem("admin", JSON.stringify(Array.from(encoder.encode(data.userId))));
            sessionStorage.setItem("pass", JSON.stringify(Array.from(encoder.encode(data.password))));
        }).then(() => {
            switch(action) {
                case "ImageUpload":
                    window.location.replace("/admin/ImageUpload");
                    break;
                case "yearBookStatus":
                    window.location.replace("/admin/yearBookStatus");
                    break;
                case "uploadNotes":
                    window.location.replace("/admin/uploadNotes");
                    break;
                default:
                    break;
            }
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
                            select
                            label="Admin Action"
                            name="action"
                            onChange={(e) => setAction(e.target.value)}
                            onInput={() => setActionError(false)}
                            error={actionError}
                            helperText={actionError ? "Please select an action" : ""}
                            SelectProps={{
                                MenuProps: {
                                    PaperProps: {
                                        sx: {
                                            
                                            backgroundColor: 'var(--bg)', // Change the background of the entire dropdown
                                            '& .MuiMenuItem-root': {
                                                color: 'var(--color1) !important', // Text color
                                                '&:hover': {
                                                    backgroundColor: 'var(--accent)', // Hover background
                                                },
                                                '&.Mui-selected': {
                                                    backgroundColor: 'var(--dark)', // Selected background
                                                    color: 'var(--color1) !important', // Selected text color
                                                },
                                                '&.Mui-selected:hover': {
                                                    backgroundColor: 'var(--accent)', // Selected hover background
                                                },
                                            },
                                        },
                                    },
                                },
                            }}
                        >
                            {works.map((option) => (
                                <MenuItem sx={{padding: '1rem'}} key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

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
                    {   
                        loading ? 
                            <LoadingButton
                                sx={{
                                    background: "var(--accent)",
                                    padding: '1rem 0'
                                }}
                                loading
                            />
                        :
                        <Button 
                            text="Log in"
                            onClick={handleSubmit}
                        />
                    }
                    </Box>
                </Box>
            </Box>
        </Background>
    );
}

export default Admin;