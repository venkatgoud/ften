import React from 'react'
import { Toolbar, Space, Heading, NavItem } from 'rebass'
import Icon from 'react-geomicons'
import * as colors from '../constants/colors'

const Header = ({fileName}) => (
  <div>
    <Toolbar style={{
      backgroundColor: colors.GRAY
    }}>
      <Heading level={3}>FTEN</Heading>       
    </Toolbar>
    <Toolbar style={{
      backgroundColor: colors.LIGHT_GRAY,
      height: '40px',
      minHeight: '40px',
      color: colors.GRAY
    }}>
      <span>{fileName || 'Untitled Screenplay'}</span>       
      <Space />
    </Toolbar>
  </div>

)

export default Header
