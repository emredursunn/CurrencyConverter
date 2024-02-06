import React from 'react';
import { CurrencyData } from '../screens/Home';
import { List, Avatar, Divider, Button, Icon, } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { add, remove } from '../redux/favoritesSlice';
import { Text, View } from 'react-native';

interface RenderListItemProps {
    item: CurrencyData;
    index: number;
    favorites: CurrencyData[];
}

const RenderListItem: React.FC<RenderListItemProps> = ({ item, index, favorites }) => {
    const dispatch = useDispatch();
    const isFavorite = favorites.includes(item);

    const handleToggleFavorite = () => {
        if (isFavorite) {
            dispatch(remove(item));
        } else {
            dispatch(add(item));
        }
    };

    return (
        <View key={index}>
            <List.Item
                title={item.currencyCode}
                titleStyle={{ fontWeight: '600' }}
                left={() => <Avatar.Text label={item.currencyCode} size={50} style={{ backgroundColor: index % 2 === 0 ? '#FFF4E0' : '#C8C7FF' }} labelStyle={{ fontSize: 20, fontWeight: '500' }} />}
                right={() => <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ padding: 10, fontWeight: '600' }}>{item.conversionRate}</Text>
                    <Button onPress={handleToggleFavorite}>
                        <Icon source={isFavorite ? "bookmark" : "bookmark-outline"}
                            size={30}
                        />
                    </Button>
                </View>
                }
            />
            <Divider />
        </View>
    )
};

export default RenderListItem