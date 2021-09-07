import React, { useState, useEffect } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'styles/styles.js';
import { fetchMediaData } from '../utils/helpers';
import MediaCard from './../components/layout/MediaCard';
import BaseText from 'components/layout/BaseText';

const MediaListScreen = ({ route }) => {
	const { url, title } = route.params;
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetchMediaData(url)
			.then(res => setData(res))
			.catch(er => console.error(er))
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading)
		return (
			<LoadingWrapper>
				<Loading>Loading...</Loading>
			</LoadingWrapper>
		);

	return (
		<Wrapper>
			<ListTitle>{title}</ListTitle>
			<ItemWrapper>
				{data.map(item => (
					<MediaCard media={item} key={item.id.toString()} />
				))}
			</ItemWrapper>
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	containerStyle: { justifyContent: 'center', alignItems: 'center', marginRight: 0 },
});

const Wrapper = styled.ScrollView`
	flex: 1;
	background-color: ${colors.primaryBg};
	padding: 80px 20px 0;
`;

const Loading = styled(BaseText)`
	color: #fff;
	font-size: 18px;
`;

const LoadingWrapper = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${colors.primaryBg};
`;

const ItemWrapper = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	margin-right: -20px;
`;

const ListTitle = styled(BaseText)`
	color: #fff;
	align-self: center;
	font-size: 18px;
	text-align: center;
	margin-bottom: 10px;
`;
export default MediaListScreen;
