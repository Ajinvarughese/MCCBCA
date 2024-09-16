const Style = () => {
    return {
        nav: {
            position: 'fixed',
            color: '#fff',
            top: '1.5rem',
            left: '50%',
            transform: 'translate(-50%, 0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: {
                md: 'space-between',
                xs: 'center',
            },
            padding: {
                md: '0 2rem',
                xs: '0'
            },
            height: '4rem',
            width: {
                md: '70%',
                xs: '98%',
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
    }
};
export default Style;