// @see https://github.com/ascoders/react-native-image-viewer

import React from 'react';
import { Modal, Text, StyleSheet } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const LightboxView = ({ imagePath, closeModal }) => {
	return (
		<Modal visible={true} transparent={true}>
			<ImageViewer
				renderHeader={() => <Text style={styles.text}>Swipe down to exit</Text>}
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
		fontSize: 14,
	},
});

export default LightboxView;
