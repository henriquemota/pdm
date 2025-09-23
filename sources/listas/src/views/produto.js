import { View, Text } from 'react-native'

const Produto = ({ route: { params } }) => {
	return (
		<View>
			<Text>{JSON.stringify(params)}</Text>
		</View>
	)
}

export default Produto
