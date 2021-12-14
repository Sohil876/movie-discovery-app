import { BaseText } from 'components/layout/BaseComponents';
import Loader from 'components/layout/Loader';
import NoResult from 'components/layout/NoResult';
import PersonItem from 'components/layout/person/PersonItem';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { colors, constants } from 'styles/styles.js';
import { fetchMovieCredits, fetchTVCredits } from 'utils/helpers';
import { ListTitle, MediaListWrapper } from './MediaListScreen';

const CastAndCrewScreen = ({ route }) => {
	const { data } = route.params;
	const [state, setState] = useState(data);
	const [active, setActive] = useState({
		cast: true,
		crew: false,
	});

	const init = () => {
		if (state.type === 'movie') {
			fetchMovieCredits(state.id)
				.then(res => setState(prev => ({ ...prev, cast: res.cast, crew: res.crew })))
				.catch(er => console.error(er));
		} else {
			fetchTVCredits(state.id)
				.then(res => setState(prev => ({ ...prev, cast: res.cast, crew: res.crew })))
				.catch(er => console.error(er));
		}
	};

	const handlePress = val => {
		if (val == 'cast') {
			setActive({ cast: true, crew: false });
		} else {
			setActive({ crew: true, cast: false });
		}
	};

	const renderCast = val => {
		if (val === 'cast') {
			if (state.cast.length > 0) {
				return (
					<FlatList
						showsVerticalScrollIndicator={false}
						style={styles.list}
						data={state.cast}
						keyExtractor={(_, index) => index.toString()}
						renderItem={({ item }) => <PersonItem data={item} />}
					/>
				);
			}

			return <NoResult message={'No cast found.'} />;
		}

		if (val === 'crew') {
			if (state.crew.length > 0) {
				return (
					<FlatList
						showsVerticalScrollIndicator={false}
						style={styles.list}
						data={state.crew}
						keyExtractor={(_, index) => index.toString()}
						renderItem={({ item }) => <PersonItem data={item} />}
					/>
				);
			}

			return <NoResult message={'No crew found.'} />;
		}
	};

	useEffect(() => {
		init();
	}, []);

	if (!state.hasOwnProperty('cast')) return <Loader />;

	return (
		<Wrapper>
			<ListTitle>
				Full cast and crew for {state.title} ({state.year})
			</ListTitle>

			<View style={styles.row}>
				<TouchableOpacity onPress={() => handlePress('cast')}>
					<BtnItem style={active.cast && activeBtnStyle.activeBtn}>Cast</BtnItem>
				</TouchableOpacity>

				<Divider />

				<TouchableOpacity onPress={() => handlePress('crew')}>
					<BtnItem style={active.crew && activeBtnStyle.activeBtn}>Crew</BtnItem>
				</TouchableOpacity>
			</View>

			{active.cast && renderCast('cast')}
			{active.crew && renderCast('crew')}
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	list: {
		marginTop: 30,
	},
});

export const activeBtnStyle = StyleSheet.create({
	activeBtn: {
		backgroundColor: `${colors.primaryClr}`,
	},
});

const Wrapper = styled(MediaListWrapper)`
	padding: 80px ${constants.horizontalPadding} 0;
`;

export const Divider = styled.View`
	height: 20px;
	width: 1px;
	background-color: ${colors.coolGray600};
	margin-top: 15px;
`;

export const BtnItem = styled(BaseText)`
	font-family: 'poppins-medium';
	font-size: 14px;
	padding: 5px 40px 3px;
	margin-top: 15px;
	border: 0.5px solid ${colors.coolGray600};
	border-radius: 100px;
	text-align: center;
`;

export default CastAndCrewScreen;
