import {StyleSheet} from "react-native";

export const primaryColor = '#74C5FF';
export const secondaryColor = '#688EB4';

export const equitrecStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Gluten-SemiBold',
    color: primaryColor,
    fontSize: 32
  },
  subTitle: {
    fontFamily: 'Gluten-Regular',
    color: primaryColor,
    textAlign: 'center',
    fontSize: 12
  },
  defaultTopMargin: {
    marginTop: 100,
  },
  alignItemsCenter: {
    alignItems: 'center'
  },
  list: {
    backgroundColor: '#F5F5F5',
    maxHeight: 200,
    borderRadius: 5,
    paddingHorizontal: 5,
    width: "80%"
  }
});