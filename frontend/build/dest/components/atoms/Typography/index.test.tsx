import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Typography from '.';
import theme from '../../../theme';

describe('Typography component unit test', () => {
  const variant = 'h1';
  const text = 'Test Text';
  it('positive scenario for typography text', () => {
    render(
      <Typography variant={variant} color={theme.palette.accent[100]}>
        {text}
      </Typography>,
    );
    const typographyElement = screen.getByText(text);
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveTextContent(text);
    expect(typographyElement).toHaveClass(`MuiTypography-${variant}`);
  });

  it('negative scenario for typography text', () => {
    render(
      <Typography variant={variant} color={theme.palette.accent[100]}>
        {text}
      </Typography>,
    );
    expect(screen.queryByText('hi')).not.toBeInTheDocument();
  });
});
