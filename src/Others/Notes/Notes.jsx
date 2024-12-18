import { useState, useEffect } from "react";
import { Fade } from "easy-reveal";
import Background from "../../theme/Background/Background";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton, Card, CardContent, CardActions, TextField, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ExpandMore as ExpandMoreIcon, Download as DownloadIcon, Search as SearchIcon } from "@mui/icons-material";
import Navbar from "../../theme/Navbar/Navbar";
import Titles from "../../theme/Style/Titles";
import ApiUrl from "../../Hooks/URL";
import pdfIcon from "../../assets/pdfIcon.png";
import { Helmet } from "react-helmet";

const titles = Titles();
const api = ApiUrl();

const style = {
    input: {
        width: {
            xs: '100%',
            md: '80%',
        },
        height: '55px', // Adjust the height as needed
        padding: '12px 12px', // External padding
        maxWidth: '480px',
        borderRadius: '6px',
        transition: 'width 0.3s ease', // Add transition for smooth expanding effect
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'var(--bg)', // Background color
            height: '55px', // Ensure the height matches the input
            padding: '0 10px', // Adjust padding to ensure proper text alignment
            display: 'flex',
            alignItems: 'center', // Vertically center the text in the input
            '&:hover': {
                backgroundColor: 'var(--bg)', // Hover background color
            },
            '&.Mui-focused': {
                backgroundColor: 'var(--bg)', // Focused background color
            },
            '& input': {
                color: 'var(--color1)', // Text color
                height: '35px', // Set a specific height for the input text
                padding: '0', // Remove internal padding to avoid misalignment
                lineHeight: '3px', // Match the line-height with input height to center text vertically
            },
        },
        '& .MuiInputLabel-root': {
            color: 'var(--color1)', // Label color
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--accent)', // Label color when focused
        },
        '& .MuiInputAdornment-root': {
            padding: '12px', // Remove extra padding for adornment
        },
    },
};

const Notes = () => {
    const [notesData, setNotesData] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchQueries, setSearchQueries] = useState({}); // State for search input per semester
    const [expanded, setExpanded] = useState(false); // State for expanding the input field

    // API call function
    const fetchNotesData = async () => {
        const result = await fetch(api.api + "notes/showAll");
        return await result.json();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchNotesData();

                // Organize data by semester
                const organizedData = {};
                for (let i = 1; i <= 8; i++) {
                    organizedData[i] = data.filter(note => note.semester === i);
                }
                setNotesData(organizedData);

                // Initialize search queries for each semester
                const initialSearchQueries = {};
                Object.keys(organizedData).forEach(semester => {
                    initialSearchQueries[semester] = "";
                });
                setSearchQueries(initialSearchQueries);
            } catch (error) {
                console.error("Error fetching notes data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle search input change
    const handleSearchChange = (semester, value) => {
        setSearchQueries({ ...searchQueries, [semester]: value });
    };

    // Toggle expand on click
    const handleSearchIconClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Helmet>
                <title>Note Archives - BCA Department MCC</title>
                <meta name="description" content="Explore and download organized notes and study materials for all semesters in the BCA Department." />
                <meta name="keywords" content="mccbca, MCC, Notes, Study Materials, BCA Department, Semester Notes" />
            </Helmet>
            <Background b1 b1Color="var(--accent2)">
                <Navbar />
                <Box
                    sx={{
                        minHeight: "569px",
                        padding: {
                            xs: "9rem 4% 3rem 4%",
                            md: "11rem 7% 4rem 7%",
                        },
                    }}
                >
                    <Box
                        sx={{
                            margin: "0 auto 2rem auto",
                            width: "fit-content",
                            maxWidth: "700px",
                            textAlign: "center",
                        }}
                    >
                        <Fade duration={1500} up>
                            <Typography variant="h3" sx={titles.title}>
                                NOTE <Typography variant="body" sx={{ color: "var(--accent)" }}>ArchiEvEs</Typography>
                            </Typography>
                        </Fade>
                        <Typography variant="body2">
                            The Note Archives serve as a comprehensive resource hub for the BCA department at Mar Chrysostom College (MCC). Dive into an organized collection of notes, study materials, and references that empower students to excel academically and stay ahead in their educational journey.
                        </Typography>
                    </Box>

                    {/* Semesters and PDF List */}
                    <Box gridColumn={2}>
                        {loading ? (
                            // Show Skeletons for the Accordion headers
                            Array.from({ length: 8 }).map((_, index) => (
                                <Skeleton key={index} variant="rectangular" animation="wave"  height={60} sx={{ 
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                                        backdropFilter: 'blur(12px)',
                                        '&::after': {
                                            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2))',
                                        },
                                        margin: "1rem 0", borderRadius: "6px" 
                                    }} 
                                />
                            ))
                        ) : (
                            Object.keys(notesData).map((semester) => (
                                <Accordion
                                    sx={{
                                        margin: "1rem 0",
                                        background: "var(--dark)",
                                        borderRadius: "6px",
                                    }}
                                    key={semester}
                                    disabled={notesData[semester].length === 0}
                                >
                                    <AccordionSummary
                                        sx={{ borderRadius: "6px", background: "var(--dark2)" }}
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`sem-${semester}-content`}
                                        id={`sem-${semester}-header`}
                                    >
                                        <Typography variant="h6">Semester {semester}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {/* Search Bar */}
                                        <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
                                            <TextField
                                                variant="outlined"
                                                placeholder="Search Subject..."
                                                value={searchQueries[semester] || ""}
                                                onChange={(e) => handleSearchChange(semester, e.target.value)}
                                                sx={{
                                                    ...style.input,
                                                    width: expanded ? '100%' : '80%', // Dynamically adjust width
                                                }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <IconButton
                                                            edge="end"
                                                            sx={{ padding: '10px' }}
                                                            onClick={handleSearchIconClick} // Toggle on click
                                                        >
                                                            <SearchIcon />
                                                        </IconButton>
                                                    ),
                                                }}
                                            />
                                        </Box>

                                        {/* Notes Grid */}
                                        <Grid container spacing={3} sx={{justifyContent: "center", marginTop: "1rem" }}>
                                            {notesData[semester]
                                                .filter((note) =>
                                                    note.subject
                                                        .toLowerCase()
                                                        .includes(searchQueries[semester]?.toLowerCase() || "")
                                                )
                                                .map((note) => (
                                                    <Grid item xs={12} sm={6} md={3} key={note.id}>
                                                        <Card
                                                            sx={{
                                                                margin: "0 auto",
                                                                borderRadius: "8px",
                                                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                                                transition: "transform 0.2s",
                                                                background: "var(--surface77)",
                                                                width: {
                                                                    xs: "120px",
                                                                    sm: "180px",
                                                                    md: "200px",
                                                                },
                                                                "&:hover": { transform: "scale(1.03)" },
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    padding: "1rem",
                                                                    backgroundColor: "rgba(240, 240, 240, 0.6)",
                                                                }}
                                                            >
                                                                <img
                                                                    src={pdfIcon}
                                                                    alt="PDF"
                                                                    style={{ width: "60px", height: "60px" }}
                                                                />
                                                            </Box>
                                                            <CardContent>
                                                                <Typography
                                                                    variant="body1"
                                                                    sx={{
                                                                        fontWeight: "bold",
                                                                        textAlign: "center",
                                                                        whiteSpace: "nowrap",
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                    }}
                                                                >
                                                                    {note.subject}
                                                                </Typography>
                                                            </CardContent>
                                                            <CardActions sx={{ justifyContent: "center" }}>
                                                                <IconButton
                                                                    aria-label="download"
                                                                    color="primary"
                                                                    onClick={async () => {
                                                                        try {
                                                                            const response = await fetch(
                                                                                note.url.replace("/upload/", "/upload/fl_attachment/")
                                                                            );
                                                                            const blob = await response.blob();
                                                                            const link = document.createElement("a");
                                                                            link.href = URL.createObjectURL(blob);
                                                                            link.download = `${note.subject}.pdf`;
                                                                            document.body.appendChild(link);
                                                                            link.click();
                                                                            URL.revokeObjectURL(link.href);
                                                                            document.body.removeChild(link);
                                                                        } catch (error) {
                                                                            console.error("Failed to download file:", error);
                                                                        }
                                                                    }}
                                                                >
                                                                    <DownloadIcon />
                                                                </IconButton>
                                                            </CardActions>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        )}
                    </Box>
                </Box>
            </Background>
        </>
    );
};

export default Notes;
