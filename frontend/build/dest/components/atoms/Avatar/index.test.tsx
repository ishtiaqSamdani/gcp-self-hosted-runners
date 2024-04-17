import { render, screen } from '@testing-library/react';
import Avatar from '.';
import '@testing-library/jest-dom';

describe('AvatarComponent', () => {
  it('renders with provided src and alt', () => {
    render(<Avatar avatarSrc="avatar.jpg" avatarAlt="Test Avatar" />);
    const avatarElement = screen.getByAltText('Test Avatar');
    expect(avatarElement).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    render(
      <Avatar
        avatarSrc="avatar.jpg"
        avatarAlt="Large Test Avatar"
        avatarSx={{ width: 80, height: 80 }}
      />,
    );
    const avatarElement = screen.getByRole('img');
    expect(avatarElement).toBeInTheDocument();
  });
});
