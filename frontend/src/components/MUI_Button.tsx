// @ts-nocheck

import { useState } from 'react';
import PropTypes from 'prop-types';

import { Button as MuiButton, CircularProgress } from '@material-ui/core';

const Button = ({ children, performAction, ...props }) => {
  const [isLoading, setLoading] = useState(false);
  return (
    <MuiButton
      disabled={isLoading}
      onClick={() => {
        setLoading(true);
        Promise.resolve(performAction()).finally(() => {
          setLoading(false);
        });
      }}
      {...props}
    >
      {isLoading ? <CircularProgress size={20} color='primary' /> : children}
    </MuiButton>
  );
};

Button.propTypes = {
  performAction: PropTypes.func,
};

Button.defaultProps = {
  performAction: () => {},
};

export default Button;
