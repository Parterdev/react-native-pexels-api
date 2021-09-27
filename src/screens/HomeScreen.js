import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { getImages } from '../api/pexels';
import ImageList from '../components/ImageList';

const HomeScreen = ({openSearch}) => {

  const [photos, setPhotos] = useState([]);
  const [searchWord, setSearchWord] = useState('pets');

  //Charge image when component starts
  const loadImages = async() => {
    const res = await getImages(searchWord)
    console.log(res.headers);
    setPhotos(res.data.photos);
  }

  //To look for any typing content from input text
  const handleSearch = async () => {
    await loadImages(searchWord);
  }

  useEffect(() => {
    loadImages();
  }, [])

  return (
    <>
    {openSearch && (
      <View style={styles.containerSearch}>
        <Input
          leftIcon={{
            type: 'feather',
            name:'search',
            color: '#303546'
          }} 
          onChangeText={(value) => setSearchWord(value)}
          placeholder="Type any word..."
          inputContainerStyle={styles.searchInput}
        />
        <Button
          onPress={() => handleSearch()}
          buttonStyle={styles.searchButton}
          title="Search"
        />
      </View>
    )}
    <View style={styles.container}>
      <ImageList photos={photos}/>
    </View>
    </>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303546',
  },
  containerSearch: {
    backgroundColor: '#303546',
    flexDirection: 'row',
    paddingRight: 80,
    alignItems: 'flex-start',
    paddingTop: 10,
  },  
  title: {
    color: '#FFFFFF',
    textAlign: 'right',
    fontSize: 16,
    paddingTop: 20,
    paddingRight: 10,
  },
  searchInput: {
    backgroundColor: '#E5E7EB',
    color: '#303546',
    borderRadius: 5,
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: '#229783',
    paddingVertical: 12,
  }
});

export default HomeScreen


