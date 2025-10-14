import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//importar as interfaces
import HomeScreen from './home'
import EnderecosScreen from './enderecos'
import AuthScreen from './auth'

const RootStack = createNativeStackNavigator({
	screens: {
		Home: {
			screen: HomeScreen,
			options: { title: 'Home' },
		},
		Enderecos: {
			screen: EnderecosScreen,
			options: { title: 'Endereços' },
		},
		Auth: {
			screen: AuthScreen,
			options: { title: 'Autenticação' },
		},
	},
})

const Navigation = createStaticNavigation(RootStack)

export default function App() {
	return <Navigation />
}
