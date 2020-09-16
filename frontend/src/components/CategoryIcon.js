import React from 'react'
import { ReactComponent as Html } from '../assets/icons/html-5.svg'
// import { ReactComponent as Html } from '../assets/icons/html-5.svg'

const iconTypes = {
  html: Html,
}

const CategoryIcon = ({ name }) => {
  let Icon = iconTypes[name]

  return <Icon />
}

export default CategoryIcon
