import React from 'react';
import { Text, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { constants, colors } from 'styles/styles.js';

export const BaseText = props => {
	return (
		<StyledText style={props.style} {...props}>
			{props.children}
		</StyledText>
	);
};

export const BaseWrapper = props => <Wrapper>{props.children}</Wrapper>;

export const BasePressable = props => {
	return (
		<Pressable style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})} {...props}>
			{props.children}
		</Pressable>
	);
};

const Wrapper = styled.View`
	flex: 1;
	padding: 50px ${constants.horizontalPadding};
	background-color: ${colors.primaryBg};
`;

const StyledText = styled.Text`
	font-family: 'poppins-regular';
	font-size: 14px;
	color: #fff;
`;
