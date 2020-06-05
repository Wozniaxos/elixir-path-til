import styled from 'styled-components'

const StyledPost = styled.section`
  background: #1f1f1f;
  min-width: 1290px;
  max-width: 1600px;
  border-radius: 15px;
  opacity: 1;
  margin: 40px auto;
  padding: 50px;

  p {
    font-size: 26px;
    margin-top: 8px;
  }

  .categories {
    display: flex;
    color: #8a8a8a;
  }

  .category {
    border-radius: 45px;
    border: 2px solid #707070;
    letter-spacing: 0.32px;
    margin-right: 20px;
    opacity: 1;
    padding: 12px 40px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
  }

  .more-categories {
    font-size: 16px;
    letter-spacing: 0.32px;
    padding: 14px;
    text-transform: uppercase;
  }

  .post-footer {
    display: flex;
    justify-content: space-between;
    color: #8a8a8a;

    p {
      font-size: 16px;
    }
  }

  .reaction {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-left: 30px;
    width: 25%;
    display: flex;
  }
`

export default StyledPost
