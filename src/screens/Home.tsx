import { FlatList, ImageBackground, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal, Portal, TextInput, List, Avatar, Divider, Button } from 'react-native-paper';
import { generateColor } from '../utils/util';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import RenderListItem from '../components/RenderListItem';


export type CurrencyData = {
    currencyCode: string,
    conversionRate: number
}

const HomeScreen = () => {

    const [data, setData] = useState<CurrencyData[]>([]);

    const [firstCurrencyCode, setFirstCurrencyCode] = useState<string>("USD")
    const [secondCurrencyCode, setSecondCurrencyCode] = useState<string>("TRY")
    const [firstValue, setFirstValue] = useState<number>(0)
    const [secondValue, setSecondValue] = useState<number>(0)

    const [chosenValue, setChosenValue] = useState<string>("")

    const [isVisible, setIsVisible] = useState<boolean>(false)

    const favorites = useSelector((state: RootState) => state.favorites.favorites)

    const openModal = () => {
        setIsVisible(true)
    }

    const closeModal = () => {
        setIsVisible(false)
    }

    const chooseCurrency = (currencyCode: string) => {
        if (chosenValue === "first") {
            setFirstCurrencyCode(currencyCode)
        } else {
            setSecondCurrencyCode(currencyCode)
        }
        setFirstValue(0)
        setSecondValue(0)
        closeModal()
    }

    const replaceCurrencies = () => {
        let tempCurrency = firstCurrencyCode
        setFirstCurrencyCode(secondCurrencyCode)
        setSecondCurrencyCode(tempCurrency)
        setFirstValue(0)
        setSecondValue(0)
    }

    const convert = (value: number) => {
        const firstCurrencyValue = data.find((cd: CurrencyData) => cd.currencyCode === firstCurrencyCode)?.conversionRate
        const secondCurrencyValue = data.find((cd: CurrencyData) => cd.currencyCode === secondCurrencyCode)?.conversionRate

        if (secondCurrencyValue && firstCurrencyValue) {
            const convertedValue = (value * secondCurrencyValue) / firstCurrencyValue
            setSecondValue(convertedValue)
        }
    }

    //WE TAKE THE DATA AND CONVERT IT TO LIST.
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_0JE7UWNjAtMPsn0b1ZyxzPq7vFXa8XJv3zCRteuP");
            const newData: CurrencyData[] = Object.entries(response.data.data).map(([currencyCode, conversionRate]) => ({
                currencyCode,
                conversionRate: conversionRate as number,
            }));
            setData(newData);
        };
        getData();
    }, []);


    const RenderModalItem = ({ item }: { item: CurrencyData }) => {
        return (
            <View>
                <List.Item
                    title={item.currencyCode}
                    left={() => <Avatar.Text label={item.currencyCode} size={50} style={{ backgroundColor: generateColor() }} labelStyle={{ fontSize: 20 }} />}
                    onPress={() => chooseCurrency(item.currencyCode)}
                />
                <Divider />
            </View>
        )
    }

    return (
        <ImageBackground source={require('../../assets/arkaplan2.png')} style={{ flex: 1 }} resizeMode='stretch'>

            <View style={{ flex: 1, justifyContent: 'center', opacity:0.95 }}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1 }}>
                        {/* LOGO */}
                        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar.Icon icon={'currency-eur'} size={60} style={{ backgroundColor: '#8D9CF4' }} />
                            <Avatar.Icon icon={'currency-gbp'} size={60} style={{ backgroundColor: '#C8C7FF' }} />
                            <Avatar.Icon icon={'currency-usd'} size={60} style={{ backgroundColor: '#8D9CF4' }} />
                        </View>

                        <View style={{ flex: 3, flexDirection: 'row' }}>
                            {/* VALUE BOXES */}
                            <View style={{ flex: 4, paddingLeft: 15 }} >
                                <View style={{ width: '90%', flexDirection: 'row', padding: 15 }}>
                                    <TextInput
                                        value={firstValue.toString()}
                                        maxLength={9}
                                        onChangeText={text => {
                                            const newValue = text === "" ? 0 : Number(text)
                                            setFirstValue(() => {
                                                convert(newValue)
                                                return newValue
                                            })
                                        }}

                                        keyboardType='numeric'
                                        style={{ width: '90%', textAlign: 'center' }} />
                                    <Button onPress={() => {
                                        setChosenValue("first")
                                        openModal()
                                    }}
                                        style={{ borderRadius: 0, backgroundColor: 'lightgray', padding: 10, width:80 }}>
                                        {firstCurrencyCode}
                                    </Button>
                                </View>
                                <View style={{ width: '90%', flexDirection: 'row', padding: 15 }}>
                                    <TextInput readOnly
                                        value={secondValue.toString()}
                                        style={{ backgroundColor: '#8D9CF4', width: '90%', textAlign: 'center' }} />
                                    <Button onPress={() => {
                                        setChosenValue("second")
                                        openModal()
                                    }}
                                        style={{ borderRadius: 0, backgroundColor: 'lightgray', padding: 10, width:80 }}>
                                        {secondCurrencyCode}
                                    </Button>
                                </View>
                            </View>

                            {/* REPLACE BUTTON */}
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Button onPress={replaceCurrencies} >
                                    <Avatar.Icon icon={"arrow-u-left-top-bold"} size={50} color='white' style={{ backgroundColor: '#8D9CF4' }} />
                                </Button>
                            </View>
                        </View>

                    </View>
                </TouchableWithoutFeedback>

                {/* LİST OF CURRENCIES */}
                <View style={{ flex: 1, backgroundColor: '#8D9CF4', borderTopRightRadius: 40, borderTopLeftRadius: 40, marginTop: 40, paddingLeft: 20 }}>
                    <View style={{ padding:10, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
                            List of Currencies
                        </Text>
                    </View>
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => (
                            <RenderListItem
                                item={item}
                                index={index}
                                favorites={favorites}
                            />
                        )} />
                </View>

                {/* MODAL */}
                <Portal>
                    <Modal visible={isVisible} onDismiss={closeModal} contentContainerStyle={{ backgroundColor: 'linen', padding: 20, height: '70%',alignSelf:'center', width:'90%',borderRadius:30 }} >
                        <View style={{ height: 60, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
                                List of Currencies
                            </Text>
                        </View>
                        <FlatList
                            data={data}
                            renderItem={RenderModalItem} />
                    </Modal>
                </Portal>

            </View>

        </ImageBackground>

    );

}

export default HomeScreen

