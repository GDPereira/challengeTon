import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CartContext} from '../../context/cartContext';

type HeaderProps = {
  showBackButton?: boolean;
};

const Header = (props: HeaderProps) => {
  const ctx = useContext(CartContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {props.showBackButton ? (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrowleft" size={35} color="#000" />
        </TouchableOpacity>
      ) : (
        <View />
      )}

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          navigation.navigate('Cart');
        }}>
        {ctx.cart.length > 0 && <View style={styles.imageCircleStyle} />}
        <Icon name="shoppingcart" size={35} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    padding: 10,
    justifyContent: 'center',
  },
  imageCircleStyle: {
    position: 'absolute',
    right: 5,
    top: 15,
    width: 15,
    height: 15,
    backgroundColor: 'red',
    borderRadius: 200 / 2,
    borderWidth: 2,
  },
});

export default Header;
