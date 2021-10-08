import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import MediaCard from 'components/layout/MediaCard';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { colors, constants } from 'styles/styles.js';
import { fetchMediaData } from 'utils/helpers';
import { API_KEY } from 'utils/requests';
import { activeBtnStyle, BtnItem, Divider } from '../CastAndCrewScreen';
import { Title } from '../SearchScreen';

const config = {
	api_key: API_KEY,
	language: 'en-US',
	sort_by: null,
	// primary_release_year: '2021',
	// [primaryReleaseDateGreaterThan]: '',
};

const DiscoverScreen = () => {
	const navigation = useNavigation();
	const [active, setActive] = useState({ movies: true, tv: false });
	const [state, setState] = useState(null);
	const [params, setParams] = useState(config);

	const init = () => {
		if (active.movies) {
			// fetch discover movies data
			fetchMediaData(`/discover/movie`, { params })
				.then(res => setState(res))
				.catch(er => console.error(er));
		} else {
			// fetch tv shows discover data
			fetchMediaData(`/discover/tv`, { params })
				.then(res => setState(res))
				.catch(er => console.error(er));
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

	const handleSwitch = () => {
		// ....
	};

	useEffect(() => {
		init();
		// console.log(params);
	}, []);

	return (
		<Wrapper>
			<View style={styles.flex}>
				<Title>Discover</Title>
				<TouchableOpacity
					onPress={() => navigation.navigate('FilterScreen')}
					hitSlop={styles.hitSlop}
				>
					<FilterIcon icon="filter" color="#fff" size={20} />
				</TouchableOpacity>
			</View>

			{/* <DiscoverTabNavigation /> */}

			<View style={styles.row}>
				<TouchableOpacity>
					<BtnItem style={active.movies && activeBtnStyle.activeBtn}>Movies</BtnItem>
				</TouchableOpacity>

				<Divider />

				<TouchableOpacity>
					<BtnItem style={active.tv && activeBtnStyle.activeBtn}>TV Shows</BtnItem>
				</TouchableOpacity>
			</View>

			{active.movies && renderMedia('movies')}
		</Wrapper>
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
