import React, { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { BASE_IMG_URL } from 'utils/requests';
import LightboxView from './LightboxView';

const Photos = ({ data }) => {
	const [lightboxToggler, setLightboxToggler] = useState(false);
	const [imageURL, setImageURL] = useState(null);

	if (!data.length) return null;

	return (
		<>
			<FlatList
				horizontal
				data={data}
				keyExtractor={item => item.file_path}
				renderItem={({ item }) => (
					<Pressable
						onPress={() => {
							setImageURL(`${BASE_IMG_URL}${item.file_path}`);
							setLightboxToggler(prev => !prev);
						}}
					>
						<Image source={{ uri: `${BASE_IMG_URL}${item.file_path}` }} style={styles.image} />
					</Pressable>
				)}
			/>
			{lightboxToggler && (
				<LightboxView imagePath={[{ url: imageURL }]} closeModal={() => setLightboxToggler(false)} />
			)}
		</>
	);
};

const styles = StyleSheet.create({
	image: {
		height: 200,
		width: 130,
		marginRight: 10,
		borderRadius: 5,
	},
});

export default Photos;
