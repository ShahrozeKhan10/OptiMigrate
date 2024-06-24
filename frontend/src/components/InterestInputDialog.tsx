// @ts-nocheck
import { useEffect, useState } from 'react';
import array from 'lodash/array';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import Button from './Button';
import ChipsInputForm from './ChipsInputForm';
import Dialog from './Dialog';

const useStyles = makeStyles(() => ({
  textCaseTransform: {
    textTransform: 'uppercase',
  },
}));

const InterestInputDialog = (props: any) => {
  const classes = useStyles();

  const handleDelete = (id: any, data: any, setter: any) => {
    setter(data.filter((item: any) => item.id !== id));
  };

  const [interestsState, setInterestsState] = useState(props.interests);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setInterestsState(props.interests);
  }, [props.interests, loader]);

  const addNewInterest = (item: any, data: any, setter: any) => {
    if (array.findIndex(data, ['id', item.id]) !== -1) return;
    setter([...data, item]);
  };

  const onSubmit = async () => {
    await props.onSubmitted(interestsState);
    setLoader(!loader);
  };

  return (
    <Dialog title='Add your interests' open={props.open} onClose={props.onClose}>
      <Grid container>
        <Grid xs={12}>
          <ChipsInputForm
            variant='interests'
            onNewItem={item => {
              addNewInterest(item, interestsState, setInterestsState);
            }}
            inputPlaceholder='Add Interest'
            data={interestsState}
            onDeleteItem={id => handleDelete(id, interestsState, setInterestsState)}
          />
        </Grid>
        <Grid
          style={{ padding: '0 5%' }}
          xs={12}
          direction='row'
          justifyContent='flex-end'
          item
          container
        >
          {/* <Button
            size='medium'
            variant='contained'
            color='primary'
            performAction={async () => {
              await onSubmit();
            }}
            className={classes.textCaseTransform}
          >
            Add Interest
          </Button> */}
          <button
            onClick={async () => {
              await onSubmit();
            }}
            className={classes.textCaseTransform}
          >
            Add Interest
          </button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

InterestInputDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitted: PropTypes.func,
  interests: PropTypes.array,
};

InterestInputDialog.defaultProps = {
  interests: [],
};

export default InterestInputDialog;
