import { StyleSheet } from "react-native";

const styles = StyleSheet.create ({
    container: {
        width: 182,
        height: 140,
        marginEnd: 22,
        borderRadius: 16,
        backgroundColor: "#DDF0FF"
    },
    imageContainer: {
        flex: 1,
        width: 170,
        marginLeft: 6,
        marginTop: 6,
        borderRadius: 12,
        overflow: "hidden"
    },
    image: {
        aspectRatio: 1,
        contentFit: "cover"
    }
})

export default styles;