import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, SearchProductParams } from './types';

export const fetchProducts = createAsyncThunk<Product[], SearchProductParams>(
  'products/fetchProducts',
  async (params, { rejectWithValue }) => {
    try {
      const { order, tag, search } = params;
      
      // Формируем параметры правильно
      const requestParams = {
        ...(order && { 
          sortBy: 'price',
          order 
        }),
        ...(search && { title: search }),
        ...(tag && tag !== "Все" && { tags: tag }) 
      };

      console.log("Отправляемые параметры:", requestParams);

      const res = await axios.get<Product[]>('https://687a7f48abb83744b7ed1315.mockapi.io/foods', {
        params: requestParams
      });

      console.log("Полный URL запроса:", res.config.url);
      return res.data;

    } catch (error) {
      return rejectWithValue('Ошибка загрузки данных');
    }
  }
);