import React, {useState} from 'react';
import {StyleSheet, Image, View,TouchableOpacity, Text, Button} from 'react-native';
import {RNCamera} from 'react-native-camera';

const PendingView = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontSize: 30, color: 'red'}}>Loading...</Text>
  </View>
);
export default function App() {
  const [image, setImage] = useState(null);
  const takePicture = async (camera) => {
    try {
      const options = {quality: 0.9, base64: false};
      const data = await camera.takePictureAsync(options);
      setImage(data.uri);
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <View style={styles.container}>
      {image ? (
        <View style={styles.preview}>
        <Text style={styles.camtext}>Here is your new profile pic</Text>
        <Image style={styles.clicked} source={{uri:image,width:"80%",height:"80%"}}/>
        <Button
          title= "Click new image"
          onPress={()=>{
            setImage(null)
          }}>
        </Button>
        </View> 
      ) : (
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use Camera',
            message: 'longer text to use camera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio',
            message: 'longer text to use audio',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}>
          {({camera, status}) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={styles.capture}
                  onPress={() => takePicture(camera)}>
                  <Text>SNAP</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0a79bf',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: "orange",
    padding: 20,
    alignItems: "baseline",
    // alignSelf: 'center',
    marginTop:"120%"
  },
  camtext:{
    backgroundColor:"#3498Db",
    color:"#ffffff",
    marginBottom:10,
    width:"100%",
    textAlign:"center",
    paddingVertical:20,
    fontSize:25
  },
  clicked:{
    height:300,
    width:300,
    borderRadius:15
  }
});
