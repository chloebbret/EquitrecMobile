import React from 'react';
import {FlatList, View} from 'react-native';
import {equitrecStyle} from "../../global/style/Equitrec";

const CFlatList = ({data, renderItem}) => {
  return (
    <View style={{alignItems: "center"}}>
      <FlatList
        style={equitrecStyle.list}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CFlatList;