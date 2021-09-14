import React from 'react';
import { Text, Pressable } from 'react-native';
import styled from 'styled-components/native';

export const BaseText = props => {
	return (
		<StyledText style={props.style} {...props}>
			{props.children}
		</StyledText>
	);
};

const StyledText = styled.Text`
	font-family: 'poppins-regular';
	font-size: 14px;
	color: #fff;
`;

export const BasePressable = props => {
	return (
		<Pressable style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})} {...props}>
			{props.children}
		</Pressable>
	);
};
