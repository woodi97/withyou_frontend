import { SignInResult, ValidateResult } from '@src/core/types/auth-type';
import { CommonApiError, isAxiosError } from '@src/core/types/axios-error';
import { setAuthToken } from '@src/utils/authUtil';
import { ToastError, ToastWarn } from '@src/utils/toast';
import axios from 'axios';

import { apiGetPresignedUrl } from './apiUtil';

export const apiValidate = async () => {
  try {
    const { data } = await axios.get<ValidateResult>('/auth/validate');
    return data;
  } catch (err) {
    ToastError('error occured during validation process');
    throw err;
  }
};

export const apiKakaoSignIn = async ({ accessToken }: { accessToken: string }) => {
  try {
    const { data } = await axios.post<SignInResult>('/auth/kakao/callback', {
      accessToken,
    });
    setAuthToken(data.jwtToken);
  } catch (err) {
    if (isAxiosError<CommonApiError>(err)) {
      const { message, error } = err.response.data;
      ToastWarn(message);
      throw new Error(error);
    } else {
      ToastError('error occured during kakao signin process');
      throw err;
    }
  }
};

interface UploadProfileInfoRequest {
  imageFile: File;
  role: string;
  nickname: string;
}

export const apiUploadProfileInfo = async ({
  imageFile,
  role,
  nickname,
}: UploadProfileInfoRequest) => {
  console.log(axios.defaults.headers);
  try {
    const presignUrl = await apiGetPresignedUrl(imageFile.name);
    const s3FormData = new FormData();
    // append policy
    s3FormData.append('Content-Type', imageFile.type);
    Object.entries(presignUrl.keys).forEach(([key, value]) => {
      s3FormData.append(key, value as string);
    });
    // append file
    s3FormData.append('file', imageFile);

    await axios.put(presignUrl.s3Url, s3FormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {}
  // give gender as empty string
};
