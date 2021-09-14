import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'styles/styles.js';
import SearchBar from 'components/layout/search/SearchBar';
import { RowTitle } from './../components/layout/MediaRow';
import { fetchSearchResults } from 'utils/helpers';
import SearchResultItem from 'components/layout/search/SearchResultItem';

const SearchScreen = () => {
	const [searchQuery, setSearchQuery] = useState();
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);

	const updateQuery = query => {
		setSearchQuery(query);
	};

	const fetchResults = () => {
		if (!searchQuery) return;

		fetchSearchResults(searchQuery)
			.then(res => setResults(res))
			.catch(er => console.error(er));
	};

	const renderResults = () => {
		if (!searchQuery) {
			return <View style={{ flex: 1, backgroundColor: `${colors.primaryBg}` }} />;
		}

		return (
			<FlatList
				showsVerticalScrollIndicator={false}
				data={results}
				keyExtractor={(item, index) => item.id.toString()}
				renderItem={({ item }) => <SearchResultItem data={item} />}
			/>
		);
	};

	useEffect(() => fetchResults(), [searchQuery]);

	return (
		<Wrapper>
			<View>
				<Title>Search</Title>
				<SearchBar setQuery={updateQuery} />
			</View>
			{renderResults()}
		</Wrapper>
	);
};

const Wrapper = styled.View`
	flex: 1;
	background-color: ${colors.primaryBg};
	padding: 50px 20px;
`;

const Title = styled(RowTitle)`
	font-size: 25px;
	margin-bottom: 8px;
`;

export default SearchScreen;
