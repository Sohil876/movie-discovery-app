import { colors } from 'styles/styles.js';
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Loader = ({ size = 50 }) => {
	return (
		<Wrapper>
			<ActivityIndicator size={size} color={'#fff'} />
		</Wrapper>
	);
};

const Wrapper = styled.View`
	flex: 1;
	background-color: ${colors.primaryBg};
	justify-content: center;
	align-items: center;
`;

export default Loader;
