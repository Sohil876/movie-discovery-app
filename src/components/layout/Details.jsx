import * as Linking from 'expo-linking';
import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'styles/styles.js';
import { formatAsCurrency, formatDate } from 'utils/helpers';
import { Overview } from 'screens/MediaDetailsScreen';

const renderList = data => {
	return data.map((item, i, arr) => {
		if (i === arr.length - 1) {
			return item.name;
		} else {
			return item.name + ', ';
		}
	});
};

export const TVDetails = ({ data }) => {
	return (
		<View>
			<Title>Created by</Title>
			<Overview>{data.created_by?.length > 0 ? renderList(data.created_by) : '-'}</Overview>
			<Separator />

			<Title>Original Name</Title>
			<Overview>{data.original_name || '-'}</Overview>
			<Separator />

			<Title>Last Episode Aired On</Title>
			<Overview>{formatDate(data.last_air_date) || '-'}</Overview>
			<Separator />

			<Title>Next Episode Will Air On</Title>
			<Overview>{formatDate(data.next_episode_to_air?.air_date) || '-'}</Overview>
			<Separator />

			<Title>In Production</Title>
			<Overview>{data.in_production ? 'Yes' : 'No' || '-'}</Overview>
			<Separator />

			<Title>Number of Seasons</Title>
			<Overview>{data.number_of_seasons || '-'}</Overview>
			<Separator />

			<Title>Number of Episodes</Title>
			<Overview>{data.number_of_episodes || '-'}</Overview>
			<Separator />

			<Title>Episode Runtimes (mins)</Title>
			<Overview>
				{data.episodeTimes?.map((item, i, arr) => {
					if (i === arr.length - 1) {
						return item;
					} else {
						return item + ', ';
					}
				})}
			</Overview>
			<Separator />

			<Title>Available On</Title>
			<Overview>{data.networks?.length > 0 ? renderList(data.networks) : '-'}</Overview>
			<Separator />
		</View>
	);
};

const Details = ({ data }) => {
	const openWebsite = url => {
		if (!url) return;

		Linking.openURL(url);
	};

	return (
		<View>
			<Title>Release Date</Title>
			<Overview>{formatDate(data.releaseDate)}</Overview>
			<Separator />

			<Title>Languages Spoken</Title>
			<Overview>
				{data.spoken_languages?.length > 0
					? data.spoken_languages.map((item, i, arr) => {
							if (i === arr.length - 1) {
								return <Text>{item.english_name}</Text>;
							} else {
								return <Text>{item.english_name}, </Text>;
							}
					  })
					: '-'}
			</Overview>
			<Separator />

			<Title>Status</Title>
			<Overview>{data.status || '-'}</Overview>
			<Separator />

			<Title>TMDb Rating</Title>
			<Overview>{data.rating || '-'}</Overview>
			<Separator />

			<Title>Filmed In</Title>
			<Overview>{data.production_countries?.length > 0 ? renderList(data.production_countries) : '-'}</Overview>
			<Separator />

			<Title>Produced By</Title>
			<Overview>{data.production_companies?.length > 0 ? renderList(data.production_companies) : '-'}</Overview>
			<Separator />

			<Title>Homepage</Title>
			<Overview onPress={() => openWebsite(data.homepage)}>{data.homepage || '-'}</Overview>
			<Separator />

			<Title>Budget</Title>
			<Overview>{formatAsCurrency(data.budget) || '-'}</Overview>
			<Separator />

			<Title>Revenue</Title>
			<Overview>{formatAsCurrency(data.revenue) || '-'}</Overview>
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
	margin: 12px 0;
`;

export default Details;
