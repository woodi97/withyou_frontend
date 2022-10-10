import { parseExtUtil } from '@src/utils/parseUtil';
import { ToastError, ToastWarn } from '@src/utils/toast';
import axios from 'axios';
import qs from 'qs';

import { CommonApiError, isAxiosError } from '../types/axios-error';

interface GetProfileUploadUrlRequest {
  s3Url: string;
  fileName: string;
  keys: qs.ParsedQs;
}

export const apiGetPresignedUrl = async (fileName: string): Promise<GetProfileUploadUrlRequest> => {
  try {
    const { data } = await axios.get<Omit<GetProfileUploadUrlRequest, 'keys'>>(
      '/user/profile/upload-url',
      {
        params: {
          contentType: parseExtUtil(fileName),
        },
      }
    );
    // parse url
    const keys = qs.parse(data.s3Url.split('?')[1]);
    return {
      ...data,
      keys,
    };
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
