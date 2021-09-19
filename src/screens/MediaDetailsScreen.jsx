import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import Cast from 'components/layout/Cast';
import { BtnText, SeeMoreBtn } from 'components/layout/MediaRow';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, StyleSheet, Text, View, Pressable } from 'react-native';
import styled from 'styled-components/native';
import Details, { TVDetails } from '../components/layout/Details';
import Photos from '../components/layout/Photos';
import Similar, { Recommended } from '../components/layout/Similar';
import { colors, constants } from 'styles/styles.js';
import { fetchMediaDetails, calcMediaRuntime, fetchCredits, formatDate } from 'utils/helpers';
import { API_KEY, BASE_IMG_URL } from 'utils/requests';

const MediaDetailsScreen = ({ route }) => {
	const { media } = route.params;
	const [state, setState] = useState({
		...media,

		title: media.title || media.name || media.original_title || media.original_name,

		rating: Number(media.vote_average).toFixed(1) || 'NR',

		posterURL: `${media.poster_path ? `${BASE_IMG_URL}${media.poster_path}` : null}`,

		year: `${new Date(media.release_date || media.first_air_date).getFullYear() || 'N/A'}`,

		type: `${media.title || media.original_title ? 'movie' : 'tv'}`,
	});

	const [isRefreshing, setIsRefreshing] = useState(false);
	const navigation = useNavigation();

	const init = () => {
		// fetch details
		fetchMediaDetails(state.type, state)
			.then(res => {
				setState(prev => ({
					...res,
					...prev,
					runtime: res.runtime ?? res.episode_run_time[0],
					episodeTimes: res.episode_run_time, // array
					genres: res.genres,
					releaseDate: res.release_date || res.first_air_date,
				}));
			})
			.catch(er => console.error(er))
			.finally(() => setIsRefreshing(false));

		// fetch cast
		fetchCredits(state.type, state)
			.then(res => setState(prev => ({ ...prev, credits: res })))
			.finally(() => setIsRefreshing(false));
	};

	const refreshData = () => {
		setIsRefreshing(true);
		init();
	};

	useEffect(() => {
		init();
	}, []);

	// useEffect(() => console.log(state, 'STATE OBJ'), [state]);

	const goToVideos = () => {
		navigation.navigate('WatchVideos', { data: state.videos });
	};

	const renderGenres = () => {
		return state.genres?.length > 0
			? state.genres?.map((genre, i) => {
					if (i !== state.genres.length - 1) return genre.name + ', ';
					else return genre.name;
			  })
			: 'N/A';
	};

	const renderTitle = () => {
		if (state.images?.logos.length > 0) {
			if (state.images.logos[0].file_path.toString().includes('.svg')) {
				return <Title>{state.title}</Title>;
			}

			return (
				<Image
					resizeMode="contain"
					style={styles.logo}
					source={{ uri: `${BASE_IMG_URL}${state.images.logos[0].file_path}` }}
				/>
			);
		}

		return <Title>{state.title}</Title>;
	};

	return (
		<DetailsWrapper refreshControl={<RefreshControl onRefresh={refreshData} refreshing={isRefreshing} />}>
			<PosterDetails>
				{renderTitle()}
				<PosterInfo>
					<Text style={styles.posterInfo}>{formatDate(state.releaseDate)} • </Text>
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
					<TitleWrapper style={{ marginBottom: 10 }}>
						<SectionTitle>Cast</SectionTitle>

						{state.credits?.cast.length > 0 && (
							<SeeMoreBtn
								onPress={() => {
									navigation.push('CastAndCrew', { data: state });
								}}
							>
								<BtnText>all cast &amp; crew</BtnText>
							</SeeMoreBtn>
						)}
					</TitleWrapper>

					<Cast data={state.credits?.cast} />
				</SectionWrapper>

				<SectionWrapper>
					<SectionTitle>
						Videos <Text style={styles.amount}>{state.videos && `(${state.videos.results.length})`}</Text>
					</SectionTitle>

					{state.videos?.results.length > 0 ? (
						<Pressable onPress={goToVideos}>
							<VideoImage
								imageStyle={{ borderRadius: 10 }}
								resizeMode="cover"
								source={
									state.images?.backdrops.length > 0
										? { uri: `${BASE_IMG_URL}${state.images?.backdrops[0]?.file_path}` }
										: { uri: state.posterURL }
								}
							>
								<VideoIcon icon="play-circle" size={40} />
							</VideoImage>
							<Overlay />
						</Pressable>
					) : (
						<Overview>-</Overview>
					)}
				</SectionWrapper>

				<SectionWrapper>
					<SectionTitle>
						Photos
						<Text style={styles.amount}>
							{state.images && ` (${state.images.posters.length + state.images.backdrops.length})`}
						</Text>
					</SectionTitle>

					{state.images?.posters && <Photos data={state.images.posters} />}

					<View style={{ marginTop: 10 }}>
						{state.images?.backdrops && <Photos data={state.images.backdrops} />}
					</View>
				</SectionWrapper>

				{state.type === 'tv' && (
					<SectionWrapper>
						<TitleWrapper>
							<SectionTitle>TV Show Details</SectionTitle>

							<SeeMoreBtn
								onPress={() => {
									navigation.push('MediaList', {});
								}}
							>
								<BtnText>episodes &amp; seasons</BtnText>
							</SeeMoreBtn>
						</TitleWrapper>
						<TVDetails data={state} />
					</SectionWrapper>
				)}

				<SectionWrapper>
					<SectionTitle>Details</SectionTitle>
					<Details data={state} />
				</SectionWrapper>

				<SectionWrapper>
					<TitleWrapper>
						<SectionTitle mb="0">More Like This</SectionTitle>
						<SeeMoreBtn
							onPress={() => {
								navigation.push('MediaList', {
									url: `/${state.type}/${state.id}/similar?api_key=${API_KEY}&language=en-US`,
									title: `More like ${state.title}`,
								});
							}}
						>
							<BtnText>view all</BtnText>
						</SeeMoreBtn>
					</TitleWrapper>
					<Similar data={state} />
				</SectionWrapper>

				<SectionWrapper>
					<TitleWrapper>
						<SectionTitle mb="0">Recommended</SectionTitle>
						<SeeMoreBtn
							onPress={() => {
								navigation.push('MediaList', {
									url: `/${state.type}/${state.id}/recommendations?api_key=${API_KEY}&language=en-US`,
									title: `Because you like ${state.title}`,
								});
							}}
						>
							<BtnText>view all</BtnText>
						</SeeMoreBtn>
					</TitleWrapper>
					<Recommended data={state} />
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
		fontSize: 12,
		color: `${colors.offWhite}`,
		fontFamily: 'poppins-regular',
	},
	logo: {
		width: '90%',
		height: 100,
		alignSelf: 'center',
		marginBottom: 10,
	},
});

const DetailsWrapper = styled.ScrollView`
	flex: 1;
	background-color: ${colors.primaryBg};
`;

const DetailsBottom = styled.View`
	padding: 0 30px;
	margin-bottom: 20px;
`;

const Overlay = styled.View`
	flex: 1;
	height: 100%;

	z-index: 999;
	background-color: #00000063;
`;

const VideoIcon = styled(FontAwesomeIcon)`
	color: #fff;
	z-index: 1;
`;

const VideoImage = styled.ImageBackground`
	flex: 1;
	height: 200px;
	width: 100%;
	justify-content: center;
	align-items: center;
`;

const PosterDetails = styled.View`
	margin-top: 68%;
`;

const TitleWrapper = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
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
	font-size: 26px;
	text-align: center;
	width: 75%;
	color: #fff;
`;

const PosterImg = styled.Image`
	height: 400;
	width: 100%;
	position: absolute;
	z-index: -1;
`;

export const SectionWrapper = styled.View`
	flex: 1;
	margin-top: 30px;
`;

export const Overview = styled.Text`
	color: ${colors.offWhite};
	line-height: 23px;
	font-family: 'poppins-regular';
	font-size: 15px;
`;

export const SectionTitle = styled.Text`
	color: #fff;
	margin-bottom: ${({ mb }) => (mb ? mb : '8px')};
	font-size: 16px;
	font-family: 'poppins-semiBold';
`;

const Tagline = styled.Text`
	color: ${colors.primaryClr};
	font-size: 13px;
	margin-top: 10px;
	font-family: 'poppins-regular';

	align-self: center;
	text-align: center;
	font-style: italic;
	width: 80%;
`;

export default MediaDetailsScreen;
