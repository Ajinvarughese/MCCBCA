import ButtonReact from "@mui/material/Button";

import ButtonStyle from "./ButtonStyle";

const style = ButtonStyle();
const Button = (props) => {
    return(
        <ButtonReact
            onClick={props.onClick}
            variant="contained"
            sx={style.button}
        >
            {props.text}
        </ButtonReact>
    );
}

export default Button;