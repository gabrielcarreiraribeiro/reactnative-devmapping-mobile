import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from './pages/Home'
import Profile from './pages/Profile'

const Routes = createAppContainer(
    createStackNavigator({
        Home: {
            screen: Home,
            navigationOptions: {
                title: "DevMapping",
                headerTitleAlign: "center"
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: "Perfil no Github",
                headerTitleAlign: "center"
            }
        }
    }, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#7D40E7"
            },
            headerTintColor: "#FFF",
            headerBackTitleVisible: false
        }
    })
);

export default Routes