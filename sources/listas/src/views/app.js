import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// importa as visoes
import HomeScreen from './home'
import ProductScreen from './product'

const RootStack = createNativeStackNavigator({
	screens: {
		Home: {
			screen: HomeScreen,
			options: { title: 'Tela inicial' },
		},
		Product: {
			screen: ProductScreen,
			options: { title: 'Tela do Produto' },
		},
	},
})

const Navigation = createStaticNavigation(RootStack)

export default function App() {
	return <Navigation />
}
