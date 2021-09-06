import React from 'react';
import { View, Text } from 'react-native';
import { Overview } from '../../screens/MediaDetailsScreen';
import styled from 'styled-components/native';
import { formatDate } from 'utils/helpers';
import { colors } from 'styles/styles.js';

const Details = ({ data }) => {
	return (
		<View>
			<Title>Release Date</Title>
			<Overview>{formatDate(data.releaseDate)}</Overview>
			<Separator />

			<Title>Languages Spoken</Title>
			<Overview>
				{data.spoken_languages?.map((item, i, arr) => {
					if (i === arr.length - 1) {
						return <Text>{item.english_name}</Text>;
					} else {
						return <Text>{item.english_name}, </Text>;
					}
				}) || '-'}
			</Overview>
			<Separator />

			<Title>Status</Title>
			<Overview>{data.status || '-'}</Overview>
			<Separator />

			<Title>Rating</Title>
			<Overview>{data.rating || '-'}</Overview>
			<Separator />

			<Title>Filmed In</Title>
			<Overview>
				{data.production_countries?.map((item, i, arr) => {
					if (i === arr.length - 1) {
						return <Text>{item.name}</Text>;
					} else {
						return <Text>{item.name}, </Text>;
					}
				}) || '-'}
			</Overview>
			<Separator />
		</View>
	);
};

const Title = styled.Text`
	font-family: 'poppins-regular';
	color: #fff;
`;

const Separator = styled.View`
	width: 100%;
	border-bottom-width: 0.5px;
	border-bottom-color: ${colors.gray700};
	margin: 15px 0;
`;

export default Details;
