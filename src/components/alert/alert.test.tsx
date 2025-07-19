import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Alert } from './alert';
import type { AlertColor } from '../../types';
import { ALERT_TEXT } from '../../constants';

const mockAlertProps = {
  text: 'Test alert text',
  color: 'info',
};

describe('Alert component', () => {
  it('renders with default color "info"', () => {
    render(<Alert text={mockAlertProps.text} />);

    const component = screen.getByRole('alert');

    expect(component).toBeInTheDocument();
    expect(component).toHaveTextContent(mockAlertProps.text);
    expect(component).toHaveClass(`alert-${mockAlertProps.color}`);
  });

  it.each(['info', 'danger', 'warning'] as AlertColor[])(
    'renders with color property "%s"',
    (s) => {
      render(<Alert text={mockAlertProps.text} color={s} />);

      const component = screen.getByRole('alert');

      expect(component).toBeInTheDocument();
      expect(component).toHaveClass(`alert-${s}`);
    }
  );

  it.each([ALERT_TEXT.NOT_FOUND, ALERT_TEXT.ERROR] as string[])(
    'renders with text property "%s"',
    (s) => {
      render(<Alert text={s} />);

      const component = screen.getByRole('alert');

      expect(component).toBeInTheDocument();
      expect(component).toHaveTextContent(s);
    }
  );
});
