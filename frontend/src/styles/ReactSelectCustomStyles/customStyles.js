const customStyles = {
  container: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    margin: '16px 0',
    border: '3px solid yellow',
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    background: 'yellow',
    color: 'black ',
  }),
  valueContainer: provided => ({
    ...provided,
    background: 'blue',
  }),
  // control: (provided, state) => ({
  //   ...provided,
  //   width: 300,
  // }),
  multiValue: (provided, state) => ({
    ...provided,
    background: 'green',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    background: 'red',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: 'orange',
    fontWeight: 600,
  }),
  // dropdownIndicator: (provided, state) => ({
  //   ...provided,
  //   color: 'black',
  // }),
}

export default customStyles
