import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ResultWrapper, Poster, StyledSeparator, Title, SubTitle } from './../search/SearchResultItem';
import { BASE_IMG_URL } from 'utils/requests';
import { useNavigation } from '@react-navigation/native';

const PersonItem = ({ data }) => {
	const navigation = useNavigation();

	const [state, setState] = useState({
		...data,
		posterURL: data.profile_path
			? { uri: `${BASE_IMG_URL}${data.profile_path}` }
			: require('images/no-cast-found.png'),
	});

	return (
		<>
			<ResultWrapper
				onPress={() => navigation.push('PersonDetails', { data: state })}
				style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})}
				hitSlop={50}
			>
				<Poster source={state.posterURL} resizeMode="cover" />
				<View>
					<Title>{state.name || 'N/A'}</Title>
					<SubTitle>{state.character ? `as ${state.character || 'N/A'}` : `${state.job || 'N/A'}`}</SubTitle>
				</View>
			</ResultWrapper>

			<StyledSeparator />
		</>
	);
};

export default PersonItem;
