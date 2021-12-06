import { FC } from "react";
import { TWishListItem } from "../../types";

type WishListItemsProps = {
  items?: TWishListItem[];
};

const WishListItems: FC<WishListItemsProps> = (props) => {
  const { items } = props;
  return (
    <ul>
      {items &&
        items.map((item) => {
          return <li key={item.id}>{item.text}</li>;
        })}
      {(!items || !items.length) && <li>Список Ваших хотелочек пуст</li>}
    </ul>
  );
};
export default WishListItems;
