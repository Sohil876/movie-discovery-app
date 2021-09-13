import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image } from 'react-native';
import styled from 'styled-components/native';
import YoutubePlayer, { getYoutubeMeta } from 'react-native-youtube-iframe';
import { colors } from 'styles/styles.js';
import BaseText from 'components/layout/BaseText';
import { Separator } from 'components/layout/Details';

const WatchVideosScreen = ({ route }) => {
	const { data } = route.params;
	const [videoURL, setVideoURL] = useState(data.results);
	const [currentVid, setCurrentVid] = useState(data.results[0]);
	const [currentIndex, setCurrentIndex] = useState(0);

	const renderThumbnail = item => {
		let thumbnailURL;
		getYoutubeMeta(item.key).then(res => (thumbnailURL = res.thumbnail_url));
		return <Image source={{ uri: thumbnailURL }} style={{ height: 150, width: 100 }} />;
	};

	return (
		<Wrapper>
			<PlayerWrapper>
				<YoutubePlayer
					style={styles.player}
					height={300}
					play={true}
					videoId={currentVid.key}
					forceAndroidAutoplay={true}
				/>
			</PlayerWrapper>
			<VideoInfo>
				<VideoTitle>{currentVid.name}</VideoTitle>
				<VideoType>{currentVid.type}</VideoType>
			</VideoInfo>

			<VideoItems>
				<FlatList
					data={videoURL}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item, index }) => {
						return (
							<ItemWrapper
								onPress={() => {
									setCurrentVid(item);
									setCurrentIndex(index);
								}}
							>
								{/* {renderThumbnail(item)} */}
								<ItemTitle style={currentIndex === index ? styles.activeLink : {}}>
									{item.name}
								</ItemTitle>
								<ItemType style={currentIndex === index ? styles.activeLink : {}}>{item.type}</ItemType>
								<StyledSeparator />
							</ItemWrapper>
						);
					}}
				></FlatList>
			</VideoItems>
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	player: {
		marginBottom: 0,
	},
	activeLink: {
		color: colors.primaryClr,
	},
});

const VideoInfo = styled.View`
	padding: 18px 20px;
	margin-top: -70px;
	background-color: #0000007b;
`;

const VideoItems = styled.ScrollView`
	padding: 18px 20px;
	height: 100%;
`;

const StyledSeparator = styled(Separator)`
	margin-top: 14px;
	margin-bottom: -12px;
`;

const VideoTitle = styled(BaseText)`
	color: #fff;
	font-size: 16px;
	font-family: 'poppins-semiBold';
`;

const ItemTitle = styled(BaseText)`
	color: #fff;
	font-size: 14px;
`;

const ItemType = styled(BaseText)`
	color: ${colors.offWhite};
	font-size: 13px;
`;

const ItemWrapper = styled.Pressable`
	margin: 15px 0;
`;

const VideoType = styled(BaseText)`
	color: ${colors.offWhite};
`;

const Wrapper = styled.View`
	flex: 1;
	padding: 20px 0px;
	background-color: ${colors.primaryBg};
`;

const PlayerWrapper = styled.View`
	height: 300px;
`;

export default WatchVideosScreen;
