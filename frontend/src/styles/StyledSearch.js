import styled from 'styled-components'

const StyledSearch = styled.input`
  background: #343434 0% 0% no-repeat;
  border-radius: 10px;
  border: none;
  color: white;
  font-size: 16px;
  height: 40px;
  margin-bottom: 40px;
  opacity: 1;
  outline: none;
  padding: 0 10px;
  width: 300px;
  &&::placeholder {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.32px;
  }
`

export default StyledSearch
