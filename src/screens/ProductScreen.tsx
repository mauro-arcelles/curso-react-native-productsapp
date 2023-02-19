import React, { useContext, useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

interface Props extends NativeStackScreenProps<ProductsStackParams, 'ProductScreen'> {

}

const ProductScreen = ({ navigation, route }: Props) => {

  const [tempUri, setTempUri] = useState<string>();
  const { categories, isLoading } = useCategories();
  const { loadProductById, updateProduct, addProduct, uploadImage } = useContext(ProductsContext);

  const { id = '', name } = route.params;

  const { _id, categoriaId, nombre, img, form, onChange, setFormValue } = useForm({
    _id: id,
    categoriaId: '',
    nombre: name ?? '',
    img: ''
  });

  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Sin nombre'
    });

  }, [nombre]);

  useEffect(() => {
    loadProduct();

  }, []);

  const loadProduct = async () => {
    if (id.length === 0) return;
    const producto = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: producto.categoria._id,
      nombre,
      img: producto.img || ''
    });
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id);

    } else {
      const tempCategoriaId = categoriaId || categories[0]._id;
      const newProduct = await addProduct(tempCategoriaId, nombre);
      onChange(newProduct._id, '_id');
    }
  };

  const takePhoto = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.5
    }, (resp) => {
      if (resp.didCancel) return;
      if (resp.assets && resp.assets[0]) {
        const uri = resp.assets[0].uri;
        setTempUri(uri);
        uploadImage(resp, _id);
      }
    });
  };

  const takePhotoFromGallery = async () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5
    }, (resp) => {
      if (resp.didCancel) return;
      if (resp.assets && resp.assets[0]) {
        const uri = resp.assets[0].uri;
        setTempUri(uri);
        uploadImage(resp, _id);
      }
    });

  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto:</Text>
        <TextInput
          placeholder="Ingrese el nombre del producto"
          style={styles.textInput}
          value={nombre}
          onChangeText={(value) => onChange(value, 'nombre')}
        />

        <Text style={styles.label}>Categoria</Text>
        {
          !isLoading && (
            <Picker
              selectedValue={categoriaId}
              onValueChange={(value) => onChange(value, 'categoriaId')}>
              {
                categories.map(category => (
                  <Picker.Item key={category._id} label={category.nombre} value={category._id} />
                ))
              }
            </Picker>
          )
        }


        <Button
          title="Guardar"
          onPress={saveOrUpdate}
          color="#5856D6"
        />

        {
          _id.length > 0 && (
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
              <Button
                title="Cámara"
                onPress={takePhoto}
                color="#5856D6"
              />
              <View style={{ width: 10 }} />

              <Button
                title="Galería"
                onPress={takePhotoFromGallery}
                color="#5856D6"
              />

            </View>
          )
        }

        {
          img.length > 0 && !tempUri &&
          (
            <Image
              source={{ uri: img }}
              style={{ width: '100%', height: 300, marginTop: 20 }}
            />
          )
        }

        {
          tempUri &&
          (
            <Image
              source={{ uri: tempUri }}
              style={{ width: '100%', height: 300, marginTop: 20 }}
            />
          )
        }

      </ScrollView>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20
  },
  label: {
    fontSize: 18
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.3)',
    height: 45,
    marginTop: 5,
    marginBottom: 10
  }
});
