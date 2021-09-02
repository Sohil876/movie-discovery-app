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

	const renderMediaRow = () => {
		if (!mediaData) {
			return <Loading>Loading...</Loading>;
		} else {
			return (
				<FlatList
					horizontal
					data={mediaData}
					keyExtractor={item => toString(item.id)}
					renderItem={({ item }) => {
						return <MediaCard media={item} />;
					}}
				></FlatList>
			);
		}
	};

	useEffect(() => {
		fetchMediaData();
	}, []);

	useEffect(() => {
		console.log(mediaData);
	}, [mediaData]);

	return (
		<View>
			<TitleWrapper>
				<RowTitle>{title}</RowTitle>
				<ViewBtn onPress={() => alert('test')}>
					<BtnText>View All</BtnText>
				</ViewBtn>
			</TitleWrapper>
			{renderMediaRow()}
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
