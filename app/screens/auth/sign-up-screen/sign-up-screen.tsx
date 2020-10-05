import React from "react"
import { View, TouchableWithoutFeedback, ImageStyle } from "react-native"
import {
  Button,
  CheckBox,
  Input,
  StyleService,
  Text,
  useStyleSheet,
  IconElement,
  Icon,
} from "@ui-kitten/components"
import { ImageOverlay } from "./extra/image-overlay.component"
import { EmailIcon, FacebookIcon, GoogleIcon, TwitterIcon } from "./extra/icons"
import { KeyboardAvoidingView } from "./extra/3rd-party"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../../models/root-store/root-store-context"

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 176,
  },
  profileAvatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignSelf: "center",
    backgroundColor: "background-basic-color-1",
    tintColor: "text-hint-color",
  },
  editAvatarButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
    alignSelf: "center",
  },
  termsCheckBoxText: {
    color: "text-control-color",
    marginLeft: 10,
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signUpLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
    marginVertiscal: 12,
  },
  socialAuthContainer: {
    marginTop: 24,
  },
  socialAuthButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialAuthHintText: {
    alignSelf: "center",
    marginBottom: 16,
  },
})

export const SignUpScreen = observer(function SignUpScreen() {
  const [email, setEmail] = React.useState<string>()
  const [password, setPassword] = React.useState<string>()
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false)
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false)

  const styles = useStyleSheet(themedStyles)
  const navigation = useNavigation()

  const { authStore } = useStores()

  const onSignUpButtonPress = (): void => {
    authStore.signUpWithEmail(email, password)
  }

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate("login")
  }

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible)
  }

  const renderPasswordIcon = (style: ImageStyle): IconElement => {
    return (
      <TouchableWithoutFeedback onPress={onPasswordIconPress}>
        <Icon {...style} name={passwordVisible ? "eye" : "eye-off"} />
      </TouchableWithoutFeedback>
    )
  }

  return (
    <KeyboardAvoidingView>
      <ImageOverlay style={styles.container} source={require("./assets/image-background.jpg")}>
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            Hello
          </Text>
          <Text style={styles.signUpLabel} category="s1" status="control">
            Create your account.
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            style={styles.formInput}
            status="control"
            autoCapitalize="none"
            placeholder="Email"
            accessoryRight={EmailIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.formInput}
            status="control"
            autoCapitalize="none"
            secureTextEntry={!passwordVisible}
            placeholder="Password"
            accessoryRight={renderPasswordIcon}
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={onSignUpButtonPress}
            returnKeyType={"join"}
          />
          <CheckBox
            style={styles.termsCheckBox}
            checked={termsAccepted}
            onChange={(checked: boolean) => setTermsAccepted(checked)}
          >
            {(props) => (
              <Text {...props} style={styles.termsCheckBoxText}>
                I read and agree to the Terms and Conditions
              </Text>
            )}
          </CheckBox>
        </View>
        <Button
          style={styles.signUpButton}
          size="giant"
          onPress={onSignUpButtonPress}
          disabled={authStore.isSigningUp}
        >
          {authStore.isSigningUp ? "LOADING..." : "SIGN UP"}
        </Button>
        <View style={styles.socialAuthContainer}>
          <Text style={styles.socialAuthHintText} status="control">
            or Register using Social Media
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance="ghost"
              size="giant"
              status="control"
              accessoryRight={FacebookIcon}
            />
            <Button appearance="ghost" size="giant" status="control" accessoryRight={GoogleIcon} />
            <Button appearance="ghost" size="giant" status="control" accessoryRight={TwitterIcon} />
          </View>
        </View>
        <Button
          style={styles.signInButton}
          appearance="ghost"
          status="control"
          onPress={onSignInButtonPress}
        >
          Already have account? Sign In
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  )
})
