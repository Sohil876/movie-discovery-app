import React from 'react';
import styled from 'styled-components/native';
import { colors } from 'styles/styles.js';
import { FlatList, Text } from 'react-native';
import { BASE_IMG_URL } from 'utils/requests';
import { Overview } from 'screens/MediaDetailsScreen';

const Cast = ({ data }) => {
	if (!data) return <Overview>No cast found.</Overview>;

	return (
		<FlatList
			horizontal
			data={data}
			renderItem={({ item }) => (
				<Wrapper>
					<CastImage
						source={
							item.profile_path
								? { uri: `${BASE_IMG_URL}${item.profile_path}` }
								: require('../../assets/images/no-cast-found.png')
						}
					/>
					<Name>{item.name || 'Unknown'}</Name>
					<Role>{`as ${item.character || 'Unknown'}`}</Role>
				</Wrapper>
			)}
			keyExtractor={item => item.id.toString()}
		/>
	);
};

const Wrapper = styled.View`
	margin-right: 20px;
	align-items: center;
`;

const CastImage = styled.Image`
	height: 70px;
	width: 70px;
	border-radius: 100px;
	margin-bottom: 10px;
`;

const Name = styled.Text`
	font-family: 'poppins-regular';
	color: #fff;
	font-size: 12px;
`;

const Role = styled.Text`
	font-family: 'poppins-regular';
	font-style: italic;
	color: ${colors.offWhite};
	font-size: 12px;
	justify-content: center;
	text-align: center;
`;

export default Cast;
