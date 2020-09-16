const customStyles = {
  container: (provided, state) => ({
    ...provided,
    margin: '16px 0',
    border: '1px solid #8a8a8a',
    'border-radius': '8px',
  }),
  option: (provided, state) => ({
    ...provided,
    background: '#2A2E32',
    color: '#A0A0A0',
    border: 'none',
    'border-radius': '26px',
  }),
  valueContainer: provided => ({
    ...provided,
    border: '2px solid transparent',
    borderRadius: '8px',
    background: '#2A2E32',
    'min-height': '52px',
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'transparent',
    border: 'none',
    minWidth: 300,
  }),
  menu: (provided, state) => ({
    ...provided,
    'background-color': '#2a2e32',
    border: '1px solid #8a8a8a',
    'border-radius': '8px',
    position: 'absolute',
    left: '-1px',
  }),
  multiValue: (provided, state) => ({
    ...provided,
    background: 'transparent',
    color: '#a0a0a0',
    border: '1px solid #8a8a8a',
    'border-radius': '8px',
    display: 'flex',
    'justify-content': 'space-between',
    padding: '4px 14px',
    'border-radius': '27px',
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: '#a0a0a0',
    'text-transform': 'uppercase',
    // border: '1px solid #8a8a8a',
    // 'border-radius': '8px',
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    background: 'transparent',
    '&:hover': {
      color: '#e62a2a',
      backgroundColor: 'transparent',
      transform: 'scale(1.5)',
    },
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    background: 'transparent',
    color: '#8a8a8a',
    '&:hover': {
      color: '#e62a2a',
      backgroundColor: 'transparent',
      transform: 'scale(1.5)',
    },
  }),
  indicatorscontainer: (provided, state) => ({
    ...provided,
    background: 'transparent',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: '#A0A0A0',
    fontWeight: 500,
    fontSize: '16px',
    fontFamily: 'Poppins',
    letterSpacing: '0.48px',
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: 'none',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: '#8a8a8a',
    '&:hover': {
      color: '#8a8a8a',
      backgroundColor: 'transparent',
      transform: 'scale(1.5)',
    },
  }),
}

export default customStyles
