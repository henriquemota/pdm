import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 32,
		backgroundColor: '#ccc',
		justifyContent: 'center',
	},
	imageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 16,
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	subtitle: {
		fontSize: 24,
		fontWeight: 'semibold',
		alignSelf: 'center',
	},
	result: {
		borderWidth: 1,
		borderColor: '#000',
		textAlign: 'center',
		padding: 8,
		marginHorizontal: 16,
		fontSize: 20,
		fontWeight: 'bold',
		borderRadius: 8,
		backgroundColor: '#fff',
	},
	image: {
		height: 120,
		width: 120,
		borderRadius: 60,
	},
	button: {
		height: 120,
		width: 120,
		borderRadius: 60,
		borderWidth: 1,
		borderColor: '#000',
		backgroundColor: '#rgba(255, 255, 255, 0.3)',
	},
})

export default styles
