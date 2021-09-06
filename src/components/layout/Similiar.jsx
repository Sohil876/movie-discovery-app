import React from 'react';
import { FlatList, View } from 'react-native';

const Similiar = ({ data }) => {
    const [media, setMedia] = useState(null)

    
	return <FlatList data={data} keyExtractor={item => item.id.toString()} />;
};

export default Similiar;
