import { useEffect, useState } from "react";
import { Box, Button, Container, Divider, Paper, Tooltip, Typography, Dialog, DialogTitle, DialogContent, TextField, MenuItem, Alert } from "@mui/material";
import { styled } from '@mui/material/styles';
import Background from "../../theme/Background/Background";
import Navbar from "../../theme/Navbar/Navbar";
import Grid from "@mui/material/Grid2";
import Titles from "../../theme/Style/Titles";
import { Add, CheckCircleOutline, Send } from "@mui/icons-material";
import ButtonBuilt from "../../theme/Button/Button";
import emailjs from "emailjs-com";
import { Fade } from "easy-reveal";
import URL from "../../Hooks/URL";
import { LoadingButton } from "@mui/lab";

const url = URL();
const currentYear = new Date().getFullYear()-2;

const generateBatchOptions = () => {
    const startYear = 2014;
    const batchOptions = [];
    
    for (let year = startYear; year <= currentYear - 1; year++) {
        batchOptions.push({
            value: `${year}-${year + 3}`,
            label: `${year}-${year + 3}`,
        });
    }

    return batchOptions;
};

const batchOptions = generateBatchOptions(); 

const style = {
    input: {
        '& .MuiFilledInput-root': {
            backgroundColor: 'rgba(237,237,237,0.10)',
            '&:before': {
                borderBottom: '2px solid var(--color1)', // Border color for the default state
                '&:hover': {
                    borderBottom: '2px solid var(--color1)', // Border color on hover
                }
            },
            '&:after': {
                borderBottom: '2px solid var(--accent)', // Border color when focused
            },
            '& input': {
                color: 'var(--color1)', // Text color inside input
                '&:hover': {
                    color: 'var(--color1)', // Ensure text color remains on hover
                },
            },
            '&::placeholder': {
                color: 'var(--color1)', // Placeholder text color
            },
        },
        '& .MuiInputLabel-root': {
            color: 'var(--color1)',
            '&.Mui-focused': {
                color: 'var(--color1)',
            }
        },
        '& .MuiInputBase-input': {
            color: 'var(--color1)', // Input text color
            '&:hover': {
                color: 'var(--color1)', // Ensure text color remains on hover
            },
        },
    }
};



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'var(--dark)',
  ...theme.typography.body2,
  borderRadius: '6px',
  padding: theme.spacing(2, 3),
}));

const titles = Titles();

const YearBook = () => {

    const res = async () => {
        const result = await fetch(url.api + "yearbook/showAll");
        return await result.json();
    };

    const [data, setData] = useState([]);

  
    useEffect(() => {
        const fetchData = async () => {
        try {
            const resultedData = await res();
            setData(resultedData);
        } catch (error) {
            console.error("Error fetching yearbook data:", error);
        }
        };
        fetchData();
    }, []);




    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false); // State to control dialog visibility
    const [formValues, setFormValues] = useState({
        name: '',
        batch: '',
        phone: '',
        quote: '',
        status: false
    });
    const [errors, setErrors] = useState({}); // Error state to show error messages

    const handleClickOpen = () => {
        setOpen(true); // Open dialog
    };

    const handleClose = () => {
        setOpen(false); // Close dialog
        setErrors({}); // Reset errors on close
        setFormValues({ name: '', batch: '', phone: '', quote: '' }); // Reset form fields
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = () => {
        let newErrors = {};

        // Form Validation
        if (!formValues.name.trim()) newErrors.name = "Name is required";
        if (!formValues.batch.trim()) newErrors.batch = "Batch is required";
        if (!formValues.phone.trim() || isNaN(formValues.phone)) newErrors.phone = "Enter a valid phone number";
        if (!formValues.quote.trim()) newErrors.quote = "Quote is required";

        

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            // No validation errors, proceed with the form submission
            fetch(url.api + "yearbook/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            }).then(() => {
                const params = { name: formValues.name };
                emailjs.send("service_jd2xuy9", "template_fwg5vnf", params, "TH8hYsR3Yi-fugbCb")
                    .then((res) => {
                        if (res) {
                            setLoading(false);
                            handleClose();
                            setSuccess(true);
                            setTimeout(() => {
                                setSuccess(false);
                            }, 5500);
                        }
                    });
            }, (error) => {
                console.log(error.text);
            });
        } 
    };

    return (
        <Background
            b1={true}
            b2={true}
            b1Color="var(--accent2)"
            b2Color="var(--accent)"
        >
            <Box
                sx={{
                    minHeight: '100vh',
                    position: 'relative'
                }}
            >
                <Navbar />
                <Container sx={{
                    padding: {
                        xs: '7rem 4% 3rem 4%',
                        md: '8rem 7% 4rem 7%',
                    }, 
                }}>
                    <Alert sx={{ 
                            display: success? "":"none", 
                            margin: '2rem 0',
                            padding: '1rem 1rem',
                            background: "var(--success)"}} 
                            severity="success"
                        >
                            Your yearbook will be reflected soon!
                    </Alert>
                    

                    <Box sx={{
                        textAlign: 'center',
                    }}>
                        <Typography variant="h3" sx={titles.title}>
                        year <Typography variant="body" sx={{
                            color: 'var(--accent)',
                        }}>book</Typography>
                        </Typography>
                    </Box>
                    
                    <Grid 
                        container 
                        sx={{
                            margin: '2.7rem auto 0 auto'
                        }} 
                        maxWidth={1000} 
                        spacing={2}
                    >
                        {data.map((item, index) => (
                            <Grid item size={{xs: 10, sm: 6}} margin={{xs: 'auto', sm: '0'}} key={index}>
                            <Fade up delay={index*200} duration={1500}>
                                <Item>
                                    <Box>
                                    <Box sx={{ display: 'inline-flex', gap: '0.8rem' }}>
                                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">
                                        {item.name}
                                        </Typography>
                                        <Typography sx={{ color: 'var(--accent)', fontWeight: 'bold' }} variant="subtitle1">
                                        {item.batch}
                                        </Typography>
                                    </Box>
                                    <Divider
                                        sx={{
                                        margin: '0.5rem 0',
                                        background: 'var(--color1)',
                                        }}
                                    />
                                    <Typography variant="body2">
                                        "{item.quote}"
                                    </Typography>
                                    </Box>
                                </Item>
                            </Fade>
                            </Grid>
                        ))}
                    </Grid>  
                </Container>
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: '1.4rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100%',
                        paddingRight: '4%',
                    }}
                >
                    <Tooltip title="Add your yearbook post">
                        <Button
                            sx={{
                                float: 'right',
                                background: 'var(--accent)',
                                borderRadius: '50%',
                                height: '48px',
                                width: '48px',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: '0.3s ease',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                                },
                                minWidth: 0,
                            }}
                            onClick={handleClickOpen} // Open dialog on click
                        >
                            <Add
                                sx={{
                                    fontSize: '20px',
                                }}
                            />
                        </Button>
                    </Tooltip>
                </Box>  

                {/* Dialog Component */}
                <Dialog 
                    open={open} 
                    onClose={handleClose}
                    PaperProps={{
                        sx: {
                            overflow: 'hidden',
                            width: {
                                xs: '90%',
                                sm: '70%',
                            },
                            maxWidth: '560px',
                            backgroundColor: 'rgba(237,237,237,0.10)', // Transparent background
                            backdropFilter: 'blur(10px)', // Apply blur here
                            padding: '0.3rem 5%'
                        }
                    }}
                >
                    <DialogTitle>Add your yearbook post</DialogTitle>
                    <Divider
                        sx={{
                            background: 'var(--color1)',
                        }}
                    />
                    <DialogContent>
                        <Box sx={{ display: 'flex', overflow: 'hidden', flexDirection: 'column', gap: '1rem' }}>
                            <TextField
                                sx={style.input}
                                variant="filled" 
                                label="Name"
                                name="name"
                                value={formValues.name}
                                onChange={handleInputChange}
                                error={Boolean(errors.name)}
                                helperText={errors.name}
                            />
                            <TextField
                                sx={style.input}
                                select
                                variant="filled"
                                label="Batch"
                                name="batch"
                                value={formValues.batch}
                                onChange={handleInputChange}
                                error={Boolean(errors.batch)}
                                helperText={errors.batch}
                                SelectProps={{
                                    MenuProps: {
                                        PaperProps: {
                                            sx: {
                                                background: 'rgba(237,237,237,0.21)',
                                                backdropFilter: 'blur(8px)',
                                                maxHeight: '200px',
                                                overflowY: 'auto', 
                                                
                                                '&::-webkit-scrollbar': {
                                                    width: '5px',
                                                    background: 'var(--bg)',
                                                },
                                                '&::-webkit-scrollbar-thumb': {
                                                    background: '#2D2D2D', 
                                                    borderRadius: '10px',
                                                },
                                                '&::-webkit-scrollbar-thumb:hover': {
                                                    background: '#424141ce',
                                                },
                                            },
                                        },
                                    },
                                }}
                            >
                                {batchOptions.map((option) => (
                                    <MenuItem key={option.value} sx={{padding: '0.7rem 1rem'}} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                sx={style.input}
                                variant="filled" 
                                label="Phone Number"
                                name="phone"
                                value={formValues.phone}
                                onChange={handleInputChange}
                                error={Boolean(errors.phone)}
                                helperText={errors.phone}
                            />
                            <TextField
                                sx={{
                                    ...style.input,
                                    '&::-webkit-scrollbar': {
                                        width: '5px',
                                        background: 'var(--bg)',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: '#2D2D2D', 
                                        borderRadius: '10px',
                                    },
                                    '&::-webkit-scrollbar-thumb:hover': {
                                        background: '#424141ce',
                                    },
                                }}
                                variant="filled" 
                                label="Quote"
                                multiline
                                rows={4}
                                name="quote"
                                value={formValues.quote}
                                onChange={handleInputChange}
                                error={Boolean(errors.quote)}
                                helperText={errors.quote}
                            />
                            <LoadingButton
                                onClick={handleSubmit}
                                loading={loading}
                                loadingPosition="start"
                                endIcon={loading ? "":<Send />}
                                variant="outlined"
                                sx={{
                                    background: loading ? '':'var(--accent)',
                                }}
                            >
                                {loading ? "Sending..." : "Send"}
                            </LoadingButton>
                        </Box>
                    </DialogContent>
                </Dialog>
            </Box>
        </Background>
    );
}

export default YearBook;




// const data = [
//   {
//     name: 'Naveen Kumar',
//     year: '2020-2023',
//     quote: "Even if I don't reach all my goals, I've gone higher than I would have if I hadn't set any."
//   },
//   // Add more objects if you want each item to have different content
//   {
//     name: 'Naveen Kumar',
//     year: '2020-2023',
//     quote: "Even if I don't reach all my goals, I've gone higher than I would have if I hadn't set any."
//   },
//   {
//     name: 'Naveen Kumar',
//     year: '2020-2023',
//     quote: "Even if I don't reach all my goals, I've gone higher than I would have if I hadn't set any."
//   },
//   {
//     name: 'Naveen Kumar',
//     year: '2020-2023',
//     quote: "Even if I don't reach all my goals, I've gone higher than I would have if I hadn't set any."
//   },
//   {
//     name: 'Naveen Kumar',
//     year: '2020-2023',
//     quote: "Even if I don't reach all my goals, I've gone higher than I would have if I hadn't set any."
//   },
//   {
//     name: 'Naveen Kumar',
//     year: '2020-2023',
//     quote: "Even if I don't reach all my goals, I've gone higher than I would have if I hadn't set any."
//   },
//   {
//     name: 'Naveen Kumar',
//     year: '2020-2023',
//     quote: "Even if I don't reach all my goals, I've gone higher than I would have if I hadn't set any."
//   },
// ];
