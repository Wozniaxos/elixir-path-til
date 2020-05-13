import styled from 'styled-components'

const StyleSideNav = styled.div`
  background: #171717;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 32px 0px 0px 32px;
  position: fixed;
  width: 400px;

  ul {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0px 0px 80px 0;
    border-bottom: 1px solid #707070;

    li {
      margin-top: 13px;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.28px;
    }
  }

  .post-categories {
    overflow: auto;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.28px;
    text-transform: uppercase;
  }

  /* .post-categories::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  } */

  .post-categories::-webkit-scrollbar {
    width: 3px;
  }

  .post-categories::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`
export default StyleSideNav
