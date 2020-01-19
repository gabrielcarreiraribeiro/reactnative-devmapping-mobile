import React from 'react'

// Abrindo uma web page dentro do app
import { WebView } from 'react-native-webview'

function Profile({ navigation }) {
    const github_username = navigation.getParam("github_username")
    return <WebView style={{ flex: 1 }} source={{ uri: `https://github.com/${github_username}` }} />
}

export default Profile