import type { BtnColor } from '../../types';

type ButtonProps = {
  text: string;
  additionalClass?: string;
  color?: BtnColor;
  type?: 'button' | 'submit' | 'reset';
  onClick: () => void;
};

export const Button = ({
  text,
  additionalClass = '',
  color = 'primary',
  type = 'button',
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`btn btn-${color} ${additionalClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
