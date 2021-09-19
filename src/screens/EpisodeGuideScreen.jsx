import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import { colors, constants } from 'styles/styles.js';
import { BaseWrapper, BaseText } from 'components/layout/BaseComponents';

const EpisodeGuideScreen = ({ route }) => {
	const { data } = route.params;
	const [state, setState] = useState(data);

	return (
		<BaseWrapper>
			<TopContainer>
				<PosterImg source={state.posterURL ? { uri: state.posterURL } : require('images/no-img-found.png')} />
				<Info>
					<Title>{state.title}</Title>
				</Info>
			</TopContainer>
		</BaseWrapper>
	);
};

const TopContainer = styled.View`
	flex: 0.4;
	flex-direction: row;
	/* flex-wrap: wrap; */
`;

const PosterImg = styled.Image`
	height: 240px;
	width: 150px;
	border-radius: ${constants.borderRadiusLg};
	margin-right: 10px;
`;

const Info = styled.View`
	width: 100%;
`;

const Title = styled(BaseText)`
	font-size: 20px;
	flex-wrap: wrap;
`;

export default EpisodeGuideScreen;
