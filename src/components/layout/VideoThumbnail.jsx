import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { VideoImage, VideoIcon, Overlay, Overview } from 'screens/MediaDetailsScreen';
import { useNavigation } from '@react-navigation/native';
import { BASE_IMG_URL } from 'utils/requests';

const VideoThumbnail = ({ data }) => {
	const navigation = useNavigation();
	const { images, videos } = data;

	const renderThumbnail = () => {
		if (images.backdrops?.length) {
			return { uri: `${BASE_IMG_URL}${images.backdrops[0].file_path}` };
		}

		if (images.posters?.length) {
			return { uri: `${BASE_IMG_URL}${images.posters[0].file_path}` };
		}

		if (images.stills?.length) {
			return { uri: `${BASE_IMG_URL}${images.stills[0].file_path}` };
		}

		return require('images/no-img-found.png');
	};

	const goToVideos = () => {
		navigation.navigate('WatchVideos', { data: videos });
	};

	if (!videos.results.length) {
		return <Overview>-</Overview>;
	}

	return (
		<TouchableOpacity onPress={goToVideos}>
			<VideoImage imageStyle={{ borderRadius: 10 }} resizeMode="cover" source={renderThumbnail()}>
				<VideoIcon icon="play-circle" size={40} />
			</VideoImage>

			<Overlay />
		</TouchableOpacity>
	);
};

export default VideoThumbnail;
