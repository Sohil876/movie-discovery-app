import React, { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { fetchSimilar, fetchRecommended } from 'utils/helpers';
import { Overview } from 'screens/MediaDetailsScreen';
import MediaCard from './MediaCard';

export const Recommended = ({ data, navigation }) => {
	const [media, setMedia] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetchRecommended(data, data.type)
			.then(res => setMedia(res))
			.catch(() => setError(true));
	}, [data]);

	if (error || !media.length) return <Overview>No Recommendations found.</Overview>;

	return (
		<FlatList
			horizontal
			data={media}
			keyExtractor={item => item.id.toString()}
			renderItem={({ item }) => <MediaCard media={item} navigation={navigation} />}
		/>
	);
};

const Similar = ({ data, navigation }) => {
	const [media, setMedia] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetchSimilar(data, data.type)
			.then(res => setMedia(res))
			.catch(() => setError(true));
	}, [data]);

	if (error || !media.length) return <Text>No similar media found.</Text>;

	return (
		<FlatList
			horizontal
			data={media}
			keyExtractor={item => item.id.toString()}
			renderItem={({ item }) => <MediaCard media={item} navigation={navigation} />}
		/>
	);
};

export default Similar;
