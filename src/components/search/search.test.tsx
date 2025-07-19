import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from './search';

describe('Search', () => {
  const mockOnInputChange = vi.fn();

  it('should render with default props', () => {
    render(<Search country="" onInputChange={mockOnInputChange} />);

    const input = screen.getByPlaceholderText('Enter country name');
    const button = screen.getByText('Search');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('should render with initial country prop', () => {
    render(<Search country="Canada" onInputChange={mockOnInputChange} />);

    const input = screen.getByPlaceholderText('Canada');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('should update state on input change', () => {
    render(<Search country="" onInputChange={mockOnInputChange} />);

    const input = screen.getByPlaceholderText('Enter country name');
    fireEvent.change(input, { target: { value: 'Germany' } });

    expect(input).toHaveValue('Germany');
  });

  it('should call onInputChange with current state when button is clicked', () => {
    render(<Search country="" onInputChange={mockOnInputChange} />);

    const input = screen.getByPlaceholderText('Enter country name');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Japan' } });
    fireEvent.click(button);

    expect(mockOnInputChange).toHaveBeenCalledTimes(1);
    expect(mockOnInputChange).toHaveBeenCalledWith('Japan');
  });

  it('should maintain component structure and classes', () => {
    const { container } = render(
      <Search country="" onInputChange={mockOnInputChange} />
    );

    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass('d-grid', 'gap-2', 'd-md-flex', 'mb-3');

    const inputDiv =
      screen.getByPlaceholderText('Enter country name').parentElement;
    expect(inputDiv).toHaveClass('col-6', 'mx-auto', 'd-grid', 'gap-2');

    const buttonDiv = screen.getByText('Search').parentElement;
    expect(buttonDiv).toHaveClass('col-6', 'mx-auto', 'd-grid', 'gap-2');
  });
});
