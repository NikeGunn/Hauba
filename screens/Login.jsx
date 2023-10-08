import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/action'
import Icon from 'react-native-vector-icons/Ionicons'

const Login = ({ navigation }) => {
    const { error } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(true)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }
    
    const loginHandler = () => {
        dispatch(login(email, password))
    }

    useEffect(() => {
        if (error) {
            alert(error)
            dispatch({ type: "clearError" })
        }
    }, [error, dispatch, alert])

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 20, margin: 20 }}>WELCOME</Text>
            <View style={{ width: "70%" }}>
                <TextInput
                    style={Styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize='none'
                />

                <View style={Styles.passwordContainer}>
                    <TextInput
                        secureTextEntry={!isPasswordVisible}
                        style={Styles.passwordInput}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize='none'
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={Styles.eyeIcon}>
                        <Icon
                            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color="#888"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <Button
                disabled={!email || !password}
                style={Styles.btn}
                onPress={loginHandler}
            >
                <Text style={{ color: "#fff" }}>Login</Text>
            </Button>

            <Text style={{ marginTop: 20 }}>Or</Text>
            <TouchableOpacity onPress={() => navigation.navigate("register")}>
                <Text style={{ color: "#900", height: 30, margin: 20 }}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("forgetpassword")}>
                <Text>Forget Password</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login

const Styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#b5b5b5",
        padding: 10,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 15,
    },
    btn: {
        backgroundColor: "#900",
        padding: 5,
        width: "70%",
        marginVertical: 15,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#b5b5b5',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
    passwordInput: {
        flex: 1,
        height: 40,
        paddingLeft: 10,
    },
    eyeIcon: {
        paddingRight: 10,
    },
});
