import { FC } from "react";
import Trash from "../../assets/svgComponents/Trash";
import { CWishListItem } from "../../types";
import style from "./style.module.scss";

type WishListItemProps = {
  item: CWishListItem;
  onSelectItem?: (selectedItem: CWishListItem) => void;
  onDeleteItem?: (selectedItem: CWishListItem) => void;
};

const WishListItem: FC<WishListItemProps> = (props) => {
  const { item, onSelectItem, onDeleteItem } = props;
  const { id, text } = item;

  const onClick = () => {
    onSelectItem && onSelectItem(item);
  };
  const onDelete = () => {
    onDeleteItem && onDeleteItem(item);
  };

  return (
    <li className={style.list_item} key={id}>
      <span onClick={onClick}>{text}</span>
      <span
        className={style.list_item__icons}
        onClick={onDelete}
      >
        <Trash />
      </span>
    </li>
  );
};
export default WishListItem;
