const Style = () => {
    return {
        appBar: {
            backgroundColor: 'rgba(237,237,237,0.18)',
            backdropFilter: 'blur(8px)',
            boxShadow: 'none',
            color: '#fff',
            width: {
                md: '70%',
                xs: '96%',
            },
            maxWidth: '912px',
            height:'4rem',
            left: '50%',
            top: '1.5rem',
            transform: 'translate(-50%, 0%)',
            borderRadius: '6px',
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 2rem',
        },
        logo: {
            width: '92px',
            height: '92px',
            transition: '0.3s ease',
            '&:hover': {
                cursor: 'pointer',
                transform: 'scale(1.1)',
            },
        },
        drawer: {
            width: '100%',
            textAlign: 'center',
        },
        logoImg: {
            maxHeight: '100%',
            maxWidth: '100%',
        },
        navlist: {
            
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: '2rem',
            '& > *': {
                cursor: 'pointer',
                transition: '0.2s ease',
                '&:hover': {
                    transform: 'scale(1.1)',
                },
            },
        },
    };
};
export default Style;

