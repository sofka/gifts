import Gif from "../../assets/gift_gif.gif";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import Button from "../../components/Button/Button";
import Header from "../../components/Header";

const Home = () => {
  const navigate = useNavigate();
  const goToCreateWishList = () => {
    navigate("/wishList");
  };

  return (
    <>
    <Header/>
    <div className={style.creation}>
      <div>
        <img src={Gif} alt="Картинка подарок gif" />
      </div>
      <div>
        <Button child=" Создать список хотелок" onClick={goToCreateWishList} />
      </div>
    </div>
    </>
    
  );
};
export default Home;
