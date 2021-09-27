import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import ImageList from '../components/ImageList';
import { getImages } from '../api/pexels';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


const ImageScreen = ({route}) => {

  const {image} = route.params;

  //To open photographer url
  const handlePress = async () => {
    const browser = await WebBrowser.openBrowserAsync(image.photographer_url);
  }

  //To download images

  const downloadFile = async () => {
    try {
      let fileUri = FileSystem.documentDirectory + image.id + '.jpeg';
      const {uri} = await FileSystem.downloadAsync(image.src.original, fileUri);
      saveFile(uri);
    } catch (error) {
      console.error(error);
    }
  }

  const saveFile = async (fileUri) => {
    const {status} = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync('Pexels Album', asset, false);
    }
  }


  const handleDownload = () => {
    downloadFile();
  }

  const [photos, setPhotos] = useState([]);

  //Charge image when component starts
  const loadImages = async() => {
    const res = await getImages()
    setPhotos(res.data.photos);
  }

  useEffect(() => {
    loadImages();
  }, [])

  return (
    <View style={styles.container}>
      <Image style={styles.pixelImage}
        source={{
          uri: image.src.large
        }}
      />
      <View style={styles.userContent}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
          <Avatar
            style={styles.avatarStyle}
            title={image.photographer
              .split(" ")
              .map((string) => string[0])
              .join("")
              .toUpperCase()
            }
            rounded
          />
          <TouchableOpacity style={{ flex: 1, paddingVertical: 10}}
            onPress={handlePress}>
            <Text style={styles.textPhotographer}>{image.photographer}</Text>
          </TouchableOpacity>
          <Button
            onPress={() => handleDownload()}
            buttonStyle={styles.downloadButton}
            title="Download photo"  
          />
        </View>
      </View>
      <View>
        <ImageList photos={photos}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#303546',
  },
  pixelImage: {
    width: '100%',
    height: '50%',  
  },
  avatarStyle: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 100
  },
  userContent: {
    display: 'flex',
    paddingVertical: 20,
    padding: 5,
  },
  textPhotographer: {
    fontSize: 18,
    color: 'white',
    marginLeft: 5,
  },
  downloadButton: {
    borderRadius: 50,
    backgroundColor: '#229783',
  }
});

export default ImageScreen
