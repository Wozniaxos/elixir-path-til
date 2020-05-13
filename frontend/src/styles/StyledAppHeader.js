import styled from 'styled-components'

const StyledAppHeader = styled.div`
  display: flex;
  background: #343434;
  justify-content: space-between;
  position: fixed;
  top: 0px;
  width: 100%;

  .home {
    align-items: center;
    background: #171717;
    display: flex;
    margin: 0;
    padding: 0;
    padding-left: 32px;
    width: 400px;
  }

  .home-link {
    color: white;
    font-weight: 600;
    /* todo: change font to Futura, Bold */
    font-size: 32px;
    text-decoration: none;
  }
`

export default StyledAppHeader
