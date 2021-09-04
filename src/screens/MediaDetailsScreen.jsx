import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import styled from 'styled-components/native';
import { calcMediaRuntime, fetchCredits, fetchGenres, fetchMediaImages, formatDate } from '../utils/helpers';
import { colors } from './../assets/styles/styles';
import { fetchMediaDetails } from './../utils/helpers';
import BaseText from './../components/layout/BaseText';
import { BASE_IMG_URL } from 'utils/requests';

const MediaDetailsScreen = ({ route }) => {
	const { media } = route.params;
	const [state, setState] = useState(media);

	useEffect(() => {
		// fetch details
		fetchMediaDetails(state.type, state).then(res => {
			setState(prev => ({
				...res,
				...prev,
				runtime: res.runtime || res.episode_run_time[0],
				genres: res.genres,
			}));
		});

		// fetch images
		fetchMediaImages(state.type, state).then(res => setState(prev => ({ ...prev, images: res })));

		// fetch cast
		fetchCredits(state.type, state).then(res => setState(prev => ({ ...prev, credits: res })));
	}, []);

	const renderGenres = () => {
		return (
			state.genres?.map((genre, i) => {
				if (i !== state.genres.length - 1) return genre.name + ', ';
				else return genre.name;
			}) || 'N/A'
		);
	};

	return (
		<DetailsWrapper>
			<PosterDetails>
				<Title>{state.title}</Title>
				<PosterInfo>
					<Text style={styles.posterInfo}>{formatDate(state.release_date || state.first_air_date)} • </Text>
					<Text style={styles.posterInfo}>{renderGenres()} • </Text>
					<Text style={styles.posterInfo}>{calcMediaRuntime(state.runtime)}</Text>
				</PosterInfo>
				{state.tagline && <Tagline>{state.tagline}</Tagline>}
			</PosterDetails>
			<LinearGradient colors={['transparent', `${colors.primaryBg}`]} style={styles.gradient} />
			<PosterImg source={state.posterURL ? { uri: state.posterURL } : null} style={styles.posterImg} />

			<DetailsBottom>
				<SectionWrapper>
					<SectionTitle>Description</SectionTitle>
					<Overview>{state.overview || 'No summary available.'}</Overview>
				</SectionWrapper>

				<SectionWrapper>
					<SectionTitle>Cast</SectionTitle>
					<FlatList
						horizontal
						data={state.credits?.cast}
						renderItem={({ item }) => (
							<View style={{ marginRight: 20, alignItems: 'center' }}>
								<Image
									source={{ uri: `${BASE_IMG_URL}${item.profile_path}` }}
									style={{ height: 70, width: 70, borderRadius: 100, marginBottom: 10 }}
								/>
								<CastName>{item.name || 'Unknown'}</CastName>
							</View>
						)}
						keyExtractor={item => item.id.toString()}
					/>
				</SectionWrapper>

				<SectionWrapper>
					<SectionTitle>Description</SectionTitle>
					<Overview>{state.overview || 'No summary available.'}</Overview>
				</SectionWrapper>
			</DetailsBottom>
		</DetailsWrapper>
	);
};

const styles = StyleSheet.create({
	gradient: {
		position: 'absolute',
		flex: 1,
		height: 400,
		width: '100%',
		elevation: -1,
	},
	posterImg: {
		elevation: -1,
	},
	posterInfo: {
		color: `${colors.offWhite}`,
		fontSize: 13,
		fontFamily: 'poppins-medium',
	},
});

const DetailsWrapper = styled.ScrollView`
	flex: 1;
	background-color: ${colors.primaryBg};
`;

const DetailsBottom = styled.View`
	padding: 0 30px;
`;

const PosterDetails = styled.View`
	margin-top: 68%;
`;

const PosterInfo = styled.View`
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	align-self: center;
	width: 85%;
`;

const Title = styled.Text`
	align-self: center;
	font-family: 'poppins-semiBold';
	font-size: 25px;
	text-align: center;
	width: 75%;
	color: #fff;
	z-index: 1222;
`;

const CastName = styled.Text`
	color: #fff;
`;

const PosterImg = styled.Image`
	height: 400;
	width: 100%;
	position: absolute;
	z-index: -1;
`;

const SectionWrapper = styled.View`
	flex: 1;
	margin-top: 30px;
`;

const Overview = styled.Text`
	color: ${colors.offWhite};
	line-height: 22px;
	font-family: 'poppins-regular';
	font-size: 13px;
`;

const SectionTitle = styled.Text`
	color: #fff;
	margin-bottom: 10px;
	font-size: 15px;
	font-family: 'poppins-semiBold';
`;

const Tagline = styled.Text`
	color: ${colors.primaryClr};
	font-size: 12px;
	margin-top: 10px;
	font-family: 'poppins-regular';
	align-self: center;
	font-style: italic;
`;

export default MediaDetailsScreen;
