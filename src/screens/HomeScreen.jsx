import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MediaRow from 'layoutcomp/MediaRow';
import React from 'react';
import styled from 'styled-components/native';
import { colors, constants } from 'styles/styles.js';
import { movieRequests, tvRequests } from '../utils/requests';
import { View } from 'react-native';

const HomeScreen = () => {
	const bottomNavBarHeight = useBottomTabBarHeight();

	return (
		<HomeWrapper>
			<MediaWrapper>
				<MediaRow title="In Cinemas Now" url={movieRequests.fetchNowPlaying} />
			</MediaWrapper>

			<MediaWrapper>
				<MediaRow title="Upcoming Movies" url={movieRequests.fetchUpcoming} />
			</MediaWrapper>

			<MediaWrapper>
				<MediaRow title="Trending Movies" url={movieRequests.fetchTrendingMovies} />
			</MediaWrapper>

			<MediaWrapper>
				<MediaRow title="Trending on TV" url={tvRequests.fetchTrendingTVShows} />
			</MediaWrapper>

			<MediaWrapper marginBottom={bottomNavBarHeight}>
				<MediaRow title="Popular on TV" url={tvRequests.fetchPopularTVShows} />
			</MediaWrapper>
		</HomeWrapper>
	);
};

export const HomeWrapper = styled.ScrollView`
	flex: 1;
	background-color: ${colors.primaryBg};
	padding: 25px ${constants.horizontalPadding};
`;

const MediaWrapper = styled.View`
	flex: 1;
	margin-top: 40px;
	margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : '0px')};
`;

export default HomeScreen;
