import React from 'react'
import { Toolbar, Space, Heading, NavItem, Switch, Label } from 'rebass'
import Icon from 'react-geomicons'
import * as colors from '../constants/colors'

const Header = ({fileName, indian}) => (
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
      <Space auto={true}
      x={1}/>       
      <Label>Indian</Label>
      <Switch checked={indian} onClick={()=>{}}/>
    </Toolbar>
  </div>

)

export default Header
