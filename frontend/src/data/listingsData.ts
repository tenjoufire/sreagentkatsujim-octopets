// Mock data for pet-friendly listings
import { Listing } from '../types/types';

const listingsData: Listing[] = [
  {
    id: "1",
    name: "パウサム・パーク",
    type: "park",
    location: "123 Park Avenue, New York, NY",
    description: "犬がノーリードで走り回れる専用エリアを備えた広々とした公園です。美しい散歩道と飼い主向けの休憩スペースがあります。",
    allowedPets: ["dogs", "cats"],
    amenities: ["給水スポット", "排泄物回収ステーション", "ベンチ", "日よけスペース"],
    photos: ["park1.jpg", "park2.jpg"],
    rating: 4.7,
    reviews: [
      {
        id: "101",
        userId: "user1",
        userName: "Alex Johnson",
        rating: 5,
        comment: "うちのゴールデンレトリバーがこの公園をとても気に入っています。走り回れるスペースがたっぷりあります。",
        date: "2025-04-15"
      },
      {
        id: "102",
        userId: "user2",
        userName: "Taylor Smith",
        rating: 4,
        comment: "清潔でよく整備されています。夏場にもう少し日陰があるとさらに良いです。",
        date: "2025-04-10"
      }
    ],
    contactInfo: {
      phone: "555-123-4567",
      email: "info@pawsomepark.com",
      website: "https://pawsomepark.com"
    }
  },
  {
    id: "2",
    name: "ウィスカーズ・カフェ",
    type: "cafe",
    location: "456 Main Street, Seattle, WA",
    description: "ペット専用メニューがある居心地の良いカフェです。店内席とテラス席の両方を利用できます。",
    allowedPets: ["dogs", "cats", "small_mammals"],
    amenities: ["ペット用メニュー", "給水ボウル", "ペット用ベッド", "テラス席"],
    photos: ["cafe1.jpg", "cafe2.jpg"],
    rating: 4.5,
    reviews: [
      {
        id: "201",
        userId: "user3",
        userName: "Jamie Lee",
        rating: 5,
        comment: "犬用のおやつも、人向けのおいしいコーヒーもあって大満足です。",
        date: "2025-04-18"
      },
      {
        id: "202",
        userId: "user4",
        userName: "Casey Morgan",
        rating: 4,
        comment: "猫が専用ベッドでくつろいでいました。スタッフの対応もとても親切です。",
        date: "2025-04-05"
      }
    ],
    contactInfo: {
      phone: "555-987-6543",
      email: "hello@whiskerscafe.com",
      website: "https://whiskerscafe.com"
    }
  },
  {
    id: "3",
    name: "ペット・ヘイブン・ホーム",
    type: "home",
    location: "789 Oak Road, San Francisco, CA",
    description: "フェンス付きの庭やペットドアを備えた、ペット連れにうれしい設備がそろった美しい宿泊施設です。",
    allowedPets: ["dogs", "cats", "birds", "small_mammals"],
    amenities: ["フェンス付きの庭", "ペットドア", "ペット用ベッド", "給餌スペース", "ペット用おもちゃ"],
    photos: ["home1.jpg", "home2.jpg"],
    rating: 4.9,
    reviews: [
      {
        id: "301",
        userId: "user5",
        userName: "Jordan Riley",
        rating: 5,
        comment: "これまでで一番良かったペット同伴宿です。うちの犬たちは庭をとても気に入っていました。",
        date: "2025-03-28"
      },
      {
        id: "302",
        userId: "user6",
        userName: "Riley Chen",
        rating: 5,
        comment: "うちのセキセイインコも快適に過ごせました。いろいろなペットへの配慮が行き届いています。",
        date: "2025-03-15"
      }
    ],
    contactInfo: {
      phone: "555-234-5678",
      email: "stay@pethavenhome.com",
      website: "https://pethavenhome.com"
    }
  },
  {
    id: "4",
    name: "ペッツ＆ピローズ・ホテル",
    type: "hotel",
    location: "101 Sunset Blvd, Los Angeles, CA",
    description: "大小さまざまなペットを歓迎する高級ホテルです。散歩やグルーミングなどの特別サービスも利用できます。",
    allowedPets: ["dogs", "cats", "birds"],
    amenities: ["ペットスパ", "散歩サービス", "ペット用メニュー", "ペットシッター", "ペット用ベッド"],
    photos: ["hotel1.jpg", "hotel2.jpg"],
    rating: 4.8,
    reviews: [
      {
        id: "401",
        userId: "user7",
        userName: "Sam Wilson",
        rating: 5,
        comment: "うちの犬を特別扱いしてくれました。ペット向けのルームサービスまであります。",
        date: "2025-04-02"
      },
      {
        id: "402",
        userId: "user8",
        userName: "Jesse Taylor",
        rating: 4.5,
        comment: "ペット向け設備はとても充実していますが、少し高めです。",
        date: "2025-03-20"
      }
    ],
    contactInfo: {
      phone: "555-876-5432",
      email: "reservations@petsandpillows.com",
      website: "https://petsandpillows.com"
    }
  },
  {
    id: "5",
    name: "ファーリー・フレンズ・ストア",
    type: "custom",
    location: "246 Cherry Lane, Chicago, IL",
    description: "ペットが自由に遊べるプレイエリア付きのショップです。おもちゃを試したり、ほかの動物と触れ合ったりできます。",
    allowedPets: ["dogs", "cats", "small_mammals", "birds", "other"],
    amenities: ["プレイエリア", "おやつバー", "給水スポット", "ペット向けイベント"],
    photos: ["store1.jpg", "store2.jpg"],
    rating: 4.6,
    reviews: [
      {
        id: "501",
        userId: "user9",
        userName: "Taylor Kim",
        rating: 5,
        comment: "フェレットがプレイエリアをとても気に入っていました。珍しいペットにも詳しいスタッフがいて安心です。",
        date: "2025-04-12"
      },
      {
        id: "502",
        userId: "user10",
        userName: "Alex Rivera",
        rating: 4,
        comment: "いろいろな種類のペット向け商品がそろっています。",
        date: "2025-04-08"
      }
    ],    contactInfo: {
      phone: "555-345-6789",
      email: "shop@furryfriendsstore.com",
      website: "https://furryfriendsstore.com"
    }
  },
  {
    id: "6",
    name: "ムーチズ・ミャオ",
    type: "cafe",
    location: "789 Banana Street, Miami, FL",
    description: "バナナの装飾やモンキー風のスイーツに囲まれてコーヒーを楽しめる、個性的なモンキーテーマのカフェです。ユニークな空間が好きな人とペットにぴったりです。",
    allowedPets: ["dogs", "cats", "small_mammals", "other"],
    amenities: ["バナナ風おやつ", "モンキーテーマの遊び場", "登り木風の遊具", "トロピカルな空間", "ペット同伴席"],
    photos: ["moochs1.jpg", "moochs2.jpg"],
    rating: 5.0,
    reviews: [
      {
        id: "601",
        userId: "user11",
        userName: "Charlie Simmons",
        rating: 5,
        comment: "とても楽しい雰囲気です。犬がバナナ型のおやつを気に入っていて、スタッフも最高でした。",
        date: "2025-04-28"
      },
      {
        id: "602",
        userId: "user12",
        userName: "Morgan Patel",
        rating: 5,
        comment: "モンキーテーマがとにかくかわいいです。いろいろな動物向けの配慮があって、ペット連れにぴったりです。",
        date: "2025-04-22"
      },
      {
        id: "603",
        userId: "user13",
        userName: "Sam Washington",
        rating: 5,
        comment: "過去最高のカフェ体験でした。猫が遊具を気に入っていて、モンキーテーマのラテも最高でした。",
        date: "2025-05-01"
      }
    ],
    contactInfo: {
      phone: "555-111-2222",
      email: "hello@moochsmeow.com",
      website: "https://moochsmeow.com"
    }
  }
];

export default listingsData;
