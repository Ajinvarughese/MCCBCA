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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Titles from "../../../theme/Style/Titles";
import ApiUrl from "../../../Hooks/URL";

const titles = Titles();
const api = ApiUrl();

const AllGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch gallery items from API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(api.api + "gallery/showAll");
        if (!response.ok) {
          throw new Error("Failed to fetch gallery items.");
        }
        const data = await response.json();
        setGallery(data);
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      }
    };
    fetchGallery();
  }, []);

  // Handle delete dialog open
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  // Handle confirm delete
  const confirmDelete = async () => {
    try {
      const response = await fetch(api.api + `gallery/delete/${deleteId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete gallery item.");
      }
      setGallery((prevGallery) =>
        prevGallery.filter((item) => item.id !== deleteId)
      );
      setDeleteDialogOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting gallery item:", error);
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
            Gallery
          </Typography>
        </Typography>

        {/* Table Section */}
        <TableContainer
          component={Paper}
          sx={{
            marginTop: 3,
            backgroundColor: "var(--dark)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "var(--dark2)",
                    color: "var(--accent2)",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  Image
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--dark2)",
                    color: "var(--accent2)",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gallery.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    ":hover": {
                      backgroundColor: "var(--dark-hover)",
                    },
                  }}
                >
                  <TableCell>
                    <img
                      src={item.url}
                      alt={item.title}
                      style={{
                        width: "120px",
                        height: "90px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(item.id)}
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
            style: { backgroundColor: "var(--dark)", borderRadius: "8px" },
          }}
        >
          <DialogContent>
            <DialogContentText sx={{ color: "var(--color1)", fontSize: "1rem" }}>
              Are you sure you want to delete this gallery item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="error" sx={{ fontWeight: "bold" }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AllGallery;
