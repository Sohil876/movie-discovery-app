import ExpandableText from 'components/layout/ExpandableText';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from 'styles/styles.js';
import { formatDate, fetchTVEpisodeDetails } from 'utils/helpers';
import { BASE_IMG_URL } from 'utils/requests';
import Cast from 'components/layout/Cast';
import VideoThumbnail from 'components/layout/VideoThumbnail';
import Photos from 'components/layout/Photos';
import {
	DetailsBottom,
	DetailsWrapper,
	PosterDetails,
	PosterImg,
	PosterInfo,
	SectionTitle,
	SectionWrapper,
	styles,
	Title,
} from './MediaDetailsScreen';

const EpisodeDetailsScreen = ({ route }) => {
	const { data } = route.params;

	const [state, setState] = useState({
		...data,
		posterURL: data.still_path ? `${BASE_IMG_URL}${data.still_path}` : null,
	});

	// useEffect(() => console.log('STATE', state), [state]);
	useEffect(() => {
		fetchTVEpisodeDetails(state.showID, state.season_number, state.episode_number)
			.then(res => setState(prev => ({ ...prev, ...res })))
			.catch(er => console.error(er));
	}, []);

	return (
		<DetailsWrapper>
			<PosterDetails>
				<Title>{state.name || 'N/A'}</Title>

				<PosterInfo>
					<Text style={styles.posterInfo}>
						S{state.season_number} E{state.episode_number} • {formatDate(state.air_date)}
					</Text>
				</PosterInfo>
			</PosterDetails>

			<LinearGradient colors={['transparent', `${colors.primaryBg}`]} style={styles.gradient} />

			<PosterImg
				source={state.posterURL ? { uri: state.posterURL } : require('images/no-img-found.png')}
				style={styles.posterImg}
			/>

			<DetailsBottom>
				<SectionWrapper>
					<SectionTitle>Description</SectionTitle>
					<ExpandableText>{state.overview || 'No summary available.'}</ExpandableText>
				</SectionWrapper>

				<SectionWrapper>
					<SectionTitle style={{ marginBottom: 10 }}>Guest Stars</SectionTitle>
					<Cast data={state.guest_stars} />
				</SectionWrapper>

				<SectionWrapper>
					<SectionTitle>
						Videos <Text style={styles.amount}>({state.videos?.results.length})</Text>
					</SectionTitle>
					{state.videos?.results && <VideoThumbnail data={state} />}
				</SectionWrapper>

				<SectionWrapper>
					<SectionTitle>
						Photos <Text style={styles.amount}>({state.images?.stills.length})</Text>
					</SectionTitle>

					{state.images?.stills && <Photos data={state.images.stills} />}
				</SectionWrapper>
			</DetailsBottom>
		</DetailsWrapper>
	);
};

export default EpisodeDetailsScreen;
