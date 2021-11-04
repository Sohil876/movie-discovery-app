import styled from 'styled-components/native';
import React, { useEffect } from 'react';
import { Text, StyleSheet, ToastAndroid, TouchableOpacity, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { addToFavorites } from './../../asyncStorage/asyncStorage';

const AddToLibrary = ({ media }) => {
	return (
		<Wrapper>
			<Pressable
				onPress={() => addToFavorites(media, media.type)}
				style={styles.onTop}
			>
				<Icon
					/**prettier-ignore */
					icon={'heart'}
					color={'#fff'}
					size={20}
					style={styles.margin}
				/>
			</Pressable>
			<Pressable style={styles.onTop}>
				<Icon
					/**prettier-ignore */
					icon={'tv'}
					color={'#fff'}
					size={20}
					style={styles.margin}
				/>
			</Pressable>
			<Pressable style={styles.onTop}>
				<Icon
					/**prettier-ignore */
					icon={'clock'}
					color={'#fff'}
					size={20}
				/>
			</Pressable>
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	margin: {
		marginRight: 30,
	},
	onTop: {
		zIndex: 999,
	},
});

const Wrapper = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-bottom: 20px;
`;

const Icon = styled(FontAwesomeIcon)`
	/* margin-right: 20px; */
`;

export default AddToLibrary;
