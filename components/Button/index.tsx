import { ButtonHTMLAttributes, DetailedHTMLProps, memo } from "react";

import css from "./index.module.css";

export interface ButtonProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	size?: "small" | "normal";
}

const Button = memo<ButtonProps>((props) => (
	<button
		{...props}
		className={`${css.button} ${props.size === "small" ? css.small : ""}`}
	/>
));

export default Button;
