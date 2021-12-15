import { FC } from "react";
import Modal from "../Modal";
import {
  VKShareButton,
  VKIcon,
  EmailShareButton,
  EmailIcon,
  OKShareButton,
  OKIcon,
} from "react-share";
import style from "./style.module.scss";

type ShareWindowProps = {
  onClose?: () => void;
};

const ShareWindow: FC<ShareWindowProps> = (props) => {
  const { onClose } = props;
  const url = window.location.href;
  const size = `3rem`;
  const elements = [
    {
      button: VKShareButton,
      icon: VKIcon,
    },
    {
      button: EmailShareButton,
      icon: EmailIcon,
    },
    {
      button: OKShareButton,
      icon: OKIcon,
    },
  ];
  return (
    <Modal title="Поделиться" onClose={onClose} height="200px">
      <div className={style.share}>
        {elements.map((element) => {
          return (
            <element.button url={url}>
              <element.icon size={size} round />
            </element.button>
          );
        })}
      </div>
    </Modal>
  );
};

export default ShareWindow;
