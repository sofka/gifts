import { ChangeEvent, FC, useEffect, useState } from "react";
import { getById } from "../../store/firebase";
import Button from "../../components/Button/Button";
import WishListItems from "../../components/WishListItems/WishListItems";
import { useNavigate } from "react-router-dom";

import style from "./style.module.scss";
import { isUUID, uuid } from "../../helper";
import { useParams } from "react-router";
import { TWishList, TWishListItem } from "../../types";

const WishList: FC = () => {
  const [name, setName] = useState("");
  const [items, setItems] = useState<TWishListItem[]>();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const { id } = useParams();
  const guid = id;
  const isGuid = guid && isUUID(guid);

  const add = () => {
    console.log("добавить");
  };
  const save = () => {
    console.log("сохранить");
    navigation(`${uuid()}`);
  };
  

  useEffect(() => {
    if (isGuid && !isLoading) {
      getById(guid).then((res) => {
        const wishList = res as TWishList;

        initialWishList(wishList);
      });
    }
  }, [isGuid, guid, isLoading]);

  const initialWishList = (wishList?: TWishList) => {

    if (wishList) {
      setName(wishList.name);
      setItems(wishList.items);
      setIsLoading(true);
    }
  };

  return (
    <div className={style.wishList}>
      <h1>Хотелочки</h1>

      <input
        placeholder="Введите наименование списка"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <div className={style.buttons}>
        <Button onClick={add} blockModifier={"add"}>
          <div>Добавить хотелочку</div>
        </Button>
        <Button onClick={save} blockModifier={"add"}>
          <div>Сохранить</div>
        </Button>
      </div>

      <WishListItems items={items} />
    </div>
  );
};
export default WishList;
