import { ChangeEvent, FC, useState } from "react";
import Close from "../../assets/svgComponents/Close";
import { uuid } from "../../helper";
import { TWishListItem } from "../../types";
import Button from "../Button/Button";
import style from "./style.module.scss";

type WishListItemWindowProps = {
  onClose?: () => void;
  saveItem?: (newItem: TWishListItem) => void;
  selectedItem?: TWishListItem;
};

const WishListItemWindow: FC<WishListItemWindowProps> = (props) => {
  const { onClose, saveItem, selectedItem } = props;
  const onSave = () => {
    const newItem = {
      id: selectedItem ? selectedItem.id : uuid(),
      name: name,
      text: name,
    };
    saveItem && saveItem(newItem);
    onClose && onClose();
  };
  const title = selectedItem ? "Редактирование" : "Добавление";
  const [name, setName] = useState(selectedItem ? selectedItem.name : "");
  return (
    <div className={style.modal}>
      <div className={style.modal__content}>
        <div className={style.modal__header}>
          <div>{title}</div>
          <div onClick={onClose}>
            <Close />
          </div>
        </div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </div>
        <div className={style.modal__footer}>
          <Button onClick={onSave} blockModifier={"big"}>
            <div>Сохранить</div>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default WishListItemWindow;
