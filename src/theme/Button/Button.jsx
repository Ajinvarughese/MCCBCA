import ButtonReact from "@mui/material/Button";

const Button = (props) => {
    return(
        <ButtonReact
            variant="contained"
            sx={{
                fontSize: '11px', 
                fontWeight: 'bold', 
                background: 'var(--accent)',
                color: 'var(--color1)',
                transition: '0.3s ease',
                '&:hover': {
                    transform: 'scale(1.04)',
                }
            }}
        >
            {props.text}
        </ButtonReact>
    );
}

export default Button;