import { colors } from 'styles/styles.js';
import React, { useState } from 'react';
import { Text, Image, View } from 'react-native';
import styled from 'styled-components/native';
import { BaseText } from '../BaseComponents';
import { formatDate, getFullYear } from 'utils/helpers';
import { BASE_IMG_URL } from 'utils/requests';
import { constants } from 'styles/styles.js';
import { useNavigation } from '@react-navigation/native';
import { Separator } from 'components/layout/Details';

const SearchResultItem = ({ data }) => {
	const navigation = useNavigation();
	const [state, setState] = useState({
		...data,
		title: data.title || data.name || data.original_title || data.original_name,
		date: data.release_date || data.first_air_date,
		type: data.media_type,
		isMedia: data.media_type !== 'person' ? true : false,
		posterURL: `${BASE_IMG_URL}${data.poster_path || data.backdrop_path}`,
	});

	const toUpperCase = str => {
		return str[0].toUpperCase() + str.slice(1);
	};

	const renderBottom = () => {
		return state.isMedia ? (
			<SubTitle>{formatDate(state.date)}</SubTitle>
		) : (
			<View>
				<SubTitle>{toUpperCase(state.type)}</SubTitle>
				<SubTitle>
					{state.known_for[0]?.original_title || ''}{' '}
					{state.known_for[0]?.release_date ? `(${getFullYear(state.known_for[0]?.release_date)})` : null}
				</SubTitle>
			</View>
		);
	};

	const goToDetails = () => {
		if (state.type === 'person') {
			navigation.navigate('PersonDetails', { data: state });
		} else {
			navigation.navigate('MediaDetails', { media: state });
		}
	};

	const renderImage = () => {
		if (state.poster_path) {
			return { uri: state.posterURL };
		}

		if (state.profile_path) {
			return { uri: `${BASE_IMG_URL}${state.profile_path}` };
		}

		return require('../../../assets/images/no-img-found.png');
	};

	return (
		<>
			<Wrapper onPress={goToDetails} style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})} hitSlop={50}>
				<Poster source={renderImage()} resizeMode="cover" />
				<View>
					<Title>{state.title}</Title>
					{renderBottom()}
				</View>
			</Wrapper>
			<StyledSeparator />
		</>
	);
};

const Wrapper = styled.Pressable`
	width: 80%;
	padding: 10px 20px;
	flex-direction: row;
	align-items: center;
`;

const Title = styled(BaseText)`
	font-size: 15px;
	line-height: 23px;
	font-family: 'poppins-medium';
`;

const Poster = styled.Image`
	height: 100px;
	width: 70px;
	border-radius: 3px;
	margin-right: 12px;
	margin-left: -18px;
`;

const SubTitle = styled(BaseText)`
	font-size: 14px;
	color: ${colors.offWhite};
	margin-top: 2px;
`;

const StyledSeparator = styled(Separator)`
	margin: 2px 0;
`;

export default SearchResultItem;
