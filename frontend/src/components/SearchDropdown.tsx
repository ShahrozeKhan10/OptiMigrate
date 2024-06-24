// @ts-nocheck
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// import 'isomorphic-fetch';

const useStyles = makeStyles(() => ({
  inputStyle: props => ({
    width: props.width,
  }),
}));

const SearchDropdown = (props: any) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles(props);

  const searchHandler = (searchText: string | null) => {
    props.onSearch(searchText === null ? '' : searchText);
    setOpen(!!searchText);
  };

  return (
    <Autocomplete
      ListboxProps={{
        onScroll: (e: any) => {
          if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
            props.requestMoreData();
          }
        },
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      className={classes.inputStyle}
      style={{ cursor: 'pointer' }}
      getOptionSelected={(option, value) =>
        option[props.matchAttribute] === value[props.matchAttribute]
      }
      getOptionLabel={option => (option[props.labelAttribute] ? option[props.labelAttribute] : '')}
      options={props.data}
      value={props.value}
      onChange={(_, value) => props.onChange(value)}
      loading={props.loading}
      renderInput={params => (
        <TextField
          {...params}
          placeholder={props.inputPlaceholder}
          fullWidth={true}
          onChange={e => searchHandler(e.target.value)}
          variant='outlined'
          InputLabelProps={{ shrink: true }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {props.loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

SearchDropdown.propTypes = {
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  inputPlaceholder: PropTypes.string.isRequired,
  data: PropTypes.array,
  requestMoreData: PropTypes.func,
  labelAttribute: PropTypes.string,
  matchAttribute: PropTypes.string,
  value: PropTypes.object,
  loading: PropTypes.bool,
  width: PropTypes.string,
};

SearchDropdown.defaultProps = {
  value: null,
  labelAttribute: 'name',
  matchAttribute: 'name',
  loading: true,
  width: '95%',
  requestMoreData: () => {},
  onSearch: () => {},
};

export default SearchDropdown;
