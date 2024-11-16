import { Box, Divider, Paper, Typography } from "@mui/material";
import Background from "../../theme/Background/Background";
import Navbar from "../../theme/Navbar/Navbar";
import Titles from "../../theme/Style/Titles";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { Fade } from "easy-reveal";

import Data from "../../Hooks/Data";

const data = Data().brightMinds;
const titles = Titles();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'var(--dark)',
  ...theme.typography.body2,
  borderRadius: '8px',
  padding: theme.spacing(2, 3),
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

// Reusable component to render students by year
const renderStudentGrid = (students, yearLabel) => (
  <>
    <Typography variant="h6" sx={{ marginTop: '2rem', }}>
      {yearLabel}
    </Typography>
    <Grid container sx={{ margin: '2rem auto 0 auto' }} maxWidth={1000} spacing={2}>
      {students.map((item, index) => (
        <Grid onClick={() => {window.location.href = item.url}} item xs={12} sm={6} key={index}>
          <Fade duration={1500} up delay={index*200}>
            <Item sx={{cursor: 'pointer'}}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">
                    {item.name}
                  </Typography>
                </Box>
                <Divider sx={{ margin: '0.5rem 0', background: 'var(--color1)' }} />
                <Typography variant="body2">"{item.skills}"</Typography>
              </Box>
            </Item>
            </Fade>
        </Grid>
      ))}
    </Grid>
  </>
);

const BrightMinds = () => {
  return (
    <Background b1 b1Color="var(--accent2)">
      <Box
        sx={{
          padding: {
            xs: '7rem 4% 3rem 4%',
            md: '8rem 7% 4rem 7%',
          },
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={titles.title}>
            bright{" "}
            <Typography variant="body" sx={{ color: 'var(--accent)' }}>
              Minds
            </Typography>
          </Typography>
        </Box>

        <Box sx={{ margin: '1rem 2%' }}>
            {renderStudentGrid(data.year1, "1st Year Students")}
            <br />
            {renderStudentGrid(data.year2, "2nd Year Students")}
            <br />
            {renderStudentGrid(data.year3, "3rd Year Students")}
            <br />
          {/* 4th Year Students - Coming Soon */}
          <Typography variant="h6" sx={{ marginTop: '2rem', textAlign: 'center' }}>
            4th Year Students
          </Typography>
          <Box
            sx={{
              padding: '3rem 5rem',
              background: 'var(--dark)',
              borderRadius: '8px',
              textAlign: 'center',
              margin: '0 auto',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            COMING SOON!
          </Box>
        </Box>
      </Box>
    </Background>
  );
};

export default BrightMinds;




