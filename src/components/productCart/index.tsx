import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CartContext} from '../../context/cartContext';
import Icon from 'react-native-vector-icons/AntDesign';
import {formatMoney} from '../../utils';

export type IProduct = {
  id: string;
  name: string;
  price: number;
};

type ProductProps = {
  product: IProduct;
};

const ProductCart = ({product}: ProductProps) => {
  const ctx = useContext(CartContext);

  return (
    <View style={styles.rowContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode={'stretch'}
            source={require('../../imgs/image.jpg')}
          />
        </View>

        <Text style={styles.text}>{product.name} - </Text>
        <Text style={styles.text}>{formatMoney(product.price)}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => ctx.removeProductFromCart(product.id)}>
        <Icon name="closecircleo" size={35} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  titleContainer: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {width: 50, height: 50},
  button: {flex: 0.2},
  text: {color: 'black'},
});

export default ProductCart;
