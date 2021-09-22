import React, { useState } from 'react';
import { Overview } from 'screens/MediaDetailsScreen';

const EXPANDED = 0; // full body of text is visible
const NOT_EXPANDED = 3; // 3 lines of text is visible

const ExpandableText = props => {
	const [isExpanded, setIsExpanded] = useState(NOT_EXPANDED);

	const handleOnPress = () => setIsExpanded(prev => (prev === EXPANDED ? NOT_EXPANDED : EXPANDED));

	return (
		<Overview {...props} numberOfLines={isExpanded} onPress={handleOnPress}>
			{props.children}
		</Overview>
	);
};

export default ExpandableText;
