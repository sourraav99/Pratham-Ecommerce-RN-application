import { View, Text } from 'react-native'
import React from 'react'
import Wrapper from '../../components/wrapper'
import { width } from '../../hooks/responsive'
import TextComp from '../../components/textComp'
import { useTheme } from '@react-navigation/native'
import ButtonComp from '../../components/buttonComp'
import TextInputComp from '../../components/textInputComp'

const Login = () => {
  const {colors}=useTheme()
  return (

    <Wrapper safeAreaContainerStyle={{}}>   
       <TextComp
        // style={{color:colors.primaryAppColor}}
        >helo</TextComp>
       <Text style={{color:colors.primaryAppColor}}>hello</Text>
       <ButtonComp title={'Button'}/>
       <TextInputComp placeholder={'helo'}/>
    </Wrapper>

  )
}

export default Login