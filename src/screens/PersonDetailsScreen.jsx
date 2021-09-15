import { BaseText } from 'components/layout/BaseComponents';
import { Separator, Title } from 'components/layout/Details';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors, constants } from 'styles/styles.js';
import { calcAge, fetchPersonDetails, formatDate } from 'utils/helpers';
import { BASE_IMG_URL } from 'utils/requests';
import { Overview, SectionTitle, SectionWrapper } from './MediaDetailsScreen';

const PersonDetailsScreen = ({ route }) => {
	const { data } = route.params;
	const [state, setState] = useState();
	const [expanded, setExpanded] = useState(3);

	/**
	 * Truncates text at 3 lines or show all text
	 */
	const controlExpansion = () => {
		setExpanded(prev => (prev == 3 ? 0 : 3));
	};

	useEffect(() => {
		fetchPersonDetails(data.id)
			.then(res =>
				setState({
					...res,
					profileImage: res.profile_path
						? { uri: `${BASE_IMG_URL}${res.profile_path}` }
						: require('../assets/images/no-cast-found.png'),
				})
			)
			.catch(er => console.error(er));
	}, []);

	// useEffect(() => {
	// 	console.log('PERSON', state);
	// }, [state]);

	if (!state) return null;

	return (
		<Wrapper>
			<MainImage source={state.profileImage} resizeMode={'contain'} />
			<InfoWrapper>
				<Name>{state.name}</Name>

				<View>
					<PrimaryInfo>
						Born on {formatDate(state.birthday) || 'N/A'}{' '}
						{state.place_of_birth && `in ${state.place_of_birth}`}
					</PrimaryInfo>

					{state.deathday && <PrimaryInfo>{`Died on ${formatDate(state.deathday)}`}</PrimaryInfo>}
				</View>
			</InfoWrapper>

			<Separator />

			<SectionWrapper>
				<SectionTitle>Biography</SectionTitle>

				<Overview numberOfLines={expanded} onPress={controlExpansion}>
					{state.biography || 'No Bio available.'}
				</Overview>
			</SectionWrapper>

			<SectionWrapper>
				<SectionTitle>Personal Details</SectionTitle>

				<Title>Age: {calcAge(state.birthday) || '-'}</Title>
			</SectionWrapper>
		</Wrapper>
	);
};

const Wrapper = styled.ScrollView`
	padding: 70px 20px;
	flex: 1;
	background-color: ${colors.primaryBg};
`;

const InfoWrapper = styled.View`
	padding: 15px 0;
`;

const PrimaryInfo = styled(BaseText)`
	line-height: 25px;
	text-align: center;
`;

const Name = styled(BaseText)`
	text-align: center;
	font-family: 'poppins-semiBold';
	font-size: 24px;
`;

const MainImage = styled.Image`
	height: 350px;
	width: 100%;
	border-radius: ${constants.borderRadiusSm};
`;

export default PersonDetailsScreen;
