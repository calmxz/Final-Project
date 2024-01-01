import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import React, { useState } from "react";
import styles from "./login.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, BackBtn } from "../components/";
import { Formik } from "formik";
import axios from 'axios';  
import * as Yup from "yup";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(1, "Password must be at least 1 character")
    .required("Required"),
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Required"),
});

const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState();

  const invalidLogin = () => {
    Alert.alert(
      "Invalid login details",
      "Please provide all required fields",
      [
        {
          text: "Cancel", onPress: ()=> {}
        },
        {
          text: "Continue", onPress: ()=> {}
        },
      ]
    );
  };

  const login = async (values) => {
    setLoader(true);

    try {
        const response = await axios.post('http://192.168.1.246/Final-Project/backendMobile/login.php', values);
        const data = response.data;

        console.log('Response from backend:', data);

        if (data.success && data.userData) {
            setLoader(false);

            // Extract user data
            const userData = data.userData;

            // Save user data to AsyncStorage
            await AsyncStorage.setItem(
                `user${userData.user_id}`,
                JSON.stringify(userData)
            );
            await AsyncStorage.setItem("id", JSON.stringify(userData.user_id));

            navigation.replace('Bottom Navigation');
        } else {
            console.error('Invalid responseData or responseData.userData:', data);
            Alert.alert(
                "Error",
                "Invalid response data during login"
            );
        }
    } catch (error) {
        console.error('Login error:', error);
        Alert.alert(
            "Error",
            "An error occurred during login"
        );
    } finally {
        setLoader(false);
    }
};
  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require("../../images/LOGO1.png")}
            style={styles.cover}
          />

          <Text style={styles.title}>Welcome to SnackCraving</Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
          >
            {({
              handleChange,
              handleBlur,
              touched,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <View>
                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputWrapper(touched.email ? "#121212": "#DDF0FF")}>
                      <MaterialCommunityIcons
                        name='email-outline'
                        size={20}
                        color={"#83929A"}
                        style={styles.iconStyle}
                      />
                      <TextInput
                        placeholder="Enter email"
                        onFocus={()=>{setFieldTouched('email')}}
                        onBlur={()=> {setFieldTouched('email', '')}}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{flex: 1}}
                      />
                    </View>
                      {touched.email && errors.email && (
                        <Text style={styles.errorMessage}>{errors.email}</Text>
                      )}
                  </View>

                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputWrapper(touched.password ? "#121212": "#DDF0FF")}>
                      <MaterialCommunityIcons
                        name='lock-outline'
                        size={20}
                        color={"#83929A"}
                        style={styles.iconStyle}
                      />
                      <TextInput
                        secureTextEntry={obsecureText}
                        placeholder="Password"
                        onFocus={()=>{setFieldTouched('password')}}
                        onBlur={()=> {setFieldTouched('password', '')}}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{flex: 1}}
                      />

                        <TouchableOpacity onPress={()=> {setObsecureText(!obsecureText)}}>
                          <MaterialCommunityIcons
                            name={obsecureText ? "eye-outline" : "eye-off-outline"}
                            size={18}
                          />
                        </TouchableOpacity>

                    </View>
                      {touched.password && errors.password && (
                        <Text style={styles.errorMessage}>{errors.password}</Text>
                      )}
                  </View>
                <Button 
                loader={loader}
                title={"L O G I N"} 
                onPress={isValid ? handleSubmit : invalidLogin} 
                isValid={isValid} 
                />
                <Text style = {styles.registration} onPress={()=>{navigation.navigate('SignUp')}}>Register</Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginPage;
