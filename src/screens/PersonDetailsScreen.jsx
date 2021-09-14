import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { fetchPersonDetails } from 'utils/helpers';
import styled from 'styled-components';
import { colors } from 'styles/styles.js';

const PersonDetailsScreen = ({ route }) => {
	const { data } = route.params;
	const [state, setState] = useState();

	useEffect(() => fetchPersonDetails(data.id).then(res => setState(res)), []);

	if (!state) return null;

	return (
		<Wrapper>
			<Text>{state.name}</Text>
		</Wrapper>
	);
};

const Wrapper = styled.View`
	padding: 70px 20px;
	flex: 1;
	background-color: ${colors.primaryBg};
`;

export default PersonDetailsScreen;
