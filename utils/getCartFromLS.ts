import { CartItem } from "@/redux/cart/types";
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function getCartFromLS()  {
    const data = await AsyncStorage.getItem("cart");
    const items = data ? JSON.parse(data) : [];
    const totalPrice = items.reduce((sum:any, obj: CartItem) => {
        return obj.price * obj.count + sum;
    }, 0);
    
    return {
        items,
        totalPrice,
    };
}