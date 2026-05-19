// ===== PHB CORE ENGINE =====

window.PHB_TABLES = {
    proficiencyBonus: [0, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],

    skillsData: {
        'Acrobatics': 'dex',
        'Animal Handling': 'wis',
        'Arcana': 'int',
        'Athletics': 'str',
        'Deception': 'cha',
        'History': 'int',
        'Insight': 'wis',
        'Intimidation': 'cha',
        'Investigation': 'int',
        'Medicine': 'wis',
        'Nature': 'int',
        'Perception': 'wis',
        'Performance': 'cha',
        'Persuasion': 'cha',
        'Religion': 'int',
        'Sleight of Hand': 'dex',
        'Stealth': 'dex',
        'Survival': 'wis'
    },

    abilities: ['str', 'dex', 'con', 'int', 'wis', 'cha'],

    abilityAbbr: { str: 'STR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'WIS', cha: 'CHA' },

    savingThrows: [
        { name: 'STR', key: 'str' },
        { name: 'DEX', key: 'dex' },
        { name: 'CON', key: 'con' },
        { name: 'INT', key: 'int' },
        { name: 'WIS', key: 'wis' },
        { name: 'CHA', key: 'cha' }
    ]
};

// ===== LOCALIZATION =====

window.PHB_LOCALE = {
    ru: {
        abilityNames: {
            str: 'Сила', dex: 'Ловкость', con: 'Телосложение',
            int: 'Интеллект', wis: 'Мудрость', cha: 'Харизма'
        },
        sections: {
            'Saving Throws': 'Спасброски',
            'Senses': 'Ощущения',
            'Proficiencies': 'Владения',
            'Skills': 'Навыки'
        },
        rest: {
            'SHORT REST': 'КОРОТКИЙ ОТДЫХ',
            'LONG REST': 'ДЛИТЕЛЬНЫЙ ОТДЫХ'
        },
        subclassTitle: 'АРХЕТИП',
        senses: {
            'Passive Perception': 'Пассивное восприятие',
            'Investigation': 'Расследование',
            'Insight': 'Проницательность'
        },
        tabs: {
            'Actions': 'ДЕЙСТВИЯ',
            'Spells': 'ЗАКЛИНАНИЯ',
            'Equipment': 'СНАРЯЖЕНИЕ',
            'Features': 'УМЕНИЯ',
            'Notes': 'ЗАМЕТКИ'
        },
        tabPlaceholders: {
            'Actions': 'Нет действий',
            'Spells': 'Нет заклинаний',
            'Equipment': 'Нет снаряжения',
            'Features': 'Нет умений',
            'Notes': 'Нет заметок'
        },
        skills: {
            'Acrobatics': 'Акробатика',
            'Animal Handling': 'Уход за животными',
            'Arcana': 'Магия',
            'Athletics': 'Атлетика',
            'Deception': 'Обман',
            'History': 'История',
            'Insight': 'Проницательность',
            'Intimidation': 'Запугивание',
            'Investigation': 'Расследование',
            'Medicine': 'Медицина',
            'Nature': 'Природа',
            'Perception': 'Внимательность',
            'Performance': 'Выступление',
            'Persuasion': 'Убеждение',
            'Religion': 'Религия',
            'Sleight of Hand': 'Ловкость рук',
            'Stealth': 'Скрытность',
            'Survival': 'Выживание'
        },
        abilities: {
            'STR': 'СИЛ',
            'DEX': 'ЛОВ',
            'CON': 'ТЕЛ',
            'INT': 'ИНТ',
            'WIS': 'МУД',
            'CHA': 'ХАР'
        },
        saves: {
            'STR': 'Силы',
            'DEX': 'Ловкости',
            'CON': 'Телосложения',
            'INT': 'Интеллекта',
            'WIS': 'Мудрости',
            'CHA': 'Харизмы'
        },
        spellModal: {
            'Target:': 'Цель:',
            'Casting Time:': 'Время:',
            'Components:': 'Компоненты:',
            'Duration:': 'Длительность:',
            'CANTRIP': 'ЗАГОВОР',
            'LEVEL SPELL': 'УРОВЕНЬ',
            'Evocation': 'Призывание',
            'Abjuration': 'Защита',
            'Conjuration': 'Призыв',
            'Divination': 'Предвидение',
            'Enchantment': 'Очарование',
            'Illusion': 'Иллюзия',
            'Necromancy': 'Некромантия',
            'Transmutation': 'Превращение'
        },
        actions: {
            'Attack': 'Атака',
            'Defend': 'Оборона',
            'Cast Spell': 'Заклинание',
            'Dash': 'Рывок',
            'Dodge': 'Уклонение',
            'Disengage': 'Отход',
            'Help': 'Помощь',
            'Hide': 'Скрыться',
            'Search': 'Поиск',
            'Use Magic Item': 'Волшебный предмет',
            'Second Wind': 'Второе дыхание',
            'Rage': 'Ярость',
            'Unarmored Defense': 'Безбронная защита',
            'Reckless Attack': 'Безрассудная атака',
            'Danger Sense': 'Острое чутьё',
            'Druidic': 'Друидизм',
            'Cantrip': 'Заговор',
            'Wild Magic Surge': 'Вспышка хаоса',
            'Metamagic': 'Метамантия'
        }
    }
};

// ===== HELPER FUNCTIONS =====

window.getSkillKeyFromEl = function(el) {
    return (el && el.getAttribute('data-en-name')) || el.textContent.trim();
};

// ===== BACKGROUND DATA =====

window.BACKGROUND_TOOLS = {
    'acolyte': 'None',
    'charlatan': 'Disguise kit, Forgery kit',
    'criminal': 'One type of gaming set, Vehicles (land)',
    'entertainer': 'One type of musical instrument',
    'folk-hero': "Artisan's tools, Vehicles (land)",
    'guild-artisan': "One type of artisan's tools",
    'hermit': 'Herbalism kit',
    'noble': 'One type of gaming set',
    'outlander': 'One type of musical instrument',
    'sage': 'None',
    'sailor': "Navigator's tools, Vehicles (water)",
    'pirate': "Navigator's tools, Vehicles (water)",
    'soldier': 'One type of gaming set, Vehicles (land)',
    'urchin': "Disguise kit, Thieves' tools",
    '': ''
};

window.BACKGROUND_CHOICES = {
    'acolyte': { languages: 2 },
    'charlatan': { languages: 0 },
    'criminal': { languages: 0 },
    'entertainer': { languages: 0 },
    'folk-hero': { languages: 0 },
    'guild-artisan': { languages: 1 },
    'hermit': { languages: 0 },
    'noble': { languages: 1 },
    'outlander': { languages: 1 },
    'sage': { languages: 2 },
    'sailor': { languages: 0 },
    'pirate': { languages: 0 },
    'soldier': { languages: 0 },
    'urchin': { languages: 0 },
    '': {}
};

window.COMMON_LANGUAGES = [
    'Common', 'Dwarvish', 'Elvish', 'Giant', 'Gnomish',
    'Goblin', 'Halfling', 'Orc', 'Abyssal', 'Celestial',
    'Deep Speech', 'Draconic', 'Infernal', 'Primordial',
    'Sylvan', 'Undercommon'
];

window.BACKGROUND_SKILLS = {
    'acolyte': ['Insight', 'Religion'],
    'charlatan': ['Deception', 'Sleight of Hand'],
    'criminal': ['Deception', 'Stealth'],
    'entertainer': ['Acrobatics', 'Performance'],
    'folk-hero': ['Animal Handling', 'Survival'],
    'guild-artisan': ['Insight', 'Persuasion'],
    'hermit': ['Medicine', 'Religion'],
    'noble': ['History', 'Persuasion'],
    'outlander': ['Athletics', 'Survival'],
    'sage': ['Arcana', 'History'],
    'sailor': ['Athletics', 'Perception'],
    'pirate': ['Athletics', 'Perception'],
    'soldier': ['Athletics', 'Intimidation'],
    'urchin': ['Sleight of Hand', 'Stealth'],
    '': []
};

// ===== XP TABLE =====

window.xpTable = {
    1: 0, 2: 300, 3: 900, 4: 2700, 5: 6500, 6: 14000, 7: 23000, 8: 34000,
    9: 48000, 10: 64000, 11: 85000, 12: 100000, 13: 120000, 14: 140000,
    15: 165000, 16: 195000, 17: 225000, 18: 265000, 19: 305000, 20: 355000
};

// ===== SUBCLASS TITLES =====

window.subclassTitles = {
    'paladin': 'СВЯЩЕННАЯ КЛЯТВА',
    'fighter': 'БОЕВОЙ АРХЕТИП',
    'wizard': 'ШКОЛА МАГИИ',
    'cleric': 'БОЖЕСТВЕННАЯ ОБЛАСТЬ',
    'rogue': 'АРХЕТИП',
    'barbarian': 'ПЕРВЫЙ ПУТЬ',
    'sorcerer': 'ПРОИСХОЖДЕНИЕ',
    'ranger': 'ХОЗЯИН ЗВЕРЕЙ',
    'bard': 'ОРДЕН',
    'druid': 'КРУГ',
    'monk': 'ПУТЬ',
    'warlock': 'ПОКРОВИТЕЛЬ',
    '': 'ПОДКЛАСС',
    'artificer': 'СПЕЦИАЛИЗАЦИЯ ИЗOBРЕТАТЕЛЯ'
};

// ===== SPELL PARAM LOCALE =====

window.SPELL_PARAM_LOCALE_RU = {
    schools: {
        'Evocation': 'Эвокация',
        'Abjuration': 'Защита',
        'Conjuration': 'Призыв',
        'Divination': 'Предвидение',
        'Enchantment': 'Очарование',
        'Illusion': 'Иллюзия',
        'Necromancy': 'Некромантия',
        'Transmutation': 'Превращение'
    },
    castingTime: {
        '1 action': '1 действие',
        '1 bonus action': '1 бонусное действие',
        '1 reaction': '1 реакция',
        '1 action or bonus action': '1 действие или бонусное действие',
        '1 minute': '1 минута',
        '1 minutes': '1 минута',
        '10 minutes': '10 минут',
        '10 min': '10 минут',
        '1 hour': '1 час',
        'Special': 'Специальное'
    },
    duration: {
        'Instantaneous': 'Мгновенно',
        'Concentration, up to 1 minute': 'Концентрация, до 1 минуты',
        'Concentration, up to 10 minutes': 'Концентрация, до 10 минут',
        'Concentration, up to 1 hour': 'Концентрация, до 1 часа',
        'Concentration, up to 24 hours': 'Концентрация, до 24 часов',
        '1 round': '1 раунд',
        '10 minutes': '10 минут',
        '1 minute': '1 минута',
        '1 hour': '1 час',
        '24 hours': '24 часа',
        'Until dispelled': 'До рассеивания',
        'Special': 'Специальное',
        'Until exhaustion': 'До истощения'
    },
    range: {
        'Self': 'На себя',
        'Touch': 'Прикосновение',
        'Sight': 'Видимое расстояние',
        'Unlimited': 'Безгранично'
    },
    levelNames: {
        'cantrip': 'Заговор',
        '1': '1-й уровень',
        '2': '2-й уровень',
        '3': '3-й уровень',
        '4': '4-й уровень',
        '5': '5-й уровень',
        '6': '6-й уровень',
        '7': '7-й уровень',
        '8': '8-й уровень',
        '9': '9-й уровень'
    },
    units: {
        'ft': 'фт',
        'ft.': 'фт',
        'ft ': 'фт ',
    }
};

// Helper: localize a spell object, returns new object with Russian fields
window.locSpell = function(spell) {
    var loc = SPELL_LOCALE_RU[spell.id] || SPELL_LOCALE_RU[spell.name];
    if (!loc) return spell;
    var result = {};
    for (var k in spell) result[k] = spell[k];
    result.name = loc.name;
        if (loc.desc) {
            if (spell.description) { result.description = loc.desc; }
            else if (spell.effect) { result.effect = loc.desc; }
            else if (spell.damage) { result.damage = loc.desc; }
            else { result.description = loc.desc; }
        }
    if (SPELL_PARAM_LOCALE_RU.schools[spell.school]) result.school = SPELL_PARAM_LOCALE_RU.schools[spell.school];
    if (SPELL_PARAM_LOCALE_RU.castingTime[spell.castingTime]) result.castingTime = SPELL_PARAM_LOCALE_RU.castingTime[spell.castingTime];
    if (SPELL_PARAM_LOCALE_RU.duration[spell.duration]) result.duration = SPELL_PARAM_LOCALE_RU.duration[spell.duration];
    if (SPELL_PARAM_LOCALE_RU.range[spell.target]) {
        var tgt = spell.target;
        var rngKey = SPELL_PARAM_LOCALE_RU.range[tgt];
        if (rngKey) result.target = rngKey;
    }
    if (result.target) {
        result.target = result.target.replace(/ft\b/g, 'фт');
    }
    return result;
};

// Ability name in Russian
window.abilityNameRu = function(key) {
    return PHB_LOCALE.ru.abilityNames[key] || key.toUpperCase();
};
