import { ChangeEvent, FC, useEffect, useState } from "react";
import { getById, saveWishList } from "../../store/firebase";
import Button from "../../components/Button/Button";
import WishListItems from "../../components/WishListItems";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import { isUUID, uuid } from "../../helper";
import { useParams } from "react-router";
import { TWishList, CWishListItem } from "../../types";
import WishListItemWindow from "../../components/WishListItemWindow";
import Share from "../../assets/svgComponents/Share";
import ShareWindow from "../../components/ShareWindow";

enum CloseType {
  wishListItemWindow,
  shareWindow,
}

const WishList: FC = () => {
  const [name, setName] = useState("");
  const [items, setItems] = useState<CWishListItem[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenWishListItemWindow, setIsOpenWishListItemWindow] =
    useState(false);
  const [isOpenShareWindow, setIsOpenShareWindow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CWishListItem>();
  const navigation = useNavigate();
  const { id } = useParams();
  let guid = id;
  const isGuid = guid && isUUID(guid);
  guid = guid || uuid();

  const add = () => {
    setSelectedItem(undefined);
    setIsOpenWishListItemWindow(true);
  };

  const close = (type: CloseType) => {
    switch (type) {
      case CloseType.wishListItemWindow:
        setIsOpenWishListItemWindow(false);
        break;
      case CloseType.shareWindow:
        setIsOpenShareWindow(false);
        break;
    }
  };

  const saveItem = (newItem: CWishListItem) => {
    if (newItem) {
      let newItems = [...(items || [])] || [];
      const foundIndex = items?.findIndex((item) => {
        return item.id === newItem.id;
      });

      if (foundIndex === -1 || foundIndex === undefined) {
        newItems.push(newItem);
      } else {
        const before = [...newItems.slice(0, foundIndex)];
        const after = [...newItems.slice(foundIndex + 1, newItems.length)];
        newItems = [...before, newItem, ...after];
      }
      setItems(newItems);
    }
  };

  useEffect(() => {
    if (isLoading || !isGuid) {
      saveWishList(guid || uuid(), {
        name: name,
        items: items || [],
      });

      if (!isGuid) {
        navigation(`${guid}`);
      }
    }
  }, [items, name, isGuid, guid, navigation, isLoading]);

  useEffect(() => {
    if (isGuid && guid && !isLoading) {
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

  const onChange = (name: string) => {
    setName(name);
  };

  const onSelectItem = (selectedItem: CWishListItem) => {
    setSelectedItem(selectedItem);
    setIsOpenWishListItemWindow(true);
  };

  const onDeleteItem = (selectedItem: CWishListItem) => {
    const foundIndex = items?.findIndex((item) => {
      return item.id === selectedItem.id;
    });

    if (foundIndex !== undefined && foundIndex !== -1 && items) {
      const before = [...items.slice(0, foundIndex)];
      const after = [...items.slice(foundIndex + 1, items.length)];
      const newItems = [...before, ...after];
      setItems(newItems);
    }
  };

  const share = () => {
    setIsOpenShareWindow(true);
  };

  return (
    <div className={style.wishList}>
      <h1>Хотелочки</h1>

      <input
        className={style.wishList__input}
        placeholder="Имя хотелочки"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
      <div className={style.buttons}>
        <Button onClick={add} blockModifier={"square"}>
          <div>+</div>
        </Button>
        <Button onClick={share} blockModifier={"square"}>
          <Share color="var(--white)" />
        </Button>
      </div>

      <WishListItems
        items={items}
        onSelectItem={onSelectItem}
        onDeleteItem={onDeleteItem}
      />
      {isOpenWishListItemWindow && (
        <WishListItemWindow
          onClose={() => close(CloseType.wishListItemWindow)}
          saveItem={saveItem}
          selectedItem={selectedItem}
        />
      )}
      {isOpenShareWindow && (
        <ShareWindow onClose={() => close(CloseType.shareWindow)} />
      )}
    </div>
  );
};
export default WishList;
