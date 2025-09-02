import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function App() {
	return (
		<View style={styles.container}>
			<View style={[styles.quadrado, { backgroundColor: 'blue' }]}></View>
			<View style={[styles.quadrado, { backgroundColor: 'green' }]}></View>
			<TouchableOpacity style={[styles.quadrado, { backgroundColor: 'green' }]}></TouchableOpacity>
			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	quadrado: {
		height: 100,
		width: 100,
		borderRadius: 50,
	},
	container: {
		flex: 1,
		backgroundColor: '#ff0000',
	},
})
