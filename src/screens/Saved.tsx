import { Text, View, FlatList, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { CurrencyData } from './Home'
import { Avatar } from 'react-native-paper';
import RenderListItem from '../components/RenderListItem'

const SavedScreen = () => {

  const [favorites, setFavorites] = useState<CurrencyData[]>([]);

  const favoritesList = useSelector((state: RootState) => state.favorites.favorites);

  // Setting the favorites state using the extracted data
  useEffect(() => {
    setFavorites(favoritesList);
  }, [favoritesList]);


  return (
    <ImageBackground source={require('../../assets/arkaplan2.png')} style={{ flex: 1 }} resizeMode='stretch'>

      <View style={{ width:'90%',height:'75%', backgroundColor: '#8D9CF4', opacity:0.95, marginTop:40, alignSelf:'center', borderRadius: 40,paddingTop:20,paddingLeft:10}}>
        <View style={{ height: 60, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 24, color:'white' }}>
            List of Currencies
          </Text>
        </View>
        {favorites.length > 0 ?
          <FlatList
            data={favorites}
            renderItem={({ item, index }) => (
              <RenderListItem
                item={item}
                index={index}
                favorites={favorites}
              />
            )} 
            /> :
          <View style={{ alignSelf: 'center', alignItems: 'center', padding: 100 }}>
            <Text style={{ fontSize: 30, fontWeight: '700', color: 'white', textAlign:'center' }}>
              Favori Yok
            </Text>
            <Avatar.Icon icon={'emoticon-cool'} size={200} style={{ backgroundColor: 'transparent' }} color='white' />
          </View>
        }
      </View>
    </ImageBackground>
  );
};


export default SavedScreen

