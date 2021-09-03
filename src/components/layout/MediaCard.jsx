/**
 * FontAwesome Icons
 * https://github.com/FortAwesome/react-native-fontawesome
 */
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { colors } from 'styles/styles.js';
import { BASE_IMG_URL } from 'utils/requests';
import { TouchableOpacity } from 'react-native';

const MediaCard = ({ media, navigation }) => {
	const [state, setState] = useState({
		title: media.title || media.name || media.original_title || media.original_name,
		rating: Number(media.vote_average).toFixed(1),
		posterURL: `${media.poster_path ? `${BASE_IMG_URL}${media.poster_path}` : null}`,
		year: `${new Date(media.release_date).getFullYear() || 'N/A'}`,
	});

	return (
		<CardWrapper
			onPress={() => {
				navigation.push('MediaDetails');
				// alert('success');
				console.log(state.title);
			}}
			style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})}
		>
			<CardImage source={{ uri: state.posterURL }} resizeMode="cover" />
			<CardInfo>
				<CardTitle numberOfLines={1}>{state.title}</CardTitle>
				<CardBottom>
					<CardYear>{state.year}</CardYear>
					<RatingWrapper>
						<Icon icon="star" color={colors.yellow} size={13} />
						<CardRating>{state.rating <= 0 ? 'NR' : state.rating}</CardRating>
					</RatingWrapper>
				</CardBottom>
			</CardInfo>
		</CardWrapper>
	);
};

const Icon = styled(FontAwesomeIcon)`
	margin-right: 5px;
	margin-top: 3px;
`;

const CardInfo = styled.View`
	margin-top: 15px;
`;

const CardTitle = styled.Text`
	color: #fff;
	width: 145px;
	font-family: 'poppins-medium';
	font-size: 15px;
`;

const RatingWrapper = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding-right: 5px;
`;

const CardBottom = styled.View`
	justify-content: space-between;
	align-items: center;
	margin-top: 2px;
	flex-direction: row;
`;

const CardYear = styled.Text`
	color: ${colors.offWhite};
	font-family: 'poppins-regular';
`;

const CardRating = styled.Text`
	color: ${colors.yellow};
	font-family: 'poppins-regular';
`;

const CardImage = styled.Image`
	height: 240px;
	width: 150px;
	border-radius: 10px;
`;

const CardWrapper = styled.Pressable`
	margin: 20px 15px 0 0;
	/* box-shadow: '0px 3px 12px -6px #000000'; */
`;

export default MediaCard;
