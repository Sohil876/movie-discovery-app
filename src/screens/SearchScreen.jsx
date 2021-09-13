import React, { useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'styles/styles.js';
import SearchBar from 'components/layout/search/SearchBar';
import { RowTitle } from './../components/layout/MediaRow';

const SearchScreen = () => {
	const [searchQuery, setSearchQuery] = useState();

	const updateQuery = query => {
		setSearchQuery(query);
	};

	return (
		<Wrapper>
			<Title>Search</Title>
			<SearchBar setQuery={updateQuery} />
			<Text style={{ color: '#fff', fontSize: 30 }}>{searchQuery}</Text>
		</Wrapper>
	);
};

const Wrapper = styled.ScrollView`
	flex: 1;
	background-color: ${colors.primaryBg};
	padding: 50px 20px;
`;

const Title = styled(RowTitle)`
	font-size: 25px;
	margin-bottom: 8px;
`;

export default SearchScreen;
