type AlertProps = {
  text: string;
  color?: 'info' | 'danger' | 'warning';
};

export const Alert = ({ text, color = 'info' }: AlertProps) => {
  return (
    <div className={`alert alert-${color}`} role="alert">
      {text}
    </div>
  );
};
