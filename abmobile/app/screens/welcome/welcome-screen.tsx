import React, { FC, useEffect, useState } from "react"
import { View, Button, ViewStyle, TextStyle, SafeAreaView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  Header,
  Screen,
  Text,
  GradientBackground,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../models"
import { Api } from "../../services/api"
import { UserApi } from "../../services/api/user-api"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}

const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const nextScreen = () => navigation.navigate("demo")
    const [token, setToken] = useState('')
    const { authStore, userStore } = useStores();
    const authAPI = new Api();
    const userAPI = new UserApi(authAPI);

    useEffect(() => {
      getUsers()
    }, [])

    const getUsers = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken')
      setToken(accessToken)
      const allUsers = await userAPI.getUsers();
      console.tron.log(allUsers);
    }

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
          <Text style={TITLE_WRAPPER}>
            <Text style={TITLE} text="Your new app, " />
            <Text style={ALMOST} text="almost" />
            <Text style={TITLE} text="!" />
          </Text>
          <Text style={TITLE} preset="header" tx="welcomeScreen.readyForLaunch" />
          <Text style={CONTENT}>
            This probably isn't what your app is going to look like. Unless your designer handed you
            this screen and, in that case, congrats! You're ready to ship.
          </Text>
          <Text style={CONTENT}>
            For everyone else, this is where you'll see a live preview of your fully functioning app
            using Ignite.
          </Text>
          <Text style={CONTENT}>
            USER EMAIL HERE : {userStore.email}
          </Text>
          <Text style={CONTENT}>
            ACCESS TOKEN = {token}
          </Text>
          <Button title={"Logout"} onPress={() => {
            authStore.logout()
          }}/>
          <Button title={"trigger getUsers"} onPress={() => getUsers()}/>
        </Screen>
        <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}>
            <Button
              testID="next-screen-button"
              title="welcomeScreen.continue"
              onPress={nextScreen}
            />
          </View>
        </SafeAreaView>
      </View>
    )
  },
)
