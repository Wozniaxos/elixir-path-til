import React from 'react'
import classNames from 'classnames'
import StyledCheckboxes from '../styles/StyledCheckboxes'

const Checkboxes = ({
  handlePublicCheckbox,
  isPublic,
  handleReviewCheckbox,
  isReviewNeeded,
}) => {
  const publicCheckboxClass = classNames({
    active: isPublic,
  })
  const reviewCheckboxClass = classNames({
    active: isReviewNeeded,
  })
  return (
    <StyledCheckboxes>
      <div className="checkboxes">
        <div className="checkbox">
          <label className={publicCheckboxClass}>
            Make public?
            <input
              type="checkbox"
              onChange={handlePublicCheckbox}
              checked={isPublic}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="checkbox">
          <label className={reviewCheckboxClass}>
            For review?
            <input
              type="checkbox"
              onChange={handleReviewCheckbox}
              checked={isReviewNeeded}
              disabled={isPublic}
            />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
    </StyledCheckboxes>
  )
}

export default Checkboxes
