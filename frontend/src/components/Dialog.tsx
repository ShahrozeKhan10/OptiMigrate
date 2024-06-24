import React, { ReactNode } from 'react';

// import {
//   Dialog as MDialog,
//   DialogContent,
//   DialogTitle,
//   Grid,
//   IconButton,
// } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import CloseIcon from '@material-ui/icons/Close';

// const useStyles = makeStyles((theme) => ({
//   dialogContent: {
//     marginRight: '4%',
//     marginLeft: '4%',
//     marginBottom: '6%',
//   },
//   dialogTitle: {
//     marginLeft: '4%',
//     marginTop: '4%',
//   },
//   closeButton: {
//     color: '#000',
//     position: 'absolute',
//     right: theme.spacing(4),
//     top: theme.spacing(4),
//   },
// }));

interface DialogProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
  width?: string;
  height?: string;
}

const Dialog: React.FC<DialogProps> = props => {
  // const classes = useStyles();

  return <div>{props.title}</div>;
};

Dialog.defaultProps = {
  height: 'auto',
};

export default Dialog;
