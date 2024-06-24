// @ts-nocheck
import PropTypes from 'prop-types';
import React from 'react';
import { useDropzone } from 'react-dropzone';

import { Box, Grid } from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  dragImageIcon: (props: { image: string | File | undefined }) => ({
    borderRadius: '4px',
    border: props.image ? null : 'dashed 1px #979797',
    padding: '10px',
    marginRight: '10px',
  }),
  imageSize: {
    height: '100px',
    width: '100px',
  },
}));

interface UploadFileProps {
  typography: React.ReactNode;
  image: string | File | undefined;
  onImageUploaded: (data: { file: File; preview: string }) => void;
}

const UploadFile: React.FC<UploadFileProps> = props => {
  const classes = useStyles(props);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        props.onImageUploaded({
          file: acceptedFiles[0],
          preview: URL.createObjectURL(acceptedFiles[0]),
        });
      }
    },
    className: 'dropzone',
    activeClassName: 'active-dropzone',
    multiple: false,
    accept: 'image/*',
  });
  return (
    <Grid
      {...getRootProps()}
      direction='row'
      className={classes.dragImageContainer}
      alignItems='center'
      container
    >
      <input {...getInputProps()} />
      {props.image ? (
        <Box className={classes.dragImageIcon}>
          <img
            alt='file'
            src={props.image instanceof File ? URL.createObjectURL(props.image) : props.image}
            className={classes.imageSize}
          />
        </Box>
      ) : (
        <Box>
          <CameraAltIcon color='action' className={classes.dragImageIcon} />
        </Box>
      )}
      {props.typography}
    </Grid>
  );
};

UploadFile.propTypes = {
  typography: PropTypes.node.isRequired,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)]),
  onImageUploaded: PropTypes.func.isRequired,
};

export default UploadFile;
