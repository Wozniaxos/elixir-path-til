import styled from "styled-components";

const StyledPostInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  .author {
    margin: 0;
    font-size: 16px;
  }

  .author-info {
    display: flex;
    align-items: center;
  }

  .date {
    font-size: 16px;
    margin: 0;
  }

  .date-author {
    display: flex;
    flex-direction: column;
  }

  img {
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
`;

export default StyledPostInfo;
