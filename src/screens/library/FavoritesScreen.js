import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ToastAndroid } from 'react-native';
import styled from 'styled-components/native';
import { BaseText, BaseWrapper } from '../../components/layout/BaseComponents';
import Loader from '../../components/layout/Loader';
import MediaCard from '../../components/layout/MediaCard';
import MediaRow, { RowTitle, TitleWrapper } from '../../components/layout/MediaRow';
import SeeMoreBtn from '../../components/layout/SeeMoreBtn';
import { MediaWrapper } from '../HomeScreen';
import { Overview } from '../MediaDetailsScreen';
import { FAVORITE_MOVIES_KEY } from './../../asyncStorage/asyncStorage';

const TV = 'TV_SHOWS';
const MOVIES = 'MOVIES';

const FavoritesScreen = () => {
	const [favoriteMovies, setFavoriteMovies] = useState([]);
	const [favoriteTVShows, setFavoriteTVShows] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		AsyncStorage.getItem(FAVORITE_MOVIES_KEY)
			.then(res => {
				const response = JSON.parse(res);

				if (!response.length) return;

				response.forEach(item => {
					setFavoriteMovies(prev => [...prev, JSON.parse(item)]);
				});
			})
			.catch(er => {
				console.log(er);
				// ToastAndroid.show(er.message, ToastAndroid.SHORT);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const renderMedia = mediaType => {
		if (mediaType === MOVIES) {
			return favoriteMovies.length > 0 ? (
				<FlatList
					showsHorizontalScrollIndicator={false}
					horizontal
					data={favoriteMovies}
					keyExtractor={item => item.id.toString()}
					renderItem={({ item }) => {
						return <MediaCard media={item} />;
					}}
				/>
			) : (
				<Overview style={styles.marginTop}>No Movies found.</Overview>
			);
		}

		return favoriteTVShows.length > 0 ? (
			<FlatList
				showsHorizontalScrollIndicator={false}
				horizontal
				data={favoriteTVShows}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item }) => {
					return <MediaCard media={item} />;
				}}
			/>
		) : (
			<Overview style={styles.marginTop}>No TV Shows found.</Overview>
		);
	};

	if (isLoading) return <Loader />;

	return (
		<BaseWrapper>
			<Title>Favorites</Title>

			<TitleWrapper style={styles.marginTop}>
				<RowTitle>Favorite Movies</RowTitle>

				{/* <SeeMoreBtn handlePress={() => {}} /> */}
			</TitleWrapper>

			{renderMedia(MOVIES)}

			<TitleWrapper style={styles.marginTop}>
				<RowTitle>Favorite TV Shows</RowTitle>

				{/* <SeeMoreBtn handlePress={() => {}} /> */}
			</TitleWrapper>

			{renderMedia(TV)}
		</BaseWrapper>
	);
};

const styles = StyleSheet.create({
	marginTop: {
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
