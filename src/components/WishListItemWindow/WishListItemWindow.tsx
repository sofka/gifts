import { ChangeEvent, FC, useEffect, useState } from "react";
import { uuid } from "../../helper";
import { TWishListItem } from "../../types";
import Attachments from "../Attachments";
import File from "../File";
import Modal from "../Modal";
import style from "./style.module.scss";

type WishListItemWindowProps = {
  onClose?: () => void;
  saveItem?: (newItem: TWishListItem) => void;
  selectedItem?: TWishListItem;
};

const WishListItemWindow: FC<WishListItemWindowProps> = (props) => {
  const { onClose, saveItem, selectedItem } = props;
  const MAX_IMAGES = 3;
  const [images, setImages] = useState(selectedItem?.images || []);
  const [disabled, setDisabled] = useState(
    images.length === MAX_IMAGES || images.length > MAX_IMAGES
  );
  const onSave = () => {
    const newItem = {
      id: selectedItem ? selectedItem.id : uuid(),
      name: name,
      text: name,
      images: images || [],
    };
    saveItem && saveItem(newItem);
    onClose && onClose();
  };
  const loadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e && e.target && e.target.files && e.target.files[0];
    if (file) {
      toBase64(file).then((data) => {
        const newImages = [...images, data as string];
        setImages(newImages);
      });
    }
  };

  const toBase64 = (file: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const removeImage = (index: number) => {
    const before = [...images.slice(0, index)];
    const after = [...images.slice(index + 1)];
    const newImages = [...before, ...after];
    setImages(newImages);
  };

  useEffect(() => {
    setDisabled(images.length === MAX_IMAGES || images.length > MAX_IMAGES);
  }, [images]);

  const title = selectedItem ? "Редактирование" : "Добавление";
  const [name, setName] = useState(selectedItem ? selectedItem.name : "");
  return (
    <Modal title={title} onClose={onClose} onSave={() => onSave()}>
      <input
        type="text"
        className={style.wishListItemWindow__input}
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        placeholder="Наименование пункта"
      />
      <div>
        <File loadFile={loadFile} disabled={disabled} />
      </div>
      {images && <Attachments images={images} remove={removeImage} />}
    </Modal>
  );
};
export default WishListItemWindow;
