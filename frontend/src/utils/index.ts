// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseFreemiumCountries = (data: any) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const formatValue = (val?: string | number) => {
  if (!val) {
    return 'N/A';
  }
  return Number(val)
    .toFixed(2)
    .replace(/[.,]00$/, '');
};

export const formatCommas = (val?: string | number) => {
  if (!val) {
    return 'N/A';
  }
  return val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
