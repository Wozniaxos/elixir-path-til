import React from 'react'
import { ReactComponent as Html } from '../assets/icons/html-5.svg'

// todo - import more icons when provided by designer
// then add them to iconTypes
// import {ReactComponent as } from '../assets/icons';

const iconTypes = {
  html: Html,
}

const CategoryIcon = ({ name }) => {
  let Icon = iconTypes[name]

  return <Icon />
}

export default CategoryIcon
