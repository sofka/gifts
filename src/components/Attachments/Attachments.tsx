import { FC } from "react";
import Close from "../../assets/svgComponents/Close";
import style from "./style.module.scss";

type AttachmentsProps = {
  images: string[];
  remove?: (index: number) => void;
};

const Attachments: FC<AttachmentsProps> = (props) => {
  const { images, remove } = props;

  return (
    <div className={style.attachments}>
      {images.map((image, index) => {
        return (
          <div key={`${index}_attach`} className={style.attachments__img}>
            <img
              key={index}
              src={image}
              alt={`Картинка_${index}`}
              width={150}
              height={150}
            />
            <span
              className={style.attachments__remover}
              onClick={() => remove && remove(index)}
            >
              <Close color="var(--grey)"/>
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default Attachments;
