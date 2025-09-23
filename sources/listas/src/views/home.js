import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// importando os dados
import produtos from '../data/produtos'

export default function Home() {
	const { navigate } = useNavigation()

	return (
		<View style={styles.container}>
			<ScrollView horizontal style={{ height: 80, marginTop: 16 }}>
				{produtos.slice(0, 10).map((e, i) => (
					<TouchableOpacity
						key={i}
						style={{ marginRight: 16, alignItems: 'center' }}
						onPress={() => navigate('Produto', { ...e })}
					>
						<Text>{e.nome}</Text>
						<Text>{e.valor.toFixed(2)}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
			<FlatList
				data={produtos}
				renderItem={({ item }) => <Item produto={item} />}
				keyExtractor={(item, i) => i.toString()}
			/>
			{/* 			
			<ScrollView>
				{produtos.map((e, i) => (
					<Item produto={e} key={i.toString()} />
				))}
			</ScrollView> 
			*/}

			<StatusBar style='auto' />
		</View>
	)
}

const Item = ({ produto }) => {
	const { navigate } = useNavigation()

	return (
		<TouchableOpacity style={{ marginBottom: 8 }} onPress={() => navigate('Produto', { ...produto })}>
			<Text>
				{produto.nome} - {produto.valor.toFixed(2)}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		padding: 16,
		gap: 16,
	},
})
