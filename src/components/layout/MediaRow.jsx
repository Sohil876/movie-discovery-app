import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'styles/styles.js';
import { fetchMediaData } from 'utils/helpers';
import BaseText from './BaseText';
import MediaCard from './MediaCard';

const MediaRow = ({ title, url }) => {
	const navigation = useNavigation();
	const [mediaData, setMediaData] = useState();

	const renderMediaRow = () => {
		if (!mediaData) {
			return <Loading>Loading...</Loading>;
		} else {
			return (
				<FlatList
					showsHorizontalScrollIndicator={false}
					horizontal
					data={mediaData}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => {
						return <MediaCard media={item} />;
					}}
				/>
			);
		}
	};

	useEffect(() => {
		let mounted = true;
		fetchMediaData(url).then(res => setMediaData(res));

		return () => (mounted = false);
	}, []);

	return (
		<View>
			<TitleWrapper>
				<RowTitle>{title}</RowTitle>
				<SeeMoreBtn
					onPress={() => {
						navigation.push('MediaList', { url, title });
					}}
				>
					<BtnText>View All</BtnText>
				</SeeMoreBtn>
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

export const SeeMoreBtn = styled.TouchableOpacity`
	border-radius: 100px;
	padding: 10px 20px;
`;

export const BtnText = styled(BaseText)`
	color: ${colors.primaryClr};
	text-transform: capitalize;
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
