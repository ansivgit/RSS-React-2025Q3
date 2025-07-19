import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Loader } from './loader';

describe('Loader component', () => {
  it('renders without crashing with "info" color', () => {
    render(<Loader />);

    const component = screen.getByRole('status');

    expect(component).toBeInTheDocument();
    expect(component).toHaveClass('spinner-border text-info');
  });
});
