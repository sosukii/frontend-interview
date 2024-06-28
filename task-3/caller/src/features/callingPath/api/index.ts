import axios, { AxiosError } from 'axios';
import { fetchCallPathsResponse } from '../model/types';

export async function fetchCallPaths(): Promise<
  fetchCallPathsResponse | AxiosError<unknown>
> {
  try {
    const response = await axios.get('src/shared/api/call-paths.json');
    return response.data.data;
  } catch (e: unknown) {
    return e as AxiosError;
  }
}
