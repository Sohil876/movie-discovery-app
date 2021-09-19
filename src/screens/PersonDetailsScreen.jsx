import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BaseText } from 'components/layout/BaseComponents';
import { Separator, Title } from 'components/layout/Details';
import MediaCardAlt from 'components/layout/person/MediaCardAlt';
import Photos from 'components/layout/Photos';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import { colors, constants } from 'styles/styles.js';
import { calcAge, fetchPersonDetails, fetchPersonMovieCredits, fetchPersonTVCredits, formatDate } from 'utils/helpers';
import { BASE_IMG_URL } from 'utils/requests';
import { Overview, SectionTitle, SectionWrapper } from './MediaDetailsScreen';

const PersonDetailsScreen = ({ route }) => {
	const { data } = route.params;
	const [state, setState] = useState();
	const [expanded, setExpanded] = useState(3);

	const bottomNavBarHeight = useBottomTabBarHeight();

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

		fetchPersonMovieCredits(data.id)
			.then(res => setState(prev => ({ ...prev, movieCredits: res.cast })))
			.catch(er => console.error(er));

		fetchPersonTVCredits(data.id)
			.then(res => setState(prev => ({ ...prev, tvCredits: res.cast })))
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

	// useEffect(() => {
	// 	console.log('PERSON', state);
	// }, [state]);

	if (!state) return null;

	return (
		<Wrapper>
			<MainImage source={state.profileImage} resizeMode={'contain'} />
			<InfoWrapper>
				<Name>{state.name || 'N/A'}</Name>

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
				<Overview>{state.name || 'N/A'}</Overview>
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
				<SectionTitle>Movies Appeared In</SectionTitle>

				{state.movieCredits?.length > 0 ? (
					<FlatList
						horizontal
						showsHorizontalScrollIndicator={false}
						keyExtractor={(_, index) => index.toString()}
						data={state.movieCredits}
						renderItem={({ item }) => <MediaCardAlt data={item} />}
					/>
				) : (
					<Overview>No movies found.</Overview>
				)}
			</SectionWrapper>

			<SectionWrapper>
				<SectionTitle>TV Shows Appeared In</SectionTitle>

				{state.tvCredits?.length > 0 ? (
					<FlatList
						horizontal
						showsHorizontalScrollIndicator={false}
						keyExtractor={(_, index) => index.toString()}
						data={state.tvCredits}
						renderItem={({ item }) => <MediaCardAlt data={item} />}
					/>
				) : (
					<Overview>No TV Shows found.</Overview>
				)}
			</SectionWrapper>

			<SectionWrapper style={{ paddingBottom: bottomNavBarHeight + 30 }}>
				<SectionTitle>Photos</SectionTitle>

				{state.images?.profiles.length > 0 ? (
					<Photos data={state.images.profiles} />
				) : (
					<Overview>No photos found.</Overview>
				)}
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

export default PersonDetailsScreen;
