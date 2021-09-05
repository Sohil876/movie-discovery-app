import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import styled from 'styled-components/native';
import { calcMediaRuntime, fetchCredits, fetchMediaImages, formatDate } from '../utils/helpers';
import { colors } from './../assets/styles/styles';
import Cast from './../components/layout/Cast';
import { fetchMediaDetails } from './../utils/helpers';
import { BANNER_IMG_URL, BASE_IMG_URL } from './../utils/requests';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const MediaDetailsScreen = ({ route, navigation }) => {
	const { media } = route.params;
	const [state, setState] = useState(media);

	useEffect(() => {
		// fetch details
		fetchMediaDetails(state.type, state).then(res => {
			setState(prev => ({
				...res,
				...prev,
				runtime: res.runtime || res.episode_run_time[0],
				episode_times: res.episode_run_time || null,
				genres: res.genres,
			}));
		});

		// fetch cast
		fetchCredits(state.type, state).then(res => setState(prev => ({ ...prev, credits: res })));
	}, []);

	useEffect(() => console.log(state, 'STATE OBJ'), [state]);

	const goToVideos = () => {
		navigation.navigate('Videos', { data: state.videos });
	};

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
				<Tagline>{state.tagline || null}</Tagline>
			</PosterDetails>
			<LinearGradient colors={['transparent', `${colors.primaryBg}`]} style={styles.gradient} />
			<PosterImg
				source={state.posterURL ? { uri: state.posterURL } : require('../assets/images/no-img-found.png')}
				style={styles.posterImg}
			/>

			<DetailsBottom>
				<SectionWrapper>
					<SectionTitle>Description</SectionTitle>
					<Overview>{state.overview || 'No summary available.'}</Overview>
				</SectionWrapper>
				<SectionWrapper>
					<SectionTitle>Cast</SectionTitle>
					<Cast data={state.credits?.cast} />
				</SectionWrapper>
				<SectionWrapper>
					<SectionTitle>
						Videos <Text style={styles.amount}>{state.videos && `(${state.videos.results.length})`}</Text>
					</SectionTitle>
					<VideoImage
						style={styles.shadow}
						resizeMode="cover"
						source={
							state.images?.backdrops[0]
								? { uri: `${BASE_IMG_URL}${state.images.backdrops[0].file_path}` }
								: null
						}
					>
						<VideoIcon icon="play" size={30} />
					</VideoImage>
				</SectionWrapper>
				<SectionWrapper>
					<SectionTitle>
						Videos <Text style={styles.amount}>{state.videos && `(${state.videos.results.length})`}</Text>
					</SectionTitle>
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
		textAlign: 'center',
	},
	amount: {
		fontSize: 11,
		color: `${colors.offWhite}`,
	},
});

const DetailsWrapper = styled.ScrollView`
	flex: 1;
	background-color: ${colors.primaryBg};
`;

const VideoIcon = styled(FontAwesomeIcon)`
	top: 50%;
	left: 50%;
	color: #fff;
`;

const DetailsBottom = styled.View`
	padding: 0 30px;
`;

const VideoImage = styled.ImageBackground`
	flex: 1;
	height: 200px;
	width: 100%;
	border-radius: 10px;
`;

const PosterDetails = styled.View`
	margin-top: 68%;
`;

const PosterInfo = styled.View`
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	align-self: center;
	width: 90%;
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

export const Overview = styled.Text`
	color: ${colors.offWhite};
	line-height: 22px;
	font-family: 'poppins-regular';
	font-size: 13px;
`;

const SectionTitle = styled.Text`
	color: #fff;
	margin-bottom: 8px;
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
