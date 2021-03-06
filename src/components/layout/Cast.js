import React from 'react';
import { FlatList, Text } from 'react-native';
import { Overview } from 'screens/MediaDetailsScreen';
import styled from 'styled-components/native';
import { colors } from 'styles/styles.js';
import { BASE_IMG_URL } from 'utils/requests';
import { useNavigation } from '@react-navigation/native';

const Cast = ({ data }) => {
	const navigation = useNavigation();

	if (!data) return <Overview>Loading...</Overview>;
	if (!data.length) return <Overview>No cast found.</Overview>;

	return (
		<FlatList
			horizontal
			data={data}
			renderItem={({ item }) => (
				<Wrapper onPress={() => navigation.push('PersonDetails', { data: item })}>
					<CastImage
						source={
							item.profile_path
								? { uri: `${BASE_IMG_URL}${item.profile_path}` }
								: require('images/no-cast-found.png')
						}
					/>
					<Name>{item.name || 'Unknown'}</Name>
					<Role>{`as ${item.character || 'Unknown'}`}</Role>
				</Wrapper>
			)}
			keyExtractor={(item, index) => index.toString()}
		/>
	);
};

const Wrapper = styled.TouchableOpacity`
	margin-right: 20px;
	align-items: center;
`;

const CastImage = styled.Image`
	height: 90px;
	width: 90px;
	border-radius: 100px;
	margin-bottom: 10px;
`;

const Name = styled.Text`
	font-family: 'poppins-regular';
	color: #fff;
	font-size: 15px;
`;

const Role = styled.Text`
	/* font-family: 'poppins-italic'; */
	font-style: italic;
	color: ${colors.offWhite};
	font-size: 14px;
	justify-content: center;
	text-align: center;
`;

export default Cast;
