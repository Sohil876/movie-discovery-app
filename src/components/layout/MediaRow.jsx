import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import tmdb from 'utils/baseURL';
import MediaCard from './MediaCard';
import { colors } from 'styles/styles.js';

const MediaRow = ({ title, url }) => {
	const [mediaData, setMediaData] = useState();

	const fetchMediaData = async () => {
		try {
			const { data, status } = await tmdb.get(url);
			if (status !== 200) throw Error(`Error fetching ${title} movie data`);

			setMediaData(data.results);
		} catch (er) {
			console.log(er);
		}
	};

	useEffect(() => {
		fetchMediaData();
	}, []);

	useEffect(() => {
		console.log(mediaData);
	}, [mediaData]);

	if (!mediaData) return <Loading>Loading...</Loading>;

	return (
		<View>
			<TitleWrapper>
				<RowTitle>{title}</RowTitle>
				<ViewBtn onPress={() => alert('test')}>
					<BtnText>View All</BtnText>
				</ViewBtn>
			</TitleWrapper>
			<FlatList
				horizontal
				data={mediaData}
				renderItem={({ item }) => {
					return <MediaCard media={item} />;
				}}
				keyExtractor={item => toString(item.id)}
			></FlatList>
		</View>
	);
};

const RowTitle = styled.Text`
	color: #fff;
	font-size: 20px;
	font-family: 'poppins-medium';
`;

const ViewBtn = styled.TouchableOpacity`
	border-radius: 100px;
	/* border: 1px solid ${colors.primaryClr}; */
	padding: 10px 20px;
`;

const BtnText = styled.Text`
	color: ${colors.primaryClr};
`;

const TitleWrapper = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const Loading = styled.Text`
	color: #fff;
	align-items: center;
	justify-content: center;
`;

export default MediaRow;
