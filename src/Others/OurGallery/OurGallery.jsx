import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import Skeleton from '@mui/material/Skeleton';
import Background from '../../theme/Background/Background';
import Titles from '../../theme/Style/Titles';
import { Box, CircularProgress, Typography } from '@mui/material';
import Navbar from '../../theme/Navbar/Navbar';
import CloseIcon from '@mui/icons-material/Close';
import ApiUrl from '../../Hooks/URL';
import { Fade } from 'easy-reveal';
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

const titles = Titles();
const api = ApiUrl();

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function OurGallery() {
  const [itemData, setItemData] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const rowColumn = [[2, 2], [1, 1], [1, 1], [1, 2]];

  const fetchGalleryData = async () => {
    const result = await fetch(api.api + "gallery/showAll");
    return await result.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchGalleryData();
        setItemData(data);
        setItems(data.slice(0, 10));
        setHasMore(data.length > 10);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadMoreItems = () => {
    const newItems = itemData.slice(items.length, items.length + 10);
    if (newItems.length === 0) {
      setHasMore(false);
    } else {
      setItems((prevItems) => [...prevItems, ...newItems]);
    }
  };

  const showImage = (img) => {
    setSelectedImage(img);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
      observer.disconnect();
    };
  }, [hasMore, loading]);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      const startIndex = (page - 1) * 10;
      const endIndex = startIndex + 10;
      const newItems = itemData.slice(startIndex, endIndex);

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prevItems) => [...prevItems, ...newItems]);
      }
      setLoading(false);
    };

    if (page > 1 && hasMore) {
      loadItems();
    }
  }, [page, hasMore, itemData]);

  return (
    <>
      <Helmet>
        <title>Our Gallery - BCA Department MCC</title>
        <meta
          name="description"
          content="Explore the vibrant activities and achievements of the BCA department at Mar Chrysostom College (MCC) through our gallery, showcasing innovation and community engagement."
        />
        <meta name="keywords" content="MCC, BCA, gallery, activities, achievements, community, innovation" />
        <meta name="author" content="MCC BCA Department" />
      </Helmet>
      <Background b1={true} b1Color="var(--accent2)">
        <Navbar />
        <Box
          sx={{
            minHeight: '100vh',
            padding: {
              xs: '7rem 4% 3rem 4%',
              md: '8rem 7% 4rem 7%',
            },
          }}
        >
          <Box
            sx={{
              margin: '0 auto 2rem auto',
              width: 'fit-content',
              maxWidth: '700px',
              textAlign: 'center',
            }}
          >
            <Fade duration={1500} up>
              <Typography
                variant="h3"
                sx={{ ...titles.title, marginBottom: '0.6rem' }}
              >
                our{' '}
                <Typography variant="body" sx={{ color: 'var(--accent)' }}>
                  Gallery
                </Typography>
              </Typography>
              <Typography variant="body2">
                This gallery showcases the vibrant activities and achievements of
                the BCA department at Mar Chrysostom College (MCC). Explore the
                diverse range of experiences that define our department, where
                learning extends beyond the classroom and into real-world
                innovation and community engagement.
              </Typography>
            </Fade>
          </Box>
          <ImageList
            sx={{
              maxWidth: '900px',
              margin: '0 auto',
              overflow: 'hidden',
              minHeight: '490px',
              paddingBottom: '2rem',
            }}
            cols={loading ? 3 : 4}
            variant="quilted"
            rowHeight={loading ? 225 : 125}
          >
            {loading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    animation="wave"
                    height={loading ? 225 : 125}
                    sx={{
                      margin: '2px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light gray for dark themes
                      '&::after': {
                        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))',
                      },
                    }}
                  />

                ))
              : items.map((item, index) => {
                  const cycleIndex = Math.floor(index / rowColumn.length);
                  const isReversed = cycleIndex % 2 === 1;
                  const patternIndex = index % rowColumn.length;
                  const [rows, cols] = isReversed
                    ? rowColumn[rowColumn.length - 1 - patternIndex]
                    : rowColumn[patternIndex];

                  return (
                    <ImageListItem
                      key={item.url}
                      sx={{ margin: '2px' }}
                      cols={cols}
                      rows={rows}
                    >
                      <img
                        onClick={() => showImage(item.url)}
                        style={{ borderRadius: '6px', cursor: 'pointer' }}
                        {...srcset(item.url, 180, rows, cols)}
                        alt={item.title || 'Gallery image'}
                      />
                    </ImageListItem>
                  );
                })}
          </ImageList>
          {hasMore && <div ref={observerRef} style={{ height: '20px' }}></div>}
        </Box>

        <Dialog
          sx={{
            zIndex: 100000000,
            minHeight: '569px',
            height: '100vh',
            overflow: 'hidden',
          }}
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              overflow: 'auto',
              justifyContent: 'center',
              background: 'transparent',
              alignItems: 'center',
            }}
          >
            {loading && (
              <CircularProgress
                sx={{
                  position: 'absolute',
                  color: 'var(--accent)',
                  background: 'transparent',
                  zIndex: 10000,
                }}
              />
            )}

            <img
              src={selectedImage}
              alt="Selected"
              onLoad={handleImageLoad}
              style={{
                display: loading ? 'none' : 'block',
                maxWidth: '90%',
                maxHeight: '90vh',
                overflow: 'auto',
                objectFit: 'contain',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                overflow: 'hidden',
              }}
            >
              <IconButton
                      onClick={handleClose}
                      sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          color: "white",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.7)",
                          },
                      }}
                  >
                      <CloseIcon />
                  </IconButton>
            </Box>
          </Box>
        </Dialog>
      </Background>
    </>
  );
}
