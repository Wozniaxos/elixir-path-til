import styled from 'styled-components'

const StyledCheckBoxes = styled.div`
  .checkbox .active {
    color: #ffffff;
  }

  .checkbox {
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    display: block;
    font-size: 22px;
    margin-bottom: 12px;
    padding-left: 35px;
    position: relative;
    user-select: none;
  }

  .checkbox label {
    align-content: center;
    color: #707070;
    cursor: pointer;
    display: flex;
    font-weight: 600;
    letter-spacing: 0.48px;
  }

  .checkbox input {
    cursor: pointer;
    height: 0;
    opacity: 0;
    position: absolute;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    border-radius: 4px;
    border: 1px solid #ffffff;
    cursor: pointer;
    height: 25px;
    left: 0;
    position: absolute;
    top: 4px;
    width: 25px;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .checkbox input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .checkbox .checkmark:after {
    left: 7px;
    top: 2px;
    width: 7px;
    height: 13px;
    border: solid yellow;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .grayout {
    color: gray;
  }
`

export default StyledCheckBoxes
