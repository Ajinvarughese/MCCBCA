import React, { useState } from "react";
import Background from "../../theme/Background/Background";
import { Box, Button, Typography } from "@mui/material";
import Titles from "../../theme/Style/Titles";
import Navbar from "../../theme/Navbar/Navbar";

const titles = Titles();

const ImageUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const filePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedFiles(filePreviews);
    setFileCount(files.length); // Store the initial count of selected files
    setUploadedCount(0); // Reset the uploaded count for each new selection
  };

  const handleUploadClick = async () => {
    if (!selectedFiles || fileCount === 0) return;

    const uploadPromises = selectedFiles.map(async ({ file }) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "mccbca");
      data.append("cloud_name", "dohwjrsvl");

      const res = await fetch("https://api.cloudinary.com/v1_1/dohwjrsvl/image/upload", {
        method: "POST",
        body: data,
      });

      const uploadImageUrl = await res.json();
      setUploadedCount((prev) => prev + 1);
      return uploadImageUrl.url;
    });

    const newImages = await Promise.all(uploadPromises);
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);

    // Clear selected files after upload
    setSelectedFiles([]);
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
          upload <Typography variant="body" sx={{
              color: 'var(--accent)',
          }}>images</Typography>
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
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ marginBottom: '1rem' }}
          />
          <Button variant="contained" onClick={handleUploadClick} sx={{ mb: 2 }}>
            Upload Images
          </Button>

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
      </Box>
    </Background>
  );
};

export default ImageUploader;