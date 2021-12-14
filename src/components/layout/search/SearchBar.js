import { colors } from 'styles/styles.js';
import React, { useRef, useState } from 'react';
import { TextInput, View, StyleSheet, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const SearchBar = ({ setQuery }) => {
	const textInput = useRef();
	const [clearBtn, setClearBtn] = useState(false);

	return (
		<Wrapper onPress={() => textInput.current.focus()}>
			<FontAwesomeIcon style={styles.icon} icon="search" size={18} color={colors.primaryBg} />
			<StyledTextInput
				ref={textInput}
				onChangeText={text => {
					setQuery(text);
					text ? setClearBtn(true) : setClearBtn(false);
				}}
				placeholder="Movies, TV Shows or People"
				placeholderTextColor={colors.primaryBg}
				numberOfLines={1}
			/>
			{clearBtn && (
				<Pressable
					onPress={() => {
						textInput.current.clear();
						setQuery(''); // clear text input
						setClearBtn(false);
						textInput.current.focus();
					}}
					hitSlop={10}
				>
					<FontAwesomeIcon icon={'times-circle'} size={20} color={colors.primaryBg} />
				</Pressable>
			)}
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	icon: {
		marginRight: 10,
	},
});

const Wrapper = styled.Pressable`
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
