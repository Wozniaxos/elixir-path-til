import styled from 'styled-components'

const StyledAdminPanel = styled.div`
  align-items: center;
  background: #343434;
  display: flex;
  height: 100px;
  justify-content: flex-end;

  .add-post-btn {
    background-color: #fec92d;
    border-radius: 10px;
    color: #1f1f1f;
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    height: 40px;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    width: 160px;
  }

  .bg-light {
    background-color: #353535;
  }

  .chevron {
    border-radius: 50%;
    height: 20px;
    margin-left: 30px;
    width: 20px;
    margin-right: 0;
  }

  .drop-down-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    padding-top: 40px;
    padding-left: 20px;
    padding-bottom: 10px;
    width: 100%;
  }

  img {
    border-radius: 50%;
    height: 40px;
    margin-left: 20px;
    margin-right: 10px;
    transition: all 0.3s ease-in;
    width: 40px;
  }

  .img-rotate {
    transform: rotate(180deg);
  }

  .hidden {
    display: none;
  }

  .profile {
    position: relative;
  }

  .profile-link {
    color: white;
    text-decoration: none;
  }

  .user-info {
    align-items: center;
    display: flex;
    padding-right: 32px;
  }

  .user-name {
    font-weight: 600;
    letter-spacing: 0.28px;
  }
`

export default StyledAdminPanel
