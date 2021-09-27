import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CardImage = ({image}) => {

  const navigation = useNavigation();


  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ImageScreen', {image})}>
      <Image
        source={{
          uri: (image.src.portrait)
          ? image.src.portrait  
          :'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80'
        }}
        style={{height:180, width: '100%'}}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '5%',
    margin: 4,
    justifyContent: 'space-between'
  },
});

export default CardImage
