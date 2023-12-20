import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    textStyle: {
        fontWeight: "bold",
        fontSize: 40
    },
    appBarWrapper: {
        marginHorizontal: 22,
        marginTop: 12
    },
    appBar:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    location: {
        fontWeight: "semibold",
        fontSize: 16,
        color: "#83829A"
    },
    cartCount:{
        position: "absolute",
        bottom: 16,
        left: 12,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: "green",
        justifyContent: "center",
        zIndex: 999
    },
    cartNumber: {
        fontWeight: "600",
        fontSize: 10,
        color: "#FAFAFC"
    }
})

export default styles