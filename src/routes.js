// "Container" para todas as rotas da nossa aplicação
import { createAppContainer } from 'react-navigation'

// Importando o tipo de navegação "Stack" (Por pilha) para utilizarmos no projeto
import { createStackNavigator } from 'react-navigation-stack'

// Pages
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
       // Aplica por padrão para todas as rotas 
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