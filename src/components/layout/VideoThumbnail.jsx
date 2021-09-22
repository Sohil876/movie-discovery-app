import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { VideoImage, VideoIcon, Overlay, Overview } from 'screens/MediaDetailsScreen';
import { useNavigation } from '@react-navigation/native';
import { BASE_IMG_URL } from 'utils/requests';

const VideoThumbnail = ({ data }) => {
	const navigation = useNavigation();

	const goToVideos = () => {
		navigation.navigate('WatchVideos', { data: data.videos });
	};

	if (!data.videos.results.length) {
		return <Overview>-</Overview>;
	}

	return (
		<TouchableOpacity onPress={goToVideos}>
			<VideoImage
				imageStyle={{ borderRadius: 10 }}
				resizeMode="cover"
				source={
					data.images.backdrops.length > 0
						? {
								uri: `${BASE_IMG_URL}${data.images.backdrops[0].file_path}`,
						  }
						: require('images/no-img-found.png')
				}
			>
				<VideoIcon icon="play-circle" size={40} />
			</VideoImage>

			<Overlay />
		</TouchableOpacity>
	);
};

export default VideoThumbnail;
