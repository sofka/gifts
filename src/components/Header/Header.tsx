import { useState } from "react";
import DefaultUser from "../../assets/svgComponents/DefaultUser";
import Button from "../Button/Button";
import style from "./style.module.scss";
const Header = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const signInOnClick = () => {
    setIsAuthorized(!isAuthorized);
  };
  return (
    <div className={style.header}>
      {isAuthorized ? (
        <div className={style.header__user} onClick={signInOnClick}>
          <DefaultUser />
          <div className="user__name">Ф.И.О.</div>
        </div>
      ) : (
        <Button onClick={signInOnClick} blockModifier="signin">Войти</Button>
      )}
    </div>
  );
};
export default Header;
