// Constants with JSX Components
import React from 'react';
import { PetType } from '../types/types';
import { DogIcon, CatIcon, BirdIcon, SmallMammalIcon, OtherPetIcon } from '../components/icons/PetIcons';

// Pet types that are supported by the application
export const PET_TYPES: PetType[] = [
  { id: "dogs", name: "犬", icon: <DogIcon size={42} />, description: "頼れる相棒" },
  { id: "cats", name: "猫", icon: <CatIcon size={42} />, description: "気ままで愛らしい仲間" },
  { id: "birds", name: "鳥", icon: <BirdIcon size={42} />, description: "色鮮やかでおしゃべりな友だち" },
  { id: "small_mammals", name: "小動物", icon: <SmallMammalIcon size={42} />, description: "ハムスター、モルモット、ウサギなど" },
  { id: "other", name: "その他のペット", icon: <OtherPetIcon size={42} />, description: "爬虫類や魚など個性豊かな仲間たち" }
];