import { Box } from "@mui/material";
import Background from "../../theme/Background/Background";
import Navbar from "../../theme/Navbar/Navbar";

const YearBook = () => {
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
                }}
            >
                <Navbar />
                <Box sx={{
                    
                }}>
                    
                </Box>
            </Box>
        </Background>
    );
}

export default YearBook;