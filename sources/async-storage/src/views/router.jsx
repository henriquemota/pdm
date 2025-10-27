import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// importa as views
import HomeScreen from './home.jsx'

// monta a navegação
const RootStack = createNativeStackNavigator({
	screens: {
		Home: {
			screen: HomeScreen,
			options: { title: 'Home' },
		},
	},
})

const Navigation = createStaticNavigation(RootStack)

// cria o componente principal
const Router = () => {
	return <Navigation />
}

export default Router
export { Router }
