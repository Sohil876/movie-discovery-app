import { colors } from 'styles/styles.js';
import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const SearchBar = ({ setQuery }) => {
	return (
		<Wrapper>
			<FontAwesomeIcon style={styles.icon} icon="search" size={18} color={colors.primaryBg} />
			<StyledTextInput
				onEndEditing={text => setQuery(text)}
				placeholder="Movies, TV Shows or People"
				placeholderTextColor={colors.primaryBg}
				numberOfLines={1}
			/>
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	icon: {
		marginRight: 10,
	},
});

const Wrapper = styled.View`
	flex-direction: row;
	height: 50px;
	align-items: center;
	padding: 0px 15px;
	background-color: #fff;
	border-radius: 5px;
`;

const StyledTextInput = styled.TextInput`
	flex: 1;
	font-family: 'poppins-medium';
	height: 25px;
	color: ${colors.primaryBg};
	font-size: 15px;

	width: 100%;
	background-color: #fff;
	border-width: 0;
	border-color: #fff;
	border-radius: 5px;
`;

export default SearchBar;
