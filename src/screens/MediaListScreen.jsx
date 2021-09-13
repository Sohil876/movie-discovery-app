import BaseText from 'components/layout/BaseText';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'styles/styles.js';
import { fetchMediaData } from '../utils/helpers';
import MediaCard from './../components/layout/MediaCard';

const MediaListScreen = ({ route }) => {
	const { url, title } = route.params;
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [page, setPage] = useState(1);

	const fetchData = () => {
		fetchMediaData(`${url}&page=${page}`)
			.then(res => setData(prev => [...prev, ...res]))
			.catch(er => console.error(er))
			.finally(() => setIsLoading(false));
	};

	const refreshData = () => {
		setIsRefreshing(true);
		setPage(1);

		fetchMediaData(url)
			.then(res => setData(res))
			.catch(er => console.error(er))
			.finally(() => setIsRefreshing(false));
	};

	useEffect(() => {
		fetchData();
	}, [page]);

	if (isLoading)
		return (
			<LoadingWrapper>
				<Loading>Loading...</Loading>
			</LoadingWrapper>
		);

	if (!data.length) {
		return (
			<LoadingWrapper>
				<Loading>No media found.</Loading>
			</LoadingWrapper>
		);
	}

	return (
		<Wrapper>
			<ListTitle>{title}</ListTitle>

			<FlatList
				onEndReached={() => setPage(prev => prev + 1)}
				onEndReachedThreshold={0.3}
				onRefresh={refreshData}
				refreshing={isRefreshing}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexDirection: 'column', marginLeft: 30 }}
				numColumns={2}
				horizontal={false}
				data={data}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => <MediaCard media={item} />}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.View`
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

const ListTitle = styled(BaseText)`
	color: #fff;
	align-self: center;
	font-size: 18px;
	text-align: center;
	margin-bottom: 10px;
`;
export default MediaListScreen;
