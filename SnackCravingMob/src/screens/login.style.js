import { StyleSheet, Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
    cover: {
        width: deviceWidth - 40,
        height: deviceHeight / 2.4,
        resizeMode: "contain",
        marginBottom: 44
    },
    title:{
        fontWeight: "bold",
        fontSize: 28,
        color: "#2A4D50",
        alignItems: "center",
        marginBottom: 44
    },
    wrapper:{
        marginBottom: 20
    },
    label:{
        fontWeight: "normal",
        fontSize: 10,
        marginBottom: 5,
        marginEnd: 5,
        textAlign: "right"
    },
    inputWrapper: (borderColor) => ({
        borderColor: borderColor,
        backgroundColor: "#FAFAFC",
        borderWidth: 1,
        height: 50,
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: "center"
    }),
    iconStyle:{
        marginRight: 10
    },
    errorMessage:{
        color: "#e81e4d",
        fontWeight: "normal",
        marginTop: 5,
        marginLeft: 5,
        fontSize: 10
    },
    registration:{
        marginTop: 20,
        textAlign: "center"
    }
});

export default styles;