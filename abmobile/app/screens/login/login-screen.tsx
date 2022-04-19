import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, Text } from "../../components"
import { useStores } from "../../models"
import { color } from "../../theme"
import { Button } from 'native-base';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = observer(function LoginScreen() {
  // Pull in navigation via hook
  // const navigation = useNavigation()
  const { authStore, userStore } = useStores();

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="login" />
      <Button
        onPress={() => {
        const credentials = {
          email: "gramos.ukaj@free.fr",
          password: "Test1812."
        }
        authStore.login(credentials);
      }}>
        Login
      </Button>

      <Text text={`${authStore.isAuthenticated}`} />
      <Text text={userStore?.email} />
    </Screen>
  )
})
