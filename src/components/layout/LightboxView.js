// @see https://github.com/ascoders/react-native-image-viewer

import React from 'react';
import { Modal, Text, StyleSheet } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { BaseText } from './BaseComponents';

const LightboxView = ({ imagePath, closeModal }) => {
	return (
		<Modal visible={true} transparent={true}>
			<ImageViewer
				renderHeader={() => <BaseText style={styles.text}>Swipe down to exit</BaseText>}
				imageUrls={imagePath}
				saveToLocalByLongPress={false}
				enableSwipeDown={true}
				onCancel={closeModal}
				swipeDownThreshold={5}
				failImageSource={{ url: 'Failed to load image' }}
			/>
		</Modal>
	);
};

const styles = StyleSheet.create({
	text: {
		color: '#fff',
		fontSize: 17,
		textAlign: 'center',
		marginTop: 12,
	},
});

export default LightboxView;
