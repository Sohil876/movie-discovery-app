import styled from 'styled-components/native';
import React, { useEffect } from 'react';
import { Text, StyleSheet, ToastAndroid, TouchableOpacity, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	addToFavorites,
	FAVORITE_MOVIES_KEY,
	FAVORITE_TV_SHOWS_KEY,
} from './../../asyncStorage/asyncStorage';
import { colors } from '../../assets/styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from 'expo-linking';
import { useState } from 'react';
import { Overview } from 'screens/MediaDetailsScreen';
import Loader from './Loader';

const ICON_SIZE = 25;

const AddToLibrary = ({ media }) => {
	const [state, setState] = useState({ inFavorites: false, inWatchlist: false, inReminders: false });
	const [isLoading, setIsLoading] = useState(true);

	const isInLibrary = async media => {
		try {
			const type = media.type === 'movie' ? FAVORITE_MOVIES_KEY : FAVORITE_TV_SHOWS_KEY;

			const favoritesArr = await AsyncStorage.getItem(type);

			if (!favoritesArr || !favoritesArr.length) {
				return false;
			}

			const parsedArr = JSON.parse(favoritesArr);
			const parsedArrOfMedia = parsedArr.map(item => JSON.parse(item));

			for (let i = 0; i < parsedArrOfMedia.length; i++) {
				if (parsedArrOfMedia[i].id === media.id) {
					console.log('movie in in favs');
					return true;
				}
			}
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		let mounted = true;

		isInLibrary(media).then(res => {
			setState(prev => ({ ...prev, inFavorites: res }));
		});

		return () => (mounted = false);
	}, []);

	if (isLoading) {
		return <Loader size={20} />;
	}

	return (
		<Wrapper>
			<Pressable onPress={() => addToFavorites(media, media.type)} style={styles.onTop}>
				<Icon
					/**prettier-ignore */
					icon={'heart'}
					color={state.inFavorites ? colors.primaryClr : '#fff'}
					size={ICON_SIZE}
					style={styles.margin}
				/>
			</Pressable>
			<Pressable style={styles.onTop}>
				<Icon
					/**prettier-ignore */
					icon={'tv'}
					color={'#fff'}
					size={ICON_SIZE}
					style={styles.margin}
				/>
			</Pressable>
			<Pressable style={styles.onTop}>
				<Icon
					/**prettier-ignore */
					icon={'clock'}
					color={'#fff'}
					size={ICON_SIZE}
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
