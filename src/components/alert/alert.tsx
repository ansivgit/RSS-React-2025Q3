import type { AlertColor } from '../../types';

type AlertProps = {
  text: string;
  color?: AlertColor;
};

export const Alert = ({ text, color = 'info' }: AlertProps) => {
  return (
    <div className={`alert alert-${color}`} role="alert">
      {text}
    </div>
  );
};
