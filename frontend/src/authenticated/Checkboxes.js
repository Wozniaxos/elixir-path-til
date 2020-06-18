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
    grayout: isPublic,
  })

  const publicCheckmarkClass = classNames({
    checkmark: true,
    'checkmark-active': isPublic,
  })

  const reviewCheckmarkClass = classNames({
    checkmark: true,
    'checkmark-active': isReviewNeeded,
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
            <span className={publicCheckmarkClass}></span>
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
            <span className={reviewCheckmarkClass}></span>
          </label>
        </div>
      </div>
    </StyledCheckboxes>
  )
}

export default Checkboxes
