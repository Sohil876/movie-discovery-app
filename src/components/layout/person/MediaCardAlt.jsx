import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { BASE_IMG_URL } from 'utils/requests';
import { CardBottom, CardImage, CardInfo, CardTitle, CardWrapper, CardYear } from '../MediaCard';
import { useNavigation } from '@react-navigation/native';

const MediaCardAlt = ({ data }) => {
	const navigation = useNavigation();

	return (
		<CardWrapper
			mt="0"
			style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
			onPress={() => navigation.push('MediaDetails', { media: data })}
		>
			<CardImage
				source={
					data.poster_path
						? { uri: `${BASE_IMG_URL}${data.poster_path}` }
						: require('images/no-img-found.png')
				}
				resizeMode="cover"
			/>

			<CardInfo>
				<CardTitle numberOfLines={1}>{data.title || data.name || 'N/A'}</CardTitle>
				<CardBottom>
					<CharacterName numberOfLines={1}>as {data.character || 'N/A'}</CharacterName>
				</CardBottom>
			</CardInfo>
		</CardWrapper>
	);
};

const CharacterName = styled(CardYear)`
	font-family: 'poppins-italic';
	font-size: 14px;
	width: 150px;
`;

export default MediaCardAlt;
