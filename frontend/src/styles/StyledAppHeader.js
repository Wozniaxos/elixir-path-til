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

  .home {
    align-items: center;
    background: #171717;
    display: flex;
    margin: 0;
    padding-left: 32px;
    width: 400px;
  }

  .home-link {
    /* todo: change font to Futura, Bold */
    color: white;
    font-size: 32px;
    font-weight: 600;
    text-decoration: none;
  }
`

export default StyledAppHeader
