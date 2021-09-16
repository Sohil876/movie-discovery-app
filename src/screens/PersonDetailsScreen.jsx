import { BaseText } from 'components/layout/BaseComponents';
import { Separator, Title } from 'components/layout/Details';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { colors, constants } from 'styles/styles.js';
import { calcAge, fetchPersonDetails, formatDate, fetchPersonCredits } from 'utils/helpers';
import { BASE_IMG_URL } from 'utils/requests';
import { Overview, SectionTitle, SectionWrapper } from './MediaDetailsScreen';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Photos from 'components/layout/Photos';
import { useNavigation } from '@react-navigation/native';
import {
	CardWrapper,
	CardTitle,
	CardImage,
	CardYear,
	CardInfo,
	CardBottom,
	RatingWrapper,
	CardIcon,
	CardRating,
} from 'components/layout/MediaCard';

const PersonDetailsScreen = ({ route }) => {
	const { data } = route.params;
	const [state, setState] = useState();
	const [expanded, setExpanded] = useState(3);

	const BottomNavBarHeight = useBottomTabBarHeight();
	const navigation = useNavigation();

	const init = () => {
		fetchPersonDetails(data.id)
			.then(res =>
				setState(prev => ({
					...prev,
					...res,
					profileImage: res.profile_path
						? { uri: `${BASE_IMG_URL}${res.profile_path}` }
						: require('../assets/images/no-cast-found.png'),
					bio: res.biography || 'No Bio available.',
				}))
			)
			.catch(er => console.error(er));

		fetchPersonCredits(data.id)
			.then(res => setState(prev => ({ ...prev, credits: res.cast })))
			.catch(er => console.error(er));
	};

	/**
	 * Truncates text at 3 lines or show all text
	 */
	const controlExpansion = () => {
		setExpanded(prev => (prev == 3 ? 0 : 3));
	};

	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		console.log('PERSON', state);
	}, [state]);

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
					{state.bio}
				</Overview>
			</SectionWrapper>

			<SectionWrapper>
				<SectionTitle>Personal Details</SectionTitle>

				<Title>Name </Title>
				<Overview>{state.name}</Overview>
				<Separator />

				<Title>Age </Title>
				<Overview>{state.birthday ? `${calcAge(state.birthday)} years old` : '-'}</Overview>
				<Separator />

				<Title>Birthplace </Title>
				<Overview>{state.place_of_birth || '-'}</Overview>
				<Separator />

				<Title>Birthday </Title>
				<Overview>{formatDate(state.birthday) || '-'}</Overview>
				<Separator />

				{state.deathday && (
					<>
						<Title>Died On</Title>
						<Overview>{formatDate(state.deathday)}</Overview>
						<Separator />
					</>
				)}

				<Title>Also known as </Title>
				<Overview>
					{state.also_known_as?.length > 0
						? state.also_known_as.map((item, i, arr) => {
								if (i === arr.length - 1) {
									return <Overview key={i}>{item}</Overview>;
								} else {
									return <Overview key={i}>{item}, </Overview>;
								}
						  })
						: '-'}
				</Overview>
				<Separator />

				<Title>Known For</Title>
				<Overview>{state.known_for_department || '-'}</Overview>
				<Separator />
			</SectionWrapper>

			<SectionWrapper>
				<SectionTitle>Appeared In</SectionTitle>

				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					keyExtractor={(_, index) => index.toString()}
					data={state.credits}
					renderItem={({ item }) => (
						<CardWrapper mt="0" onPress={() => navigation.push('MediaDetails', { media: item })}>
							<CardImage
								source={
									item.poster_path
										? { uri: `${BASE_IMG_URL}${item.poster_path}` }
										: require('../assets/images/no-img-found.png')
								}
								resizeMode="cover"
							/>

							<CardInfo>
								<CardTitle numberOfLines={1}>{item.title || 'Unknown'}</CardTitle>
								<CardBottom>
									<StyledCardYear numberOfLines={1}>
										{'as ' + item.character || 'Unknown'}
									</StyledCardYear>
								</CardBottom>
							</CardInfo>
						</CardWrapper>
					)}
				/>
			</SectionWrapper>

			<SectionWrapper style={{ paddingBottom: BottomNavBarHeight + 30 }}>
				<SectionTitle>Photos</SectionTitle>

				{state.images?.profiles && <Photos data={state.images.profiles} />}
			</SectionWrapper>
		</Wrapper>
	);
};

const Wrapper = styled.ScrollView`
	padding: 70px 20px;
	flex: 1;
	height: 100%;
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

const StyledCardYear = styled(CardYear)`
	font-family: 'poppins-italic';
	font-size: 14px;
	width: 150px;
`;

export default PersonDetailsScreen;
