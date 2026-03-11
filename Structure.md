# Octopets - アプリケーション構造ドキュメント

## 目次

- [アプリケーション概要](#アプリケーション概要)
- [全体アーキテクチャ](#全体アーキテクチャ)
- [プロジェクト構成](#プロジェクト構成)
  - [AppHost（オーケストレーション）](#apphost)
  - [Backend（ASP.NET Core API）](#backend)
  - [Frontend（React SPA）](#frontend)
  - [ServiceDefaults（共有基盤）](#servicedefaults)
- [データモデル](#データモデル)
- [API エンドポイント](#api-エンドポイント)
- [フロントエンド画面構成](#フロントエンド画面構成)
- [依存関係](#依存関係)
- [開発・デプロイ構成](#開発デプロイ構成)

---

## アプリケーション概要

**Octopets** は、ペット同伴可能な施設（カフェ、公園、ホテルなど）を検索・共有するための分散型 Web アプリケーションです。ユーザーは施設の閲覧・検索・フィルタリング・レビュー投稿・新規施設登録を行えます。

### 主な機能

- 施設一覧の閲覧とキーワード検索
- ペットの種類・施設タイプによるフィルタリング
- 施設詳細（写真カルーセル、アメニティ、レビュー、連絡先）の表示
- レビューの閲覧・投稿
- 施設の新規登録（CRUD 操作）

### 技術スタック

| レイヤー | 技術 |
|---|---|
| フロントエンド | React 18 / TypeScript / React Router v6 |
| バックエンド | ASP.NET Core 9.0 / Minimal API / Entity Framework Core (InMemory) |
| オーケストレーション | .NET Aspire 9.2 |
| API ドキュメント | OpenAPI / Scalar |
| テスト | Playwright (E2E) |
| デプロイ | Azure Container Apps / Azure Web Apps |
| 監視 | Azure Application Insights / OpenTelemetry |

---

## 全体アーキテクチャ

```
┌──────────────────────────────────────────────────────┐
│                   AppHost (.NET Aspire)               │
│           オーケストレーション・サービスディスカバリ      │
├──────────────────────────┬───────────────────────────┤
│                          │                           │
│  ┌───────────────────┐   │   ┌────────────────────┐  │
│  │   Frontend (React)│   │   │  Backend (ASP.NET) │  │
│  │                   │───┼──▶│                    │  │
│  │  - SPA (React 18) │   │   │  - Minimal API     │  │
│  │  - TypeScript     │   │   │  - EF Core InMemory│  │
│  │  - React Router   │   │   │  - Repository Pattern│ │
│  └───────────────────┘   │   └────────────────────┘  │
│                          │              │            │
│                          │   ┌──────────┴─────────┐  │
│                          │   │  ServiceDefaults    │  │
│                          │   │  - OpenTelemetry    │  │
│                          │   │  - HealthChecks     │  │
│                          │   │  - Resilience       │  │
│                          │   └────────────────────┘  │
└──────────────────────────┴───────────────────────────┘
```

**通信フロー:**

1. **開発環境**: Frontend（React dev server）→ `/api/*` → Backend（Kestrel）
2. **本番環境**: Frontend（nginx）→ `proxy_pass /api/` → Backend（Container Apps）
3. AppHost が .NET Aspire のサービスディスカバリを通じて両サービスを接続

---

## プロジェクト構成

### AppHost

**ディレクトリ:** `apphost/`
**プロジェクトファイル:** `Octopets.AppHost.csproj`
**役割:** .NET Aspire によるアプリケーション全体のオーケストレーション

#### 主要ファイル

| ファイル | 説明 |
|---|---|
| `Program.cs` | サービス登録・構成（Backend API + Frontend の起動制御） |
| `ConfigurationExtensions.cs` | 設定値の必須チェック用拡張メソッド |
| `azure.yaml` | Azure Developer CLI (azd) デプロイ定義 |
| `appsettings.json` | ログレベル設定 |

#### 動作モード

| モード | Frontend の起動方式 | 備考 |
|---|---|---|
| 開発モード (`IsPublishMode = false`) | `AddNpmApp` (React dev server) | CRUD 有効、エラーシミュレーション無効 |
| 本番モード (`IsPublishMode = true`) | `AddDockerfile` (nginx コンテナ) | CRUD 無効、Application Insights 有効 |

---

### Backend

**ディレクトリ:** `backend/`
**プロジェクトファイル:** `Octopets.Backend.csproj`
**ターゲットフレームワーク:** .NET 9.0
**役割:** RESTful API サーバー（Minimal API パターン）

#### ディレクトリ構造

```
backend/
├── Program.cs                    # アプリケーションエントリポイント・DI・ミドルウェア構成
├── Octopets.Backend.csproj       # プロジェクト定義・NuGet 依存関係
├── appsettings.json              # アプリ設定
├── appsettings.Development.json  # 開発環境用設定
├── Data/
│   ├── AppDbContext.cs           # EF Core DbContext（モデル構成・シードデータ）
│   └── DataInitializer.cs        # データベース初期化処理
├── Endpoints/
│   ├── ListingEndpoints.cs       # 施設 CRUD エンドポイント
│   └── ReviewEndpoints.cs        # レビュー CRUD エンドポイント
├── Models/
│   ├── Listing.cs                # 施設エンティティ
│   └── Review.cs                 # レビューエンティティ
├── Repositories/
│   ├── ListingRepository.cs      # 施設リポジトリ実装
│   ├── ReviewRepository.cs       # レビューリポジトリ実装
│   └── Interfaces/
│       ├── IListingRepository.cs # 施設リポジトリインターフェース
│       └── IReviewRepository.cs  # レビューリポジトリインターフェース
└── Properties/
    └── launchSettings.json       # 起動プロファイル
```

#### アーキテクチャパターン

- **Minimal API**: コントローラーを使わず、エンドポイントを直接マッピング
- **Repository パターン**: データアクセスを抽象化（`IListingRepository` / `IReviewRepository`）
- **DI（依存性注入）**: `AddScoped` でリポジトリをサービスコンテナに登録
- **InMemory データベース**: Entity Framework Core の InMemory プロバイダーを使用（永続化なし）
- **シードデータ**: `AppDbContext.OnModelCreating` で 7 件の施設と 13 件のレビューを初期投入

#### 構成詳細（Program.cs）

```
DbContext 登録 (InMemory: "OctopetsDb")
  → JSON シリアライズ設定（循環参照対応）
  → リポジトリ登録 (Scoped)
  → OpenAPI / Scalar 設定
  → CORS 設定（全オリジン許可）
  → エンドポイントマッピング
  → ヘルスチェック・デバッグエンドポイント
```

---

### Frontend

**ディレクトリ:** `frontend/`
**パッケージファイル:** `package.json`
**役割:** ペット同伴施設検索の SPA（シングルページアプリケーション）

#### ディレクトリ構造

```
frontend/
├── package.json                  # npm 依存関係・スクリプト定義
├── tsconfig.json                 # TypeScript コンパイラ設定
├── Dockerfile                    # 本番用マルチステージビルド (node → nginx)
├── nginx.conf                    # nginx リバースプロキシ設定
├── playwright.config.ts          # E2E テスト設定
├── public/
│   ├── index.html                # HTML テンプレート（Google Fonts 読み込み）
│   ├── manifest.json             # PWA マニフェスト
│   └── images/                   # 静的画像アセット
│       ├── generic/              # 汎用画像
│       ├── pets/                 # ペット画像
│       └── venues/               # 施設画像
├── src/
│   ├── App.tsx                   # ルートコンポーネント（Router 構成）
│   ├── index.tsx                 # エントリポイント
│   ├── config/
│   │   └── appConfig.ts          # API URL・モックデータ切替設定
│   ├── data/
│   │   ├── constants.ts          # 定数（施設タイプ, アメニティ, ルート）
│   │   ├── constantsJsx.tsx      # JSX 定数（ペットタイプ + アイコン）
│   │   ├── dataService.ts        # データ取得サービス（Mock / API 切替）
│   │   └── listingsData.ts       # モックデータ（6 件の施設）
│   ├── pages/
│   │   ├── Home.tsx              # ランディングページ
│   │   ├── Listings.tsx          # 施設一覧・検索・フィルタページ
│   │   └── ListingDetails.tsx    # 施設詳細ページ
│   ├── components/
│   │   ├── Navbar.tsx            # ナビゲーションバー
│   │   ├── Footer.tsx            # フッター
│   │   ├── ListingCard.tsx       # 施設カードコンポーネント
│   │   ├── FeatureIcon.tsx       # 機能アイコンラッパー
│   │   ├── FloatingPetIcons.tsx  # 浮遊アニメーションペットアイコン
│   │   ├── PawIcon.tsx           # 肉球 SVG アイコン
│   │   └── icons/
│   │       ├── PetIcons.tsx      # ペット絵文字アイコン (🐶😻🦜🐹🦔)
│   │       ├── SearchIcon.tsx    # 検索 SVG アイコン
│   │       └── SocialIcons.tsx   # SNS アイコン
│   ├── styles/
│   │   ├── variables.css         # CSS カスタムプロパティ
│   │   ├── Home.css              # ホームページスタイル
│   │   ├── Listings.css          # 一覧ページスタイル
│   │   ├── ListingCard.css       # カードスタイル
│   │   ├── ListingDetails.css    # 詳細ページスタイル
│   │   ├── Navbar.css            # ナビバースタイル
│   │   ├── Footer.css            # フッタースタイル
│   │   ├── FloatingPetIcons.css  # アニメーションスタイル
│   │   ├── Button.css            # ボタンスタイル
│   │   ├── Reviews.css           # レビュースタイル
│   │   ├── AddListing.css        # 施設追加フォームスタイル
│   │   ├── modern-components.css # モダンコンポーネントスタイル
│   │   └── utilities.css         # ユーティリティクラス
│   └── types/
│       └── types.ts              # TypeScript 型定義
└── tests/
    └── e2e/
        └── browse-listings.spec.ts  # 施設閲覧 E2E テスト
```

#### ルーティング

| パス | ページコンポーネント | 説明 |
|---|---|---|
| `/` | `Home` | ランディングページ（ヒーロー・ペットタイプ・特集） |
| `/listings` | `Listings` | 施設一覧・検索・フィルタリング |
| `/listing/:id` | `ListingDetails` | 施設詳細（写真・レビュー・連絡先） |

#### データ取得の仕組み

`appConfig.ts` の `useMockData` フラグにより、2 つのデータソースを切り替えます:

- **モックモード** (`REACT_APP_USE_MOCK_DATA=true`): `listingsData.ts` のローカルデータを使用
- **API モード** (`REACT_APP_USE_MOCK_DATA=false`): Backend の `/api/listings` および `/api/reviews` を呼び出し

---

### ServiceDefaults

**ディレクトリ:** `servicedefaults/`
**プロジェクトファイル:** `Octopets.ServiceDefaults.csproj`
**ターゲットフレームワーク:** .NET 9.0
**役割:** .NET Aspire 共有サービス基盤（Backend から参照）

#### 提供機能

| 拡張メソッド | 機能 |
|---|---|
| `AddServiceDefaults()` | OpenTelemetry・ヘルスチェック・サービスディスカバリ・レジリエンスを一括構成 |
| `ConfigureOpenTelemetry()` | ログ・メトリクス・トレースの計装設定 |
| `AddOpenTelemetryExporters()` | OTLP / Azure Monitor エクスポーター構成 |
| `AddDefaultHealthChecks()` | `/health`（全チェック） / `/alive`（liveness）エンドポイント |
| `MapDefaultEndpoints()` | ヘルスチェックエンドポイントのマッピング |

#### 計装対象

- **メトリクス**: ASP.NET Core / HTTP クライアント / .NET ランタイム
- **トレース**: ASP.NET Core / HTTP クライアント
- **ログ**: OpenTelemetry ログエクスポート

---

## データモデル

### Listing（施設）

| プロパティ | 型 | 説明 |
|---|---|---|
| `Id` | `int` | 主キー |
| `Name` | `string` | 施設名 |
| `Description` | `string` | 説明 |
| `Price` | `decimal` | 価格 |
| `Address` | `string?` | 住所 |
| `Location` | `string` | 地域 |
| `Type` | `string?` | 施設タイプ（park, cafe, home, hotel, custom） |
| `AllowedPets` | `List<string>` | 受入可能なペット種類 |
| `Amenities` | `List<string>` | アメニティ一覧 |
| `Rating` | `double` | 評価（0.0〜5.0） |
| `Photos` | `List<string>` | 写真 URL リスト |
| `CreatedAt` | `DateTime` | 作成日時 |
| `UpdatedAt` | `DateTime?` | 更新日時 |
| `Reviews` | `ICollection<Review>` | 関連レビュー（ナビゲーションプロパティ） |

### Review（レビュー）

| プロパティ | 型 | 説明 |
|---|---|---|
| `Id` | `int` | 主キー |
| `ListingId` | `int` | 施設 ID（外部キー） |
| `Reviewer` | `string` | 投稿者名 |
| `Rating` | `int` | 評価（1〜5） |
| `Comment` | `string` | コメント |
| `CreatedAt` | `DateTime` | 作成日時 |
| `Listing` | `Listing?` | 関連施設（ナビゲーションプロパティ） |

### ER 図

```
┌──────────────┐        ┌──────────────┐
│   Listing    │        │    Review     │
├──────────────┤        ├──────────────┤
│ Id (PK)      │◀──┐    │ Id (PK)      │
│ Name         │   └────│ ListingId(FK)│
│ Description  │        │ Reviewer     │
│ Price        │        │ Rating       │
│ Address      │        │ Comment      │
│ Location     │        │ CreatedAt    │
│ Type         │        └──────────────┘
│ AllowedPets  │           1 Listing : N Reviews
│ Amenities    │
│ Rating       │
│ Photos       │
│ CreatedAt    │
│ UpdatedAt    │
└──────────────┘
```

---

## API エンドポイント

### 施設 (Listings)

| メソッド | パス | 説明 | レスポンス |
|---|---|---|---|
| `GET` | `/api/listings/` | 全施設取得 | `200 OK` - 施設一覧 |
| `GET` | `/api/listings/{id}` | 施設詳細取得 | `200 OK` / `404 Not Found` |
| `POST` | `/api/listings/` | 施設新規作成 | `201 Created` |
| `PUT` | `/api/listings/{id}` | 施設更新 | `200 OK` / `404 Not Found` |
| `DELETE` | `/api/listings/{id}` | 施設削除 | `204 No Content` / `404 Not Found` |

### レビュー (Reviews)

| メソッド | パス | 説明 | レスポンス |
|---|---|---|---|
| `GET` | `/api/reviews/` | 全レビュー取得 | `200 OK` - レビュー一覧 |
| `GET` | `/api/reviews/by-listing/{listingId}` | 施設別レビュー取得 | `200 OK` - レビュー一覧 |
| `GET` | `/api/reviews/{id}` | レビュー詳細取得 | `200 OK` / `404 Not Found` |
| `POST` | `/api/reviews/` | レビュー新規作成 | `201 Created` |
| `PUT` | `/api/reviews/{id}` | レビュー更新 | `200 OK` / `404 Not Found` |
| `DELETE` | `/api/reviews/{id}` | レビュー削除 | `204 No Content` / `404 Not Found` |

### システム

| メソッド | パス | 説明 |
|---|---|---|
| `GET` | `/health` | ヘルスチェック（Backend 固有） |
| `GET` | `/alive` | Liveness チェック（ServiceDefaults 由来） |
| `GET` | `/api/debug/info` | デバッグ情報（環境名・OS 情報） |

---

## フロントエンド画面構成

### Home（`/`）

- ヒーローセクション（キャッチコピー + CTA ボタン）
- 浮遊ペットアイコンアニメーション（12個）
- ペットタイプグリッド（犬・猫・鳥・小動物・その他）
- 「Why choose Octopets」特集セクション

### Listings（`/listings`）

- テキスト検索バー（名前・説明・場所で検索）
- ペットタイプフィルタ（ドロップダウン）
- 施設タイプフィルタ
- 施設カード一覧（画像・名前・場所・評価・ペットアイコン）
- ローディング状態表示

### ListingDetails（`/listing/:id`）

- ヒーローヘッダー画像（施設タイプタグ + 評価バッジ）
- 写真カルーセル（前後ナビゲーション付き）
- 受入可能ペット表示（アイコン付き）
- アメニティ一覧
- レビューサマリー
- 連絡先情報（電話・メール・Web サイト）

---

## 依存関係

### Backend（NuGet パッケージ）

| パッケージ | バージョン | 用途 |
|---|---|---|
| `Microsoft.AspNetCore.OpenApi` | 9.0.4 | OpenAPI ドキュメント生成 |
| `Microsoft.EntityFrameworkCore.InMemory` | 9.0.4 | InMemory データベースプロバイダー |
| `Scalar.AspNetCore` | 2.2.5 | API ドキュメント UI（Scalar） |

**プロジェクト参照:** `Octopets.ServiceDefaults`

### AppHost（NuGet パッケージ）

| パッケージ | バージョン | 用途 |
|---|---|---|
| `Aspire.Hosting` | 9.2.1 | .NET Aspire ホスティング基盤 |
| `Aspire.Hosting.AppHost` | 9.2.1 | AppHost SDK |
| `Aspire.Hosting.Azure` | 9.2.1 | Azure リソース統合 |
| `Aspire.Hosting.Azure.AppContainers` | 9.2.1 | Azure Container Apps 統合 |
| `Aspire.Hosting.Azure.ApplicationInsights` | 9.2.1 | Application Insights 統合 |
| `Aspire.Hosting.Docker` | 9.2.0-preview.1 | Docker コンテナサポート |
| `Aspire.Hosting.NodeJs` | 9.2.1 | Node.js アプリケーションホスティング |

**AppHost SDK:** `Aspire.AppHost.Sdk` バージョン 9.2.0
**プロジェクト参照:** `Octopets.Backend`

### ServiceDefaults（NuGet パッケージ）

| パッケージ | バージョン | 用途 |
|---|---|---|
| `Azure.Monitor.OpenTelemetry.AspNetCore` | 1.2.0 | Azure Monitor テレメトリ連携 |
| `Microsoft.Extensions.Http.Resilience` | 9.4.0 | HTTP クライアントレジリエンス（リトライ等） |
| `Microsoft.Extensions.ServiceDiscovery` | 9.2.0 | サービスディスカバリ |
| `OpenTelemetry.Exporter.OpenTelemetryProtocol` | 1.11.2 | OTLP エクスポーター |
| `OpenTelemetry.Extensions.Hosting` | 1.11.2 | OpenTelemetry ホスティング統合 |
| `OpenTelemetry.Instrumentation.AspNetCore` | 1.11.1 | ASP.NET Core 計装 |
| `OpenTelemetry.Instrumentation.Http` | 1.11.1 | HTTP クライアント計装 |
| `OpenTelemetry.Instrumentation.Runtime` | 1.11.1 | .NET ランタイム計装 |

**フレームワーク参照:** `Microsoft.AspNetCore.App`

### Frontend（npm パッケージ）

#### 本番依存関係 (dependencies)

| パッケージ | バージョン | 用途 |
|---|---|---|
| `react` | ^18.2.0 | UI ライブラリ |
| `react-dom` | ^18.2.0 | React DOM レンダリング |
| `react-router-dom` | ^6.15.0 | クライアントサイドルーティング |
| `react-scripts` | 5.0.1 | Create React App ビルドツール |
| `typescript` | ^4.9.5 | TypeScript コンパイラ |
| `@testing-library/dom` | ^7.31.2 | DOM テストユーティリティ |
| `@testing-library/jest-dom` | ^5.16.5 | Jest DOM マッチャー |
| `@testing-library/react` | ^13.4.0 | React テストユーティリティ |
| `@testing-library/user-event` | ^13.5.0 | ユーザーイベントシミュレーション |
| `@types/jest` | ^27.5.2 | Jest 型定義 |
| `@types/react` | ^18.2.21 | React 型定義 |
| `@types/react-dom` | ^18.2.7 | ReactDOM 型定義 |
| `web-vitals` | ^2.1.4 | Web パフォーマンス指標 |

#### 開発依存関係 (devDependencies)

| パッケージ | バージョン | 用途 |
|---|---|---|
| `@playwright/test` | ^1.52.0 | E2E テストフレームワーク |
| `@types/node` | ^22.15.17 | Node.js 型定義 |
| `serve` | ^14.2.4 | 静的ファイルサーバー |

### プロジェクト間依存関係

```
AppHost
├──▶ Backend (ProjectReference)
│     └──▶ ServiceDefaults (ProjectReference)
└──▶ Frontend (NpmApp / Dockerfile)
       └──▶ Backend (HTTP: /api/*)
```

---

## 開発・デプロイ構成

### ローカル開発

```bash
# 全サービスを .NET Aspire で起動
dotnet run --project apphost
```

- AppHost が Backend と Frontend を同時に起動
- Frontend: React dev server (ホットリロード対応)
- Backend: InMemory データベース (シードデータ自動投入)
- Aspire Dashboard でサービス監視可能

### ビルド

```bash
# Backend ビルド
dotnet build backend/Octopets.Backend.csproj

# Frontend ビルド
cd frontend && npm install && npm run build
```

### テスト

```bash
# Frontend E2E テスト
cd frontend && npm run test:e2e
```

### 本番デプロイ（Azure）

- **Azure Developer CLI (azd)** を使用
- `apphost/azure.yaml` でデプロイ構成を定義
- Frontend は Docker (nginx) コンテナとして Azure Container Apps にデプロイ
- Backend は ASP.NET Core アプリとして Azure Container Apps にデプロイ
- Application Insights による監視が自動構成

### 環境変数

| 変数 | プロジェクト | 説明 |
|---|---|---|
| `REACT_APP_USE_MOCK_DATA` | Frontend | `true`: モックデータ使用 / `false`: API 使用 |
| `ERRORS` | Backend | `true`: エラーシミュレーション有効 |
| `ENABLE_CRUD` | Backend | `true`: 作成・更新・削除操作を許可 |
| `PORT` | Frontend (dev) | 開発サーバーのポート番号 |
| `BROWSER` | Frontend (dev) | `none`: ブラウザ自動起動を抑止 |
| `EnableSwagger` | Backend | `true`: 非開発環境でも Scalar UI を有効化 |
