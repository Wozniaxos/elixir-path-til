import styled from 'styled-components'

const StyledAppHeader = styled.div`
  background: #343434;
  display: flex;
  height: 100px;
  justify-content: space-between;
  position: fixed;
  top: 0px;
  width: 100%;

  .login-link {
    align-items: center;
    color: white;
    display: flex;
    font-weight: 900;
    letter-spacing: 1px;
    padding: 32px;
    text-decoration: none;
    text-transform: uppercase;
  }
`

export default StyledAppHeader
