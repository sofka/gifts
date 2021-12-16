import { FC } from "react";
import { CWishListItem } from "../../types";
import WishListItem from "../WishListItem";
import style from './style.module.scss'

type WishListItemsProps = {
  items?: CWishListItem[];
  onSelectItem?: (selectedItem: CWishListItem) => void;
  onDeleteItem?: (selectedItem: CWishListItem) => void;
};

const WishListItems: FC<WishListItemsProps> = (props) => {
  const { items, onSelectItem, onDeleteItem } = props;
  return (
    <ul className={style.list}>
      {items &&
        items.map((item) => {
          return (
            <WishListItem
              key={item.id}
              item={item}
              onSelectItem={onSelectItem}
              onDeleteItem={onDeleteItem}
            />
          );
        })}
      {(!items || !items.length) && <li>Список Ваших хотелочек пуст</li>}
    </ul>
  );
};
export default WishListItems;
