import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NewBillTemplate from '.';

describe('NewBillTemplate component', () => {
  let mockHeader: React.ReactNode,
    mockLeftContent: React.ReactNode,
    mockRightContent: React.ReactNode;

  beforeEach(() => {
    mockHeader = <div>Mock Header</div>;
    mockLeftContent = <div>Mock Left Content</div>;
    mockRightContent = <div>Mock Right Content</div>;
  });

  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <NewBillTemplate
          header={mockHeader}
          leftContent={mockLeftContent}
          rightContent={mockRightContent}
        />
      </BrowserRouter>,
    );
  });

  it('should render header correctly', () => {
    render(
      <BrowserRouter>
        <NewBillTemplate
          header={mockHeader}
          leftContent={mockLeftContent}
          rightContent={mockRightContent}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText('Mock Header')).toBeInTheDocument();
  });

  it('should render left content correctly', () => {
    render(
      <BrowserRouter>
        <NewBillTemplate
          header={mockHeader}
          leftContent={mockLeftContent}
          rightContent={mockRightContent}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText('Mock Left Content')).toBeInTheDocument();
  });

  it('should render right content correctly', () => {
    render(
      <BrowserRouter>
        <NewBillTemplate
          header={mockHeader}
          leftContent={mockLeftContent}
          rightContent={mockRightContent}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText('Mock Right Content')).toBeInTheDocument();
  });
});
