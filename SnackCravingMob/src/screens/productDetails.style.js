import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFC"
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 44,
    width: width -44,  
    zIndex: 999,
  },
  image:{
    aspectRatio: 4/3,
    resizeMode: 'cover',
    width: 500,
    height: undefined
  },
  details:{
    marginTop: -20,
    backgroundColor: "#FAFAFC",
    width: width,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  titleRow:{
    marginHorizontal: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width -44,
    top: 25
  },
  priceRow:{
    marginHorizontal: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width -10,
    top: 5
  },
  price:{
    top: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 28,
    marginLeft: 0
  },
  priceText:{
    fontWeight: "semibold",
    fontSize: 16
  },
  countText:{
    fontWeight: "semibold",
    fontSize: 16
  },
  title:{
    fontWeight: 'bold',
    fontSize: 28
  },
  descriptionWrapper:{
    marginTop: 20,
    marginHorizontal: 20
  },
  description:{
    fontWeight: "medium",
    fontSize: 16
  },
  descText:{
    fontWeight: "regular",
    fontSize: 12,
    textAlign: 'justify',
    marginBottom: 8
  },
  nutritionWrapper:{
    marginTop: 0
  },
  nutrition:{
    fontWeight: "medium",
    fontSize: 16
  },
  nutritionText:{
    fontWeight: "regular",
    fontSize: 12,
    textAlign: 'justify',
    marginBottom: 12
  },
  cartRow:{
    marginTop: 26,
    paddingBottom: 12,
    alignItems: 'center'
  },
  cartBtn:{
    width: width*0.9,
    backgroundColor: "#FF7754",
    borderRadius: 15,
    padding: 14
  },
  cartTitle:{
    fontWeight: "semibold",
    fontSize: 20 ,
    color: "white",
    textAlign: 'center'
  },
  
});

export default styles;
