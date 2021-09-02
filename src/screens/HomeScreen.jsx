import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MediaRow from 'layoutcomp/MediaRow';
import React from 'react';
import styled from 'styled-components/native';
import { colors } from 'styles/styles.js';
import { movieRequests } from 'utils/requests';

const HomeScreen = () => {
	const bottomNavBarHeight = useBottomTabBarHeight();

	return (
		<HomeWrapper>
			<MediaWrapper>
				<MediaRow title="In Cinemas Now" url={movieRequests.fetchNowPlaying} />
			</MediaWrapper>
			<MediaWrapper marginBottom={bottomNavBarHeight}>
				<MediaRow title="Trending Movies" url={movieRequests.fetchTrendingMovies} />
			</MediaWrapper>
		</HomeWrapper>
	);
};

const HomeWrapper = styled.ScrollView`
	flex: 1;
	background-color: ${colors.primaryBg};
	padding: 50px 20px;
`;

const MediaWrapper = styled.View`
	flex: 1;
	margin-top: 40px;
	margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : 0)};
`;

export default HomeScreen;
