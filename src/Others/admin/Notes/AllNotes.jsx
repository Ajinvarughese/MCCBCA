import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Titles from "../../../theme/Style/Titles";
import ApiUrl from "../../../Hooks/URL";

const titles = Titles();
const api = ApiUrl();

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]); // State for filtered notes
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [semesterFilter, setSemesterFilter] = useState(""); // State for semester filter

  // Fetch notes from API
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(api.api + "notes/showAll");
        if (!response.ok) {
          throw new Error("Failed to fetch notes.");
        }
        const data = await response.json();
        setNotes(data);
        setFilteredNotes(data); // Initialize filtered notes
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  // Handle delete dialog open
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  // Handle confirm delete
  const confirmDelete = async () => {
    try {
      const response = await fetch(api.api + `notes/delete/${deleteId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete note.");
      }
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== deleteId));
      setFilteredNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== deleteId)
      );
      setDeleteDialogOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Handle semester filter change
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSemesterFilter(value);

    // Filter notes dynamically
    if (value === "") {
      setFilteredNotes(notes); // Show all notes if input is cleared
    } else {
      const filtered = notes.filter(
        (note) => note.semester.toString() === value // Convert to string for comparison
      );
      setFilteredNotes(filtered);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          padding: {
            xs: "7rem 4% 3rem 4%",
            md: "8rem 7% 4rem 7%",
          },
        }}
      >
        <Typography variant="h3" sx={titles.title} gutterBottom>
          Manage{" "}
          <Typography variant="body" sx={{ color: "var(--accent)" }}>
            Notes
          </Typography>
        </Typography>

        {/* Filter Input */}
        <Box
          sx={{
            marginBottom: 3,
          }}
        >
          <TextField
            label="Filter by Semester"
            type="number"
            variant="outlined"
            value={semesterFilter}
            onChange={handleFilterChange}
            sx={{
              backgroundColor: "var(--dark2)", // Style as per your theme
              input: { color: "var(--color1)" }, // Input text color
              label: { color: "var(--accent2)" }, // Label color
            }}
          />
        </Box>

        {/* Table Section */}
        <TableContainer
          component={Paper}
          sx={{
            marginTop: 3,
            backgroundColor: "var(--dark)", // Replace with your dark theme variable
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "var(--dark2)", // Dark background for the header
                    color: "var(--accent2)", // Light text color for contrast
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--dark2)",
                    color: "var(--accent2)",
                  }}
                >
                  Subject
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--dark2)",
                    color: "var(--accent2)",
                  }}
                >
                  Semester
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--dark2)",
                    color: "var(--accent2)",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredNotes.map((note) => (
                <TableRow
                  key={note.id}
                  sx={{
                    color: "var(--color1)", // Text color
                  }}
                >
                  <TableCell
                    sx={{
                    color: "var(--color1)", // Text color
                  }}
                  >{note.id}</TableCell>
                  <TableCell
                    sx={{
                    color: "var(--color1)", // Text color
                  }}
                  >{note.subject}</TableCell>
                  <TableCell
                    sx={{
                    color: "var(--color1)", // Text color
                  }}
                  >{note.semester}</TableCell>
                  <TableCell
                    sx={{
                    color: "var(--color1)", // Text color
                  }}
                  >
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(note.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          PaperProps={{
            style: { backgroundColor: "var(--dark)" },
          }}
        >
          <DialogContent>
            <DialogContentText sx={{ color: "var(--color1)" }}>
              Are you sure you want to delete this note?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AllNotes;
