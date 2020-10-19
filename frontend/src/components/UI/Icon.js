import React from 'react'

import { AiOutlineAndroid } from 'react-icons/ai'
import { FaAws } from 'react-icons/fa'
import { SiAngular } from 'react-icons/si'
import { FiChrome } from 'react-icons/fi'
import { BsTerminalFill } from 'react-icons/bs'
import { FaCss3 } from 'react-icons/fa'
import { SiDocker } from 'react-icons/si'
import { SiElixir } from 'react-icons/si'
import { SiEmberDotJs } from 'react-icons/si'
import { FaErlang } from 'react-icons/fa'
import { SiFlutter } from 'react-icons/si'
import { BiGitBranch } from 'react-icons/bi'
import { SiHeroku } from 'react-icons/si'
import { AiFillHtml5 } from 'react-icons/ai'
import { SiJavascript } from 'react-icons/si'
import { SiLinux } from 'react-icons/si'
import { GoMarkdown } from 'react-icons/go'
import { DiMongodb } from 'react-icons/di'
import { GrNode } from 'react-icons/gr'
import { FaApple } from 'react-icons/fa'
import { SiRails } from 'react-icons/si'
import { SiReact } from 'react-icons/si'
import { SiRedis } from 'react-icons/si'
import { DiRuby } from 'react-icons/di'
import { SiRust } from 'react-icons/si'
import { SiTerraform } from 'react-icons/si'

const Icon = ({ categoryName }) => {
  switch (categoryName) {
    case 'android':
      return <AiOutlineAndroid />
    case 'angular':
      return <SiAngular />
    case 'aws':
      return <FaAws />
    case 'chrome':
      return <FiChrome />
    case 'commandline':
      return <BsTerminalFill />
    // case 'crystal':
    //   return <Crystal />
    case 'css':
      return <FaCss3 />
    case 'docker':
      return <SiDocker />
    case 'elixir':
      return <SiElixir />
    case 'ember':
      return <SiEmberDotJs />
    case 'erlang':
      return <FaErlang />
    case 'flutter':
      return <SiFlutter />
    // case 'general':
    case 'git':
      return <BiGitBranch />
    case 'heroku':
      return <SiHeroku />
    case 'html':
      return <AiFillHtml5 />
    case 'javascript':
      return <SiJavascript />
    // case 'k8s':
    //   return < />
    case 'linux':
      return <SiLinux />
    case 'markdown':
      return <GoMarkdown />
    // case 'meetup':
    //   return < />
    case 'mongodb':
      return <DiMongodb />
    case 'nodejs':
      return <GrNode />
    case 'osx':
      return <FaApple />
    // case 'phoenix':
    //   return < />
    case 'rails':
      return <SiRails />
    case 'react':
      return <SiReact />
    // case 'react-native':
    //   return < />
    case 'redis':
      return <SiRedis />
    case 'ruby':
      return <DiRuby />
    case 'rust':
      return <SiRust />
    // case 'sql':
    //   return < />
    case 'terraform':
      return <SiTerraform />
    // case 'vault':
    //   return < />
    default:
      return null
  }
}

export default Icon
