import { ChangeEvent, FC, useEffect, useState } from "react";
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
import {
  useGetWishListByIdMutation,
  useSaveWishListMutation,
  useUpdateWishListMutation,
} from "../../redux/api/wishList";
import {
  useCreateWishListItemMutation,
  useDeleteMutation,
  useGetByWishListIdMutation,
  useUpdateWishListItemMutation,
} from "../../redux/api/wishListItem";

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
  const [getWishListById] = useGetWishListByIdMutation();
  const [getWishListItems] = useGetByWishListIdMutation();

  const [saveWishList] = useSaveWishListMutation();
  const [updateWishList] = useUpdateWishListMutation();

  const [createWishListItem] = useCreateWishListItemMutation();
  const [updateWishListItem] = useUpdateWishListItemMutation();
  const [deleteWishListItem] = useDeleteMutation();
  const navigation = useNavigate();
  const { id } = useParams();
  let guid = id;
  const isEdit = guid && isUUID(guid);
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
    let isNew = false;
    if (newItem) {
      let newItems = [...(items || [])] || [];
      const foundIndex =
        items?.findIndex((item) => {
          return item.id === newItem.id;
        }) || 0;
      isNew = foundIndex === -1 || foundIndex === undefined;
      if (isNew) {
        newItems.push(newItem);
      } else {
        const before = [...newItems.slice(0, foundIndex)];
        const after = [...newItems.slice(foundIndex + 1, newItems.length)];
        newItems = [...before, newItem, ...after];
      }

      const saveWishListItem = isNew ? createWishListItem : updateWishListItem;
      saveWishListItem(newItem)
        .unwrap()
        .then((res) => {
          console.log(res);
          setItems(newItems);
        });
    }
  };

  useEffect(() => {
    const save = isEdit ? updateWishList : saveWishList;
    save({
      id: guid || uuid(),
      name: name,
      items: items || [],
    });

    if (!isEdit) {
      navigation(`${guid}`);
      setIsLoading(true);
    }
  }, [
    items,
    name,
    isEdit,
    guid,
    navigation,
    isLoading,
    saveWishList,
    updateWishList,
  ]);

  useEffect(() => {
    if (isEdit && guid && !isLoading) {
      getWishListById(guid)
        .unwrap()
        .then((res) => {
          initialWishList(res);
          guid &&
            getWishListItems(guid)
              .unwrap()
              .then((result) => {
                setItems(result);
              });
        });
    }
  }, [isEdit, guid, isLoading, getWishListById, getWishListItems]);

  const initialWishList = (wishList?: TWishList) => {
    if (wishList) {
      setName(wishList.name);
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
      selectedItem &&
        deleteWishListItem(selectedItem.id.toString())
          .unwrap()
          .then((res) => {
            const before = [...items.slice(0, foundIndex)];
            const after = [...items.slice(foundIndex + 1, items.length)];
            const newItems = [...before, ...after];
            setItems(newItems);
          });
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
        placeholder="Имя списка"
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
          wishListId={guid}
        />
      )}
      {isOpenShareWindow && (
        <ShareWindow onClose={() => close(CloseType.shareWindow)} />
      )}
    </div>
  );
};
export default WishList;
