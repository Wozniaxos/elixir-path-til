import React from 'react'
import classNames from 'classnames'

const Checkboxes = ({
  handlePublicCheckbox,
  isPublic,
  handleReviewCheckbox,
  isReviewNeeded,
}) => {
  const publicLabelClasses = classNames({
    'checkboxes__single-checkbox': true,
    '-active': isPublic,
  })

  const reviewLabelClasses = classNames({
    'checkboxes__single-checkbox': true,
    '-darken': isPublic,
    '-active': isPublic || isReviewNeeded,
  })

  const publicCheckmarkClasses = classNames({
    checkboxes__checkmark: true,
    '-active': isPublic,
  })

  const reviewCheckmarkClasses = classNames({
    checkboxes__checkmark: true,
    '-active': isReviewNeeded,
  })

  return (
    <div className="checkboxes">
      <div>
        <label className={publicLabelClasses}>
          Make public?
          <input
            type="checkbox"
            onChange={handlePublicCheckbox}
            checked={isPublic}
          />
          <span className={publicCheckmarkClasses}></span>
        </label>
      </div>
      <div>
        <label className={reviewLabelClasses}>
          For review?
          <input
            type="checkbox"
            onChange={handleReviewCheckbox}
            checked={isReviewNeeded}
            disabled={isPublic}
          />
          <span className={reviewCheckmarkClasses}></span>
        </label>
      </div>
    </div>
  )
}

export default Checkboxes
