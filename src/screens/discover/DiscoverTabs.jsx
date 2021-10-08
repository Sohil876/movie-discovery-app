import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { API_KEY } from 'utils/requests';
import { fetchMediaData } from 'utils/helpers';
import { BaseText } from 'components/layout/BaseComponents';
import MediaCard from 'components/layout/MediaCard';

const config = {
	api_key: API_KEY,
	language: 'en-US',
	sort_by: null,
	// primary_release_year: '2021',
	// [primaryReleaseDateGreaterThan]: '',
};

export const MovieDiscoverTab = ({ filters }) => {
	const [state, setState] = useState();
	const [params, setParams] = useState(filters || config);

	useEffect(() => {
		fetchMediaData(`/discover/movie`, { params })
			.then(res => setState(res))
			.catch(er => console.error(er));
	}, [params]);

	if (!state) return null;

	return (
		<FlatList
			// onEndReached={() => setPage(prev => prev + 1)}
			// onEndReachedThreshold={0.3}
			// onRefresh={refreshData}
			// refreshing={isRefreshing}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ flexDirection: 'column', marginLeft: 30 }}
			numColumns={2}
			horizontal={false}
			data={state}
			keyExtractor={(item, index) => item.id.toString()}
			renderItem={({ item }) => <MediaCard media={item} />}
		/>
	);
};

export const TVDiscoverTab = () => {
	return (
		<View>
			<Text>Hello</Text>
		</View>
	);
};
