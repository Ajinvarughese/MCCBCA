const Titles = () => {
    return {
        title: {
            color: 'var(--color1)',
            fontFamily: 'var(--titleFont)',
            fontSize: {
                xs: 'clamp(2.4rem, 2vw, 4rem)',
                sm:  'clamp(3.1rem, 3vw, 4rem)',
            }
        }
    }
}

export default Titles;