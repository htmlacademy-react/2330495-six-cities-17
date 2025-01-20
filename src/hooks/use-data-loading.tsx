import { RootState} from '../types/state';
import { useAppSelector } from './index';


export const useDataLoading = (): boolean => useAppSelector((state: RootState) => state.isDataLoading);

