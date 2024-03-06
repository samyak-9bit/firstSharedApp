import { StyleSheet } from "react-native";
import { Platform } from "react-native";

export const buttonStyle = StyleSheet.create({
    button: {
        height: 40,
        width: 110,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        backgroundColor: Platform.OS==='web'? 'black' : 'blue', 
      },
})