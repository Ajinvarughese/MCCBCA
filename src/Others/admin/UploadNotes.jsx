import React, { useState } from "react";
import { Box, Button, TextField, Typography, Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from "@mui/icons-material/Save";
import Background from "../../theme/Background/Background";
import Navbar from "../../theme/Navbar/Navbar";
import Titles from "../../theme/Style/Titles";
import ApiUrl from "../../Hooks/URL";
import AllNotes from "./Notes/AllNotes";

const titles = Titles();
const api = ApiUrl();

const style = {
  input: {
    "& .MuiFilledInput-root": {
      backgroundColor: "rgba(237,237,237,0.10)",
      "&:hover": {
        backgroundColor: "rgba(237,237,237,0.15)", // Change background on hover
      },
      "&.Mui-focused": {
        backgroundColor: "rgba(237,237,237,0.20)", // Change background when focused
      },
      "&:before": {
        borderBottom: "2px solid var(--color1)", // Focused underline
      },
      "&:after": {
        borderBottom: "2px solid var(--accent)", // Active underline
      },
    },
    "& .MuiInputBase-input": {
      color: "var(--color1)", // Input text color
    },
    "& .MuiInputLabel-root": {
      color: "var(--color1)", // Label text color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "var(--accent)", // Label color when focused
    },
  },
};


const UploadNotes = () => {

  const decoder = new TextDecoder();
  const adminArray = JSON.parse(sessionStorage.getItem("admin"));
  const passArray = JSON.parse(sessionStorage.getItem("pass"));

  const admin = decoder.decode(new Uint8Array(adminArray));
  const pass = decoder.decode(new Uint8Array(passArray));

  try {
    fetch(api.api + "admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        userId: admin,
        password: pass
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        window.location.replace("../admin");
      });
  } catch (error) {
    console.error("Unexpected error:", error);
    window.location.replace("../admin");
  }



  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const fileDetails = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      subject: "", // Default empty subject
      semester: "", // Default empty semester
    }));
    setSelectedFiles(fileDetails);
    setFileCount(files.length);
    setUploadedCount(0);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index][field] = value;
    setSelectedFiles(updatedFiles);
  };

  const handleUploadClick = async () => {
    if (!selectedFiles || fileCount === 0) return;

    setLoading(true);

    const uploadPromises = selectedFiles.map(async ({ file, subject, semester }) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "mccbca");
        data.append("folder", "Notes");
        data.append("cloud_name", "dohwjrsvl");

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dohwjrsvl/image/upload", {
                method: "POST",
                body: data,
            });
            if (!res.ok) {
                throw new Error(`Upload failed: ${res.status}`);
            }
            const uploadResponse = await res.json();

            // After successful Cloudinary upload, send details to the API
            const fileDetails = {
                subject,
                semester,
                url: uploadResponse.secure_url,
            };

            const response = await fetch(api.api + "notes/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fileDetails),
            });
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            console.log(`File ${file.name} uploaded and saved successfully.`);
            return fileDetails;
        } catch (error) {
            console.error("Error:", error);
        }
    });
    await Promise.all(uploadPromises); // Wait for all uploads to complete
    // Reset UI
    setSelectedFiles([]);
    setFileCount(0);
    setUploadedCount(0);
    document.getElementById("file-input").value = null;

    setLoading(false);
    setOpenDialog(true);
};


  return (
    <Background b2 b2Color="var(--accent2)">
      <Box>
        <Navbar />
        <Box
          sx={{
            padding: {
              xs: "7rem 4% 3rem 4%",
              md: "8rem 7% 4rem 7%",
            },
            minHeight: "100vh",
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
            <Typography variant="h3" sx={titles.title}>
              upload <Typography variant="body" sx={{ color: "var(--accent)" }}>notes</Typography>
            </Typography>
          </Box>

          <Box
            sx={{
              maxWidth: "470px",
              padding: "2rem 4%",
              margin: "0 auto",
              backgroundColor: "rgba(237,237,237,0.08)",
              backdropFilter: "blur(8px)",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                gap: "5px",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Button
                  component="label"
                  role={undefined}
                  disabled={loading}
                  variant={fileCount > 0 ? "outlined" : "contained"}
                  sx={fileCount > 0
                    ? {
                        color: "#fff",
                        border: "1px solid #fff",
                        transition: "0.3s ease",
                        "&:hover": { transform: "scale(1.03)" },
                      }
                    : {
                        background: "var(--accent)",
                        transition: "0.3s ease",
                        "&:hover": { transform: "scale(1.03)" },
                      }}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Files
                  <input
                    id="file-input"
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: "none", marginBottom: "1rem" }}
                  />
                </Button>
              </Box>
              {fileCount > 0 && (
                <Box>
                  {loading ? (
                    <LoadingButton
                      loading
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                      variant="contained"
                    >
                      Uploading...
                    </LoadingButton>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleUploadClick}
                      endIcon={<SendIcon />}
                    >
                      Send
                    </Button>
                  )}
                </Box>
              )}
            </Box>

            <Box>
              {selectedFiles.map((file, index) => (
                <Box key={index} sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography variant="body2">{file.file.name}</Typography>
                  <TextField
                    variant="filled" // Use "filled" as your style targets filled input fields
                    fullWidth
                    label="Subject Name"
                    value={file.subject}
                    onChange={(e) => handleFieldChange(index, "subject", e.target.value)}
                    sx={style.input}
                />
                <TextField
                    variant="filled"
                    fullWidth
                    label="Semester"
                    value={file.semester}
                    onChange={(e) => handleFieldChange(index, "semester", e.target.value)}
                    sx={style.input}
                />

                </Box>
              ))}
            </Box>
          </Box>

          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
          >
            <DialogContent>
              <DialogContentText>Files successfully uploaded!</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          <Box>
            <AllNotes />
          </Box>
        </Box>
      </Box>
    </Background>
  );
};

export default UploadNotes;
