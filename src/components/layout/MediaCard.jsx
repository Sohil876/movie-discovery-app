/**
 * FontAwesome Icons
 * https://github.com/FortAwesome/react-native-fontawesome
 */
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { colors } from 'styles/styles.js';
import { BASE_IMG_URL } from 'utils/requests';

const MediaCard = ({ media }) => {
	const navigation = useNavigation();
	const [state, setState] = useState({
		...media,

		title: media.title || media.name || media.original_title || media.original_name,

		rating: Number(media.vote_average).toFixed(1),

		posterURL: `${media.poster_path ? `${BASE_IMG_URL}${media.poster_path}` : null}`,

		year: `${new Date(media.release_date || media.first_air_date).getFullYear() || 'N/A'}`,

		type: `${media.title || media.original_title ? 'movie' : 'tv'}`,
	});

	return (
		<CardWrapper
			onPress={() => {
				navigation.push('MediaDetails', { media: state });
			}}
			style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})}
		>
			<CardImage
				// defaultSource={require('../../assets/images/no-img-found.png')}
				source={state.posterURL ? { uri: state.posterURL } : require('../../assets/images/no-img-found.png')}
				resizeMode="cover"
			/>

			<CardInfo>
				<CardTitle numberOfLines={1}>{state.title}</CardTitle>
				<CardBottom>
					<CardYear>{state.year}</CardYear>
					<RatingWrapper>
						<CardIcon icon="star" color={colors.yellow} size={13} />
						<CardRating>{state.rating <= 0 ? 'NR' : state.rating}</CardRating>
					</RatingWrapper>
				</CardBottom>
			</CardInfo>
		</CardWrapper>
	);
};

export const CardIcon = styled(FontAwesomeIcon)`
	margin-right: 5px;
	margin-top: 3px;
`;

export const CardInfo = styled.View`
	margin-top: 15px;
`;

export const CardTitle = styled.Text`
	color: #fff;
	width: 145px;
	font-family: 'poppins-medium';
	font-size: 15px;
`;

export const RatingWrapper = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding-right: 5px;
`;

export const CardBottom = styled.View`
	justify-content: space-between;
	align-items: center;
	margin-top: 2px;
	flex-direction: row;
`;

export const CardYear = styled.Text`
	color: ${colors.offWhite};
	font-family: 'poppins-regular';
`;

export const CardRating = styled.Text`
	color: ${colors.yellow};
	font-family: 'poppins-regular';
`;

export const CardImage = styled.Image`
	height: 240px;
	width: 150px;
	border-radius: 10px;
`;

export const CardWrapper = styled.Pressable`
	margin: 20px 15px 0 0;
`;

// export const MemoizedMediaCard =
export default React.memo(MediaCard);
