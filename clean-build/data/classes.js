// Class saving throw proficiencies (PHB)
window.CLASS_SAVING_THROWS = {
    barbarian: ['str', 'con'],
    cleric: ['wis', 'cha'],
    druid: ['int', 'wis'],
    fighter: ['str', 'con'],
    monk: ['str', 'dex'],
    paladin: ['wis', 'cha'],
    ranger: ['dex', 'wis'],
    bard: ['dex', 'cha'],
    rogue: ['dex', 'int'],
    sorcerer: ['con', 'cha'],
    warlock: ['wis', 'cha'],
    wizard: ['int', 'wis'],
    artificer: ['int', 'lck'],
    '': []
};
// Class primary ability keys
window.CLASS_PRIMARY_ABILITIES = {
    barbarian: ['str', 'dex'],
    cleric: ['wis'],
    druid: ['wis'],
    fighter: ['str', 'dex'],
    monk: ['str', 'dex'],
    paladin: ['str', 'cha'],
    ranger: ['dex', 'wis'],
    bard: ['dex', 'cha'],
    rogue: ['dex', 'int'],
    sorcerer: ['cha'],
    warlock: ['cha'],
    wizard: ['int'],
    artificer: ['int'],
    '': []
};
window.CLASS_ARMOR = {
    barbarian: ['Light armor', 'Medium armor', 'Shields'],
    cleric: ['Light armor', 'Medium armor', 'Shields'],
    druid: ['Light armor', 'Medium armor', 'Shields (non-metal)'],
    fighter: ['All armor', 'Shields'],
    monk: [],
    paladin: ['All armor', 'Shields'],
    ranger: ['Light armor', 'Medium armor', 'Shields'],
    bard: ['Light armor'],
    rogue: ['Light armor'],
    sorcerer: [],
    warlock: ['Light armor'],
    wizard: [],
    artificer: ['Light armor', 'Medium armor', 'Shields'],
    '': []
};
window.CLASS_HIT_DIE = {
    barbarian: 12, fighter: 10, paladin: 10, cleric: 8, ranger: 10, bard: 8, druid: 8, rogue: 8, monk: 8, warlock: 8, wizard: 6, sorcerer: 6, artificer: 8, '': 8
};
// Starting equipment by class
window.CLASS_STARTING_EQUIPMENT = {
    bard: ['scimitar', 'scimitar', 'leather-armor', 'shield', 'dagger'],
    fighter: ['longsword', 'scale-mail', 'shield'],
    cleric: ['mace', 'scale-mail', 'shield'],
    rogue: ['shortbow', 'dagger', 'leather-armor'],
    wizard: ['quarterstaff', 'dagger'],
    ranger: ['longbow', 'leather-armor', 'longsword'],
    paladin: ['longsword', 'scale-mail', 'shield'],
    barbarian: ['greataxe', 'handaxe'],
    monk: ['shortsword'],
    sorcerer: ['dagger', 'quarterstaff'],
    warlock: ['scimitar', 'leather-armor', 'shield'],
    druid: ['quarterstaff', 'scale-mail', 'hide-armor'],
    artificer: ['crossbow-light', 'studded-leather']
};

function initStartingEquipment(cls) {
    var itemKeys = CLASS_STARTING_EQUIPMENT[cls] || [];
    characterState.inventory = itemKeys.map(function(key) {
        var template = BASE_ITEMS[key];
        if (!template) return null;
        var isEquipped = false;
        if (template.type === 'weapon') isEquipped = true;
        if (template.type === 'armor') isEquipped = true;
        if (template.type === 'shield') isEquipped = true;
        return { key: key, name: template.name, type: template.type, isEquipped: isEquipped };
    }).filter(function(item) { return item !== null; });
};

function isWeaponProficient(weaponKey) {
    var cls = characterState.class || '';
    var weaponProfStr = CLASS_WEAPONS[cls] || '';
    var category = WEAPON_CATEGORIES[weaponKey] || '';

    if (!weaponProfStr || !category) return false;

    // "All weapons" grants everything
    if (weaponProfStr.toLowerCase().indexOf('all weapons') !== -1) return true;

    // Check category match (simple/martial)
    var profLower = weaponProfStr.toLowerCase();
    if (category === 'simple' && profLower.indexOf('simple weapons') !== -1) return true;
    if (category === 'martial' && profLower.indexOf('martial weapons') !== -1) return true;

    // Check specific weapon names in the prof string
    var weaponName = BASE_ITEMS[weaponKey] ? BASE_ITEMS[weaponKey].name.toLowerCase() : '';
    if (weaponName && profLower.indexOf(weaponName) !== -1) return true;

    // Check individual weapon keys (e.g. "longswords, scimitars, shortswords")
    var weaponKeyLower = weaponKey.toLowerCase();
    if (profLower.indexOf(weaponKeyLower) !== -1) return true;

    // College of Swords weapon proficiency
    if (characterState.swordsWeaponProf === weaponKey) return true;

    // Firearms proficiency (College of Swords firearms option)
    if (characterState.firearmsProf) {
        var template = BASE_ITEMS[weaponKey];
        if (template && template.properties && template.properties.indexOf('firearm') !== -1) return true;
    }

    return false;
}

// Base item database
// Class weapon proficiencies per class
window.CLASS_WEAPONS = {
    barbarian: 'Simple weapons, martial weapons',
    cleric: 'Simple weapons',
    druid: 'Clubs, daggers, darts, javelins, maces, quarterstaffs, scimitards, sickles',
    fighter: 'All weapons',
    monk: 'Simple weapons, shortswords',
    paladin: 'All weapons',
    ranger: 'Simple weapons, martial weapons',
    bard: 'Simple weapons, longswords, scimitars, shortswords',
    rogue: 'Simple weapons, scimitars, longswords, shortswords',
    sorcerer: 'Daggers, darts, slings, quarterstaffs, light crossbows',
    warlock: 'Simple weapons',
    wizard: 'Daggers, darts, slings, quarterstaffs, light crossbows',
    artificer: 'Simple weapons',
    '': ''
};
// PHB subclass unlock levels per class
window.CLASS_SUBCLASS_LEVELS = {
    cleric: 1, sorcerer: 1, warlock: 1,
    druid: 2, wizard: 2, paladin: 2,
    fighter: 3, rogue: 3, ranger: 3, bard: 3, monk: 3, barbarian: 3, artificer: 3,
    '': 3
};
// Russian class name mapping for log output
window.CLASS_NAMES_RU = {
    barbarian: 'Варвар',
    bard: 'Бард',
    cleric: 'Жрец',
    druid: 'Друид',
    fighter: 'Воин',
    monk: 'Монах',
    paladin: 'Паладин',
    ranger: 'Следопыт',
    rogue: 'Плут',
    sorcerer: 'Чародей',
    warlock: 'Колдун',
    wizard: 'Волшебник',
    artificer: 'Изобретатель'
};
// Class spell access
// PHB requirements for level 1 selections per class
window.PHB_REQUIREMENTS = {
    barbarian: { skillsFrom: ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival'], skillsToChoose: 2, spellsToChoose: 0, statBoosts: 0 },
    cleric: { skillsFrom: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion'], skillsToChoose: 2, spellsToChoose: 2, statBoosts: 0 },
    fighter: { skillsFrom: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival'], skillsToChoose: 2, spellsToChoose: 0, statBoosts: 0 },
    paladin: { skillsFrom: ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion'], skillsToChoose: 2, spellsToChoose: 0, statBoosts: 0 },
    rogue: { skillsFrom: ['Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Performance', 'Persuasion', 'Sleight of Hand', 'Stealth', 'Survival'], skillsToChoose: 7, spellsToChoose: 0, statBoosts: 0 },
    bard: { skillsFrom: ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival'], skillsToChoose: 3, spellsToChoose: 4, statBoosts: 0 },
    druid: { skillsFrom: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival'], skillsToChoose: 2, spellsToChoose: 2, statBoosts: 0 },
    monk: { skillsFrom: ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth'], skillsToChoose: 2, spellsToChoose: 0, statBoosts: 0 },
    sorcerer: { skillsFrom: ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion'], skillsToChoose: 2, spellsToChoose: 4, statBoosts: 0 },
    warlock: { skillsFrom: ['Arcana', 'Deception', 'History', 'Intimidation', 'Investigation', 'Nature', 'Religion'], skillsToChoose: 2, spellsToChoose: 2, statBoosts: 0 },
    wizard: { skillsFrom: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'], skillsToChoose: 2, spellsToChoose: 4, statBoosts: 0 },
    ranger: { skillsFrom: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival'], skillsToChoose: 3, spellsToChoose: 0, statBoosts: 0 },
    artificer: { skillsFrom: ['History', 'Investigation', 'Medicine', 'Perception', 'Sleight of Hand', 'Stealth'], skillsToChoose: 2, spellsToChoose: 4, statBoosts: 0 },
    '': { skillsFrom: [], skillsToChoose: 0, spellsToChoose: 0, statBoosts: 0 }
};
window.CLASS_SPELL_ABILITY = {
    cleric: 'wis', druid: 'wis', bard: 'cha', sorcerer: 'cha', warlock: 'cha', wizard: 'int', ranger: 'wis', paladin: 'cha',
    barbarian: '', fighter: '', rogue: '', monk: '', artificer: 'int', '': ''
};

function getSpellcastingAbility() {
    const cls = characterState.class || '';
    const sub = characterState.subclass || '';
    if (sub === 'eldritch_knight' || sub === 'arcane_trickster') return 'int';
    if (sub === 'totem_warrior') return 'wis';
    return CLASS_SPELL_ABILITY[cls] || '';
}
// ===== FEATURE DATA =====

window.featureData = {
    race: {
        dwarf: {
            title: 'DWARF',
            features: [
                '+2 Телосложение',
                'Тёмное зрение (60 фт)',
                'Дварфская устойчивость',
                'Владение оружием дварфов',
                'Знание камня'
            ]
        },
        elf: {
            title: 'ELF',
            features: [
                '+2 Ловкость',
                'Тёмное зрение',
                'Острые чувства',
                'Фейское происхождение',
                'Транс'
            ]
        },
        human: {
            title: 'HUMAN',
            features: [
                '+1 ко всем характеристикам',
                'Языки: Общий + один на выбор'
            ]
        },
        halfling: {
            title: 'HALFLING',
            features: [
                '+2 Ловкость',
                'Везучий (переброс единиц на d20)',
                'Отважный (преимущество против страха)',
                'Малый рост (преимущество в Скрытности)'
            ]
        },
        'half-elf': {
            title: 'HALF-ELF',
            features: [
                '+2 Харизма',
                '+1 к двум характеристикам на выбор',
                'Фейское происхождение',
                'Языки: Общий, Эльфийский + один на выбор'
            ]
        },
        tiefling: {
            title: 'TIEFLING',
            features: [
                '+2 Харизма, +1 Интеллект',
                'Тёмное зрение (60 фт)',
                'Адское сопротивление (сопротивление огню)',
                'Адское порицание (1/день заклинание)'
            ]
        },
        dragonborn: {
            title: 'DRAGONBORN',
            features: [
                '+2 Сила, +1 Харизма',
                'Дышание огнём (1/отдых 1к10)',
                'Уязвимость к дракону (сопротивление)',
                'Свирепость (преимущество против страха)'
            ]
        },
        gnome: {
            title: 'GNOME',
            features: [
                '+2 Интеллект',
                'Тёмное зрение (60 фт)',
                'Гномья astuteness (преимущество INT)',
                'Малый рост (преимущество в Скрытности)'
            ]
        },
        'half-orc': {
            title: 'HALF-ORC',
            features: [
                '+2 Сила, +1 Телосложение',
                'Свирепость (доп. атака при 1)',
                'Жестокая критика (+1 куб)',
                'Тёмное зрение (60 фт)'
            ]
        },
        lizardfolk: {
            title: 'LIZARDFOLK',
            features: [
                '+2 Телосложение, +1 Мудрость',
                'Природная броня (КБ 13 + мод. ЛОВ)',
                'Укус (1к6 + СИЛ)',
                'Голодная пасть (бонусное действие: укус → временные хиты = Бонус мастерства)',
                'Задержка дыхания (15 мин)',
                'Хитрый ремесленник (Cunning Artisan)'
            ]
        },
        tabaxi: {
            title: 'TABAXI',
            features: [
                '+2 Ловкость, +1 Мудрость',
                'Тёмное зрение (60 фт)',
                'Скорость (бонусное действие: +10 фт)',
                'Ловкие когти (оружие)',
                'Любопытство (бонусное действие: движение)'
            ]
        },
        goliath: {
            title: 'GOLIATH',
            features: [
                '+2 Сила, +1 Телосложение',
                'Скала (сопротивление падению)',
                'Статус (бонус к INT/WIS/CHA)',
                'Натиск (урон при крит. промах)'
            ]
        },
        aasimar: {
            title: 'AASIMAR',
            features: [
                '+2 Харизма',
                'Тёмное зрение (60 фт)',
                'Небесное сопротивление (свет)',
                'Небесное пламя (1/день урон)',
                'Вдохновение (1/день исцеление)'
            ]
        },
        '': {
            title: 'RACE',
            features: []
        }
    },
    class: {
        paladin: {
            title: 'PALADIN',
            features: [
                'Кость хитов: 1к10',
                'Основная характеристика: СИЛА, ХАРИЗМА',
                'Владения: вся броня, щиты, простое и военное оружие',
                'Божественное восприятие (1 + паладин/2 в день)',
                'Целительные руки (5 × уровень хитов)'
            ]
        },
        cleric: {
            title: 'CLERIC',
            features: [
                'Кость хитов: 1к8',
                'Заклинания (WIS)',
                'Божественный канал',
                'Изгнание нежити'
            ]
        },
        fighter: {
            title: 'FIGHTER',
            features: [
                'Кость хитов: 1к10',
                'Основная характеристика: СИЛА или ЛОВ',
                'Владения: вся броня, щиты, простое и военное оружие',
                'Боевой стиль на выбор',
                'Второе дыхание (1к10 + уровень хитов)'
            ]
        },
        wizard: {
            title: 'WIZARD',
            features: [
                'Кость хитов: 1к6',
                'Основная характеристика: ИНТЕЛЛЕКТ',
                'Владения: нет',
                'Заклинания (INT)',
                'Восстановление магии (1 ячейка за уровень)'
            ]
        },
        rogue: {
            title: 'ROGUE',
            features: [
                'Кость хитов: 1к8',
                'Основная характеристика: ЛОВКОСТЬ',
                'Владения: лёгкая броня, простое оружие, арбалеты',
                'Мастерство (2 навыка)',
                'Удар вкралёную (1к6 + уровень-1)',
                'Воровской жаргон'
            ]
        },
        barbarian: {
            title: 'BARBARIAN',
            features: [
                'Кость хитов: 1к12',
                'Основная характеристика: СИЛА',
                'Владения: лёгкая броня, средняя броня, щиты',
                'Ярость (2 + уровень/день, +2 ближний урон, преимущество СИЛ)',
                'Небронированная защита (10 + ЛОВ + ТЕЛ КД)',
                'Безрассудное преимущество'
            ]
        },
        sorcerer: {
            title: 'SORCERER',
            features: [
                'Кость хитов: 1к6',
                'Основная характеристика: ХАРИЗМА',
                'Владения: нет',
                'Заклинания (CHA)',
                'Источник магии (очки для ячеек)',
                'Метамания (модификация заклинаний)'
            ]
        },
        ranger: {
            title: 'RANGER',
            features: [
                'Кость хитов: 1к10',
                'Основная характеристика: СИЛА или ЛОВ',
                'Владения: средняя броня, щиты, простое и военное оружие',
                'Избранный враг (1 тип)',
                'Избранная местность (1 тип)',
                'Естественный путешественник (бонус к передвижению)'
            ]
        },
        bard: {
            title: 'BARD',
            features: [
                'Кость хитов: 1к8',
                'Основная характеристика: ХАРИЗМА',
                'Владения: Легкая броня, простое оружие',
                'Заклинания (CHA)',
                'Бардовское вдохновение',
                'Экспертиза (уровень 3: 2 навыка, уровень 10: ещё 2)'
            ]
        },
        druid: {
            title: 'DRUID',
            features: [
                'Кость хитов: 1к8',
                'Основная характеристика: МУДРОСТЬ',
                'Владения: лёгкая и средняя броня, палицы, кинжалы, дротики, копья, кувшины, посохи, сабли, серпы, пращи, пики',
                'Друидоведение (WIS)',
                'Дикая форма (медведь на уровне 1)'
            ]
        },
        monk: {
            title: 'MONK',
            features: [
                'Кость хитов: 1к8',
                'Основная характеристика: ЛОВ, МУД',
                'Владения: простое оружие, короткие мечи',
                'Небронированное передвижение (+10 фт скорость)',
                'Боевое искусство (d4 на уровне 1)',
                'Порыв ударов (2 удара без оружия)'
            ]
        },
        warlock: {
            title: 'WARLOCK',
            features: [
                'Кость хитов: 1к8',
                'Основная характеристика: ХАРИЗМА',
                'Владения: лёгкая броня, простое оружие',
                'Магия пакта (ячейки, CHA)',
                'Зловещие призывы (1 на уровне 2)',
                'Иноплеменный покровитель'
            ]
        },
        artificer: {
            title: 'ARTIFICER',
            features: [
                'Кость хитов: 1к8',
                'Основная характеристика: ИНТЕЛЛЕКТ',
                'Владения: лёгкая броня, щиты, простое оружие',
                'Инструменты ремесла (2 набора)',
                'Магия изобретателя (INT, prepared)',
                'Инфузия предметов (2 предмета)'
            ]
        },
        '': {
            title: 'CLASS',
            features: []
        }
    },
    background: {
        'acolyte': {
            title: 'ACOLYTE',
            features: [
                'Skills: Insight, Religion',
                'Shelter of the Faithful (sanctuary at temples)',
                'Two extra languages'
            ]
        },
        'charlatan': {
            title: 'CHARLATAN',
            features: [
                'Skills: Deception, Sleight of Hand',
                'False Identity (forged documents)',
                'Counterfeit documents kit'
            ]
        },
        'criminal': {
            title: 'CRIMINAL',
            features: [
                'Skills: Deception, Stealth',
                'Criminal Contact (underworld access)',
                'Black Market (buy illegal items)'
            ]
        },
        'entertainer': {
            title: 'ENTERTAINER',
            features: [
                'Skills: Acrobatics, Performance',
                'By Popular Demand (audience shelter)',
                'Successful Performance (earn money)'
            ]
        },
        'folk-hero': {
            title: 'FOLK HERO',
            features: [
                'Skills: Animal Handling, Survival',
                'Common Knowledge (folk wisdom)',
                'Rustic Hospitality (countryside support)'
            ]
        },
        'guild-artisan': {
            title: 'GUILD ARTISAN',
            features: [
                'Skills: Insight, Persuasion',
                'Guild Membership (trade network)',
                'Artisan\'s business (one language)'
            ]
        },
        'hermit': {
            title: 'HERMIT',
            features: [
                'Skills: Medicine, Religion',
                'Discovery (secret knowledge)',
                'Healer (short rest healing)'
            ]
        },
        'noble': {
            title: 'NOBLE',
            features: [
                'Skills: History, Persuasion',
                'Position of Privilege (court access)',
                'One extra language'
            ]
        },
        'outlander': {
            title: 'OUTLANDER',
            features: [
                'Skills: Athletics, Survival',
                'Wanderer (find shelter/food)',
                'One extra language'
            ]
        },
        'sage': {
            title: 'SAGE',
            features: [
                'Skills: Arcana, History',
                'Researcher (find information)',
                'Two extra languages'
            ]
        },
        'sailor': {
            title: 'SAILOR',
            features: [
                'Skills: Athletics, Perception',
                "Ship's Crew (contacts at sea)",
                'Voyager (resistance to exhaustion)'
            ]
        },
        'pirate': {
            title: 'PIRATE',
            features: [
                'Skills: Athletics, Perception',
                'Pirate Crew (undersea contacts)',
                'Notorious Reputation (fear/awe)'
            ]
        },
        'soldier': {
            title: 'SOLDIER',
            features: [
                'Skills: Athletics, Intimidation',
                'Weapon Handler (military weapons)',
                'Military Rank (command respect)'
            ]
        },
        'urchin': {
            title: 'URCHIN',
            features: [
                'Skills: Sleight of Hand, Stealth',
                'City Secrets (navigate city faster)',
                'Streetwise (contacts in slums)'
            ]
        },
        '': {
            title: 'BACKGROUND',
            features: []
        }
    }
};

// ===== CLASS BASE ACTIVE FEATURES (Actions tab) =====
// Structured features for base class abilities. Placeholders like {str}, {dex}, {prof} are replaced at render time.
window.CLASS_BASE_FEATURES = {
    fighter: [
        { name: 'Второе дыхание', type: 'Бонусное', icon: '💨', desc : 'Восстановите 1d10+боец.уровень HP. 1/кор. отдых.' },
        { name: 'Прилив действия', type: 'Действие', icon: '⚡', desc : 'Дополнительное действие в этом ходу. 1/кор. отдых (ур. 17: 2, ур. 20: 3).' }
    ],
    barbarian: [
        { name: 'Ярость', type: 'Бонусное', icon: '🔥', desc : 'Преимущество СИЛ, +2 урон, сопротивление blunt/piercing/slashing. 1 мин, 2/дл. отдых.' },
        { name: 'Безрассудная атака', type: 'Бонусное', icon: '⚔', desc : 'Преимущество на атаки СИЛ до конца ярости. Враги имеют преимущество на вас.' }
    ],
    cleric: [
        { name: 'Влиять божество', type: 'Действие', icon: '✨', desc : 'Божественные эффекты: изгнание нежити, обращение нежити, лечение. 2/кор. отдых.' }
    ],
    druid: [
        { name: 'Дикая форма', type: 'Действие', icon: '🐺', desc : 'Превратитесь в зверя. 1 час, 2/дл. отдых.' }
    ],
    paladin: [
        { name: 'Божественное чувство', type: 'Действие', icon: '👁', desc : 'Обнаружить нежить, нечестивую плоскость. 1/кор. отдых.' },
        { name: 'Влиять божество', type: 'Действие', icon: '✨', desc : 'Исцелить, изгнать нежить, или обратить нежить. 2/кор. отдых.' }
    ],
    bard: [
        { name: 'Бардовское вдохновение', type: 'Бонусное', icon: '🎵', desc : 'Цель бросает {inspDie} и прибавляет к любой проверке или броску атаки/спасброска/урона. 1/кратный отдых.' },
        { name: 'Песнь отдыха', type: 'Пассивная', icon: '🎶', desc : 'Союзники восстанавливают до {restDie} доп. HP сверх ударных кубов.' },
        { name: 'Контрочарование', type: 'Действие', icon: '🎶', level: 6, desc : 'Исполнение до конца след. хода. Вы и союзники в 30 фт. с ПРЕИМУЩЕСТВОМ на спасброски от ИСПУГА и ОЧАРОВАНИЯ.' }
    ],
    rogue: [
        { name: 'Скрытная атака', type: 'Пассивная', icon: '🗡', desc : 'Доп. урон 1d6 за каждые 2 уровня. При попадании с союзником рядом или преимуществом.' }
    ],
    monk: [
        { name: 'Боевое искусство', type: 'Атака', icon: '👊', desc : 'Невооружённая атака: 1d4+мудрость. Бонусное действие: отступить или схватить.' }
    ],
    sorcerer: [
        { name: 'Метамания', type: 'Действие', icon: '✨', desc : 'Используйте очки магии для изменения заклинаний: усиление, удлинение, двойное заклинание.' }
    ],
    warlock: [
        { name: 'Зловещие призывы', type: 'Пассивная', icon: '🔮', desc : 'Изучите зловещие призывы для дополнительных эффектов.' }
    ],
    wizard: [
        { name: 'Восстановление арканы', type: 'Дл. отдых', icon: '📖', desc : 'Восстановите ячейки заклинаний, сумма уровней ≤ половина уровня.' }
    ]
};

// ===== AGGREGATED CLASS DATA (global) =====

window.CLASS_DATA = {};
(function buildCLASS_DATA() {
    var allClasses = [
        'barbarian', 'bard', 'cleric', 'druid', 'fighter',
        'monk', 'paladin', 'ranger', 'rogue', 'sorcerer',
        'warlock', 'wizard', 'artificer'
    ];
    allClasses.forEach(function(cls) {
        var sData = subclassData[cls];
        var subclasses = [];
        if (sData) {
            if (Array.isArray(sData.options)) {
                subclasses = sData.options;
            } else {
                Object.keys(sData).forEach(function(key) {
                    if (key === 'title') return;
                    var entry = sData[key];
                    if (entry && entry.name) subclasses.push({ value: key, label: entry.name });
                });
            }
        }
        window.CLASS_DATA[cls] = {
            subclasses: subclasses,
            spellLimit: PHB_REQUIREMENTS[cls] ? PHB_REQUIREMENTS[cls].spellsToChoose : 0
        };
    });
})();

// ===== EXPERTISE CLASSES =====
// Classes that gain Expertise: { classKey: { levels: [level, totalExpertiseSkills] } }
window.EXPERTISE_CLASSES = {
    bard: {
        milestones: [
            { level: 3, total: 2 },
            { level: 10, total: 4 }
        ]
    },
    rogue: {
        milestones: [
            { level: 3, total: 2 },
            { level: 10, total: 4 }
        ]
    }
};
