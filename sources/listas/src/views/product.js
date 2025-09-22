import { View, Text } from 'react-native'

const Product = ({ route }) => {
	const { params } = route
	return (
		<View>
			<Text>Product Screen</Text>
			<Text>{JSON.stringify(params)}</Text>
		</View>
	)
}

export default Product
