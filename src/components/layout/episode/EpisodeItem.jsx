import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const EpisodeItem = ({ data }) => {
	return (
		<TouchableOpacity>
			<Image source={{ uri: '' }} />
		</TouchableOpacity>
	);
};

const Wrapper = styled.View``;

export default EpisodeItem;
