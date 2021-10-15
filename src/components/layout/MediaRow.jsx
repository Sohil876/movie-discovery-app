import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'styles/styles.js';
import { fetchMediaData } from 'utils/helpers';
import { BaseText } from './BaseComponents';
import Loader from './Loader';
import MediaCard from './MediaCard';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import SeeMoreBtn from './SeeMoreBtn';

const MediaRow = ({ title, url }) => {
	const navigation = useNavigation();
	const [mediaData, setMediaData] = useState();

	const renderMediaRow = () => {
		if (!mediaData) {
			return <Loader size="large" style={{ marginTop: 40 }} />;
		} else {
			return (
				<FlatList
					showsHorizontalScrollIndicator={false}
					horizontal
					data={mediaData}
					keyExtractor={(item, index) => item.id.toString()}
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
			<TitleWrapper style={styles.margin}>
				<RowTitle>{title}</RowTitle>

				<SeeMoreBtn handlePress={() => navigation.push('MediaList', { url, title })} />
			</TitleWrapper>
			{renderMediaRow()}
		</View>
	);
};

const styles = StyleSheet.create({
	margin: {
		// marginBottom: -20,
	},
});

export const RowTitle = styled.Text`
	color: #fff;
	font-size: 20px;
	font-family: 'poppins-medium';
`;

export const TitleWrapper = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: -20px;
`;

const Loading = styled.Text`
	color: #fff;
	align-items: center;
	justify-content: center;
`;

export default MediaRow;
