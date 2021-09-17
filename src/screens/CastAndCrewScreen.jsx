import React, { useState, useEffect } from 'react';
import { HomeWrapper } from './HomeScreen';
import { MediaListWrapper } from './MediaListScreen';
import { Text } from 'react-native';
import { ListTitle } from './MediaListScreen';
import styled from 'styled-components/native';
import { fetchPersonMovieCredits } from 'utils/helpers';

const CastAndCrewScreen = ({ route }) => {
	const { data } = route.params;
	const [state, setState] = useState(data);

	const init = () => {
		fetchPersonMovieCredits(state.id)
			.then(res => setState(prev => ({ ...prev, movieCredits: res })))
			.catch(er => console.error(er));
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<Wrapper>
			<ListTitle>
				Full cast and crew for {state.title} ({state.year})
			</ListTitle>
		</Wrapper>
	);
};

const Wrapper = styled(MediaListWrapper)`
	padding: 80px 20px 0;
`;

export default CastAndCrewScreen;
