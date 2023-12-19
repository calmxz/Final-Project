import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box';


const Carousel = () => {
    const slides = [
          require('../assets/images/burger/s&tburger.jpeg'),
    ]
  return (
    <View style={styles.carouselContainer}>
      <SliderBox images={slides}
        dotColor = {"#2A4D50"}
        inactiveDotColor = {"#DDF0FF"}
        ImageComponentStyle = {{borderRadius: 15, width:"95%", marginTop: 15}}
      />
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({
    carouselContainer:{
        flex: 1,
        alignItems: "center"
    }
})