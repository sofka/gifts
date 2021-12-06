import { FC } from "react";
import style from "./style.module.scss";

type TButtonProps = {
  type?: EButtonType;
  onClick?: () => void;
  blockModifier?: string;
  child?: JSX.Element | string;
};
enum EButtonType {
  SUBMIT = "submit",
  RESET = "reset",
  BUTTON = "button",
}
const block = "button";

const Button: FC<TButtonProps> = ({
  child,
  type,
  onClick,
  blockModifier,
  children,
}) => {
  return (
    <button
      className={style[blockModifier ? `${block}_${blockModifier}` : block]}
      type={type ?? EButtonType.BUTTON}
      onClick={() => onClick && onClick()}
    >
      {children ?? child}
    </button>
  );
};

export default Button;
