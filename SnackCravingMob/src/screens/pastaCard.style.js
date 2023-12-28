import { StyleSheet } from "react-native";

const styles = StyleSheet.create ({
    container: {
        width: 182,
        height: 180,
        marginEnd: 22,
        borderRadius: 16,
        backgroundColor: "#DDF0FF"
    },
    imageContainer: {
        flex: 1,
        width: 165,
        marginLeft: 6,
        marginTop: 6,
        borderRadius: 12,
        overflow: "hidden"
    },
    images: {
        aspectRatio: 1,
        resizeMode: 'cover',
        width: '100%',
        height: undefined
    },
    details: {
        padding: 12
    },
    title:{
        fontWeight: "bold",
        fontSize: 22,
        marginBottom: 5,
        textAlign: "center"
    }
})

export default styles;