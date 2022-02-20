import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import MediaCard from 'components/layout/MediaCard';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { colors, constants } from 'styles/styles.js';
import { fetchMediaData } from 'utils/helpers';
import { API_KEY } from 'utils/requests';
import { activeBtnStyle, BtnItem, Divider } from '../CastAndCrewScreen';
import { Title } from '../SearchScreen';
import Loader from 'components/layout/Loader';
import { useFocusEffect } from '@react-navigation/native';
import FilterScreen from './FilterScreen';

const config = {
	api_key: API_KEY,
	language: 'en-US',
	sort_by: null,
};

const DiscoverScreen = ({ route }) => {
	const navigation = useNavigation();

	const [active, setActive] = useState({ movies: true, tv: false });
	const [state, setState] = useState(null);
	const [filters, setFilters] = useState(config); // initialParams
	const [isLoading, setIsLoading] = useState(true);

	const init = () => {
		setIsLoading(true);
		setState(null);

		if (active.movies) {
			// fetch discover movies data
			fetchMediaData(`/discover/movie`, { params: filters })
				.then(res => setState(res))
				.catch(er => console.error(er))
				.finally(() => setIsLoading(false));
		} else {
			// fetch tv shows discover data
			fetchMediaData(`/discover/tv`, {
				params: {
					...filters,
					'first_air_date.gte': filters['release_date.gte'],
					'first_air_date.lte': filters['release_date.lte'],
				},
			})
				.then(res => setState(res))
				.catch(er => console.error(er))
				.finally(() => setIsLoading(false));
		}
	};

	const renderMedia = val => {
		if (val == 'movies') {
			return (
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.contentContainerStyle}
					numColumns={2}
					horizontal={false}
					data={state}
					keyExtractor={(item, index) => item.id.toString()}
					renderItem={({ item }) => <MediaCard media={item} />}
				/>
			);
		}

		if (val == 'tv') {
			return (
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.contentContainerStyle}
					numColumns={2}
					horizontal={false}
					data={state}
					keyExtractor={(item, index) => item.id.toString()}
					renderItem={({ item }) => <MediaCard media={item} />}
				/>
			);
		}
	};

	useEffect(() => {
		init();
	}, [active, filters]);

	// Do something when the screen is focused
	useFocusEffect(() => {
		if (route.params.filters) setFilters(route.params.filters);
	});

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Wrapper>
				<View style={styles.flex}>
					<Title>Discover</Title>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('FilterScreen', { filters: filters });
							// setShowFilters(prev => !prev);
						}}
						hitSlop={styles.hitSlop}
					>
						<FilterIcon icon="filter" color="#fff" size={20} />
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity onPress={() => setActive({ movies: true, tv: false })}>
						<BtnItem style={active.movies && activeBtnStyle.activeBtn}>Movies</BtnItem>
					</TouchableOpacity>

					<Divider />

					<TouchableOpacity onPress={() => setActive({ tv: true, movies: false })}>
						<BtnItem style={active.tv && activeBtnStyle.activeBtn}>TV Shows</BtnItem>
					</TouchableOpacity>
				</View>

				{active.movies && renderMedia('movies')}
				{active.tv && renderMedia('tv')}
			</Wrapper>
		</>
	);
};

const styles = StyleSheet.create({
	flex: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		paddingBottom: 20,
		marginTop: -15,
	},
	hitSlop: {
		top: 5,
		left: 5,
		bottom: 5,
		right: 5,
	},
	contentContainerStyle: {
		flexDirection: 'column',
		marginLeft: 30,
		marginTop: -20,
	},
});

const Wrapper = styled.View`
	flex: 1;
	padding: 50px ${constants.horizontalPadding} 10px;
	background-color: ${colors.primaryBg};
`;

const FilterIcon = styled(FontAwesomeIcon)`
	margin-bottom: 13px;
	margin-right: 10px;
`;

export default DiscoverScreen;
