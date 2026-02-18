import React, { useState, useEffect, useCallback } from 'react';
import LoginScreen from './components/LoginScreen';
import CookieButton from './components/CookieButton';
import Stats from './components/Stats';
import UpgradeList from './components/UpgradeList';
import MultiplierShop from './components/MultiplierShop';
import Leaderboard from './components/Leaderboard';
import AdminPanel from './components/AdminPanel';
import Achievements from './components/Achievements';
import FeedbackMessage from './components/FeedbackMessage';
import ParticleManager from './components/ParticleManager';
import Header from './components/Header';
import './App.css';

// --- Constants ---

const INITIAL_UPGRADES = [
  { id: 'cursor', name: 'Alternance', description: 'Clique automatiquement de temps en temps.', baseCost: 15, bonus: 0.1, count: 0, icon: '👆' },
  { id: 'grandma', name: 'Delta Boost', description: 'Delta booste la production de cookies.', baseCost: 100, bonus: 1, count: 0, icon: 'delta', image: true },
  { id: 'farm', name: 'Braguier Boost', description: 'Braguier optimise la chaîne de production.', baseCost: 1100, bonus: 8, count: 0, icon: 'braguier', image: true },
  { id: 'mine', name: 'Mine', description: 'Extrait des pépites de cookies.', baseCost: 12000, bonus: 47, count: 0, icon: '⛏️' },
  { id: 'factory', name: 'Usine', description: 'Produit des cookies à grande échelle.', baseCost: 130000, bonus: 260, count: 0, icon: '🏭' },
  { id: 'bank', name: 'Banque', description: 'Génère des cookies grâce aux intérêts.', baseCost: 1400000, bonus: 1400, count: 0, icon: '🏦' },
  { id: 'temple', name: 'Temple', description: 'Invoque des cookies ancestraux.', baseCost: 20000000, bonus: 7800, count: 0, icon: '⛩️' },
  { id: 'wizard', name: 'Tour de Sorcier', description: 'Conjure des cookies par magie.', baseCost: 330000000, bonus: 44000, count: 0, icon: '🧙' },
];

const INITIAL_MULTIPLIERS = [
  { id: 'multi1', name: 'Doigts agiles', baseCost: 100, level: 0, maxLevel: 10, bonusPerLevel: 1, icon: '✨' },
  { id: 'multi2', name: 'Double tap', baseCost: 500, level: 0, maxLevel: 10, bonusPerLevel: 2, icon: '⚡' },
  { id: 'multi3', name: 'Mains en or', baseCost: 5000, level: 0, maxLevel: 10, bonusPerLevel: 5, icon: '🌟' },
  { id: 'multi4', name: 'Toucher divin', baseCost: 50000, level: 0, maxLevel: 10, bonusPerLevel: 10, icon: '💫' },
  { id: 'multi5', name: 'Cliqueur cosmique', baseCost: 500000, level: 0, maxLevel: 10, bonusPerLevel: 25, icon: '🔮' },
  { id: 'multi6', name: 'Doigts quantiques', baseCost: 5000000, level: 0, maxLevel: 10, bonusPerLevel: 50, icon: '🌀' },
];

const ACHIEVEMENTS = [
  { id: 'click_1', name: 'Premier pas', description: 'Cliquer 1 fois', icon: '👆', type: 'clicks', target: 1 },
  { id: 'click_100', name: 'Cliqueur assidu', description: 'Cliquer 100 fois', icon: '🖱️', type: 'clicks', target: 100 },
  { id: 'click_1000', name: 'Cliqueur fou', description: 'Cliquer 1 000 fois', icon: '🤯', type: 'clicks', target: 1000 },
  { id: 'click_10000', name: 'Dieu du clic', description: 'Cliquer 10 000 fois', icon: '⚡', type: 'clicks', target: 10000 },
  { id: 'cookie_100', name: 'Pâtissier amateur', description: 'Obtenir 100 cookies', icon: '🍪', type: 'totalCookies', target: 100 },
  { id: 'cookie_1000', name: 'Boulanger', description: 'Obtenir 1 000 cookies', icon: '🧁', type: 'totalCookies', target: 1000 },
  { id: 'cookie_10000', name: 'Chef pâtissier', description: 'Obtenir 10 000 cookies', icon: '🎂', type: 'totalCookies', target: 10000 },
  { id: 'cookie_100000', name: 'Maître boulanger', description: 'Obtenir 100 000 cookies', icon: '👨‍🍳', type: 'totalCookies', target: 100000 },
  { id: 'cookie_1m', name: 'Magnat du cookie', description: 'Obtenir 1 000 000 cookies', icon: '💰', type: 'totalCookies', target: 1000000 },
  { id: 'cookie_100m', name: 'Empire du cookie', description: 'Obtenir 100 000 000 cookies', icon: '🏰', type: 'totalCookies', target: 100000000 },
  { id: 'cookie_1b', name: 'Légende', description: 'Obtenir 1 000 000 000 cookies', icon: '🌟', type: 'totalCookies', target: 1000000000 },
  { id: 'cps_1', name: 'Automatisation', description: 'Atteindre 1 cookie/s', icon: '⚙️', type: 'cps', target: 1 },
  { id: 'cps_100', name: 'Petite usine', description: 'Atteindre 100 cookies/s', icon: '🏭', type: 'cps', target: 100 },
  { id: 'cps_10000', name: 'Méga usine', description: 'Atteindre 10 000 cookies/s', icon: '🔥', type: 'cps', target: 10000 },
  { id: 'cps_1m', name: 'Usine cosmique', description: 'Atteindre 1 000 000 cookies/s', icon: '🚀', type: 'cps', target: 1000000 },
  { id: 'prestige_1', name: 'Renaissance', description: 'Faire un prestige', icon: '🌌', type: 'prestige', target: 1 },
  { id: 'prestige_5', name: 'Vétéran', description: 'Faire 5 prestiges', icon: '⭐', type: 'prestige', target: 5 },
  { id: 'building_1', name: 'Constructeur', description: 'Acheter 1 bâtiment', icon: '🏗️', type: 'buildings', target: 1 },
  { id: 'building_50', name: 'Urbaniste', description: 'Acheter 50 bâtiments', icon: '🌆', type: 'buildings', target: 50 },
  { id: 'building_100', name: 'Architecte suprême', description: 'Acheter 100 bâtiments', icon: '🏛️', type: 'buildings', target: 100 },
];

// --- Save/Load helpers ---

function saveKey(username) {
  return `cookieClicker_${username}`;
}

function loadGame(username) {
  try {
    const saved = localStorage.getItem(saveKey(username));
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Erreur de chargement:', e);
  }
  return null;
}

function loadLeaderboard() {
  try {
    const data = localStorage.getItem('cookieClicker_leaderboard');
    if (data) return JSON.parse(data);
  } catch (e) { /* ignore */ }
  return {};
}

function saveLeaderboard(board) {
  localStorage.setItem('cookieClicker_leaderboard', JSON.stringify(board));
}

function getAllUsers() {
  const users = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('cookieClicker_') && key !== 'cookieClicker_leaderboard') {
      users.push(key.replace('cookieClicker_', ''));
    }
  }
  return users;
}

// --- App ---

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState('player'); // 'player' | 'admin'

  if (!currentUser) {
    return (
      <LoginScreen
        existingUsers={getAllUsers()}
        onLogin={(username, selectedRole) => {
          setCurrentUser(username);
          setRole(selectedRole);
        }}
      />
    );
  }

  return (
    <Game
      key={currentUser}
      username={currentUser}
      role={role}
      onLogout={() => { setCurrentUser(null); setRole('player'); }}
      onSwitchRole={() => setRole(r => r === 'admin' ? 'player' : 'admin')}
    />
  );
}

function Game({ username, role, onLogout, onSwitchRole }) {
  const saved = React.useMemo(() => loadGame(username), [username]);

  const [cookies, setCookies] = useState(saved?.cookies ?? 0);
  const [totalCookies, setTotalCookies] = useState(saved?.totalCookies ?? 0);
  const [productionAuto, setProductionAuto] = useState(saved?.productionAuto ?? 0);
  const [multiplicateur, setMultiplicateur] = useState(saved?.multiplicateur ?? 1);
  const [ameliorations, setAmeliorations] = useState(saved?.ameliorations ?? INITIAL_UPGRADES);
  const [multipliers, setMultipliers] = useState(saved?.multipliers ?? INITIAL_MULTIPLIERS);
  const [prestigeCount, setPrestigeCount] = useState(saved?.prestigeCount ?? 0);
  const [prestigeBonus, setPrestigeBonus] = useState(saved?.prestigeBonus ?? 0);
  const [clickCount, setClickCount] = useState(saved?.clickCount ?? 0);
  const [unlockedAchievements, setUnlockedAchievements] = useState(saved?.unlockedAchievements ?? []);
  const [feedback, setFeedback] = useState(null);
  const [particles, setParticles] = useState([]);
  const [activeTab, setActiveTab] = useState('upgrades');
  const [goldenCookie, setGoldenCookie] = useState(null);
  const [goldenBonus, setGoldenBonus] = useState({ active: false, type: null, endsAt: 0 });
  const [goldenTimeLeft, setGoldenTimeLeft] = useState(0);
  const [leaderboard, setLeaderboard] = useState(loadLeaderboard);
  const [achievementPopup, setAchievementPopup] = useState(null);

  const effectiveProduction = productionAuto * multiplicateur * (1 + prestigeBonus * 0.1);
  const totalBuildings = ameliorations.reduce((sum, a) => sum + a.count, 0);

  // --- Achievement checker ---
  const checkAchievements = useCallback((state) => {
    const { totalCookies: tc, clickCount: cc, cps, prestigeCount: pc, buildings } = state;
    const newUnlocks = [];

    ACHIEVEMENTS.forEach(ach => {
      if (state.unlocked.includes(ach.id)) return;
      let reached = false;
      switch (ach.type) {
        case 'clicks': reached = cc >= ach.target; break;
        case 'totalCookies': reached = tc >= ach.target; break;
        case 'cps': reached = cps >= ach.target; break;
        case 'prestige': reached = pc >= ach.target; break;
        case 'buildings': reached = buildings >= ach.target; break;
        default: break;
      }
      if (reached) newUnlocks.push(ach.id);
    });

    return newUnlocks;
  }, []);

  useEffect(() => {
    const newUnlocks = checkAchievements({
      totalCookies, clickCount,
      cps: effectiveProduction,
      prestigeCount,
      buildings: totalBuildings,
      unlocked: unlockedAchievements,
    });
    if (newUnlocks.length > 0) {
      setUnlockedAchievements(prev => [...prev, ...newUnlocks]);
      const ach = ACHIEVEMENTS.find(a => a.id === newUnlocks[0]);
      if (ach) {
        setAchievementPopup(ach);
        setTimeout(() => setAchievementPopup(null), 3500);
      }
    }
  }, [totalCookies, clickCount, effectiveProduction, prestigeCount, totalBuildings, unlockedAchievements, checkAchievements]);

  // --- Golden bonus countdown ---
  useEffect(() => {
    if (!goldenBonus.active) { setGoldenTimeLeft(0); return; }
    const interval = setInterval(() => {
      const left = Math.ceil((goldenBonus.endsAt - Date.now()) / 1000);
      if (left <= 0) {
        setGoldenBonus({ active: false, type: null, endsAt: 0 });
        setGoldenTimeLeft(0);
      } else {
        setGoldenTimeLeft(left);
      }
    }, 250);
    return () => clearInterval(interval);
  }, [goldenBonus]);

  // --- Auto-production tick ---
  useEffect(() => {
    if (effectiveProduction <= 0) return;
    const interval = setInterval(() => {
      const goldenMultiplier = goldenBonus.active && goldenBonus.type === 'frenzy' ? 7 : 1;
      const amount = effectiveProduction * goldenMultiplier;
      setCookies(c => c + amount);
      setTotalCookies(t => t + amount);
    }, 1000);
    return () => clearInterval(interval);
  }, [effectiveProduction, goldenBonus]);

  // --- Save game (per-user) ---
  useEffect(() => {
    const timeout = setTimeout(() => {
      const saveData = {
        cookies, totalCookies, productionAuto, multiplicateur,
        ameliorations, multipliers, prestigeCount, prestigeBonus,
        clickCount, unlockedAchievements,
      };
      localStorage.setItem(saveKey(username), JSON.stringify(saveData));

      // Update leaderboard
      const board = loadLeaderboard();
      board[username] = {
        totalCookies, cookies,
        cps: effectiveProduction,
        clickCount, prestigeCount,
        buildings: totalBuildings,
        lastSeen: Date.now(),
      };
      saveLeaderboard(board);
      setLeaderboard(board);
    }, 500);
    return () => clearTimeout(timeout);
  }, [cookies, totalCookies, productionAuto, multiplicateur, ameliorations, multipliers, prestigeCount, prestigeBonus, clickCount, unlockedAchievements, username, effectiveProduction, totalBuildings]);

  // --- Golden cookie spawner ---
  useEffect(() => {
    const delay = 45000 + Math.random() * 120000;
    const timer = setTimeout(() => {
      setGoldenCookie({
        id: Date.now(),
        x: 15 + Math.random() * 65,
        y: 15 + Math.random() * 55,
      });
      setTimeout(() => setGoldenCookie(prev => (prev && prev.id) ? null : prev), 13000);
    }, delay);
    return () => clearTimeout(timer);
  }, [goldenCookie]);

  const showFeedback = useCallback((message, type = 'success') => {
    setFeedback({ message, type, id: Date.now() });
  }, []);

  const clearFeedback = useCallback(() => setFeedback(null), []);

  // --- Click ---
  const handleCookieClick = useCallback((e) => {
    const goldenMultiplier = goldenBonus.active && goldenBonus.type === 'click' ? 777 : 1;
    const amount = multiplicateur * (1 + prestigeBonus * 0.1) * goldenMultiplier;
    setCookies(c => c + amount);
    setTotalCookies(t => t + amount);
    setClickCount(c => c + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newParticle = { id: Date.now() + Math.random(), x, y, value: `+${formatNumber(amount)}` };
    setParticles(prev => [...prev, newParticle]);
    setTimeout(() => setParticles(prev => prev.filter(p => p.id !== newParticle.id)), 1000);
  }, [multiplicateur, prestigeBonus, goldenBonus]);

  // --- Golden click ---
  const handleGoldenClick = useCallback(() => {
    setGoldenCookie(null);
    const roll = Math.random();
    if (roll < 0.4) {
      setGoldenBonus({ active: true, type: 'frenzy', endsAt: Date.now() + 77000 });
      showFeedback('Frénésie ! Production x7 pendant 77s !', 'golden');
    } else if (roll < 0.7) {
      setGoldenBonus({ active: true, type: 'click', endsAt: Date.now() + 26000 });
      showFeedback('Frénésie de clics ! x777 pendant 26s !', 'golden');
    } else {
      const amount = Math.max(productionAuto * multiplicateur * 900, 13);
      setCookies(c => c + amount);
      setTotalCookies(t => t + amount);
      showFeedback(`Chanceux ! +${formatNumber(amount)} cookies !`, 'golden');
    }
  }, [productionAuto, multiplicateur, showFeedback]);

  // --- Buy building ---
  const acheterAmelioration = useCallback((id) => {
    const upgrade = ameliorations.find(a => a.id === id);
    if (!upgrade) return;
    const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.count));
    if (cookies < cost) { showFeedback('Pas assez de cookies !', 'error'); return; }
    setCookies(c => c - cost);
    setProductionAuto(p => p + upgrade.bonus);
    setAmeliorations(prev => prev.map(a => a.id === id ? { ...a, count: a.count + 1 } : a));
    showFeedback(`${upgrade.icon} ${upgrade.name} acheté !`);
  }, [cookies, ameliorations, showFeedback]);

  // --- Buy multiplier (repeatable with scaling cost) ---
  const acheterMultiplicateur = useCallback((id) => {
    const multi = multipliers.find(m => m.id === id);
    if (!multi || multi.level >= multi.maxLevel) return;
    const cost = Math.floor(multi.baseCost * Math.pow(2.5, multi.level));
    if (cookies < cost) { showFeedback('Pas assez de cookies !', 'error'); return; }
    setCookies(c => c - cost);
    setMultiplicateur(m => m + multi.bonusPerLevel);
    setMultipliers(prev => prev.map(m => m.id === id ? { ...m, level: m.level + 1 } : m));
    showFeedback(`${multi.icon} ${multi.name} niveau ${multi.level + 1} !`);
  }, [cookies, multipliers, showFeedback]);

  // --- Prestige ---
  const canPrestige = totalCookies >= 1000000;
  const prestigeChips = Math.floor(Math.pow(totalCookies / 1e6, 0.5));

  const doPrestige = useCallback(() => {
    if (!canPrestige) { showFeedback('Il faut au moins 1 000 000 cookies totaux !', 'error'); return; }
    const chips = prestigeChips;
    setCookies(0); setTotalCookies(0); setProductionAuto(0); setMultiplicateur(1);
    setAmeliorations(INITIAL_UPGRADES); setMultipliers(INITIAL_MULTIPLIERS);
    setPrestigeCount(p => p + 1); setPrestigeBonus(b => b + chips);
    setClickCount(0); setGoldenBonus({ active: false, type: null, endsAt: 0 });
    showFeedback(`Prestige ! +${chips} jetons de prestige !`, 'prestige');
  }, [canPrestige, prestigeChips, showFeedback]);

  // --- Reset ---
  const resetGame = useCallback(() => {
    localStorage.removeItem(saveKey(username));
    setCookies(0); setTotalCookies(0); setProductionAuto(0); setMultiplicateur(1);
    setAmeliorations(INITIAL_UPGRADES); setMultipliers(INITIAL_MULTIPLIERS);
    setPrestigeCount(0); setPrestigeBonus(0); setClickCount(0);
    setUnlockedAchievements([]);
    setGoldenBonus({ active: false, type: null, endsAt: 0 });
    const board = loadLeaderboard();
    delete board[username];
    saveLeaderboard(board);
    setLeaderboard(board);
    showFeedback('Partie réinitialisée !', 'info');
  }, [username, showFeedback]);

  // --- Admin actions ---
  const adminResetPlayer = useCallback((playerName) => {
    localStorage.removeItem(saveKey(playerName));
    const board = loadLeaderboard();
    delete board[playerName];
    saveLeaderboard(board);
    setLeaderboard(board);
    showFeedback(`Scores de ${playerName} réinitialisés`, 'info');
  }, [showFeedback]);

  const adminSetCookies = useCallback((playerName, amount) => {
    try {
      const data = loadGame(playerName);
      if (!data) return;
      data.cookies = amount;
      data.totalCookies = Math.max(data.totalCookies, amount);
      localStorage.setItem(saveKey(playerName), JSON.stringify(data));
      const board = loadLeaderboard();
      if (board[playerName]) {
        board[playerName].cookies = amount;
        board[playerName].totalCookies = Math.max(board[playerName].totalCookies, amount);
        saveLeaderboard(board);
        setLeaderboard(board);
      }
      if (playerName === username) {
        setCookies(amount);
        setTotalCookies(t => Math.max(t, amount));
      }
      showFeedback(`Cookies de ${playerName} modifiés`, 'info');
    } catch (e) { /* ignore */ }
  }, [username, showFeedback]);

  return (
    <div className="app">
      <div className="background-pattern" />

      {goldenCookie && (
        <button
          className="golden-cookie"
          style={{ left: `${goldenCookie.x}%`, top: `${goldenCookie.y}%` }}
          onClick={handleGoldenClick}
          aria-label="Cookie doré"
        >🍪</button>
      )}

      {goldenBonus.active && (
        <div className={`golden-bonus-indicator ${goldenBonus.type}`}>
          <span className="golden-bonus-text">
            {goldenBonus.type === 'frenzy' ? '🌟 Frénésie x7' : '⚡ Clics x777'}
          </span>
          <span className="golden-timer">{goldenTimeLeft}s</span>
        </div>
      )}

      {achievementPopup && (
        <div className="achievement-popup">
          <span className="achievement-popup-icon">{achievementPopup.icon}</span>
          <div className="achievement-popup-text">
            <div className="achievement-popup-title">Succès débloqué !</div>
            <div className="achievement-popup-name">{achievementPopup.name}</div>
          </div>
        </div>
      )}

      <Header
        username={username}
        role={role}
        prestigeCount={prestigeCount}
        prestigeBonus={prestigeBonus}
        resetGame={resetGame}
        onLogout={onLogout}
        onSwitchRole={onSwitchRole}
      />

      <div className="game-container">
        <div className="left-panel">
          <Stats
            cookies={cookies}
            cps={effectiveProduction}
            cpm={effectiveProduction * 60}
            multiplicateur={multiplicateur}
            prestigeBonus={prestigeBonus}
            clickCount={clickCount}
            totalCookies={totalCookies}
            totalBuildings={totalBuildings}
          />
          <div className="cookie-area">
            <CookieButton onClick={handleCookieClick} multiplicateur={multiplicateur} prestigeBonus={prestigeBonus} />
            <ParticleManager particles={particles} />
          </div>
        </div>

        <div className="right-panel">
          <div className="tab-bar">
            <button className={`tab-btn ${activeTab === 'upgrades' ? 'active' : ''}`} onClick={() => setActiveTab('upgrades')}>
              <span className="tab-icon">🏗️</span><span className="tab-label">Bâtiments</span>
            </button>
            <button className={`tab-btn ${activeTab === 'multipliers' ? 'active' : ''}`} onClick={() => setActiveTab('multipliers')}>
              <span className="tab-icon">✨</span><span className="tab-label">Multipli.</span>
            </button>
            <button className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`} onClick={() => setActiveTab('achievements')}>
              <span className="tab-icon">🏆</span><span className="tab-label">Succès</span>
            </button>
            <button className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`} onClick={() => setActiveTab('leaderboard')}>
              <span className="tab-icon">📊</span><span className="tab-label">Classement</span>
            </button>
            {role === 'admin' && (
              <button className={`tab-btn admin-tab ${activeTab === 'admin' ? 'active' : ''}`} onClick={() => setActiveTab('admin')}>
                <span className="tab-icon">🛡️</span><span className="tab-label">Admin</span>
              </button>
            )}
          </div>

          <div className="tab-content">
            {activeTab === 'upgrades' && (
              <UpgradeList ameliorations={ameliorations} cookies={cookies} onBuy={acheterAmelioration} />
            )}
            {activeTab === 'multipliers' && (
              <MultiplierShop multipliers={multipliers} cookies={cookies} onBuy={acheterMultiplicateur} />
            )}
            {activeTab === 'achievements' && (
              <Achievements all={ACHIEVEMENTS} unlocked={unlockedAchievements} />
            )}
            {activeTab === 'leaderboard' && (
              <Leaderboard board={leaderboard} currentUser={username} />
            )}
            {activeTab === 'admin' && role === 'admin' && (
              <AdminPanel
                leaderboard={leaderboard}
                onResetPlayer={adminResetPlayer}
                onSetCookies={adminSetCookies}
              />
            )}
          </div>
        </div>
      </div>

      {feedback && (
        <FeedbackMessage message={feedback.message} type={feedback.type} key={feedback.id} onDone={clearFeedback} />
      )}
    </div>
  );
}

function formatNumber(n) {
  if (n >= 1e15) return (n / 1e15).toFixed(2) + ' Qa';
  if (n >= 1e12) return (n / 1e12).toFixed(2) + ' T';
  if (n >= 1e9) return (n / 1e9).toFixed(2) + ' B';
  if (n >= 1e6) return (n / 1e6).toFixed(2) + ' M';
  if (n >= 1e3) return (n / 1e3).toFixed(2) + ' K';
  return Math.floor(n).toLocaleString('fr-FR');
}

export { formatNumber };
export default App;
