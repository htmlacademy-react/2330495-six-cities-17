import { useAppSelector } from '.';
import { RootState } from '../types/state';
import { AuthorizationStatus } from '../const';

export const useAuthorizationStatus = (): AuthorizationStatus =>
  useAppSelector((state: RootState) => state.authorizationStatus);
