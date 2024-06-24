/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';

// import Misc from '../Api/Misc';
import SearchDropdown from './SearchDropdown';

// import 'isomorphic-fetch';

const CitySelect = (props: any) => {
  // const { token } = parsedData.user;

  // const requestConfig = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  // const SIZE = 25;

  const [open] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading] = useState(false);
  const [query, setQuery] = useState('');

  // const list = ({ clear = false, last = null } = {}) => {
  //   if (!props.countryId) {
  //     setOptions([]);
  //     return undefined;
  //   }
  //   Misc.listCities(props.countryId, requestConfig, {
  //     last: last,
  //     query: query,
  //     size: SIZE,
  //   })
  //     .then((res) => {
  //       if (res.data.data === 0) return;
  //       setOptions([...(clear ? [] : options), ...res.data.data]);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   list({ clear: true, last: null });
  // }, [props.countryId, query]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <SearchDropdown
      value={props.value}
      onChange={item => {
        props.onChange(item);
      }}
      labelAttribute='name'
      matchAttribute='id'
      width='100%'
      data={options}
      loading={loading}
      inputPlaceholder={props.placeholder}
      // requestMoreData={() => {
      //   list({
      //     last: options[options.length - 1].id,
      //   });
      // }}
      onSearch={input => {
        if (input !== query) {
          setQuery(input);
        }
      }}
    />
  );
};

CitySelect.defaultProps = {
  placeholder: 'City',
};

export default CitySelect;
