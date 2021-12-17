import { FC } from "react";

type LinkProps = {
  href: string;
  target?: string;
  text?: string;
};

const Link: FC<LinkProps> = (props) => {
  const { href, target, text } = props;
  return (
    <a href={href} target={target && target} rel="noopener noreferrer">
      {text || href}
    </a>
  );
};
export default Link;
