import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import styled from 'styled-components/native';
import { BaseText } from 'components/layout/BaseComponents';
import { colors } from 'styles/styles.js';

const SeeMoreBtn = ({ handlePress, message = 'View All' }) => {
	return (
		<Wrapper onPress={handlePress}>
			<View style={styles.row}>
				<BtnText>{message}</BtnText>
				<FontAwesomeIcon icon={'chevron-right'} color={colors.primaryClr} size={12} style={styles.icon} />
			</View>
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	icon: {
		paddingLeft: 18,
		marginBottom: 3,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

const Wrapper = styled.TouchableOpacity`
	border-radius: 100px;
	padding: 10px 20px;
	margin-bottom: 8px;
`;

const BtnText = styled(BaseText)`
	color: ${colors.primaryClr};
	text-transform: capitalize;
`;

export default SeeMoreBtn;
