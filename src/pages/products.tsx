import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Header from '../components/header';
import Product from '../components/product';
import {CartContext} from '../context/cartContext';
import api from '../services/api';

const Products = () => {
  const ctx = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await api.get('7b9fe5ea-a872-426f-9de7-e0d98fea6c62');

        resp.data;
        ctx.initializeProducts(resp.data);
      } catch (error) {
        console.log('error :>> ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <Header />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={ctx.products}
          extraData={ctx.cart}
          numColumns={2}
          contentContainerStyle={styles.container}
          style={styles.list}
          columnWrapperStyle={styles.wrapper}
          renderItem={({item}) => {
            return (
              <View style={styles.productContainer}>
                <Product product={item} />
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {paddingBottom: 90},
  list: {paddingHorizontal: 20},
  wrapper: {justifyContent: 'space-between'},
  productContainer: {marginTop: 20},
});

export default Products;
