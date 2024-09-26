const Style = () => {
    return {
        nav: {
            position: 'fixed',
            color: '#fff',
            top: '1.5rem',
            zIndex: 100000,
            left: '50%',
            transform: 'translate(-50%, 0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: {
                md: 'space-between',
                xs: 'space-between',
            },
            padding: {
                md: '0 2rem',
                xs: '0'
            },
            height: '4rem',
            width: {
                md: '70%',
                xs: '96%',
            },
            maxWidth: '912px',
            borderRadius: '6px',
            background: 'rgba(237,237,237,0.18)',
            backdropFilter: 'blur(8px)',
        },
        navlist: {
            display: {
                md: 'flex',
                xs: 'none',
            },
        },
        logo: {
            width: '92px',
            height: '92px',
            transition: '0.3s ease',
            '&:hover': {
                cursor: 'pointer',
                transform: 'scale(1.1)',
            }
        },
        logoImg: {
            maxHeight: '100%',
            maxWidth: '100%',
            display: 'block'
        }
    }
};
export default Style;