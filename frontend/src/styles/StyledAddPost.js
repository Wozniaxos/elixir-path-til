import styled from 'styled-components'

const StyledAddPost = styled.div`
  display: flex;
  margin-top: 150px;

  .add-post-main {
    flex-basis: 40%;
    margin-right: 72px;
  }

  .add-post-header {
    color: #ffffff;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.48px;
    margin-bottom: 24px;
  }

  .add-post-title {
    background: #343434;
    border-radius: 10px;
    border: 1px solid #8a8a8a;
    caret-color: #8a8a8a;
    color: #8a8a8a;
    font-size: 16px;
    height: 48px;
    letter-spacing: 0.48px;
    margin-bottom: 16px;
    opacity: 1;
    outline: none;
    padding-left: 16px;
    width: 100%;
  }

  .checkboxes {
    margin-top: 40px;
  }

  .checkbox {
    display: flex;
    align-items: center;
    margin-top: 16px;
    label {
      margin-left: 16px;
    }
  }

  input[type='text']::placeholder {
    color: #8a8a8a;
    font-size: 16px;
    letter-spacing: 0.48px;
    margin-left: 16px;
    opacity: 1;
    text-align: left;
  }
`

export default StyledAddPost
