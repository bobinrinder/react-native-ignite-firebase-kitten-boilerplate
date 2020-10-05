import React from "react"
import { StyleSheet, View } from "react-native"
import { Button, Input, Text } from "@ui-kitten/components"
import { ImageOverlay } from "./extra/image-overlay.component"
import { EmailIcon } from "./extra/icons"
import { KeyboardAvoidingView } from "./extra/3rd-party"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../../models/root-store/root-store-context"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  enterEmailLabel: {
    alignSelf: "center",
    marginTop: 64,
    zIndex: 1,
  },
  forgotPasswordLabel: {
    alignSelf: "center",
    marginTop: 24,
    zIndex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 24,
  },
  signInButton: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
})

export const ForgotPasswordScreen = observer(function ForgotPasswordScreen() {
  const [email, setEmail] = React.useState<string>()
  const [passwordResetSuccess, setPasswordResetSuccess] = React.useState<boolean>(false)

  const navigation = useNavigation()

  const { authStore } = useStores()

  const onResetPasswordButtonPress = async (): Promise<void> => {
    const result = await authStore.sendPasswordReset(email)
    if (result) {
      setPasswordResetSuccess(true)
    }
  }

  const onBackButtonPress = (): void => {
    navigation && navigation.goBack()
  }

  return (
    <KeyboardAvoidingView>
      <ImageOverlay style={styles.container} source={require("./assets/image-background.jpg")}>
        <Text style={styles.forgotPasswordLabel} category="h4" status="control">
          Forgot Password
        </Text>
        {passwordResetSuccess ? (
          <Text style={styles.forgotPasswordLabel} category="h6" status="control">
            We sent you an email with a link to reset your password!
          </Text>
        ) : (
          <>
            <Text style={styles.enterEmailLabel} status="control">
              Please enter your email address
            </Text>
            <View style={styles.formContainer}>
              <Input
                status="control"
                placeholder="Email"
                autoCapitalize="none"
                accessoryRight={EmailIcon}
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={onResetPasswordButtonPress}
                returnKeyType={"done"}
              />
            </View>
            <Button size="giant" onPress={onResetPasswordButtonPress}>
              {authStore.isSendingPasswordReset ? "LOADING..." : "RESET PASSWORD"}
            </Button>
          </>
        )}
        <Button
          style={styles.signInButton}
          appearance="ghost"
          status="control"
          onPress={onBackButtonPress}
        >
          {"< Back to Login"}
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  )
})
