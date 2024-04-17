import React, { useCallback, useRef, useState } from 'react';
import { Stack, styled } from '@mui/material';
import IconComponent from '../../atoms/Icon';
import Typography from '../../atoms/Typography';
import theme from '../../../theme';
import { DROP_INVOICE, INVALID_PDF_ERROR } from '../../../utils/constants';
import AddIcon from '../../../../public/assets/icons/add2.svg';
import { Document, Page, pdfjs } from 'react-pdf';
import RotatingSpinner from '../../atoms/Spinner';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  setPdfText: React.Dispatch<React.SetStateAction<string>>;
}

const AddIconStyles = {
  width: theme.spacing(15.5),
  height: theme.spacing(15.5),
};

const PDFViewerContainer = styled(Stack)({
  minHeight: theme.spacing(129),
  maxWidth: theme.spacing(108),
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.accent.blue100}`,
});

const AddFileContainer = styled(Stack)({
  flexDirection: 'column',
  gap: theme.spacing(3),
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

const StyledInput = styled('input')({
  display: 'none',
});

const PDFViewer = ({ setPdfText }: PDFViewerProps) => {
  const [uploadFile, setUploadFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files?.[0];

    if (selectedFile && selectedFile.type === 'application/pdf') {
      setUploadFile(selectedFile);
    } else {
      console.error(INVALID_PDF_ERROR);
    }
  };

  const onFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];

      if (selectedFile && selectedFile.type === 'application/pdf') {
        setUploadFile(selectedFile);
        readPDFContent(selectedFile);
      } else {
        console.error(INVALID_PDF_ERROR);
      }
    },
    [],
  );

  const readPDFContent = (file: File) => {
    const fileReader = new FileReader();

    fileReader.onload = async (e) => {
      const arrayBuffer = e?.target?.result as ArrayBuffer;
      const pdfData = new Uint8Array(arrayBuffer);

      const loadingTask = pdfjs.getDocument({ data: pdfData });
      const pdf = await loadingTask.promise;

      if (pdf.numPages !== 1) {
        alert('The PDF should have exactly one page.');
        return;
      }

      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();

      const pageText: string = textContent.items
        .map((item) => {
          if ('str' in item) {
            return item['str'];
          } else {
            return '';
          }
        })
        .join(' ');
      setPdfText(pageText);
    };

    fileReader.readAsArrayBuffer(file);
  };

  const handleOpenFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [fileInputRef]);

  return (
    <PDFViewerContainer>
      {!uploadFile && (
        <AddFileContainer
          onDragOver={onDragOver}
          onDrop={onDrop}
          onClick={handleOpenFileInput}
        >
          <IconComponent
            src={AddIcon}
            iconAlt={'add-icon'}
            width={AddIconStyles.width}
            height={AddIconStyles.height}
          />
          <Typography
            color={theme.palette.lowEmphasis.main}
            variant={'caption2'}
          >
            {DROP_INVOICE}
          </Typography>
          <StyledInput
            id="fileInput"
            data-testid="file-input"
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={onFileInputChange}
          />
        </AddFileContainer>
      )}
      {uploadFile && (
        <Document file={uploadFile} loading={<RotatingSpinner />}>
          <Page
            pageNumber={1}
            width={430}
            height={450}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      )}
    </PDFViewerContainer>
  );
};

export default PDFViewer;
