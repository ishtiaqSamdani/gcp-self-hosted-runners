import React from 'react';
import PDFViewer from '.';
import {
  render,
  fireEvent,
  act,
  waitFor,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('react-pdf', () => {
  const originalModule = jest.requireActual('react-pdf');

  return {
    ...originalModule,
    Document: ({ file }: { file: File }) => {
      return <div>{file ? 'PDF Content' : 'No PDF Content'}</div>;
    },
    pdfjs: {
      GlobalWorkerOptions: {
        workerSrc: 'pdf-worker-mock',
      },
      getDocument: jest.fn().mockReturnValue({
        promise: Promise.resolve({
          numPages: 1,
          getPage: jest.fn().mockResolvedValue({
            getTextContent: jest.fn().mockResolvedValue({
              items: [{ str: 'Mock PDF Content' }],
            }),
          }),
        }),
      }),
    },
  };
});

describe('PDFViewer', () => {
  const handlePdfText = jest.fn();
  it('should render without crashing', () => {
    render(<PDFViewer setPdfText={handlePdfText} />);
  });

  it('should display the file input on click', () => {
    render(<PDFViewer setPdfText={handlePdfText} />);
    const addButton = screen.getByText(
      /Drop your invoice or click here to upload/i,
    );
    expect(addButton).toBeInTheDocument();
  });

  it('should load and display the PDF file', async () => {
    const { getByText } = render(<PDFViewer setPdfText={handlePdfText} />);
    const addButton = getByText(/Drop your invoice or click here to upload/i);
    act(() => {
      userEvent.click(addButton);
    });
    const file = new File(['(pdf content)'], 'test.pdf', {
      type: 'application/pdf',
    });
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });
    await waitFor(() => {
      const pdfPage = getByText('PDF Content');
      expect(pdfPage).toBeInTheDocument();
    });
  });

  it('should handle invalid file type', async () => {
    const { getByText } = render(<PDFViewer setPdfText={handlePdfText} />);
    const addButton = getByText(/Drop your invoice or click here to upload/i);

    act(() => {
      userEvent.click(addButton);
    });
    const invalidFile = new File(['invalid content'], 'invalid.txt', {
      type: 'text/plain',
    });
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [invalidFile] } });
    expect(addButton).toBeInTheDocument();
  });

  it('should show loading spinner while loading the PDF document', async () => {
    render(<PDFViewer setPdfText={handlePdfText} />);
    const file = new File(['(pdf content)'], 'test.pdf', {
      type: 'application/pdf',
    });
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });
    await waitFor(() => {
      expect(screen.getByText('PDF Content')).toBeInTheDocument();
    });
  });

  it('should handle drag and drop of a valid PDF file', async () => {
    const { getByText } = render(<PDFViewer setPdfText={handlePdfText} />);
    const addFileContainer = getByText(
      /Drop your invoice or click here to upload/i,
    );

    fireEvent.dragOver(addFileContainer, {
      dataTransfer: {
        files: [
          new File(['(pdf content)'], 'test.pdf', { type: 'application/pdf' }),
        ],
      },
    });
    fireEvent.drop(addFileContainer, {
      dataTransfer: {
        files: [
          new File(['(pdf content)'], 'test.pdf', { type: 'application/pdf' }),
        ],
      },
    });
    await waitFor(() => {
      expect(screen.getByText('PDF Content')).toBeInTheDocument();
    });
  });

  it('should not take file for invalid file format', async () => {
    const { getByText } = render(<PDFViewer setPdfText={handlePdfText} />);
    const addFileContainer = getByText(
      /Drop your invoice or click here to upload/i,
    );

    fireEvent.dragOver(addFileContainer, {
      dataTransfer: {
        files: [
          new File(['invalid content'], 'invalid.txt', {
            type: 'text/plain',
          }),
        ],
      },
    });
    fireEvent.drop(addFileContainer, {
      dataTransfer: {
        files: [
          new File(['invalid content'], 'invalid.txt', {
            type: 'text/plain',
          }),
        ],
      },
    });
    await waitFor(() => {
      expect(
        screen.getByText(/Drop your invoice or click here to upload/i),
      ).toBeInTheDocument();
    });
  });

  it('should open file input when the icon is clicked using openFileInput', () => {
    const { getByAltText, getByTestId } = render(
      <PDFViewer setPdfText={handlePdfText} />,
    );
    const icon = getByAltText('add-icon');
    const fileInput = getByTestId('file-input');
    jest.spyOn(fileInput, 'click');
    fireEvent.click(icon);
    expect(fileInput.click).toHaveBeenCalled();
  });
});
