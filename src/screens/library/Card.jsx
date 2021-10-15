import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors, constants } from './../../assets/styles/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Card = ({ text, icon, onPress }) => {
	return (
		<TouchableOpacity style={styles.card} onPress={onPress}>
			<FontAwesomeIcon icon={icon} size={26} color="#fff" style={styles.icon} />
			<Text style={styles.title}>{text}</Text>

			{/* <ImageBackground /> */}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		width: '100%',
		paddingVertical: 55,
		backgroundColor: colors.gray800,
		borderRadius: 10,
		marginTop: 18,
	},
	icon: {
		textAlign: 'center',
		left: '46%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		color: '#fff',
		fontFamily: 'poppins-semiBold',
		fontSize: 24,
		alignItems: 'center',
		textAlign: 'center',
		justifyContent: 'center',
		marginTop: 10,
	},
});

export default Card;
