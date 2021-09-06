import React from 'react';
import { FlatList, View } from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import { fetchSimilar } from 'utils/helpers';
import MediaCard from './MediaCard';

const Similiar = ({ data, navigation }) => {
	const [media, setMedia] = useState(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetchSimilar(data, data.type)
			.then(res => setMedia(res))
			.catch(() => setError(true));
	}, []);

	if (error) return <Text>No similar media found.</Text>;

	return (
		<FlatList
			horizontal
			data={media}
			keyExtractor={item => item.id.toString()}
			renderItem={({ item }) => <MediaCard media={item} navigation={navigation} />}
		/>
	);
};

export default Similiar;
