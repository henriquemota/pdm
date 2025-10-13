import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//importar as interfaces
import HomeScreen from './home'
import EnderecosScreen from './enderecos'

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
	},
})

const Navigation = createStaticNavigation(RootStack)

export default function App() {
	return <Navigation />
}
