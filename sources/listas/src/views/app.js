import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import produtos from '../data/produtos'

export default function App() {
	useEffect(() => {}, [])

	return (
		<View style={styles.container}>
			<Text>Produtos em destaque</Text>
			<ScrollView horizontal style={styles.scrollHorizontal}>
				{produtos.slice(0, 10).map((produto, ix) => (
					<TouchableOpacity key={ix} style={styles.button}>
						<Text style={{ padding: 10 }}>{produto.nome}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
			<Text>Todos os produtos Flatlist</Text>
			<FlatList data={produtos} renderItem={({ item }) => <Item produto={item} />} keyExtractor={(item) => item.id} />
			{/* 
			<Text>Todos os produtos ScrollView</Text>
			<ScrollView>
				{produtos.map((produto, ix) => (
					<Item key={produto.id} produto={produto} />
				))}
			</ScrollView> 
			*/}
			<StatusBar style='auto' />
		</View>
	)
}

const Item = ({ produto }) => {
	return (
		<Text>
			{produto.id} - {produto.nome} : R$ {produto.valor.toFixed(2)}
		</Text>
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
	scrollHorizontal: {
		padding: 8,
		height: 140,
	},
	button: {
		backgroundColor: '#DDD',
		margin: 4,
		borderRadius: 8,
		height: 80,
		width: 80,
		justifyContent: 'center',
	},
})
