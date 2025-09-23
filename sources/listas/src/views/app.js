import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//importar as interfaces
import HomeScreen from './home'
import ProdutoScreen from './produto'

const RootStack = createNativeStackNavigator({
	screens: {
		Home: {
			screen: HomeScreen,
			options: { title: 'Home alterando o titulo' },
		},
		Produto: {
			screen: ProdutoScreen,
			options: { title: 'Produto' },
		},
	},
})

const Navigation = createStaticNavigation(RootStack)

export default function App() {
	return <Navigation />
}
