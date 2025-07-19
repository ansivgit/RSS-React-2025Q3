import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './button';
import type { BtnColor } from '../../types';

const handleClick = vi.fn();

const mockButtonProps = {
  text: 'Test button text',
  additionalClass: 'test-class',
  color: 'primary',
  type: 'button',
  onClick: handleClick,
};

describe('Button component', () => {
  const { text, additionalClass, type } = mockButtonProps;

  it('renders with default props', () => {
    render(<Button text={text} onClick={handleClick} />);

    const component = screen.getByRole('button', { name: text });

    expect(component).toBeInTheDocument();
    expect(component).toHaveClass(`btn btn-primary`);
    expect(component).toHaveAttribute('type', type);
  });

  it.each(['info', 'danger', 'warning'] as BtnColor[])(
    'renders with color property "%s" and custom class',
    (s) => {
      render(
        <Button
          text={text}
          color={s}
          additionalClass={additionalClass}
          onClick={handleClick}
        />
      );

      const component = screen.getByRole('button', { name: text });

      expect(component).toHaveClass(`btn btn-${s} ${additionalClass}`);
    }
  );

  it('renders with custom type', () => {
    render(<Button text={text} type="submit" onClick={handleClick} />);

    const component = screen.getByRole('button', { name: text });

    expect(component).toHaveAttribute('type', 'submit');
  });

  it('calls onClick handler when clicked', () => {
    render(<Button text={text} onClick={handleClick} />);

    const component = screen.getByRole('button', { name: text });
    fireEvent.click(component);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
