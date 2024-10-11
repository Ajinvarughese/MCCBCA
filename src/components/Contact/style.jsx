const Style = () => {
    return {
        body: {
            minHeight: '568px',
            position: 'relative',
        },
        main: {
            padding: {
                xs: '7rem 4% 3rem 4%',
                md: '8rem 7% 4rem 7%',
            },
        }, 
        contact: {
            display: {
                md: 'flex',
            },
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        input: {
            width: {
                xs: '100%',
                md: '80%',
                maxWidth: '480px',
            },
            '& .MuiFilledInput-root': {
                backgroundColor: 'var(--surface77)', // Default background color
                '&:hover': {
                    backgroundColor: 'var(--surface99)', // Hover background color
                },
                '&.Mui-focused': {
                    backgroundColor: 'var(--surface99)', // Focused background color
                },
                '&:before': {
                    borderBottomColor: 'var(--accent)', // Default underline color
                },
                '&:hover:not(.Mui-disabled):before': {
                    borderBottomColor: 'var(--accent)', // Underline color on hover
                },
                '&:after': {
                    borderBottomColor: 'var(--color1)', // Underline color when focused
                },
                '& input': {
                    color: 'var(--color1)', // Text color
                },
            },
            '& .MuiInputLabel-root': {
                color: 'var(--color1)', // Label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
                color: 'var(--accent)', // Label color when focused
            },
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            marginTop: '2rem',
            marginBottom: '1rem',
        },
        formMain: {
            borderRadius: '6px',
            maxWidth: '600px',
            padding: '2rem 3%',
            background: 'var(--surface62)', // Default background color for the form
            flex: 1,
        },
        cp: {
            fontSize: {
                xs: '8px',
                sm: '10px',
                md: '11px'
            },
            opacity: 0.8,
        }
    }
}
export default Style;
