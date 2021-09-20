import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors, constants } from 'styles/styles.js';
import { BaseWrapper, BaseText } from 'components/layout/BaseComponents';
import { Title, Separator } from 'components/layout/Details';
import { formatDate } from 'utils/helpers';
import { activeBtnStyle, BtnItem, Divider } from './CastAndCrewScreen';

const EpisodeGuideScreen = ({ route }) => {
	const { data } = route.params;
	const [state, setState] = useState(data);
	const [currentSeason, setCurrentSeason] = useState(1);

	return (
		<BaseWrapper>
			<TopContainer>
				<PosterImg source={state.posterURL ? { uri: state.posterURL } : require('images/no-img-found.png')} />
				<Info>
					<Name numberOfLines={2}>{state.title}</Name>

					<Title>No. of seasons: {state.number_of_seasons}</Title>

					<Separator />

					<Title>No. of episodes: {state.number_of_episodes}</Title>

					<Separator />

					<Title>Release Date: {formatDate(state.first_air_date)}</Title>

					<Separator />
				</Info>
			</TopContainer>

			<View>
				<FlatList
					style={{ paddingVertical: 15 }}
					horizontal
					showsHorizontalScrollIndicator={false}
					data={state.seasons}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => setCurrentSeason(item.season_number)}>
							<BtnItem
								style={[
									styles.padRight,
									item.season_number == currentSeason ? activeBtnStyle.activeBtn : null,
								]}
							>
								Season {item.season_number}
							</BtnItem>
						</TouchableOpacity>
					)}
				/>
			</View>

			{/* <SeasonHeader>
				<CurrentSeason>Season {currentSeason} •</CurrentSeason>
				<Text>{state.seasons[0].name}</Text>
			</SeasonHeader> */}
		</BaseWrapper>
	);
};

const styles = StyleSheet.create({
	padRight: {
		marginRight: 15,
	},
});

const TopContainer = styled.View`
	flex: 0.4;
	flex-direction: row;
	margin-bottom: 70px;
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
