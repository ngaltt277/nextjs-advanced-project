import classNames from "classnames";

type Props = {
  name: string;
  size?: number;
  color?: string;
  cursor?: boolean;
  background?: string;
  className?: string;
  onClick?: () => void;
};

export function FontIcon({
  name,
  size,
  color,
  cursor,
  background,
  onClick,
}: Props): JSX.Element {
  const classes = classNames("font-icon", {
    [`font-icon--${name}`]: true,
    [`font-icon--size-${size || 16}`]: true,
    [`font-icon--${color}`]: color,
    [`font-icon--cursor`]: cursor,
    [`font-icon--background-${background}`]: background,
  });

  return <span className={classes} onClick={onClick} />;
}
