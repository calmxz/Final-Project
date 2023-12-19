import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    searchContainer:{
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        marginHorizontal: 12,
        backgroundColor: "#DDF0FF",
        borderRadius: 16,
        marginVertical: 16,
        height: 50
    },
    searchIcon: {
        marginHorizontal: 10,
        color: "#83829A",
        marginTop: 12
    },
    searchWrapper:{
        flex: 1,
        backgroundColor: "#DDF0FF",
        marginRight: 10,
        borderRadius: 12 
    },
    searchInput:{
        fontWeight: "regular",
        width: "100%",
        height: "100%",
        paddingHorizontal: 12
    },
    searchBtn:{
        width: 50,
        height: "100%",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2A4D50"
    }
})

export default styles