import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'styles/styles.js';
import { fetchMediaData } from 'utils/helpers';
import BaseText from './BaseText';
import MediaCard from './MediaCard';

const MediaRow = ({ title, url }) => {
	const [mediaData, setMediaData] = useState();

	const renderMediaRow = () => {
		if (!mediaData) {
			return <Loading>Loading...</Loading>;
		} else {
			return (
				<FlatList
					horizontal
					data={mediaData}
					keyExtractor={item => item.id.toString()}
					renderItem={({ item }) => {
						return <MediaCard media={item} />;
					}}
				/>
			);
		}
	};

	useEffect(() => {
		fetchMediaData(url).then(res => setMediaData(res));
	}, []);

	return (
		<View>
			<TitleWrapper>
				<RowTitle>{title}</RowTitle>
				<SeeMoreBtn onPress={() => alert('test')}>
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

const SeeMoreBtn = styled.TouchableOpacity`
	border-radius: 100px;
	padding: 10px 20px;
`;

const BtnText = styled(BaseText)`
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
