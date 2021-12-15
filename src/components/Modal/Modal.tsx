import { FC } from "react";
import style from "./style.module.scss";
import Close from "../../assets/svgComponents/Close";
import Button from "../Button/Button";

type ModalProps = {
  title: string;
  height?: string;
  onClose?: () => void;
  onSave?: () => void;
};

const Modal: FC<ModalProps> = (props) => {
  const { title, onClose, children, onSave, height } = props;
  const localStyle = height && {
    height: height,
    top: `20%`,
  };
  return (
    <div className={style.modal}>
      <div className={style.modal__content} style={localStyle || {}}>
        <div className={style.modal__header}>
          <span className={style.modal__title}>{title}</span>
          <span className={style.modal__close} onClick={onClose}>
            <Close />
          </span>
        </div>
        <div className={style.modal__body}>{children && children}</div>
        <div className={style.modal__footer}>
          {onSave && (
            <Button onClick={onSave} blockModifier={"big"}>
              <div>Сохранить</div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Modal;
