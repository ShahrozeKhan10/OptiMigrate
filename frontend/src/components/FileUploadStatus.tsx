import { formatFileSize } from 'src/utils/common';
import CheckIcon from 'src/assets/svgs/CheckIcon';
import FileIcon from 'src/assets/svgs/FileIcon';

import Typography from './Typography';

interface FileUploadStatusProps {
  fileName?: string;
  fileSize?: number;
  isUploaded?: boolean;
}

function FileUploadStatus({ fileName, fileSize, isUploaded }: FileUploadStatusProps) {
  const fileNameStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '200px',
  };

  return (
    <div className='flex flex-row items-center gap-4 py-4 px-6 self-stretch rounded flex-shrink-0 bg-white w-[300px] md:w-full h-auto'>
      <div className='w-10 h-10'>
        <FileIcon />
      </div>

      <div className='flex-grow flex flex-col'>
        <Typography
          variant='title'
          className='text-gray-700 font-inter font-medium !text-sm'
          style={fileNameStyle}
        >
          {fileName}
        </Typography>
        <Typography
          variant='subTitle'
          className='text-gray-700 font-inter font-normal text-xs pt-1'
        >
          {`${formatFileSize(fileSize ?? 0)} - ${isUploaded ? '100% uploaded' : 'Uploading...'}`}
        </Typography>
      </div>

      <div className='flex justify-start'>
        <div className='h-4 w-4 m flex items-center justify-center flex-shrink-0 rounded-full border border-primary-600 bg-circle -mt-5'>
          {isUploaded ? <CheckIcon /> : null}
        </div>
      </div>
    </div>
  );
}

export default FileUploadStatus;
