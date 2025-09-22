import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import produtos from '../data/produtos'

export default function App() {
	useEffect(() => {}, [])

	return (
		<View style={styles.container}>
			<Text>5 Produtos em destaque</Text>
			<ScrollView horizontal style={{ maxHeight: 160 }}>
				{produtos.slice(0, 10).map((produto, ix) => (
					<Text style={{ padding: 10 }} key={ix}>
						{produto.nome}
					</Text>
				))}
			</ScrollView>
			<Text>Todos os produtos</Text>
			<ScrollView>
				{produtos.map((produto, ix) => (
					<Text key={ix}>
						{produto.id} - {produto.nome} : R$ {produto.valor.toFixed(2)}
					</Text>
				))}
			</ScrollView>
			<StatusBar style='auto' />
		</View>
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
