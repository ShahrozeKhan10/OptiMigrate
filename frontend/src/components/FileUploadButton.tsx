import React, { ChangeEventHandler, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import CloudUploadIcon from 'src/assets/svgs/CloudUploadIcon';

import FileUploadStatus from './FileUploadStatus';
import Typography from './Typography';

interface FileUploadButtonProps {
  onChange?: (file: File | null) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { files } = event.target;
    const file = files?.[0] || null;
    setSelectedFile(file);
    onChange?.(file);
    setIsUploaded(true);
    getInputProps();
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    setSelectedFile(file);
    onChange?.(file);
    setIsUploaded(true);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      '.pdf': [],
    },
  });

  const dropzoneClass = useMemo(
    () =>
      `flex w-12 h-12 p-10px rounded-lg justify-center items-center border border-gray-200 bg-base-white bg-white shadow-xs cursor-pointer ${
        isDragActive ? 'bg-gray-100' : ''
      }`,
    [isDragActive],
  );

  return (
    <div className='flex flex-col gap-4'>
      <label htmlFor='file-upload'>
        <div
          {...getRootProps()}
          className='flex flex-col items-center gap-8 py-4 px-6 self-stretch rounded bg-white h-auto w-[300px] md:w-[400px] lg:w-[570px]'
        >
          <div className={dropzoneClass}>
            <input type='file' id='file-upload' className='hidden' onChange={handleFileChange} />
            <CloudUploadIcon />
          </div>
          <div className='flex justify-center items-center gap-1 self-stretch flex-col'>
            <Typography className='text-violet font-inter text-sm cursor-pointer'>
              Click to upload{' '}
              <span className='text-gray-600 font-inter font-normal'>Or drag and drop</span>
            </Typography>
            <Typography
              variant='subTitle'
              className='text-gray-600 font-inter font-normal text-xs text-center text-semibold'
            >
              {/* PDF or Documents (max. 800x400px) */}
              PDF
            </Typography>
          </div>
        </div>
      </label>
      {selectedFile && (
        <FileUploadStatus
          fileName={selectedFile.name}
          fileSize={selectedFile.size}
          isUploaded={isUploaded}
        />
      )}
    </div>
  );
};

export default FileUploadButton;
