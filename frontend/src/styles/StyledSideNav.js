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
    position: relative;

    li {
      margin-top: 13px;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.28px;
    }

    &::after {
      background: #343434;
      content: '';
      left: -32px;
      width: 400px;
      position: absolute;
      right: 0;
      top: 240px;
      height: 1px;
    }
  }

  .post-categories {
    overflow: auto;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.28px;
    text-transform: uppercase;
  }

  .post-categories::-webkit-scrollbar {
    width: 3px;
  }

  .post-categories::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  .post-category {
    display: flex;
    margin-bottom: 22px;
    align-items: center;
  }

  .post-category-name {
    display: flex;
    margin-left: 5px;
  }

  .search-box {
    position: relative;
  }

  .search-box::before {
    background: #343434;
    content: '';
    left: -55px;
    width: 64px;
    position: absolute;
    right: 0;
    top: 0;
    height: 40px;
  }

  .search-icon {
    position: absolute;
    right: 2px;
    bottom: 35px;
  }
`
export default StyleSideNav
