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
      break
    case 'angular':
      return <SiAngular />
      break
    case 'aws':
      return <FaAws />
      break
    case 'chrome':
      return <FiChrome />
      break
    case 'commandline':
      return <BsTerminalFill />
      break
    // case 'crystal':
    //   return <Crystal />
    //   break
    case 'css':
      return <FaCss3 />
      break
    case 'docker':
      return <SiDocker />
      break
    case 'elixir':
      return <SiElixir />
      break
    case 'ember':
      return <SiEmberDotJs />
      break
    case 'erlang':
      return <FaErlang />
      break
    case 'flutter':
      return <SiFlutter />
      break
    // case 'general':
    case 'git':
      return <BiGitBranch />
      break
    case 'heroku':
      return <SiHeroku />
      break
    case 'html':
      return <AiFillHtml5 />
      break
    case 'javascript':
      return <SiJavascript />
      break
    // case 'k8s':
    //   return < />
    //   break
    case 'linux':
      return <SiLinux />
      break
    case 'markdown':
      return <GoMarkdown />
      break
    // case 'meetup':
    //   return < />
    //   break
    case 'mongodb':
      return <DiMongodb />
      break
    case 'nodejs':
      return <GrNode />
      break
    case 'osx':
      return <FaApple />
      break
    // case 'phoenix':
    //   return < />
    //   break
    case 'rails':
      return <SiRails />
      break
    case 'react':
      return <SiReact />
      break
    // case 'react-native':
    //   return < />
    //   break
    case 'redis':
      return <SiRedis />
      break
    case 'ruby':
      return <DiRuby />
      break
    case 'rust':
      return <SiRust />
      break
    // case 'sql':
    //   return < />
    //   break
    case 'terraform':
      return <SiTerraform />
      break
    // case 'vault':
    //   return < />
    //   break
    default:
      return null
  }
}

export default Icon
