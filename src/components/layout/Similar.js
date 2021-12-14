import React, { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { fetchSimilar, fetchRecommended } from 'utils/helpers';
import { Overview } from 'screens/MediaDetailsScreen';
import MediaCard from './MediaCard';

export const Recommended = ({ data }) => {
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
			keyExtractor={(_, index) => index.toString()}
			renderItem={({ item }) => <MediaCard media={item} />}
		/>
	);
};

const Similar = ({ data }) => {
	const [media, setMedia] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetchSimilar(data, data.type)
			.then(res => setMedia(res))
			.catch(() => setError(true));
	}, [data]);

	if (error || !media.length) return <Overview>No similar media found.</Overview>;

	return (
		<FlatList
			horizontal
			data={media}
			keyExtractor={(_, index) => index.toString()}
			renderItem={({ item }) => <MediaCard media={item} />}
		/>
	);
};

export default Similar;
