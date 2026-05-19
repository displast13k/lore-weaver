// Race languages granted by race features
window.RACE_LANGUAGES = {
    dwarf: 'Dwarvish',
    elf: 'Elvish',
    human: null,
    halfling: null,
    'half-elf': 'Elvish',
    tiefling: 'Infernal',
    dragonborn: 'Draconic',
    gnome: 'Gnomish',
    'half-orc': null,
    lizardfolk: 'Draconic',
    tabaxi: null,
    goliath: 'Giant',
    aasimar: null,
    '': null
};
// Race darkvision
window.RACE_DARKVISION = {
    dwarf: true,
    elf: true,
    human: false,
    halfling: false,
    'half-elf': true,
    tiefling: true,
    dragonborn: false,
    gnome: true,
    'half-orc': false,
    lizardfolk: false,
    tabaxi: true,
    goliath: false,
    aasimar: false,
    '': false
};
// Race HP bonuses per level (Hill Dwarf: +1 HP/level)
window.RACE_HP_BONUS = {
    dwarf: 1,
    elf: 0,
    human: 0,
    halfling: 0,
    'half-elf': 0,
    tiefling: 0,
    dragonborn: 0,
    gnome: 0,
    'half-orc': 0,
    lizardfolk: 0,
    tabaxi: 0,
    goliath: 0,
    aasimar: 0,
    '': 0
};
// Race ability score bonuses per race
window.RACE_STATS = {
    dwarf: { con: 2 },
    elf: { dex: 2 },
    human: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    halfling: { dex: 2 },
    'half-elf': { cha: 2 },
    tiefling: { cha: 2, int: 1 },
    dragonborn: { str: 2, cha: 1 },
    gnome: { int: 2 },
    'half-orc': { str: 2, con: 1 },
    lizardfolk: { con: 2, wis: 1 },
    tabaxi: { dex: 2, wis: 1 },
    goliath: { str: 2, con: 1 },
    aasimar: { cha: 2 },
    '': {}
};
// Race base speed per race
window.RACE_SPEED = {
    human: 30,
    elf: 30,
    dwarf: 25,
    halfling: 25,
    'half-elf': 30,
    tiefling: 30,
    dragonborn: 30,
    gnome: 25,
    'half-orc': 30,
    lizardfolk: 30,
    tabaxi: 30,
    goliath: 30,
    aasimar: 30,
    '': 30
};

// Race active features for Actions tab
window.RACE_FEATURES = {
    human: [],
    elf: [
        { name: 'Фейская магия', type: 'Дл. отдых', icon: '🧚', description: 'Очаруйте одно существо. 1/дл. отдых.' }
    ],
    dwarf: [],
    halfling: [
        { name: 'Везучий', type: 'Реакция', icon: '🍀', description: 'Перебросьте 1 на d20.' }
    ],
    'half-elf': [
        { name: 'Фейская магия', type: 'Дл. отдых', icon: '🧚', description: 'Очаруйте одно существо. 1/дл. отдых.' }
    ],
    tiefling: [
        { name: 'Адское порицание', type: 'Действие', icon: '😈', description: 'Луч урона некротической или огненной энергии. 1/дл. отдых.' }
    ],
    dragonborn: [
        { name: 'Дыхание дракона', type: 'Действие', icon: '🐉', description: 'Конус или линия урона. 1/отдых.' }
    ],
    gnome: [],
    'half-orc': [
        { name: 'Свирепость', type: 'Реакция', icon: '👹', description: 'При выбросе 1, бросьте ещё раз.' }
    ],
    lizardfolk: [
        { name: 'Укус людоящера', type: 'Атака', icon: '🦷', description: 'Ближняя атака: +{prof} hit, 1d6+{str} кол. урон.' },
        { name: 'Хищная пасть', type: 'Бонусное', icon: '🐊', description: 'Успешный укус: цель получает временные HP = бонус мастерства. 1/отдых.' }
    ],
    tabaxi: [
        { name: 'Ловкие когти', type: 'Атака', icon: '🐾', description: 'Ближняя атака: +{prof} hit, 1d4+{dex} рубящий урон.' },
        { name: 'Любопытство', type: 'Бонусное', icon: '🏃', description: 'Переместитесь до скорости без провоцирования атак. 1/кор. отдых.' }
    ],
    goliath: [
        { name: 'Натиск', type: 'Реакция', icon: '💥', description: 'При крит. промахе: 1d12 психического урона.' }
    ],
    aasimar: [
        { name: 'Несущий свет', type: 'Заговор', icon: '💡', description: 'Вы знаете заговор Light (Свет).' },
        { name: 'Исцеляющие руки', type: 'Действие', icon: '💚', description: 'Коснитесь существа и восстановите ему {prof}d4 хитов. 1/кор. отдых.' }
    ],
    // Aasimar level 3 Celestial Heritage choices
    aasimar_subtypes: [
        {
            value: 'death',
            label: 'Саван смерти',
            features: [
                'Существа испуганы вами на 10 фт.',
                'Доп. урон излучением или некротикой = БМ'
            ],
            action: { name: 'Саван смерти', type: 'Пассивная', icon: '💀', description: 'Существа в радиусе 10 фт. имеют disadvantage на атаки против вас. Ваш урон +{prof} излучения или некротики.' }
        },
        {
            value: 'radiance',
            label: 'Испускание сияния',
            features: [
                'Яркий свет 10 фт., приглушённый 20 фт.',
                'Доп. урон излучением = БМ'
            ],
            action: { name: 'Испускание сияния', type: 'Пассивная', icon: '☀', description: 'Вы излучаете яркий свет на 10 фт. и приглушённый на 20 фт. Ваш урон +{prof} излучением.' }
        },
        {
            value: 'radiant_soul',
            label: 'Сияющая душа',
            features: [
                'Скорость полёта = скорость передвижения',
                'Доп. урон излучением = БМ'
            ],
            action: { name: 'Сияющая душа', type: 'Пассивная', icon: '🪽', description: 'Вы можете летать. Скорость полёта равна скорости передвижения. Ваш урон +{prof} излучением.' }
        }
    ],
    '': []
};
