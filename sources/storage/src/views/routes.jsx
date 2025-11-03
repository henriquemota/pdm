import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PaperProvider } from 'react-native-paper'

// importacao das telas
import HomeScreen from './home'

const RootStack = createNativeStackNavigator({
	screens: {
		Home: {
			screen: HomeScreen,
			options: { title: 'Bem vindo' },
		},
	},
})

const Navigation = createStaticNavigation(RootStack)

const Routes = () => {
	return (
		<PaperProvider>
			<Navigation />
		</PaperProvider>
	)
}

export default Routes
export { Routes }
