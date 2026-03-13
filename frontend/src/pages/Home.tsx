import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LISTING_TYPES, ROUTES } from '../data/constants';
import { PET_TYPES } from '../data/constantsJsx';
import '../styles/Home.css';

const Home: React.FC = () => {
  const [randomPetImage, setRandomPetImage] = useState<string>('/images/generic/doggo.jpg');
  useEffect(() => {
    // List of pet images available in the public/images/pets directory
    const petImages = [
      'bunny.jpg', 'cat1.jpg', 'cat2.jpg', 'cat3.jpg', 'dog-9.jpg',
      'dog1.png', 'dog3.jpg', 'dog4.png', 'dog5.jpg',
      'dog6.png', 'dog7.jpg', 'dog8.jpg', 'dog10.jpg', 'hedgehog.jpg'
    ];

    // Create a more robust random selection using a combination of current time
    // and crypto random values (if available)
    let randomIndex;
    if (window.crypto && window.crypto.getRandomValues) {
      // Use cryptographically strong random number generator when available
      const randomBuffer = new Uint32Array(1);
      window.crypto.getRandomValues(randomBuffer);
      randomIndex = randomBuffer[0] % petImages.length;
    } else {
      // Fallback to Math.random() with time-based seed influence
      const timeInfluence = Date.now() % petImages.length;
      randomIndex = Math.floor(Math.random() * petImages.length);
      // Combine the two sources of randomness
      randomIndex = (randomIndex + timeInfluence) % petImages.length;
    }

    // Select a random image from the array using the generated index
    const randomImage = petImages[randomIndex];
    setRandomPetImage(`/images/pets/${randomImage}`);
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>ぴったりの<br />ペット同伴スポットを見つけよう</h1>
          <p>犬、猫、鳥、小動物など、大切な仲間と楽しめる場所を見つけて共有できます。</p>
          <div className="hero-buttons">
            <Link to={ROUTES.LISTINGS} className="btn btn-outline">スポットを見る</Link>
          </div>
        </div>
        <div className="floating-pet-icons-container">
          <div className="floating-pet-icon" style={{ top: '15%', left: '10%', '--scale': '1.35', '--start-opacity': '1', '--mid-opacity': '0.3', animationDelay: '0s', animationDuration: '18s' } as React.CSSProperties}>🐶</div>
          <div className="floating-pet-icon" style={{ top: '65%', left: '15%', '--scale': '0.9', '--start-opacity': '0.4', '--mid-opacity': '1', animationDelay: '-3s', animationDuration: '22s' } as React.CSSProperties}>🐱</div>
          <div className="floating-pet-icon" style={{ top: '30%', left: '85%', '--scale': '1.5', '--start-opacity': '0.7', '--mid-opacity': '0.2', animationDelay: '-7s', animationDuration: '25s' } as React.CSSProperties}>🐰</div>
          <div className="floating-pet-icon" style={{ top: '70%', left: '80%', '--scale': '0.75', '--start-opacity': '0.3', '--mid-opacity': '0.9', animationDelay: '-12s', animationDuration: '20s' } as React.CSSProperties}>🐢</div>
          <div className="floating-pet-icon" style={{ top: '20%', left: '45%', '--scale': '0.6', '--start-opacity': '0.2', '--mid-opacity': '1', animationDelay: '-15s', animationDuration: '23s' } as React.CSSProperties}>🐦</div>
          <div className="floating-pet-icon" style={{ top: '75%', left: '50%', '--scale': '1.25', '--start-opacity': '0.9', '--mid-opacity': '0.4', animationDelay: '-8s', animationDuration: '19s' } as React.CSSProperties}>🦊</div>
          <div className="floating-pet-icon" style={{ top: '40%', left: '20%', '--scale': '0.85', '--start-opacity': '0.5', '--mid-opacity': '1', animationDelay: '-14s', animationDuration: '21s' } as React.CSSProperties}>🐹</div>
          <div className="floating-pet-icon" style={{ top: '55%', left: '30%', '--scale': '1.15', '--start-opacity': '0.8', '--mid-opacity': '0.3', animationDelay: '-6s', animationDuration: '24s' } as React.CSSProperties}>🦜</div>
          <div className="floating-pet-icon" style={{ top: '25%', left: '70%', '--scale': '0.95', '--start-opacity': '0.3', '--mid-opacity': '0.8', animationDelay: '-11s', animationDuration: '17s' } as React.CSSProperties}>🦔</div>

          {/* Additional icons that always start faded out and then appear */}
          <div className="floating-pet-icon" style={{ top: '62%', left: '75%', '--scale': '1.4', '--start-opacity': '0', '--mid-opacity': '0.9', animationDelay: '-5s', animationDuration: '26s' } as React.CSSProperties}>🐠</div>
          <div className="floating-pet-icon" style={{ top: '33%', left: '22%', '--scale': '1.6', '--start-opacity': '0', '--mid-opacity': '0.85', animationDelay: '-9s', animationDuration: '24s' } as React.CSSProperties}>🦁</div>
          <div className="floating-pet-icon" style={{ top: '18%', left: '65%', '--scale': '0.7', '--start-opacity': '0', '--mid-opacity': '0.7', animationDelay: '-13s', animationDuration: '22s' } as React.CSSProperties}>🦎</div>
        </div>
        <div className="hero-decoration">
          <div className="hero-circle hero-circle-yellow"></div>
        </div>
      </section>

      <section className="content">
        <section className="pet-types">
          <div className="section-header">
            <h2>ペットに合う場所を探す</h2>
            <p>ペット同伴で行ける場所探しを、もっと簡単に、もっと楽しく。</p>
          </div>
          <div className="pet-types-grid">
            {PET_TYPES.map(pet => (
              <Link
                to={`${ROUTES.LISTINGS}?petType=${pet.id}`}
                key={pet.id}
                className="pet-type-card"
              >
                <div className="pet-circle">
                  <span className="pet-icon">{pet.icon}</span>
                </div>
                <h3>{pet.name}</h3>
              </Link>
            ))}
          </div>
        </section>        <section className="why-section">
          {/* Floating polaroid photos container */}
          <div className="floating-polaroids-container">
            {/* Polaroids arranged in a circular fashion around the "Why choose Octopets" section */}
            {/* Top polaroids (12 o'clock position) */}
            <div className="polaroid polaroid-1" style={{ top: '-18%', left: 'calc(50% - 120px)', transform: 'rotate(-5deg)', animationDelay: '-15s', '--rotate': '-5deg' } as React.CSSProperties}>
              <img src={`${process.env.PUBLIC_URL}/images/pets/bunny.jpg`} alt="元気なウサギ" />
              <p>ぴょんっと楽しい時間</p>
            </div>
            {/* Top-right polaroids (1-2 o'clock position) */}
            <div className="polaroid polaroid-2" style={{ top: '-6%', right: '18%', transform: 'rotate(7deg)', animationDelay: '-29s', '--rotate': '7deg' } as React.CSSProperties}>
              <img src={`${process.env.PUBLIC_URL}/images/pets/dog7.jpg`} alt="くつろぐ犬" />
              <p>のんびり肉球タイム</p>
            </div>
            {/* Right-bottom polaroids (4-5 o'clock position) */}
            <div className="polaroid polaroid-4" style={{ top: '19%', right: '4%', transform: 'rotate(4deg)', animationDelay: '-33s', '--rotate': '4deg' } as React.CSSProperties}>
              <img src={`${process.env.PUBLIC_URL}/images/pets/cat1.jpg`} alt="くつろぐ猫" />
              <p>にゃんともいい瞬間</p>
            </div>
            {/* Bottom-right polaroids (5-6 o'clock position) */}
            <div className="polaroid polaroid-5" style={{ top: '49%', right: '8%', transform: 'rotate(-8deg)', animationDelay: '-21s', '--rotate': '-8deg' } as React.CSSProperties}>
              <img src={`${process.env.PUBLIC_URL}/images/pets/hedgehog.jpg`} alt="ハリネズミ" />
              <p>ちいさな冒険家</p>
            </div>

            {/* Bottom polaroids (6 o'clock position) */}
            <div className="polaroid polaroid-1" style={{ bottom: '-6%', right: '18%', transform: 'rotate(6deg)', animationDelay: '-37s', '--rotate': '6deg' } as React.CSSProperties}>
              <img src={`${process.env.PUBLIC_URL}/images/pets/dog5.jpg`} alt="散歩中の犬" />
              <p>ひなたの散歩道</p>
            </div>
            {/* Bottom-left polaroids (7-8 o'clock position) */}
            <div className="polaroid polaroid-2" style={{ bottom: '-18%', left: 'calc(50% - 120px)', transform: 'rotate(-4deg)', animationDelay: '-25s', '--rotate': '-4deg' } as React.CSSProperties}>
              <img src={`${process.env.PUBLIC_URL}/images/pets/dog3.jpg`} alt="仲良しの犬" />
              <p>ずっと仲良し</p>
            </div>
            {/* Left-bottom polaroids (8-9 o'clock position) */}
            <div className="polaroid polaroid-3" style={{ bottom: '-8%', left: '18%', transform: 'rotate(9deg)', animationDelay: '-51s', '--rotate': '9deg' } as React.CSSProperties}>
              <img src={`${process.env.PUBLIC_URL}/images/pets/dog10.jpg`} alt="眠そうな犬" />
              <p>すやすやタイム</p>
            </div>
            {/* Left polaroids (9 o'clock position) */}
            <div className="polaroid polaroid-4" style={{ top: '49%', left: '8%', transform: 'rotate(-7deg)', animationDelay: '-19s', '--rotate': '-7deg' } as React.CSSProperties}>
              <img src={`${process.env.PUBLIC_URL}/images/pets/dog6.png`} alt="元気な子犬" />
              <p>ごきげんな一日</p>
            </div>
            {/* Top-left polaroids (10-11 o'clock position) */}
            <div className="polaroid polaroid-5" style={{ top: '19%', left: '4%', transform: 'rotate(5deg)', animationDelay: '-39s', '--rotate': '5deg' } as React.CSSProperties}>
              <img src={`${process.env.PUBLIC_URL}/images/pets/cat2.jpg`} alt="窓辺の猫" />
              <p>窓辺の見張り番</p>
            </div>
            {/* Inner circle polaroids - offset but not too close to center to avoid feature cards */}
            <div className="polaroid polaroid-1" style={{ top: '-6%', left: '18%', transform: 'rotate(-3deg)', animationDelay: '-47s', '--rotate': '-3deg' } as React.CSSProperties}>
              <img src={`${process.env.PUBLIC_URL}/images/pets/cat3.jpg`} alt="好奇心旺盛な猫" />
              <p>気になるものだらけ</p>
            </div>
            <div className="polaroid polaroid-2" style={{ top: '8%', left: '28%', transform: 'rotate(2deg)', animationDelay: '-31s', '--rotate': '2deg' } as React.CSSProperties}>
              <img src={`${process.env.PUBLIC_URL}/images/pets/dog8.jpg`} alt="庭で過ごす犬" />
              <p>庭でひと休み</p>
            </div>
            <div className="polaroid polaroid-3" style={{ top: '8%', right: '28%', transform: 'rotate(-2deg)', animationDelay: '-27s', '--rotate': '-2deg' } as React.CSSProperties}>
              <img src={`${process.env.PUBLIC_URL}/images/pets/dog4.png`} alt="公園で遊ぶ犬" />
              <p>公園で大冒険</p>
            </div>
            <div className="polaroid polaroid-4" style={{ bottom: '11%', right: '28%', transform: 'rotate(3deg)', animationDelay: '-23s', '--rotate': '3deg' } as React.CSSProperties}>
              <img src={`${process.env.PUBLIC_URL}/images/pets/dog-9.jpg`} alt="秋の景色と犬" />
              <p>秋のおでかけ日和</p>
            </div>
            {/* New polaroids added with deeper positioning */}
            <div className="polaroid polaroid-5" style={{ bottom: '4%', left: '37%', transform: 'rotate(-5deg)', animationDelay: '-18s', '--rotate': '-5deg' } as React.CSSProperties}>
              <img src={`${process.env.PUBLIC_URL}/images/pets/dog11.png`} alt="寄り添う犬" />
              <p>ぬくもりのおとも</p>
            </div>
            <div className="polaroid polaroid-1" style={{ bottom: '12%', left: '26%', transform: 'rotate(4deg)', animationDelay: '-42s', '--rotate': '4deg' } as React.CSSProperties}>
              <img src={`${process.env.PUBLIC_URL}/images/pets/dog12.jpg`} alt="探索中の犬" />
              <p>わくわく探索中</p>
            </div>
          </div>

          <div className="section-header">
            <h2>Octopetsを選ぶ理由</h2>
            <p>ペットと行ける場所探しを、もっと身近で楽しい体験にします。</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-title">
                <span className="feature-icon">🔎</span>
                <h3>見つける</h3>
              </div>
              <p>ほかの飼い主がおすすめする、安心して使えるペット同伴スポットを探せます。</p>
            </div>
            <div className="feature-card">
              <div className="feature-title">
                <span className="feature-icon">🤝</span>
                <h3>つながる</h3>
              </div>
              <p>ペット好きのコミュニティと体験談やコツを共有できます。</p>
            </div>
            <div className="feature-card">
              <div className="feature-title">
                <span className="feature-icon">⭐</span>
                <h3>評価する</h3>
              </div>
              <p>レビューや評価を通じて、ほかのユーザーの場所選びを助けられます。</p>
            </div>          
            </div>
        </section>        
        
        <section className="venue-types">

          <div className="section-header">
            <h2>施設タイプから探す</h2>
            <p>シーンに合わせて、さまざまなペット同伴施設を見つけられます。</p>
          </div>

          <div className="venue-types-grid">
            {LISTING_TYPES.map(type => (
              <div className="venue-card" key={type.id}>
                <div className="venue-media">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/venues/_${type.id}.jpg`}
                    alt={type.name}
                    className="venue-image"
                  />
                </div>
                <div className="venue-info">
                  <h3>{type.name}</h3>
                  <Link to={`${ROUTES.LISTINGS}?listingType=${type.id}`} className="btn btn-small btn-outline">
                    このタイプを見る
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>        <section className="cta-section-container">
          <section className="cta-section">
            <div className="cta-image">
              <img src={`${process.env.PUBLIC_URL}${randomPetImage}`} alt="ペット同伴スポットを楽しむペット" />
            </div>
            <div className="cta-content">
              <div className="cta-text">
                <h2>おすすめのペット同伴スポットはありますか？</h2>
                <p>あなたのおすすめを共有して、ほかの飼い主が素敵な場所を見つける手助けをしましょう。</p>
              </div>
            </div>          </section>
        </section>
      </section>
    </div>
  );
};

export default Home;
