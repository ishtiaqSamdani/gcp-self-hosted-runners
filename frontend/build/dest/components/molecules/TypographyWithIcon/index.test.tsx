import React from 'react';
import { render } from '@testing-library/react';
import TypographyWithIcon from '.';

describe('TypographyWithIcon Component', () => {
  const defaultProps = {
    text: 'Hello, World!',
    iconSrc: 'path/to/icon.png',
    iconAlt: 'Icon',
    iconProps: { width: '24px', height: '24px' },
  };

  it('renders with icon at the start', () => {
    const { getByText, getByAltText } = render(
      <TypographyWithIcon {...defaultProps} iconPosition="start" />,
    );

    expect(getByText('Hello, World!')).toBeInTheDocument();
    expect(getByAltText('Icon')).toBeInTheDocument();
  });

  it('renders with icon at the start by default', () => {
    const { getByText, getByAltText } = render(
      <TypographyWithIcon {...defaultProps} />,
    );

    expect(getByText('Hello, World!')).toBeInTheDocument();
    expect(getByAltText('Icon')).toBeInTheDocument();
  });

  it('renders with icon at the end', () => {
    const { getByText, getByAltText } = render(
      <TypographyWithIcon {...defaultProps} iconPosition="end" />,
    );

    expect(getByText('Hello, World!')).toBeInTheDocument();
    expect(getByAltText('Icon')).toBeInTheDocument();
  });
});
