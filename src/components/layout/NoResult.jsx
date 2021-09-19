import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'styles/styles';
import { BaseText } from './BaseComponents';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const NoResult = ({ message }) => {
	return (
		<Wrapper>
			<FontAwesomeIcon icon="frown-open" size={40} color={`${colors.offWhite}`} />
			<Message>{message}</Message>
		</Wrapper>
	);
};

const Wrapper = styled.View`
	flex: 1;
	background-color: ${colors.primaryBg};
	justify-content: center;
	align-items: center;
`;

const Message = styled(BaseText)`
	font-size: 25px;
	color: ${colors.offWhite};
	font-family: 'poppins-semiBold';
	text-align: center;
	margin-top: 10px;
`;

export default NoResult;
