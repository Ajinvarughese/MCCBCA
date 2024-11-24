import React, { useState } from "react";
import Background from "../../theme/Background/Background";
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogActions, Typography } from "@mui/material";
import Titles from "../../theme/Style/Titles";
import Navbar from "../../theme/Navbar/Navbar";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import ApiUrl from "../../Hooks/URL";

const titles = Titles();
const api = ApiUrl();



const ImageUploader = () => {

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
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // state for dialog visibility

  const handleUploadUrl = async (url) => {
    const data = {
      "url": url.url
    };
    fetch(api.api+"gallery/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const filePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedFiles(filePreviews);
    setFileCount(files.length);
    setUploadedCount(0);
  };

  const handleUploadClick = async () => {
    if (!selectedFiles || fileCount === 0) return;

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

    const uploadPromises = selectedFiles.map(async ({ file }) => {
      setLoading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "mccbca");
      data.append("folder", "Gallery");
      data.append("cloud_name", "dohwjrsvl");

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dohwjrsvl/image/upload", {
          method: "POST",
          body: data,
        });
        if (!res.ok) {
          throw new Error(`Upload failed: ${res.status}`);
        }
        const uploadImageUrl = await res.json();
        console.log(uploadImageUrl);
        handleUploadUrl(uploadImageUrl);
        setUploadedCount((prev) => prev + 1);
        return uploadImageUrl.secure_url;
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    });

    const newImages = await Promise.all(uploadPromises);
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);

    // Clear selected files and reset input
    setSelectedFiles([]);
    setFileCount(0);
    setUploadedCount(0);
    document.getElementById('file-input').value = null;

    // Show success dialog after upload completes
    setOpenDialog(true);
  };

  return (
    <Background b1={true} b1Color="var(--accent2)">
      <Box
        sx={{
          minHeight: '100vh',
          padding: {
            xs: '7rem 4% 3rem 4%',
            md: '8rem 7% 4rem 7%',
          },
        }}
      >
        <Navbar />
        <Box
          sx={{
            margin: '0 auto 2rem auto',
            width: 'fit-content',
            maxWidth: '700px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" sx={titles.title}>
            upload <Typography variant="body" sx={{ color: 'var(--accent)' }}>images</Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            maxWidth: '470px',
            padding: '2rem 4%',
            margin: '0 auto',
            backgroundColor: 'rgba(237,237,237,0.08)',
            backdropFilter: 'blur(8px)',
            borderRadius: '6px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              gap: '5px',
              justifyContent: "space-between"
            }}
          >
            <Box>
              <Button
                component="label"
                role={undefined}
                disabled={loading}
                variant={fileCount > 0 ? "outlined" : "contained"}
                tabIndex={-1}
                sx={fileCount > 0 ?
                  {
                    color: '#fff',
                    border: '1px solid #fff',
                    transition: '0.3s ease',
                    "&:hover": { transform: 'scale(1.03)' },
                  } :
                  {
                    background: 'var(--accent)',
                    transition: '0.3s ease',
                    "&:hover": { transform: 'scale(1.03)' },
                  }
                }
                startIcon={<CloudUploadIcon />}
              >
                Upload Images
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: 'none', marginBottom: '1rem' }}
                />
              </Button>
            </Box>
            {fileCount > 0 &&
              <Box>
                {loading ?
                  <LoadingButton
                    loading
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                  >
                    Uploading...
                  </LoadingButton> :
                  <Button
                    sx={{ marginLeft: '-2px' }}
                    variant="contained"
                    onClick={handleUploadClick}
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                }
              </Box>
            }
          </Box>

          <Typography variant="h6">
            Uploaded images: {uploadedCount} / {fileCount}
          </Typography>

          <Box className="uploaded-images" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
            {selectedFiles.map((file, index) => (
              <Box key={index} sx={{ position: 'relative', width: 120, height: 120 }}>
                <img
                  src={file.preview}
                  alt={`Preview ${index + 1}`}
                  width="100%"
                  height="100%"
                  style={{ objectFit: 'cover', borderRadius: '6px' }}
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
            <DialogContentText>Images successfully uploaded!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Background>
  );
};

export default ImageUploader;
