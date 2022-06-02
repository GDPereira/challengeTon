import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CartContext} from '../../context/cartContext';
import {formatMoney} from '../../utils';

export type IProduct = {
  id: string;
  name: string;
  price: number;
};

type ProductProps = {
  product: IProduct;
};

const Product = ({product}: ProductProps) => {
  const ctx = useContext(CartContext);
  const insideCart = !!ctx.cart.find(
    productCart => productCart.id === product.id,
  );

  return (
    <View>
      <View style={styles.container}>
        <Image
          style={styles.image}
          resizeMode={'stretch'}
          source={require('../../imgs/image.jpg')}
        />
      </View>

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.name}>{formatMoney(product.price)}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          insideCart
            ? ctx.removeProductFromCart(product.id)
            : ctx.addProductToCart(product)
        }>
        <Text style={insideCart ? styles.textRemove : styles.textAdd}>
          {insideCart ? 'Remove' : 'Adicionar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: 150,
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    marginTop: 5,
    color: 'black',
  },
  button: {
    width: 150,
    marginTop: 5,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
  },
  textRemove: {
    color: 'red',
  },
  textAdd: {
    color: 'green',
  },
});

export default Product;
