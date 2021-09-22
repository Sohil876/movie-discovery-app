import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { BASE_IMG_URL } from 'utils/requests';
import { constants } from 'styles/styles.js';
import { BaseText } from 'components/layout/BaseComponents';
import { Overview } from 'screens/MediaDetailsScreen';
import { colors } from 'styles/styles.js';
import { formatDate } from 'utils/helpers';
import { useNavigation } from '@react-navigation/native';

const EpisodeItem = ({ data }) => {
	const navigation = useNavigation();

	return (
		<Wrapper onPress={() => navigation.navigate('EpisodeDetails', { data })}>
			<StillImg
				source={
					data.still_path
						? { uri: `${BASE_IMG_URL}${data.still_path}` }
						: require('images/no-img-found.png')
				}
			/>

			<NameWrapper>
				<EpNumber>{data.episode_number}</EpNumber>
				<Name>{data.name}</Name>
			</NameWrapper>

			<Overview style={styles.overview} numberOfLines={4}>
				{data.overview ? data.overview : 'Plot unknown at this time.'}
			</Overview>
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	overview: {
		marginTop: -12,
		marginBottom: 15,
	},
});

const StillImg = styled.Image`
	height: 180px;
	width: 100%;
	border-radius: ${constants.borderRadiusSm};
`;

const Wrapper = styled.TouchableOpacity`
	margin-top: 2px;
	margin-bottom: 20px;
`;

const EpNumber = styled.Text`
	font-family: 'poppins-semiBold';
	height: 23px;
	width: 23px;
	color: #fff;
	border-radius: 100;
	background-color: ${colors.primaryClr};
	margin-right: 5px;
	text-align: center;
	padding-top: 1px;
`;

const NameWrapper = styled.View`
	flex-direction: row;
	margin: 10px 0 20px;
	align-items: center;
`;

const Name = styled.Text`
	font-family: 'poppins-semiBold';
	font-size: 17px;
	color: #fff;
	width: 85%;
	padding-top: 2px;
`;

export default EpisodeItem;
