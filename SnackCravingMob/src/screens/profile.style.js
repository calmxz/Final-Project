import { StyleSheet, Dimensions } from "react-native";

const { width: deviceWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F8"
    },
    cover: {
        height: 290,
        width: "100%",
        resizeMode: "cover"
    },
    profileContainer: {
        flex: 1,
        alignItems: "center"
    },
    profile: {
        height: 155,
        width: 155,
        borderRadius: 999,
        borderColor: "#2A4D50",
        borderWidth: 2,
        resizeMode: "cover",
        marginTop: -90
    },
    name: {
        fontWeight: "bold",
        color: "#2A4D50",
        marginVertical: 5
    },
    loginBtn: {
        backgroundColor: "#DDF0FF",
        padding: 2,
        borderWidth: 0.4,
        borderColor: "#2A4D50",
        borderRadius: 44
    },
    menuText: {
        fontWeight: "bold",
        color: "#83829A",
        paddingHorizontal: 12,
        fontSize: 14,
        lineHeight: 26
    },
    menuWrapper: {
        marginTop: 24,
        width: deviceWidth - 20,
        backgroundColor: "#F3F4F8",
        borderRadius: 12
    },
    menuItem: (borderBottomWidth) => ({
        borderBottomWidth: borderBottomWidth,
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderColor: "#83829A"
    }),
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
      },
      modalText: {
        fontSize: 18,
        marginBottom: 10,
      },
      modalInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
      },
      modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      modalButton: {
        backgroundColor: "#2A4D50",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
      },
      modalButtonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
      },  
});

export default styles;
