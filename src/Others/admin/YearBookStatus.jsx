import { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from "@mui/material";
import Background from "../../theme/Background/Background";
import Navbar from "../../theme/Navbar/Navbar";
import Titles from "../../theme/Style/Titles";
import URL from "../../Hooks/URL";

const titles = Titles();
const API = URL();

const YearBookStatus = () => {

    const [yearBookData, setYearBookData] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchYearBookData = async () => {
            try {
                const response = await fetch(API.api+"yearbook/admin/showAll");
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setYearBookData(data); // Set the fetched data to state
                } else {
                    console.error("Failed to fetch YearBook data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchYearBookData();
    }, []);

    // Toggle the status of a row and push to data
    const handleToggleStatus = (id) => {
        const updatedData = yearBookData.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, status: !item.status };
                setData((prevData) => [...prevData.filter((i) => i.id !== id), updatedItem]);
                return updatedItem;
            }
            return item;
        });
        setYearBookData(updatedData);
    };

    // Submit data to API
    const handleSubmit = async () => {
        if(data.length === 0) {
            alert("No changes where made");
            return;
        }
        try {
            const response = await fetch(API.api+"yearbook/update", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Data submitted successfully!");
            } else {
                alert("Failed to submit data.");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error occurred during submission.");
        }
    };

    return (
        <Background b1 b1Color="var(--accent2)">
            <Box sx={{ minHeight: "100vh" }}>
                <Box
                    sx={{
                        padding: {
                            xs: "7rem 4% 3rem 4%",
                            md: "8rem 7% 4rem 7%",
                        },
                    }}
                >
                    <Navbar />
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h3" sx={titles.title}>
                            YeAr BOOK <br />{" "}
                            <Typography variant="body" sx={{ color: "var(--accent)" }}>
                                StAtus
                            </Typography>
                        </Typography>
                    </Box>

                    <TableContainer component={Paper} sx={{ marginTop: 4, background: "var(--dark)" }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ background: "var(--dark2)" }}>
                                    <TableCell>
                                        <strong>Name</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Phone</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Batch</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Status</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {yearBookData.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell sx={{ color: "var(--color1)" }}>{row.name}</TableCell>
                                        <TableCell sx={{ color: "var(--color1)" }}>{row.phone}</TableCell>
                                        <TableCell sx={{ color: "var(--color1)" }}>{row.batch}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color={row.status ? "success" : "error"}
                                                onClick={() => handleToggleStatus(row.id)}
                                            >
                                                {row.status ? "On" : "Off"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ textAlign: "center", marginTop: 4 }}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Background>
    );
};

export default YearBookStatus;
