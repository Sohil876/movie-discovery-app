import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ToastAndroid } from 'react-native';
import styled from 'styled-components/native';
import { BaseWrapper } from '../../components/layout/BaseComponents';
import MediaCard from '../../components/layout/MediaCard';
import MediaRow, { RowTitle, TitleWrapper } from '../../components/layout/MediaRow';
import SeeMoreBtn from '../../components/layout/SeeMoreBtn';
import { MediaWrapper } from '../HomeScreen';
import { FAVORITE_MOVIES_KEY } from './../../asyncStorage/asyncStorage';

const FavoritesScreen = () => {
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	useEffect(() => {
		AsyncStorage.getItem(FAVORITE_MOVIES_KEY)
			.then(res => {
				const response = JSON.parse(res);
				if (response.length) {
					response.forEach(item => {
						setFavoriteMovies(prev => [...prev, JSON.parse(item)]);
						// console.log(response, 'RES');
					});
				}
			})
			.catch(er => {
				console.log(er);
				ToastAndroid.show(er.message, ToastAndroid.SHORT);
			});
	}, []);

	if (!favoriteMovies.length) return <Text>No movies added.</Text>;

	return (
		<BaseWrapper>
			<Title>Favorites</Title>

			<TitleWrapper style={styles.margin}>
				<RowTitle>Favorite Movies</RowTitle>

				<SeeMoreBtn handlePress={() => {}} />
			</TitleWrapper>

			<FlatList
				showsHorizontalScrollIndicator={false}
				horizontal
				data={favoriteMovies}
				keyExtractor={(item, index) => item.id.toString()}
				renderItem={({ item }) => {
					return <MediaCard media={item} />;
				}}
			/>
		</BaseWrapper>
	);
};

const styles = StyleSheet.create({
	margin: {
		marginTop: 20,
	},
});

const Title = styled.Text`
	color: #fff;
	font-family: 'poppins-semiBold';
	font-size: 27px;
	/* margin-left: 45px; */
	text-align: center;
`;

export default FavoritesScreen;
