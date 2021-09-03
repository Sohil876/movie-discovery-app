import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { colors } from './../assets/styles/styles';

const MediaDetailsScreen = ({ route }) => {
	const { media } = route.params;
	const [state, setState] = useState(media);

	return (
		<DetailsWrapper>
			<PosterImg source={{ uri: state.posterURL }} />
			<PosterDetails>
				<Title>{state.title}</Title>
			</PosterDetails>
		</DetailsWrapper>
	);
};

const DetailsWrapper = styled.SafeAreaView`
	flex: 1;
	/* background-color: ${colors.primaryBg}; */
`;

const PosterDetails = styled.View`
	margin-top: 50px;
`;

const Title = styled.Text`
	align-self: center;
	font-family: 'poppins-semiBold';
	font-size: 22px;
	text-align: center;
	width: 70%;
	color: #fff;
`;

const PosterImg = styled.Image`
	flex: 1;
	height: 400px;
	width: 100%;
	position: absolute;
`;

export default MediaDetailsScreen;
