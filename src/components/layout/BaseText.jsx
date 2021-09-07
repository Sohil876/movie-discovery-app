import React from 'react';
import { StyleSheet, Text } from 'react-native';
import styled from 'styled-components/native';

const BaseText = props => {
	return <StyledText style={props.style}>{props.children}</StyledText>;
};

const StyledText = styled.Text`
	font-family: 'poppins-regular';
	font-size: 14px;
`;

export default BaseText;
