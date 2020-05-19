const customStyles = {
  container: (provided, state) => ({
    // margin: '16px 0',
    border: '3px solid yellow',
  }),
  // option: (provided, state) => ({
  //   ...provided,
  //   borderBottom: '1px dotted pink',
  //   color: state.isSelected ? 'red' : 'blue',
  // }),
  // control: (provided, state) => ({
  //   ...provided,
  //   width: 300,
  // }),
  // singleValue: (provided, state) => {
  //   const opacity = state.isDisabled ? 0.5 : 1
  //   const transition = 'opacity 300ms'
  //   return { ...provided, opacity, transition }
  // },
}

export default customStyles
