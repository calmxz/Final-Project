import {
    ScrollView,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
    Dimensions
  } from "react-native";
  import React, { useState } from "react";
  import styles from "./login.style";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { Button, BackBtn } from "../components/";
  import { Formik } from "formik";
  import * as Yup from "yup";
  import {MaterialCommunityIcons} from "@expo/vector-icons";
  import axios from "axios";

  const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
  
  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
        .max(50, "First name too long")
        .required('Required'),
    middle_name: Yup.string()
        .max(50, "Middle name too long"),
    last_name: Yup.string()
        .max(50, "First name too long")
        .required('Required'),
    username: Yup.string()
        .min(1, "Username too short")
        .required("Required"),
    phone: Yup.string()
        .min(12, "Phone number too short")
        .max(15, "Phone number too long")
        .required("Required"),
    password: Yup.string()
      .min(1, "Password must be at least 1 character")
      .required("Required"),
    email: Yup.string()
      .email("Provide a valid email address")
      .required("Required"),
  });

const SignUp = ({navigation}) => {
    const [loader, setLoader] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [obsecureText, setObsecureText] = useState();
  
    const invalidLogin = () => {
      Alert.alert(
        "Invalid signup details",
        "Please provide all required fields",
        [
          {
            text: "Cancel", onPress: ()=> {}
          },
          {
            text: "Continue", onPress: ()=> {}
          },
        ]
      )
    }

    const register = async (values) => {
        setLoader(true);
        
        try {
            const response = await axios.post('http://192.168.1.117/Final-Project/backendMobile/register.php', values);
            console.log('Registration response:', response.data);
    
            if (response.data.success) {
                setLoader(false);
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Registration error:', error);
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
            style={{width: deviceWidth - 40,
                height: deviceHeight / 3,
                resizeMode: "contain",
                marginBottom: 44}}
          />

          <Text style={styles.title}>Welcome to SnackCraving</Text>

          <Formik
            initialValues={{ first_name: "", middle_name: "", last_name: "", email: "", username:"", password: "", phone: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => register(values)}
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
                    <Text style={styles.label}>First Name</Text>
                    <View style={styles.inputWrapper(touched.first_name ? "#121212": "#DDF0FF")}>
                      <TextInput
                        placeholder="First Name"
                        onFocus={()=>{setFieldTouched('first_name')}}
                        onBlur={()=> {setFieldTouched('first_name', '')}}
                        value={values.first_name}
                        onChangeText={handleChange('first_name')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{flex: 1}}
                      />
                    </View>
                      {touched.first_name && errors.first_name && (
                        <Text style={styles.errorMessage}>{errors.first_name}</Text>
                      )}
                  </View>

                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Middle Name</Text>
                    <View style={styles.inputWrapper(touched.middle_name ? "#121212": "#DDF0FF")}>
                      <TextInput
                        placeholder="Middle Name"
                        onFocus={()=>{setFieldTouched('middle_name')}}
                        onBlur={()=> {setFieldTouched('middle_name', '')}}
                        value={values.middle_name}
                        onChangeText={handleChange('middle_name')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{flex: 1}}
                      />
                    </View>
                      {touched.middle_name && errors.middle_name && (
                        <Text style={styles.errorMessage}>{errors.middle_name}</Text>
                      )}
                  </View>

                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Last Name</Text>
                    <View style={styles.inputWrapper(touched.last_name ? "#121212": "#DDF0FF")}>
                      <TextInput
                        placeholder="Last Name"
                        onFocus={()=>{setFieldTouched('last_name')}}
                        onBlur={()=> {setFieldTouched('last_name', '')}}
                        value={values.last_name}
                        onChangeText={handleChange('last_name')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{flex: 1}}
                      />
                    </View>
                      {touched.last_name && errors.last_name && (
                        <Text style={styles.errorMessage}>{errors.last_name}</Text>
                      )}
                  </View>

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
                        placeholder="Email"
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
                    <Text style={styles.label}>Username</Text>
                    <View style={styles.inputWrapper(touched.username ? "#121212": "#DDF0FF")}>
                      <MaterialCommunityIcons
                        name='account'
                        size={20}
                        color={"#83929A"}
                        style={styles.iconStyle}
                      />
                      <TextInput
                        placeholder="Username"
                        onFocus={()=>{setFieldTouched('username')}}
                        onBlur={()=> {setFieldTouched('username', '')}}
                        value={values.username}
                        onChangeText={handleChange('username')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{flex: 1}}
                      />
                    </View>
                      {touched.username && errors.username && (
                        <Text style={styles.errorMessage}>{errors.username}</Text>
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

                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Phone number</Text>
                    <View style={styles.inputWrapper(touched.phone ? "#121212": "#DDF0FF")}>
                      <MaterialCommunityIcons
                        name='cellphone'
                        size={20}
                        color={"#83929A"}
                        style={styles.iconStyle}
                      />
                      <TextInput
                        placeholder="Phone Number"
                        onFocus={()=>{setFieldTouched('phone')}}
                        onBlur={()=> {setFieldTouched('phone', '')}}
                        value={values.phone}
                        onChangeText={handleChange('phone')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{flex: 1}}
                      />
                    </View>
                      {touched.phone && errors.phone && (
                        <Text style={styles.errorMessage}>{errors.phone}</Text>
                      )}
                  </View>
                <Button title={"S I G N U P"} onPress={isValid ? handleSubmit : invalidLogin} isValid={isValid} loader={loader} />
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default SignUp