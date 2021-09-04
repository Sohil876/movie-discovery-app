import React from 'react';
import { StyleSheet, Text } from 'react-native';
import styled from 'styled-components/native';

const BaseText = props => {
	return <StyledText>{props.children}</StyledText>;
};

const StyledText = styled.Text`
	font-family: 'poppins-regular';
`;

const styles = StyleSheet.create({
	text: {
		fontFamily: 'poppins-regular',
	},
});

export default BaseText;
