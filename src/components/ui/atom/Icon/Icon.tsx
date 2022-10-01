import SettingSVG from '@src/components/ui/atom/Icon/assets/Setting';
import React, { FC } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BiVideo } from 'react-icons/bi';
import { BsCameraFill, BsHouseDoor, BsPlus } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { FaBabyCarriage, FaSearch } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoPeopleOutline } from 'react-icons/io5';

import AlbumSvg from './assets/Album';
import AlbumSelectedSvg from './assets/AlbumSelected';
import AppleLogo from './assets/AppleLogo';
import CommentSvg from './assets/Comment';
import EllipticVerticalSvg from './assets/EllipticVertical';
import GoogleLogo from './assets/GoogleLogo';
import KakaoLogo from './assets/KakaoLogo';
import ProfileSvg from './assets/Profile';
import ProfileSelectedSvg from './assets/ProfileSelected';
import ShareSvg from './assets/Share';
import StarSvg from './assets/Star';
import UploadSVG from './assets/Upload';

export type SVGTypes =
  | 'setting'
  | 'upload'
  | 'close'
  | 'comment'
  | 'share'
  | 'album'
  | 'album-selected'
  | 'profile'
  | 'profile-selected'
  | 'star'
  | 'house'
  | 'plus'
  | 'plusCircle'
  | 'camera'
  | 'video'
  | 'hamburger'
  | 'search'
  | 'leftArrow'
  | 'rightArrow'
  | 'ellipsisVertical'
  | 'babyCarriage'
  | 'people'
  | 'google'
  | 'apple'
  | 'kakao';

export type IconProps = {
  name: SVGTypes;
  size?: number;
  className?: string;
};

const _Selector: { [key in SVGTypes]: FC<IconProps> } = {
  setting: SettingSVG,
  upload: UploadSVG,
  close: CgClose,
  comment: CommentSvg,
  share: ShareSvg,
  album: AlbumSvg,
  'album-selected': AlbumSelectedSvg,
  profile: ProfileSvg,
  'profile-selected': ProfileSelectedSvg,
  star: StarSvg,
  house: BsHouseDoor,
  plus: BsPlus,
  plusCircle: AiOutlinePlusCircle,
  camera: BsCameraFill,
  video: BiVideo,
  hamburger: GiHamburgerMenu,
  search: FaSearch,
  leftArrow: IoIosArrowBack,
  rightArrow: IoIosArrowForward,
  ellipsisVertical: EllipticVerticalSvg,
  babyCarriage: FaBabyCarriage,
  people: IoPeopleOutline,
  google: GoogleLogo,
  apple: AppleLogo,
  kakao: KakaoLogo,
};

const Icon: FC<IconProps> = ({ name, ...props }) => {
  const IconComponent = _Selector[name];
  return <IconComponent className="pointer-events-none" name={name} {...props} />;
};

export default Icon;
