import { ChangeEvent, FC, useEffect, useRef } from "react";
import Attach from "../../assets/svgComponents/Attach";
import style from "./style.module.scss";

type FileProps = {
  loadFile?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};
const File: FC<FileProps> = (props) => {
  const { loadFile, disabled } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef && buttonRef.current) {
      buttonRef.current.disabled = disabled || true;
    }
  }, [disabled]);

  return (
    <div className={style.file}>
      <div className={style.file__wrapper}>
        <input
          type="file"
          id="file"
          className={style.file__input}
          onChange={(e) => loadFile && loadFile(e)}
        />
        <label
          htmlFor="file"
          className={
            disabled
              ? `${style.file__label} ${style.file__label_disabled}`
              : style.file__label
          }
        >
          <span className={style.file__attach}>
            <Attach color="var(--white)" />
          </span>
          <span ref={buttonRef}>Выберите файл</span>
        </label>
      </div>
    </div>
  );
};
export default File;
