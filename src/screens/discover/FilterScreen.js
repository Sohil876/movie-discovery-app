import { useNavigation } from '@react-navigation/native';
import { BaseText } from 'components/layout/BaseComponents';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CheckboxGroup from 'react-native-checkbox-group';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components/native';
import { colors, constants } from 'styles/styles.js';
import { API_KEY } from 'utils/requests';

const FilterScreen = ({ route }) => {
	const navigation = useNavigation();

	const [language, setLanguage] = useState('en-US');
	const [sortBy, setSortBy] = useState(null);
	const [selectedGenres, setSelectedGenres] = useState([]);

	const [releaseDateGreaterThan, setReleaseDateGreaterThan] = useState(null);
	const [releaseDateLessThan, setReleaseDateLessThan] = useState(null);

	const [openModal, setOpenModal] = useState(false);
	const [sortByItems] = useState([
		{
			label: 'Most Popular',
			value: 'popularity.desc',
		},
		{
			label: 'Least Popular',
			value: 'popularity.asc',
		},
		{
			label: 'Most Recent',
			value: 'release_date.desc',
		},
		{
			label: 'Least Recent',
			value: 'release_date.asc',
		},
		{
			label: 'Highest Rated',
			value: 'vote_average.desc',
		},
		{
			label: 'Lowest Rated',
			value: 'vote_average.asc',
		},
	]);

	const [genreList, setGenreList] = useState([
		{ label: 'action', value: 28 },
		{ label: 'Adventure', value: 12 },
		{ label: 'Animation', value: 16 },
		{ label: 'Comedy', value: 35 },
		{ label: 'Crime', value: 80 },
		{ label: 'drama', value: 18 },
		{ label: 'documentary', value: 99 },
		{ label: 'family', value: 10751 },
		{ label: 'fantasy', value: 14 },
		{ label: 'history', value: 36 },
		{ label: 'music', value: 10402 },
		{ label: 'mystery', value: 9648 },
		{ label: 'TV Movie', value: 10770 },
		{ label: 'thriller', value: 53 },
		{ label: 'war', value: 10752 },
		{ label: 'western', value: 37 },
		{ label: 'horror', value: 27 },
		{ label: 'romance', value: 10749 },
		{ label: 'SciFi', value: 878 },
	]);

	useEffect(() => {
		console.log('FILTER SCREEN FOCUSED', route.params.filters);

		/**
		 * If user has selected filters before, we want to preserve
		 * those filters and show them when this screen gets focused
		 */
		if (route.params.filters) {
			const { filters } = route.params;
			setReleaseDateGreaterThan(filters['release_date.gte']);
			setReleaseDateLessThan(filters['release_date.lte']);
			setSortBy(filters.sort_by);

			if (filters.with_genres) {
				const genres = filters.with_genres.split(',');
				const newGenreList = [];

				genreList.map(item => {
					genres.map(genre => {
						if (item.value === +genre) newGenreList.push({ ...item, selected: true });
						else newGenreList.push(item);
					});
				});

				setGenreList(newGenreList);
				console.log(newGenreList, 'NEW GENRE LIST');
			}
		}
	}, []);

	return (
		<View style={styles.centeredView}>
			<ModalView>
				<ModalTitle>Filters</ModalTitle>

				<FilterGroup>
					<FilterTitle>Sort by: </FilterTitle>
					<DropDownPicker
						open={openModal}
						value={sortBy}
						items={sortByItems}
						setOpen={setOpenModal}
						setValue={setSortBy}
					/>
				</FilterGroup>

				<FilterGroup>
					<FilterTitle style={{ marginBottom: 5 }}>Release Dates: </FilterTitle>

					<GroupContainer>
						<Column>
							<ReleaseDateText
								style={{ marginRight: 40 }}
								onPress={() => setFromDatePicker(true)}
							>
								From
							</ReleaseDateText>

							<DatePicker
								style={{ width: 100, marginRight: 15 }}
								date={releaseDateGreaterThan}
								mode="date"
								placeholder="Select Date"
								format="YYYY-MM-DD"
								minDate="1000-01-01"
								maxDate="2999-01-01"
								showIcon={false}
								customStyles={datePickerStyles}
								onDateChange={date => setReleaseDateGreaterThan(date)}
							/>
						</Column>

						<Column>
							<ReleaseDateText>To</ReleaseDateText>

							<DatePicker
								style={{ width: 100 }}
								date={releaseDateLessThan}
								mode="date"
								placeholder="select date"
								format="YYYY-MM-DD"
								minDate="1000-01-01"
								maxDate="2999-01-01"
								showIcon={false}
								customStyles={datePickerStyles}
								onDateChange={date => setReleaseDateLessThan(date)}
							/>
						</Column>
					</GroupContainer>
				</FilterGroup>

				<FilterGroup>
					<FilterTitle>Genres: </FilterTitle>

					<View style={{ flexWrap: 'wrap' }}>
						<CheckboxGroup
							callback={selected => setSelectedGenres(selected)}
							iconColor={'#ffffff'}
							iconSize={30}
							checkedIcon="ios-checkbox-outline"
							uncheckedIcon="ios-square-outline"
							checkboxes={genreList}
							labelStyle={{
								color: '#ffffff',
							}}
							rowStyle={{
								flexDirection: 'row',
							}}
							rowDirection={'row'}
						/>
					</View>
				</FilterGroup>

				<ModalBtns>
					<ApplyBtn
						style={[styles.button, styles.buttonApply]}
						onPress={() => {
							navigation.navigate('Discover', {
								filters: {
									api_key: API_KEY, // TMDB API key
									language, // language filter
									sort_by: sortBy,
									'release_date.gte': releaseDateGreaterThan,
									'release_date.lte': releaseDateLessThan,
									with_genres: selectedGenres.toString(),
									// if user sorts by 'Most Recent' only show
									// items with a release year of current year + 1
									year:
										sortBy === 'release_date.desc'
											? new Date().getFullYear() + 1
											: null,
									first_air_date_year:
										sortBy === 'release_date.desc'
											? new Date().getFullYear() + 1
											: null,
								},
							});
						}}
					>
						<Text style={styles.textStyle}>Apply</Text>
					</ApplyBtn>

					<TouchableOpacity style={[styles.button, styles.buttonClose]}>
						<Text style={styles.textStyle}>Clear Filters</Text>
					</TouchableOpacity>
				</ModalBtns>
			</ModalView>
		</View>
	);
};

const ModalView = styled.View`
	background-color: ${colors.navbar};
	border-radius: ${constants.borderRadiusSm};
	padding: 30px;
	align-items: center;
	height: 100%;
	width: 100%;
`;

const Column = styled.View`
	flex-direction: column;
`;

const GroupContainer = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const ModalTitle = styled.Text`
	font-family: 'poppins-semiBold';
	font-size: 22px;
	color: #fff;
	margin-bottom: 15px;
	text-align: center;
`;

const ApplyBtn = styled.TouchableOpacity`
	margin-right: 10px;
`;

const ModalBtns = styled.View`
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
`;

const FilterGroup = styled.View`
	margin-bottom: 15px;
`;

const FilterTitle = styled(BaseText)`
	color: #fff;
	font-size: 16px;
	font-family: 'poppins-semiBold';
`;

const ReleaseDateText = styled(BaseText)`
	margin-bottom: 5px;
`;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	picker: {
		backgroundColor: colors.navbar,
		color: '#fff',
		fontFamily: 'poppins-medium',
		fontSize: 17,
	},
	button: {
		borderRadius: 5,
		padding: 10,
		paddingHorizontal: 30,
	},
	buttonApply: {
		backgroundColor: `${colors.primaryClr}`,
	},
	buttonClose: {
		backgroundColor: `${colors.coolGray900}`,
		marginTop: 10,
	},
	textStyle: {
		color: 'white',
		fontFamily: 'poppins-semiBold',
		textAlign: 'center',
	},
});

const datePickerStyles = {
	dateText: {
		color: '#fff',
	},
};

export default FilterScreen;
