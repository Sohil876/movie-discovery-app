import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BaseWrapper } from 'components/layout/BaseComponents';
import Card from './Card';
import { useNavigation } from '@react-navigation/native';

const UserLibraryScreen = () => {
	const navigation = useNavigation();

	return (
		<BaseWrapper>
			<View style={styles.container}>
				<Card text="Favorites" icon="heart" onPress={() => navigation.navigate('Favorites')} />
				<Card text="Watch List" icon="tv" />
				<Card text="Reminders" icon="clock" />
			</View>
		</BaseWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default UserLibraryScreen;
