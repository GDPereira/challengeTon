import React, {useContext} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../components/header';
import ProductCart from '../components/productCart';
import {CartContext} from '../context/cartContext';
import {formatMoney} from '../utils';

const Cart = () => {
  const ctx = useContext(CartContext);
  const totalValue = ctx.cart.reduce((prev, current) => {
    return prev + current.price;
  }, 0);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <Header showBackButton />

      <View style={styles.textContainer}>
        <Text style={styles.text}>{ctx.cart.length} Produtos no carrinho:</Text>
        <Text style={styles.text}>Valor total: {formatMoney(totalValue)}</Text>
      </View>

      <FlatList
        keyExtractor={item => item.id}
        extraData={ctx.cart}
        data={ctx.cart}
        contentContainerStyle={styles.container}
        style={styles.list}
        renderItem={({item}) => {
          return (
            <View style={styles.productContainer}>
              <ProductCart product={item} />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {paddingBottom: 90},
  list: {paddingHorizontal: 20},
  wrapper: {justifyContent: 'space-between'},
  productContainer: {marginTop: 20},
  textContainer: {paddingHorizontal: 20, marginTop: 20},
  text: {color: 'black', fontSize: 16},
});

export default Cart;
