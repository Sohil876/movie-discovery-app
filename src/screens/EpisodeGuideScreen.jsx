import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors, constants } from 'styles/styles.js';
import { BaseWrapper, BaseText } from 'components/layout/BaseComponents';
import { Title, Separator } from 'components/layout/Details';
import { formatDate } from 'utils/helpers';
import { activeBtnStyle, BtnItem, Divider } from './CastAndCrewScreen';
import { fetchTVSeasonDetails } from '../utils/helpers';
import EpisodeItem from '../components/layout/episode/EpisodeItem';

const EpisodeGuideScreen = ({ route }) => {
	const { data } = route.params;
	const [state, setState] = useState(data);
	const [currentSeason, setCurrentSeason] = useState(1);

	useEffect(() => {
		fetchTVSeasonDetails(data.id, currentSeason)
			.then(res => setState(prev => ({ ...prev, ...res })))
			.catch(er => console.error(er));
	}, [currentSeason]);

	// useEffect(() => {
	// 	console.log(state.episodes, 'STATE EPISODES');
	// }, [state]);

	return (
		<Wrapper>
			<TopContainer>
				<PosterImg
					source={
						state.posterURL ? { uri: state.posterURL } : require('images/no-img-found.png')
					}
				/>
				<Info>
					<Name numberOfLines={2}>{state.title}</Name>

					<Title>
						<Text style={styles.gray400}>No. of seasons:</Text> {state.number_of_seasons}
					</Title>

					<Separator />

					<Title>
						<Text style={styles.gray400}>No. of episodes: </Text>
						{state.number_of_episodes}
					</Title>

					<Separator />

					<Title>
						<Text style={styles.gray400}>Release Date:</Text>{' '}
						{formatDate(state.first_air_date)}
					</Title>

					<Separator />
				</Info>
			</TopContainer>

			<View>
				<FlatList
					style={{ paddingTop: 5, paddingBottom: 25 }}
					horizontal
					showsHorizontalScrollIndicator={false}
					data={state.seasons}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => setCurrentSeason(item.season_number)}>
							<BtnItem
								style={[
									styles.padRight,
									item.season_number == currentSeason
										? activeBtnStyle.activeBtn
										: null,
								]}
							>
								Season {item.season_number}
							</BtnItem>
						</TouchableOpacity>
					)}
				/>
			</View>

			<FlatList
				data={state.episodes}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => <EpisodeItem data={{ ...item, showID: data.id }} />}
			/>
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	gray400: {
		color: colors.coolGray400,
	},
	padRight: {
		marginRight: 15,
	},
});

const Wrapper = styled.View`
	flex: 1;
	padding: 80px ${constants.horizontalPadding} 0;
	background-color: ${colors.primaryBg};
`;

const TopContainer = styled.View`
	flex-direction: row;
`;

const SeasonHeader = styled.View`
	flex-direction: row;
	/* justify-content: center; */
`;

const CurrentSeason = styled(BaseText)`
	font-family: 'poppins-semiBold';
	font-size: 18px;
`;
const PosterImg = styled.Image`
	height: 220px;
	width: 140px;
	border-radius: ${constants.borderRadiusLg};
	margin-right: 15px;
`;

const Info = styled.View`
	width: 60%;
`;

const Name = styled(BaseText)`
	font-size: 23px;
	font-family: 'poppins-semiBold';
	line-height: 30px;
	margin-bottom: 15px;
`;

export default EpisodeGuideScreen;
