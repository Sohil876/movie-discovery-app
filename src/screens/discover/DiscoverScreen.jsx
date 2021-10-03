import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity } from 'react-native';
import { BaseWrapper } from 'components/layout/BaseComponents';
import { Title } from '../SearchScreen';
import DiscoverTabNavigation from './../../components/navigation/DiscoverTabNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import styled from 'styled-components/native';
import { constants, colors } from 'styles/styles.js';
import FilterModal from './../../components/layout/FilterModal';

const DiscoverScreen = () => {
	return (
		<Wrapper>
			<View style={styles.flex}>
				<Title>Discover</Title>
				<FilterModal />
			</View>

			<DiscoverTabNavigation />
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	flex: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

const Wrapper = styled.View`
	flex: 1;
	padding: 50px ${constants.horizontalPadding} 10px;
	background-color: ${colors.primaryBg};
`;

export default DiscoverScreen;
