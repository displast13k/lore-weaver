const WEAPON_CATEGORIES = {
    'club': 'simple', 'dagger': 'simple', 'greatclub': 'simple', 'handaxe': 'simple',
    'javelin': 'simple', 'mace': 'simple', 'maul': 'simple', 'quarterstaff': 'simple',
    'spear': 'simple', 'sickle': 'simple', 'dart': 'simple', 'crossbow-light': 'simple',
    'shortbow': 'simple', 'sling': 'simple',
    'battleaxe': 'martial', 'flail': 'martial', 'glaive': 'martial', 'greataxe': 'martial',
    'greatsword': 'martial', 'hammer-war': 'martial', 'lance': 'martial', 'longsword': 'martial',
    'morningstar': 'martial', 'pike': 'martial', 'scimitar': 'martial',
    'shortsword': 'martial', 'trident': 'martial', 'blowgun': 'martial', 'crossbow-hand': 'martial',
    'crossbow-heavy': 'martial', 'longbow': 'martial', 'musket': 'martial'
};

const BASE_ITEMS = {
    // === SIMPLE MELEE WEAPONS ===
    'club': { name: 'Клюка', type: 'weapon', damage: '1d4', damageType: 'bludgeoning', ability: 'str', properties: [], weight: 1, range: '5 ft.' },
    'dagger': { name: 'Кинжал', type: 'weapon', damage: '1d4', damageType: 'piercing', ability: 'dex', properties: ['finesse', 'thrown', 'light'], weight: 1, range: "5'/20' ft." },
    'greatclub': { name: 'Большая дубина', type: 'weapon', damage: '1d8', damageType: 'bludgeoning', ability: 'str', properties: [], weight: 10, range: '5 ft.' },
    'handaxe': { name: 'Ручной топор', type: 'weapon', damage: '1d6', damageType: 'slashing', ability: 'str', properties: ['light', 'thrown'], weight: 2, range: "5'/20' ft." },
    'javelin': { name: 'Деревянное копьё', type: 'weapon', damage: '1d6', damageType: 'piercing', ability: 'str', properties: ['thrown', 'versatile(d6)'], weight: 2, range: "5'/60' ft." },
    'mace': { name: 'Булава', type: 'weapon', damage: '1d6', damageType: 'bludgeoning', ability: 'str', properties: [], weight: 4, range: '5 ft.' },
    'maul': { name: 'Боевой молот', type: 'weapon', damage: '1d12', damageType: 'bludgeoning', ability: 'str', properties: ['heavy', 'two-handed'], weight: 10, range: '5 ft.' },
    'quarterstaff': { name: 'Посох', type: 'weapon', damage: '1d6', damageType: 'bludgeoning', ability: 'str', properties: ['versatile(d8)'], weight: 3, range: '5 ft.' },
    'spear': { name: 'Копьё', type: 'weapon', damage: '1d6', damageType: 'piercing', ability: 'str', properties: ['thrown', 'versatile(d8)'], weight: 3, range: "5'/20' ft." },
    'sickle': { name: 'Серп', type: 'weapon', damage: '1d4', damageType: 'slashing', ability: 'str', properties: ['light'], weight: 2, range: '5 ft.' },
    // === SIMPLE RANGED WEAPONS ===
    'dart': { name: 'Дротик', type: 'weapon', damage: '1d4', damageType: 'piercing', ability: 'dex', properties: ['finesse', 'thrown'], weight: 0.1, range: "20'/60' ft." },
    'crossbow-light': { name: 'Лёгкий арбалет', type: 'weapon', damage: '1d8', damageType: 'piercing', ability: 'dex', properties: ['ammunition', 'loading', 'two-handed'], weight: 5, range: '80/320 ft.' },
    'shortbow': { name: 'Лёгкий лук', type: 'weapon', damage: '1d6', damageType: 'piercing', ability: 'dex', properties: ['ammunition', 'two-handed'], weight: 2, range: '80/320 ft.' },
    'sling': { name: 'Праща', type: 'weapon', damage: '1d4', damageType: 'bludgeoning', ability: 'dex', properties: ['ammunition'], weight: 0, range: '30/120 ft.' },
    // === MARTIAL MELEE WEAPONS ===
    'battleaxe': { name: 'Боевой топор', type: 'weapon', damage: '1d8', damageType: 'slashing', ability: 'str', properties: ['versatile(d10)'], weight: 4, range: '5 ft.' },
    'flail': { name: 'Цеп', type: 'weapon', damage: '1d8', damageType: 'bludgeoning', ability: 'str', properties: [], weight: 2, range: '5 ft.' },
    'glaive': { name: 'Глефа', type: 'weapon', damage: '1d10', damageType: 'slashing', ability: 'str', properties: ['heavy', 'reach', 'two-handed'], weight: 6, range: '10 ft.' },
    'greataxe': { name: 'Двуручный топор', type: 'weapon', damage: '1d12', damageType: 'slashing', ability: 'str', properties: ['heavy', 'two-handed'], weight: 7, range: '5 ft.' },
    'greatsword': { name: 'Двуручный меч', type: 'weapon', damage: '1d12', damageType: 'slashing', ability: 'str', properties: ['two-handed'], weight: 6, range: '5 ft.' },
    'hammer-war': { name: 'Боевой молот', type: 'weapon', damage: '1d10', damageType: 'bludgeoning', ability: 'str', properties: ['versatile(d12)'], weight: 2, range: '5 ft.' },
    'lance': { name: 'Копьё (конное)', type: 'weapon', damage: '1d12', damageType: 'piercing', ability: 'str', properties: ['reach', 'special'], weight: 6, range: '10 ft.' },
    'longsword': { name: 'Длинный меч', type: 'weapon', damage: '1d8', damageType: 'slashing', ability: 'str', properties: ['versatile(d10)'], weight: 3, range: '5 ft.' },
    'morningstar': { name: 'Звезда', type: 'weapon', damage: '1d8', damageType: 'piercing', ability: 'str', properties: [], weight: 4, range: '5 ft.' },
    'pike': { name: 'Пика', type: 'weapon', damage: '1d10', damageType: 'piercing', ability: 'str', properties: ['heavy', 'reach', 'two-handed'], weight: 18, range: '10 ft.' },
    'scimitar': { name: 'Скимитар', type: 'weapon', damage: '1d6', damageType: 'slashing', ability: 'dex', properties: ['finesse', 'light'], weight: 3, range: '5 ft.' },
    'shortsword': { name: 'Короткий меч', type: 'weapon', damage: '1d6', damageType: 'piercing', ability: 'dex', properties: ['finesse', 'light'], weight: 2, range: '5 ft.' },
    'trident': { name: 'Трезубец', type: 'weapon', damage: '1d6', damageType: 'piercing', ability: 'str', properties: ['thrown', 'versatile(d6)'], weight: 4, range: "5'/20' ft." },
    // === MARTIAL RANGED WEAPONS ===
    'blowgun': { name: 'Духовое ружьё', type: 'weapon', damage: '1', damageType: 'piercing', ability: 'dex', properties: ['ammunition', 'special'], weight: 1, range: '25/100 ft.' },
    'crossbow-hand': { name: 'Ручной арбалет', type: 'weapon', damage: '1d6', damageType: 'piercing', ability: 'dex', properties: ['ammunition', 'loading'], weight: 3, range: '30/120 ft.' },
    'crossbow-heavy': { name: 'Тяжёлый арбалет', type: 'weapon', damage: '1d10', damageType: 'piercing', ability: 'dex', properties: ['ammunition', 'heavy', 'loading', 'two-handed'], weight: 18, range: '100/400 ft.' },
    'longbow': { name: 'Длинный лук', type: 'weapon', damage: '1d8', damageType: 'piercing', ability: 'dex', properties: ['ammunition', 'two-handed'], weight: 2, range: '150/600 ft.' },
    'musket': { name: 'Мушкет', type: 'weapon', damage: '1d12', damageType: 'piercing', ability: 'dex', properties: ['loading', 'ammunition', 'two-handed', 'firearm'], weight: 10, range: '40/120 фт' },
    // === ARMOR ===
    'padded-armor': { name: 'Стёганая броня', type: 'armor', baseAC: 11, dexBonus: true, weight: 8 },
    'leather-armor': { name: 'Кожаная броня', type: 'armor', baseAC: 11, dexBonus: true, weight: 10 },
    'studded-leather': { name: 'Кираса кожаная', type: 'armor', baseAC: 12, dexBonus: true, weight: 13 },
    'hide-armor': { name: 'Кожаная броня (звериная)', type: 'armor', baseAC: 12, dexBonus: 'max(2)', weight: 12 },
    'chain-shirt': { name: 'Кольчужная рубашка', type: 'armor', baseAC: 13, dexBonus: 'max(2)', weight: 20 },
    'scale-mail': { name: 'Чешуйчатая броня', type: 'armor', baseAC: 14, dexBonus: 'max(2)', weight: 50 },
    'breastplate': { name: 'Кираса', type: 'armor', baseAC: 14, dexBonus: 'max(2)', weight: 20 },
    'half-plate': { name: 'Полулата', type: 'armor', baseAC: 15, dexBonus: 'max(1)', weight: 45 },
    'ring-mail': { name: 'Кольчуга', type: 'armor', baseAC: 14, dexBonus: 'none', weight: 40 },
    'splint': { name: 'Рёберная броня', type: 'armor', baseAC: 17, dexBonus: 'none', weight: 60 },
    'plate': { name: 'Латы', type: 'armor', baseAC: 18, dexBonus: 'none', weight: 65 },
    // === SHIELDS ===
    'shield': { name: 'Щит', type: 'shield', bonusAC: 2, weight: 6 },
    // === WANDERous ITEMS ===
    'bracers_of_archery': {
        name: 'Наручи стрельбы из лука',
        type: 'wondrous',
        rarity: 'uncommon',
        attunement: true,
        description: 'Пока вы носите эти наручи, вы получаете владение длинным луком и коротким луком, а также бонус +2 к броскам урона дальнобойными атаками этим оружием.'
    }
};

// Russian localization for items (used alongside BASE_ITEMS name field)
const ITEM_LOCALE_RU = {
    'bracers_of_archery': 'Наручи стрельбы из лука'
};
