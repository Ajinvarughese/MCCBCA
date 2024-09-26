const Style = () => {
    return {

        aboutMain: {
            padding: {
                xs: '7rem 4% 3rem 4%',
                md: '8rem 7% 4rem 7%',
            },
        },
        title: {
            fontFamily: 'var(--titleFont)',
            color: 'var(--color1)',
        },
        title2: {
            color: 'var(--accent)',
        },
        ab1: {
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            margin: 0, // Remove unwanted margins
        },
        img: {
            maxWidth: '100%',
            maxHeight: '100%',
            display: 'block',
        },
        ab2: {
            display: 'flex',
            flexDirection: {
                xs: 'column',
                md: 'row',
            },
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0, // Remove any margin here as well
        }
    }
}
export default Style;
