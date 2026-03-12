// Constants for the application
import { ListingType } from '../types/types';

// Listing types that are supported by the application
export const LISTING_TYPES: ListingType[] = [
  { id: "park", name: "公園", icon: "🌳", description: "ペットが走って遊べる開放的なスペース" },
  { id: "cafe", name: "カフェ", icon: "☕", description: "ペットと一緒に飲食を楽しめる場所" },
  { id: "home", name: "宿泊施設", icon: "🏠", description: "ペット歓迎の宿泊先" },
  { id: "hotel", name: "ホテル", icon: "🏨", description: "ペットと宿泊できる施設" },
  { id: "custom", name: "その他の施設", icon: "🏢", description: "そのほかのペットフレンドリーなスポット" }
];

// Common amenities that can be selected when adding a new venue
export const AMENITIES: string[] = [
  "給水スポット",
  "ペット用ベッド",
  "ノーリードエリア",
  "排泄物回収ステーション",
  "ペット用メニュー・おやつ",
  "ペットシッターサービス",
  "屋外席",
  "ペット用遊具",
  "フェンス付きエリア",
  "散歩コース",
  "グルーミング設備",
  "ペット向け応急ケア",
  "ペットショップ"
];

// Application routes
export const ROUTES: Record<string, string> = {
  HOME: "/",
  LISTINGS: "/listings",
  LISTING_DETAILS: "/listing/:id",
  ADD_LISTING: "/add-listing",
  REVIEWS: "/reviews/:id"
};
