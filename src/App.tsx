import React, { useState } from 'react';

// --- 型定義 ---
interface ZodiacInfo {
  name: string;
  englishName: string;
  symbol: string;
  period: string;
  traits: string;
}

interface BirthstoneInfo {
  month: number;
  name: string;
  englishName: string;
  meaning: string;
  colorHex: string;
  subColorHex: string;
}

interface BirthFlowerInfo {
  month: number;
  name: string;
  flowerLanguage: string;
  description: string;
  petalColor: string;
  centerColor: string;
}

interface LuckyColorInfo {
  name: string;
  hex: string;
  meaning: string;
}

interface LuckyNumberInfo {
  number: number;
  title: string;
  meaning: string;
}

interface DiagnosisResult {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  age: number;
  japaneseEra: string;
  eto: { kanji: string; reading: string; animal: string };
  zodiac: ZodiacInfo;
  birthstone: BirthstoneInfo;
  birthFlower: BirthFlowerInfo;
  luckyColor: LuckyColorInfo;
  luckyNumber: LuckyNumberInfo;
}

// --- 静的データ・マスタ ---
const ETO_LIST = [
  { kanji: '子', reading: 'ね', animal: 'ネズミ' },
  { kanji: '丑', reading: 'うし', animal: 'ウシ' },
  { kanji: '寅', reading: 'とら', animal: 'トラ' },
  { kanji: '卯', reading: 'う', animal: 'ウサギ' },
  { kanji: '辰', reading: 'たつ', animal: 'タツ' },
  { kanji: '巳', reading: 'み', animal: 'ヘビ' },
  { kanji: '午', reading: 'うま', animal: 'ウマ' },
  { kanji: '未', reading: 'ひつじ', animal: 'ヒツジ' },
  { kanji: '申', reading: 'さる', animal: 'サル' },
  { kanji: '酉', reading: 'とり', animal: 'トリ' },
  { kanji: '戌', reading: 'いぬ', animal: 'イヌ' },
  { kanji: '亥', reading: 'い', animal: 'イノシシ' },
];

const ZODIAC_LIST: ZodiacInfo[] = [
  { name: '山羊座', englishName: 'Capricorn', symbol: '♑', period: '12/22〜1/19', traits: '誠実で責任感が強く、目標に向かって着実に努力を積み重ねる現実派です。' },
  { name: '水瓶座', englishName: 'Aquarius', symbol: '♒', period: '1/20〜2/18', traits: '独創的な発想と自由な精神を持ち、常識にとらわれない革新者タイプです。' },
  { name: '魚座', englishName: 'Pisces', symbol: '♓', period: '2/19〜3/20', traits: '豊かな感受性と深い優しさを持ち、周囲の人の心に寄り添えるロマンチストです。' },
  { name: '牡羊座', englishName: 'Aries', symbol: '♈', period: '3/21〜4/19', traits: '情熱と行動力にあふれ、新しい世界へ真っ先に飛び込むパイオニア精神の持ち主です。' },
  { name: '牡牛座', englishName: 'Taurus', symbol: '♉', period: '4/20〜5/20', traits: '穏やかで粘り強く、美しいものや心地よい空間を大切にする豊かな感性を備えています。' },
  { name: '双子座', englishName: 'Gemini', symbol: '♊', period: '5/21〜6/21', traits: '好奇心旺盛でコミュニケーション能力が高く、軽やかに情報をつなぐ知性派です。' },
  { name: '蟹座', englishName: 'Cancer', symbol: '♋', period: '6/22〜7/22', traits: '愛情深く面倒見がよい性格で、大切な仲間や家族を全力で守り抜く温かな心の持ち主です。' },
  { name: '獅子座', englishName: 'Leo', symbol: '♌', period: '7/23〜8/22', traits: '華やかな存在感と堂々とした自信を持ち、周囲を明るく照らす太陽のような魅力があります。' },
  { name: '乙女座', englishName: 'Virgo', symbol: '♍', period: '8/23〜9/22', traits: '細やかな気配りと高い分析力を持ち、物事を丁寧に整えていく誠実な完璧主義者です。' },
  { name: '天秤座', englishName: 'Libra', symbol: '♎', period: '9/23〜10/23', traits: '洗練された美意識と優れたバランス感覚を持ち、誰とでも調和を築ける社交家です。' },
  { name: '蠍座', englishName: 'Scorpio', symbol: '♏', period: '10/24〜11/22', traits: '静かな情熱と深い洞察力を秘め、一度決めたことや信じた相手を一途に貫く強さがあります。' },
  { name: '射手座', englishName: 'Sagittarius', symbol: '♐', period: '11/23〜12/21', traits: '楽観的で探究心が強く、未知の世界や高い理想に向かって羽ばたく冒険家タイプです。' },
];

const BIRTHSTONES: BirthstoneInfo[] = [
  { month: 1, name: 'ガーネット', englishName: 'Garnet', meaning: '真実・情熱・実り。努力を実らせ、絆を深める守護石です。', colorHex: '#9E1B32', subColorHex: '#E05A6D' },
  { month: 2, name: 'アメジスト', englishName: 'Amethyst', meaning: '誠実・心の平和・高貴。直感を高め、穏やかな安らぎをもたらします。', colorHex: '#8A56AC', subColorHex: '#C9A7E0' },
  { month: 3, name: 'アクアマリン', englishName: 'Aquamarine', meaning: '沈着・勇敢・聡明。海のような澄んだ輝きで癒やしを導きます。', colorHex: '#6EC6CA', subColorHex: '#BCEAEB' },
  { month: 4, name: 'ダイヤモンド', englishName: 'Diamond', meaning: '純潔・永遠の絆。揺るぎない信念と内面の輝きを引き出します。', colorHex: '#C8D6E5', subColorHex: '#F5F9FC' },
  { month: 5, name: 'エメラルド', englishName: 'Emerald', meaning: '幸運・幸福・新たな始まり。瑞々しい生命力と調和をもたらします。', colorHex: '#2ECC71', subColorHex: '#82E0AA' },
  { month: 6, name: 'パール（真珠）', englishName: 'Pearl', meaning: '健康・富・純粋。持ち主の優しさと品格をそっと引き立てます。', colorHex: '#F3EAE0', subColorHex: '#FFFDFB' },
  { month: 7, name: 'ルビー', englishName: 'Ruby', meaning: '情熱・仁愛・威厳。深紅の輝きが前向きなエネルギーを与えます。', colorHex: '#D81B60', subColorHex: '#F48FB1' },
  { month: 8, name: 'ペリドット', englishName: 'Peridot', meaning: '希望・平和。太陽の石とされ、明るくポジティブな未来を照らします。', colorHex: '#9ACD32', subColorHex: '#D4EF8A' },
  { month: 9, name: 'サファイア', englishName: 'Sapphire', meaning: '慈愛・誠実・知性。冷静な判断力と揺るぎない信頼を象徴します。', colorHex: '#2952A3', subColorHex: '#7FA1E0' },
  { month: 10, name: 'オパール', englishName: 'Opal', meaning: '純真無垢・歓喜・希望。虹色の遊色効果のように多彩な才能を呼び込みます。', colorHex: '#F5B7B1', subColorHex: '#AED6F1' },
  { month: 11, name: 'トパーズ', englishName: 'Topaz', meaning: '友情・希望。温かな黄金色の光が目標達成への道筋を照らします。', colorHex: '#F39C12', subColorHex: '#FAD7A0' },
  { month: 12, name: 'ターコイズ', englishName: 'Turquoise', meaning: '成功・繁栄・旅の安全。新しい挑戦への勇気と守護を与えます。', colorHex: '#1ABC9C', subColorHex: '#76D7C4' },
];

const BIRTH_FLOWERS: BirthFlowerInfo[] = [
  { month: 1, name: 'スイセン（水仙）', flowerLanguage: '自己愛・神秘・気高さ', description: '冬の澄んだ空気の中で凛と咲く、芯の強さと気品を表す花です。', petalColor: '#FFFDF5', centerColor: '#F4B400' },
  { month: 2, name: 'フリージア', flowerLanguage: 'あどけなさ・純潔', description: '甘く爽やかな香りを放ち、春の訪れを告げる可憐な花です。', petalColor: '#F7DC6F', centerColor: '#F39C12' },
  { month: 3, name: 'チューリップ', flowerLanguage: '思いやり・博愛', description: 'ふっくらとした愛らしい花姿で、見る人の心を明るく解きほぐします。', petalColor: '#F1948A', centerColor: '#FADBD8' },
  { month: 4, name: 'サクラ（桜）', flowerLanguage: '精神の美・優美', description: '日本の春を象徴する花。淡い薄紅色の花びらが幸福感を運びます。', petalColor: '#FADBD8', centerColor: '#E5989B' },
  { month: 5, name: 'スズラン', flowerLanguage: '再び幸せが訪れる・純粋', description: '小さな白い鈴のような花が連なり、静かな幸運をもたらします。', petalColor: '#FFFFFF', centerColor: '#D5F5E3' },
  { month: 6, name: 'バラ（薔薇）', flowerLanguage: '愛・美・輝かしい未来', description: '華やかな気品を持ち、人生の特別な瞬間を祝福する花の女王です。', petalColor: '#E67E96', centerColor: '#C25975' },
  { month: 7, name: 'ユリ（百合）', flowerLanguage: '純粋・無垢・威厳', description: '大輪の花を堂々と咲かせ、清らかな品格と優美さを象徴します。', petalColor: '#FDFEFE', centerColor: '#F5B041' },
  { month: 8, name: 'ヒマワリ', flowerLanguage: '憧れ・情熱・あなただけを見つめる', description: '太陽に向かって真っ直ぐに咲く姿が、周囲に元気を与えます。', petalColor: '#F4D03F', centerColor: '#6E2C00' },
  { month: 9, name: 'コスモス', flowerLanguage: '乙女の真心・調和', description: '秋の風に揺れる繊細な花びらが、優しい調和の心を映し出します。', petalColor: '#E8A2B8', centerColor: '#F7DC6F' },
  { month: 10, name: 'ガーベラ', flowerLanguage: '希望・常に前進', description: '放射状に広がる明るい花びらが、前向きな一歩を後押しします。', petalColor: '#F5B041', centerColor: '#BA4A00' },
  { month: 11, name: 'シクラメン', flowerLanguage: '遠慮・気後れ・内気', description: '寒い季節に彩りを添える上品な花。深い温もりを持っています。', petalColor: '#C39BD3', centerColor: '#8E44AD' },
  { month: 12, name: 'ポインセチア', flowerLanguage: '祝福・幸運を祈る', description: '星のように広がる鮮やかな葉が、年の瀬に温かな喜びを届けます。', petalColor: '#EC7063', centerColor: '#F4D03F' },
];

const LUCKY_COLORS: LuckyColorInfo[] = [
  { name: 'シェルピンク', hex: '#F6C6CE', meaning: '優しさと受容を象徴し、周囲との温かなつながりを引き寄せます。' },
  { name: 'ミスティラベンダー', hex: '#C8B6E2', meaning: '直感力と洗練された感性を高め、心に静かな落ち着きをもたらします。' },
  { name: 'シャンパンベージュ', hex: '#E6D5B8', meaning: '自然体の魅力と安定感を引き出し、信頼関係を穏やかに育みます。' },
  { name: 'セージグリーン', hex: '#A8C3B0', meaning: '調和とリフレッシュの象徴。新しいアイデアや健やかなリズムを整えます。' },
  { name: 'パウダーブルー', hex: '#B5D3E7', meaning: '誠実さとクリアな思考を助け、爽やかなコミュニケーションを促します。' },
  { name: 'アプリコットゴールド', hex: '#F3C19D', meaning: '前向きなエネルギーと創造性を高め、日常に小さな喜びを増やします。' },
  { name: 'ライラックローズ', hex: '#D9A7C7', meaning: '優雅さと自分らしさのバランスを整え、魅力的な存在感を引き出します。' },
  { name: 'アイボリーホワイト', hex: '#F7F3EB', meaning: '純粋さとリセットの力。新しいスタートを切る際のクリアな視点を与えます。' },
];

const LUCKY_NUMBERS: Record<number, LuckyNumberInfo> = {
  1: { number: 1, title: '始まりと自立のナンバー', meaning: '自分の意志で道を切り拓くリーダーシップと、純粋な行動力を象徴します。' },
  2: { number: 2, title: '調和と共感のナンバー', meaning: '人と人との架け橋となり、繊細な気配りで穏やかな信頼を築きます。' },
  3: { number: 3, title: '創造と喜びのナンバー', meaning: '豊かな表現力と無邪気な好奇心で、周囲に笑顔と活気をもたらします。' },
  4: { number: 4, title: '安定と誠実のナンバー', meaning: '堅実な努力で確かな基盤を築き、周囲から厚い信頼を集めます。' },
  5: { number: 5, title: '自由と変化のナンバー', meaning: '柔軟な適応力と冒険心を持ち、新しい経験から大きく成長します。' },
  6: { number: 6, title: '愛情と美意識のナンバー', meaning: '思いやりと美的センスにあふれ、心地よい空間や人間関係を育みます。' },
  7: { number: 7, title: '探求と知性のナンバー', meaning: '物事の本質を見抜く深い洞察力と、独自の美学を大切にします。' },
  8: { number: 8, title: '豊かさと達成のナンバー', meaning: '情熱を形にする実行力を備え、大きな目標を現実へと導きます。' },
  9: { number: 9, title: '包容と完成のナンバー', meaning: '広い視野と深い優しさで多くの人を受け入れ、理想を体現します。' },
};

// --- ロジック関数 ---
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function estimateBirthYear(age: number, month: number, day: number, today: Date = new Date()): number {
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  const hasHadBirthday = currentMonth > month || (currentMonth === month && currentDay >= day);
  return hasHadBirthday ? currentYear - age : currentYear - age - 1;
}

function getJapaneseEra(year: number, month: number, day: number): string {
  const ymd = year * 10000 + month * 100 + day;
  const fmt = (name: string, y: number) => (y === 1 ? `${name}元年` : `${name}${y}年`);
  if (ymd >= 20190501) return fmt('令和', year - 2018);
  if (ymd >= 19890108) return fmt('平成', year - 1988);
  if (ymd >= 19261225) return fmt('昭和', year - 1925);
  if (ymd >= 19120730) return fmt('大正', year - 1911);
  if (ymd >= 18680125) return fmt('明治', year - 1867);
  return `西暦${year}年`;
}

function getZodiac(month: number, day: number): ZodiacInfo {
  const md = month * 100 + day;
  if (md >= 120 && md <= 218) return ZODIAC_LIST[1];
  if (md >= 219 && md <= 320) return ZODIAC_LIST[2];
  if (md >= 321 && md <= 419) return ZODIAC_LIST[3];
  if (md >= 420 && md <= 520) return ZODIAC_LIST[4];
  if (md >= 521 && md <= 621) return ZODIAC_LIST[5];
  if (md >= 622 && md <= 722) return ZODIAC_LIST[6];
  if (md >= 723 && md <= 822) return ZODIAC_LIST[7];
  if (md >= 823 && md <= 922) return ZODIAC_LIST[8];
  if (md >= 923 && md <= 1023) return ZODIAC_LIST[9];
  if (md >= 1024 && md <= 1122) return ZODIAC_LIST[10];
  if (md >= 1123 && md <= 1221) return ZODIAC_LIST[11];
  return ZODIAC_LIST[0];
}

function diagnoseBirthday(age: number, month: number, day: number): DiagnosisResult {
  const birthYear = estimateBirthYear(age, month, day);
  const japaneseEra = getJapaneseEra(birthYear, month, day);
  const etoIndex = (((birthYear - 4) % 12) + 12) % 12;
  const eto = ETO_LIST[etoIndex];
  const zodiac = getZodiac(month, day);
  const birthstone = BIRTHSTONES[month - 1];
  const birthFlower = BIRTH_FLOWERS[month - 1];
  
  const colorIndex = (birthYear + month * 7 + day * 13) % LUCKY_COLORS.length;
  const luckyColor = LUCKY_COLORS[colorIndex];

  const digits = `${birthYear}${month}${day}`.split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum >= 10) {
    sum = String(sum).split('').map(Number).reduce((a, b) => a + b, 0);
  }
  const luckyNumber = LUCKY_NUMBERS[sum] || LUCKY_NUMBERS[1];

  return { birthYear, birthMonth: month, birthDay: day, age, japaneseEra, eto, zodiac, birthstone, birthFlower, luckyColor, luckyNumber };
}

// --- イラスト用コンポーネント ---
const GemIllustration: React.FC<{ stone: BirthstoneInfo }> = ({ stone }) => (
  <svg viewBox="0 0 120 120" style={{ width: '66px', height: '66px' }}>
    <circle cx="60" cy="60" r="48" fill={stone.subColorHex} fillOpacity="0.22" />
    <polygon points="60,16 94,40 82,96 38,96 26,40" fill={stone.colorHex} stroke="#ffffff" strokeWidth="1.5" />
    <polygon points="60,16 78,42 60,54 42,42" fill="#ffffff" fillOpacity="0.5" />
  </svg>
);

const FlowerIllustration: React.FC<{ flower: BirthFlowerInfo }> = ({ flower }) => (
  <svg viewBox="0 0 120 120" style={{ width: '66px', height: '66px' }}>
    <circle cx="60" cy="60" r="48" fill={flower.petalColor} fillOpacity="0.3" />
    <path d="M60 65 Q58 92 60 108" stroke="#7D9D85" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <circle cx="60" cy="52" r="14" fill={flower.petalColor} stroke="#E8C8CE" strokeWidth="1" />
    <circle cx="60" cy="52" r="7" fill={flower.centerColor} />
  </svg>
);

// --- メインAppコンポーネント ---
export function App() {
  const [age, setAge] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const today = new Date();
  const maxDays = month ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][Number(month) - 1] : 31;
  const isFilled = age.trim() !== '' && month !== '' && day !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const a = Number(age);
    const m = Number(month);
    const d = Number(day);

    if (isNaN(a) || a < 0 || a > 130) {
      setError('年齢は0〜130の数字で入力してください。');
      return;
    }
    const estYear = estimateBirthYear(a, m, d);
    if (m === 2 && d === 29 && !isLeapYear(estYear)) {
      setError(`推定される生まれ年 ${estYear}年 はうるう年ではないため、2月29日は存在しません。`);
      return;
    }

    const res = diagnoseBirthday(a, m, d);
    setError('');
    setResult(res);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAge('');
    setMonth('');
    setDay('');
    setError('');
    setResult(null);
  };

  return (
    <div style={{ fontFamily: '"Noto Sans JP", sans-serif', background: 'linear-gradient(135deg, #fdfbf8 0%, #f7f1ec 50%, #f5eff6 100%)', minHeight: '100vh', color: '#3d353a', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* ヘッダー */}
        <header style={{ textAlign: 'center', marginBottom: '36px', padding: '0 10px' }}>
          <p style={{ fontFamily: 'serif', fontSize: '0.9rem', letterSpacing: '0.2em', color: '#a892c8', marginBottom: '6px' }}>PERSONAL ASTROLOGY &amp; PROFILE</p>
          <h1 style={{ fontFamily: 'serif', fontSize: 'clamp(1.8rem, 4vw, 2.3rem)', fontWeight: 600, letterSpacing: '0.08em', lineHeight: '1.3', marginBottom: '10px' }}>
            BIRTHDAY<br />PROFILE
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#7a6f75', maxWidth: '500px', margin: '0 auto' }}>
            年齢と誕生日を入力するだけで、あなたの基本情報から星座・誕生石・ラッキーカラーまでを自動診断します。
          </p>
        </header>

        {result ? (
          /* 診断結果画面 */
          <div>
            <div style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid #ebe3e0', borderRadius: '24px', padding: '32px', textAlign: 'center', marginBottom: '28px', boxShadow: '0 12px 32px rgba(92,72,82,0.06)' }}>
              <p style={{ fontSize: '0.9rem', color: '#a892c8', letterSpacing: '0.15em', marginBottom: '6px' }}>ESTIMATED BIRTH DATE</p>
              <h2 style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
                {result.birthYear}年（{result.japaneseEra}）{result.birthMonth}月{result.birthDay}日生まれ
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', maxWidth: '680px', margin: '0 auto' }}>
                <div style={{ background: '#fbf9f6', border: '1px solid #ebe3e0', borderRadius: '16px', padding: '14px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#7a6f75', display: 'block', marginBottom: '4px' }}>満年齢</span>
                  <span style={{ fontFamily: 'serif', fontSize: '1.15rem', fontWeight: 600 }}>{result.age}歳</span>
                </div>
                <div style={{ background: '#fbf9f6', border: '1px solid #ebe3e0', borderRadius: '16px', padding: '14px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#7a6f75', display: 'block', marginBottom: '4px' }}>和暦</span>
                  <span style={{ fontFamily: 'serif', fontSize: '1.15rem', fontWeight: 600 }}>{result.japaneseEra}</span>
                </div>
                <div style={{ background: '#fbf9f6', border: '1px solid #ebe3e0', borderRadius: '16px', padding: '14px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#7a6f75', display: 'block', marginBottom: '4px' }}>干支</span>
                  <span style={{ fontFamily: 'serif', fontSize: '1.15rem', fontWeight: 600 }}>{result.eto.kanji}年（{result.eto.animal}）</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              
              {/* 星座 */}
              <div style={{ background: '#fff', border: '1px solid #ebe3e0', borderRadius: '24px', padding: '26px', boxShadow: '0 12px 32px rgba(92,72,82,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px dashed #ebe3e0', paddingBottom: '10px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#a892c8' }}>星座</span>
                  <span style={{ fontSize: '0.85rem', color: '#7a6f75', fontStyle: 'italic' }}>Zodiac</span>
                </div>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ width: '78px', height: '78px', borderRadius: '50%', background: '#fae8ed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem' }}>{result.zodiac.symbol}</div>
                  <div>
                    <h3 style={{ fontFamily: 'serif', fontSize: '1.3rem', fontWeight: 700 }}>{result.zodiac.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#7a6f75' }}>{result.zodiac.period}</p>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#7a6f75', lineHeight: 1.7 }}>{result.zodiac.traits}</p>
              </div>

              {/* 誕生石 */}
              <div style={{ background: '#fff', border: '1px solid #ebe3e0', borderRadius: '24px', padding: '26px', boxShadow: '0 12px 32px rgba(92,72,82,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px dashed #ebe3e0', paddingBottom: '10px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#a892c8' }}>誕生石</span>
                  <span style={{ fontSize: '0.85rem', color: '#7a6f75', fontStyle: 'italic' }}>Birthstone</span>
                </div>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ width: '78px', height: '78px', borderRadius: '50%', background: '#fbf9f6', border: '1px solid #ebe3e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GemIllustration stone={result.birthstone} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'serif', fontSize: '1.3rem', fontWeight: 700 }}>{result.birthstone.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#7a6f75' }}>{result.birthstone.englishName}</p>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#7a6f75', lineHeight: 1.7 }}>{result.birthstone.meaning}</p>
              </div>

              {/* 誕生花 */}
              <div style={{ background: '#fff', border: '1px solid #ebe3e0', borderRadius: '24px', padding: '26px', boxShadow: '0 12px 32px rgba(92,72,82,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px dashed #ebe3e0', paddingBottom: '10px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#a892c8' }}>誕生花 &amp; 花言葉</span>
                  <span style={{ fontSize: '0.85rem', color: '#7a6f75', fontStyle: 'italic' }}>Birth Flower</span>
                </div>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ width: '78px', height: '78px', borderRadius: '50%', background: '#fbf9f6', border: '1px solid #ebe3e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FlowerIllustration flower={result.birthFlower} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'serif', fontSize: '1.3rem', fontWeight: 700 }}>{result.birthFlower.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#7a6f75' }}>{result.birthMonth}月の誕生花</p>
                  </div>
                </div>
                <div style={{ background: '#fae8ed', borderRadius: '10px', padding: '10px 14px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#b45a74', display: 'block' }}>花言葉</span>
                  <span style={{ fontFamily: 'serif', fontSize: '0.95rem', fontWeight: 600 }}>「{result.birthFlower.flowerLanguage}」</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#7a6f75', lineHeight: 1.7 }}>{result.birthFlower.description}</p>
              </div>

              {/* ラッキーカラー */}
              <div style={{ background: '#fff', border: '1px solid #ebe3e0', borderRadius: '24px', padding: '26px', boxShadow: '0 12px 32px rgba(92,72,82,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px dashed #ebe3e0', paddingBottom: '10px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#a892c8' }}>ラッキーカラー</span>
                  <span style={{ fontSize: '0.85rem', color: '#7a6f75', fontStyle: 'italic' }}>Lucky Color</span>
                </div>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ width: '78px', height: '78px', borderRadius: '50%', backgroundColor: result.luckyColor.hex, border: '3px solid #fff', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }} />
                  <div>
                    <h3 style={{ fontFamily: 'serif', fontSize: '1.3rem', fontWeight: 700 }}>{result.luckyColor.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#7a6f75' }}>HEX: {result.luckyColor.hex}</p>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#7a6f75', lineHeight: 1.7 }}>{result.luckyColor.meaning}</p>
              </div>

            </div>

            {/* ラッキーナンバー（フル幅） */}
            <div style={{ background: '#fff', border: '1px solid #ebe3e0', borderRadius: '24px', padding: '26px', marginBottom: '32px', boxShadow: '0 12px 32px rgba(92,72,82,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px dashed #ebe3e0', paddingBottom: '10px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#a892c8' }}>ラッキーナンバー（数秘術）</span>
                <span style={{ fontSize: '0.85rem', color: '#7a6f75', fontStyle: 'italic' }}>Lucky Number</span>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ width: '78px', height: '78px', borderRadius: '50%', background: '#f0ebf8', border: '1px solid #ebe3e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'serif', fontSize: '2.4rem', fontWeight: 600, color: '#8f6ba8' }}>
                  {result.luckyNumber.number}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'serif', fontSize: '1.3rem', fontWeight: 700 }}>ナンバー {result.luckyNumber.number} — {result.luckyNumber.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#7a6f75' }}>生年月日の各桁の合計から算出</p>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#7a6f75', lineHeight: 1.7 }}>{result.luckyNumber.meaning}</p>
            </div>

            <div style={{ textAlign: 'center', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={handleReset} style={{ padding: '14px 28px', borderRadius: '999px', border: 'none', background: 'linear-gradient(135deg, #df8da3 0%, #a892c8 100%)', color: '#fff', fontSize: '1rem', fontWeight: 500, cursor: 'pointer', boxShadow: '0 8px 20px rgba(186,134,174,0.3)' }}>
                最初に戻る
              </button>
            </div>
          </div>
        ) : (
          /* 入力フォーム画面 */
          <div style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid #ebe3e0', borderRadius: '24px', padding: '36px 32px', maxWidth: '540px', margin: '0 auto', boxShadow: '0 12px 32px rgba(92,72,82,0.06)' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '0.8rem', color: '#7a6f75', background: '#fbf9f6', border: '1px solid #ebe3e0', padding: '4px 14px', borderRadius: '999px' }}>
                基準日：{today.getFullYear()}年{today.getMonth() + 1}月{today.getDate()}日
              </span>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'serif', fontSize: '1.05rem', fontWeight: 600, marginBottom: '8px' }}>
                  現在の年齢（満年齢）
                  <span style={{ fontSize: '0.72rem', background: '#fae8ed', color: '#b85d77', padding: '2px 8px', borderRadius: '999px' }}>必須</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="number"
                    min="0"
                    max="130"
                    placeholder="例: 25"
                    value={age}
                    onChange={(e) => { setAge(e.target.value); setError(''); }}
                    style={{ width: '100%', maxWidth: '160px', padding: '13px 16px', fontSize: '1rem', border: '1.5px solid #ebe3e0', borderRadius: '12px', outline: 'none', background: '#fff' }}
                    required
                  />
                  <span style={{ color: '#7a6f75' }}>歳</span>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'serif', fontSize: '1.05rem', fontWeight: 600, marginBottom: '8px' }}>
                  誕生日（月・日）
                  <span style={{ fontSize: '0.72rem', background: '#fae8ed', color: '#b85d77', padding: '2px 8px', borderRadius: '999px' }}>必須</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <select
                    value={month}
                    onChange={(e) => { setMonth(e.target.value); setError(''); }}
                    style={{ width: '100%', padding: '13px 16px', fontSize: '1rem', border: '1.5px solid #ebe3e0', borderRadius: '12px', outline: 'none', background: '#fff' }}
                    required
                  >
                    <option value="">月を選択</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>{m}月</option>
                    ))}
                  </select>

                  <select
                    value={day}
                    onChange={(e) => { setDay(e.target.value); setError(''); }}
                    style={{ width: '100%', padding: '13px 16px', fontSize: '1rem', border: '1.5px solid #ebe3e0', borderRadius: '12px', outline: 'none', background: '#fff' }}
                    required
                  >
                    <option value="">日を選択</option>
                    {Array.from({ length: maxDays }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>{d}日</option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <div style={{ background: '#fff2f4', border: '1px solid #f3c2cc', color: '#b4435c', fontSize: '0.88rem', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px' }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!isFilled}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '999px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #df8da3 0%, #a892c8 100%)',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: isFilled ? 'pointer' : 'not-allowed',
                  opacity: isFilled ? 1 : 0.45,
                  boxShadow: isFilled ? '0 8px 20px rgba(186,134,174,0.3)' : 'none'
                }}
              >
                診断スタート
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;