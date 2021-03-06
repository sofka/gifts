import { ChangeEvent, createRef, FC, useEffect, useState } from "react";
import { uuid, isValidUrl } from "../../helper";
import { CWishListItem } from "../../types";
import Attachments from "../Attachments";
import File from "../File";
import Link from "../Link";
import Modal from "../Modal";
import style from "./style.module.scss";

type WishListItemWindowProps = {
  onClose?: () => void;
  saveItem?: (newItem: CWishListItem) => void;
  selectedItem?: CWishListItem;
  wishListId: string;
};

const WishListItemWindow: FC<WishListItemWindowProps> = (props) => {
  const { onClose, saveItem, selectedItem, wishListId } = props;
  const MAX_IMAGES = 3;
  const pastInputRef = createRef<HTMLInputElement>();
  const [images, setImages] = useState(selectedItem?.images || []);
  const [links, setLinks] = useState(selectedItem?.links || []);
  const [disabled, setDisabled] = useState(
    images.length === MAX_IMAGES || images.length > MAX_IMAGES
  );
  const onSave = () => {
    const newItem = new CWishListItem(
      selectedItem ? selectedItem.id : uuid(),
      name,
      name,
      wishListId,

      images || [],
      links || []
    );

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

  const pastLink = (link: string) => {
    const newSet = new Set<string>([...links, link]);
    const newLinks = Array.from(newSet);
    setLinks(newLinks);
  };

  const pastHandler = (e: ClipboardEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const clipboardData = e.clipboardData;
    const pastedData = clipboardData?.getData("Text");
    pastedData && isValidUrl(pastedData) && pastLink(pastedData);
  };

  useEffect(() => {
    pastInputRef.current?.addEventListener("paste", pastHandler);
  });

  useEffect(() => {
    setDisabled(images.length === MAX_IMAGES || images.length > MAX_IMAGES);
  }, [images]);

  const title = selectedItem ? "????????????????????????????" : "????????????????????";
  const [name, setName] = useState(selectedItem ? selectedItem.name : "");
  return (
    <Modal title={title} onClose={onClose} onSave={() => onSave()}>
      <input
        type="text"
        className={style.wishListItemWindow__input}
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        placeholder="???????????????????????? ????????????"
      />

      <div>
        <File loadFile={loadFile} disabled={disabled} />
      </div>

      {images && <Attachments images={images} remove={removeImage} />}

      <input
        className={style.wishListItemWindow__pastedInput}
        ref={pastInputRef}
        id="pastInput"
        disabled
        placeholder="???????????????? ???????? ???????????? ?? ????????????????"
      />

      {links && (
        <div className={style.wishListItemWindow__links}>
          {links.map((link, index) => {
            const showIndex = index + 1;
            return (
              <Link
                href={link}
                target="_blank"
                text={`???????????? ??? ${showIndex}`}
              />
            );
          })}
        </div>
      )}
    </Modal>
  );
};
export default WishListItemWindow;
