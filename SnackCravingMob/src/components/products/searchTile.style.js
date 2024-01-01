import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
        flexDirection: "row",
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#FFFAFA",
        shadowColor: "#FAFAFC",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5
    },
    image: {
        width: 70,
        backgroundColor: "#DDF0FF",
        borderRadius: 16,
        justifyContent: "center",
        alignContent: "center"
    },
    productImg:{
        width: "100%",
        height: 65,
        borderRadius: 12,
        resizeMode: "cover"
    },
    textContainer:{
        flex: 1,
        marginHorizontal: 16
    },
    productTitle:{
        fontSize: 16,
        fontWeight: "bold",
        color: "#2A4D50"
    },
    productPrice:{
        fontSize: 12,
        fontWeight: "regular",
        color: "#83829A",
        marginTop: 3
    }
})

export default styles