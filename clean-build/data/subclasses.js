// ===== SUBCLASS DATA =====

window.subclassData = {
    paladin: {
        devotion: {
            name: "КЛЯТВА ПРЕДАННОСТИ",
            3: [
                { name: "Священное оружие", desc : "Бонусное действие: оружие +1 к атаке/урону 1 мин.", channelDivinity: { id: "sacred_weapon", charges: 1, reset: "short" } },
                { name: "Заклинания клятвы", desc : "Щит веры, Лунный луч", oathSpells: ["shield_of_faith", "moonbeam"] }
            ],
            5: [ { name: "Заклинания клятвы", desc : "Очищение пищи и воды, Очищение воды", oathSpells: ["purify_food_and_drink", "purify_water"] } ],
            7: [
                { name: "Аура преданности", desc : "Союзники 3 фт. не поддаются очарованию" },
                { name: "Заклинания клятвы", desc : "Лезвие манёвра, Изгнание", oathSpells: ["blade_ward", "banishment"] }
            ],
            15: [
                { name: "Аура защиты", desc : "Бонус к спасброскам = половина уровня паладина (округление вниз)" },
                { name: "Заклинания клятвы", desc : "Непроницаемость, Воскрешение", oathSpells: ["impermanence", "resurrection"] }
            ],
            20: [ { name: "Внутренняя чистота", desc : "Преимущество на спасброски при бессознательном состоянии от очарования и страха" } ]
        },
        ancients: {
            name: "КЛЯТВА ДРЕВНИХ",
            3: [
                { name: "Защита древнего леса", desc : "Бонусное действие: сопротивление всему урону 1 мин.", channelDivinity: { id: "elder_grove", charges: 1, reset: "short" } },
                { name: "Заклинания клятвы", desc : "Щит веры, Лунный луч", oathSpells: ["shield_of_faith", "moonbeam"] }
            ],
            5: [ { name: "Заклинания клятвы", desc : "Огненные ладони, Порыв ветра", oathSpells: ["burning_hands", "gust_of_wind"] } ],
            7: [
                { name: "Разрушители пустоты", desc : "Феи и нежить рядом ощущают ужас, могут спасти Мудростью" },
                { name: "Заклинания клятвы", desc : "Лес, Изгнание", oathSpells: ["entangle", "banishment"] }
            ],
            15: [
                { name: "Аура защиты", desc : "Бонус к спасброскам = половина уровня паладина (округление вниз)" },
                { name: "Заклинания клятвы", desc : "Противостояние, Воскрешение", oathSpells: ["commune", "resurrection"] }
            ],
            20: [ { name: "Аура древних", desc : "Союзники 10 фт. не поддаются очарованию" } ]
        },
        vengeance: {
            name: "КЛЯТВА МСТИ",
            3: [
                { name: "Обет вражды", desc : "Бонусное действие: преимущество на атаки по одной цели 1 мин.", channelDivinity: { id: "vow_of_enmity", charges: 1, reset: "short" } },
                { name: "Заклинания клятвы", desc : "Щит веры, Лунный луч", oathSpells: ["shield_of_faith", "moonbeam"] }
            ],
            5: [ { name: "Заклинания клятвы", desc : "Мisty step, Тень", oathSpells: ["misty_step", "darkness"] } ],
            7: [
                { name: "Покарать нечестивых", desc : "Реакция: при промахе по вам доп. 1к8 некротического урона цели" },
                { name: "Заклинания клятвы", desc : "Гнев, Изгнание", oathSpells: ["wrathful_smite", "banishment"] }
            ],
            15: [
                { name: "Аура мести", desc : "Враги 10 фт. не могут закончить ход в пределах 30 фт. от вас, если вы получили урон" },
                { name: "Заклинания клятвы", desc : "Охота на нечестивых, Воскрешение", oathSpells: ["hunters_mark", "resurrection"] }
            ],
            20: { name: "Меч мести", desc : "Бонусное действие: призвать магический меч на 1 мин. 1к8+Хар урона" }
        },
        oathbreaker: {
            name: "КЛЯТВОПРЕСТУПНИК",
            3: [
                { name: "Тёмное обращение", desc : "Преимущество на спасброски от очарования; реакция для спасброска от него", channelDivinity: { id: "darker_blessing", charges: 1, reset: "short" } },
                { name: "Заклинания клятвы", desc : "Ледяное касание, Ложная жизнь", oathSpells: ["chill_touch", "false_life"] }
            ],
            5: [ { name: "Заклинания клятвы", desc : "Луч бессилия, Огненные ладони", oathSpells: ["ray_of_enfeeblement", "burning_hands"] } ],
            7: [
                { name: "Призвать нежить", desc : "Действие: призвать 2 призрачных волков или 1 призрака на 1 час" },
                { name: "Заклинания клятвы", desc : "Щит теней, Огненный удар", oathSpells: ["shield_shadow", "flame_strike"] }
            ],
            15: [
                { name: "Чумная аура", desc : "Враги 10 фт. уязвимы к урону от ваших атак и заклинаний" },
                { name: "Заклинания клятвы", desc : "Палец смерти, Солнечный взрыв", oathSpells: ["finger_of_death", "sunburst"] }
            ],
            20: [ { name: "Тёмный бог", desc : "Бонусное действие: 15-фт конус 4к10 некротического урона, спас. Тел" } ]
        },
        crown: {
            name: "КЛЯТВА КОРОНЫ",
            3: [
                { name: "Непоколебимость", desc : "Бонусное действие: иммунитет к сжатию и перемещению 1 мин.", channelDivinity: { id: "imperious_command", charges: 1, reset: "short" } },
                { name: "Заклинания клятвы", desc : "Щит веры, Лунный луч", oathSpells: ["shield_of_faith", "moonbeam"] }
            ],
            5: [ { name: "Заклинания клятвы", desc : "Огненные ладони, Порыв ветра", oathSpells: ["burning_hands", "gust_of_wind"] } ],
            7: [
                { name: "Приказ короля", desc : "Действие: существо 60 фт. спас. Мудрость или подчиняется приказу 1 мин." },
                { name: "Заклинания клятвы", desc : "Гипноз, Изгнание", oathSpells: ["hypnotic_pattern", "banishment"] }
            ],
            15: [
                { name: "Аура защиты", desc : "Бонус к спасброскам = половина уровня паладина (округление вниз)" },
                { name: "Заклинания клятвы", desc : "Противостояние, Воскрешение", oathSpells: ["commune", "resurrection"] }
            ],
            20: [ { name: "Аура короля", desc : "Союзники 10 фт. получают ВП и скорость +10 фт." } ]
        },
        redemption: {
            name: "КЛЯТВА ИСКУПЛЕНИЯ",
            3: [
                { name: "Голос мира", desc : "Бонусное действие: цель 60 фт. теряет желание сражаться 1 мин, спас. Мудрость", channelDivinity: { id: "voice_of_peace", charges: 1, reset: "short" } },
                { name: "Заклинания клятвы", desc : "Щит веры, Лунный луч", oathSpells: ["shield_of_faith", "moonbeam"] }
            ],
            5: [ { name: "Заклинания клятвы", desc : "Успокоение эмоций, Малое восстановление", oathSpells: ["calm_emotions", "lesser_restoration"] } ],
            7: [
                { name: "Объятия мира", desc : "При получении урона: бонус к спасброскам = половина уровня паладина" },
                { name: "Заклинания клятвы", desc : "Противостояние, Изгнание", oathSpells: ["commune", "banishment"] }
            ],
            15: [
                { name: "Аура защиты", desc : "Бонус к спасброскам = половина уровня паладина (округление вниз)" },
                { name: "Заклинания клятвы", desc : "Великое исцеление, Воскрешение", oathSpells: ["greater_restoration", "resurrection"] }
            ],
            20: [ { name: "Аура миротворца", desc : "Враги 10 фт. с помехой на атаки по целям, кроме вас" } ]
        },
        conquest: {
            name: "КЛЯТВА ПОКОРЕНИЯ",
            3: [
                { name: "Жнец страха", desc : "Бонусное действие: 3 существа 60 фт. спас. Мудрость или напуганы 1 мин.", channelDivinity: { id: "scourge_of_might", charges: 1, reset: "short" } },
                { name: "Заклинания клятвы", desc : "Щит веры, Лунный луч", oathSpells: ["shield_of_faith", "moonbeam"] }
            ],
            5: [ { name: "Заклинания клятвы", desc : "Огненные ладони, Порыв ветра", oathSpells: ["burning_hands", "gust_of_wind"] } ],
            7: [
                { name: "Предательский удар", desc : "Реакция: при попадании по вам доп. 1к8 психического урона" },
                { name: "Заклинания клятвы", desc : "Гипноз, Изгнание", oathSpells: ["hypnotic_pattern", "banishment"] }
            ],
            15: [
                { name: "Аура покорения", desc : "Враги 10 фт. напуганы, пока вы не оглушены" },
                { name: "Заклинания клятвы", desc : "Противостояние, Воскрешение", oathSpells: ["commune", "resurrection"] }
            ],
            20: [ { name: "Смертельный ужас", desc : "Бонусное действие: 10 фт. конус 10 фт. 5к10 психического урона, спас. Мудрость" } ]
        },
        glory: {
            name: "КЛЯТВА СЛАВЫ",
            3: [
                { name: "Аура роста", desc : "Бонусное действие: союзники 10 фт. скорость +10 фт., прыжок x2, ВП 1 мин.", channelDivinity: { id: "aura_of_growth", charges: 1, reset: "short" } },
                { name: "Заклинания клятвы", desc : "Щит веры, Лунный луч", oathSpells: ["shield_of_faith", "moonbeam"] }
            ],
            5: [ { name: "Заклинания клятвы", desc : "Клинок поспешности, Героизм", oathSpells: ["haste", "heroism"] } ],
            7: [
                { name: "Боевой клич", desc : "Бонусное действие: 1к8+уровень паладина урона 10 фт. конус, спас. Мудрость" },
                { name: "Заклинания клятвы", desc : "Благословение, Изгнание", oathSpells: ["bless", "banishment"] }
            ],
            15: [
                { name: "Аура защиты", desc : "Бонус к спасброскам = половина уровня паладина (округление вниз)" },
                { name: "Заклинания клятвы", desc : "Героизм, Воскрешение", oathSpells: ["heroism", "resurrection"] }
            ],
            20: [ { name: "Божественное вдохновение", desc : "Союзники 10 фт. преимущество на атаки и спасброски" } ]
        },
        watchers: {
            name: "КЛЯТВА СМОТРЕЛИЦ",
            3: [
                { name: "Астральный вид", desc : "Бонусное действие: тёмное зрение 60 фт., преимущество на спас. Мудрость 1 мин.", channelDivinity: { id: "astral_sight", charges: 1, reset: "short" } },
                { name: "Заклинания клятвы", desc : "Щит веры, Лунный луч", oathSpells: ["shield_of_faith", "moonbeam"] }
            ],
            5: [ { name: "Заклинания клятвы", desc : "Огненные ладони, Порыв ветра", oathSpells: ["burning_hands", "gust_of_wind"] } ],
            7: [
                { name: "Проекция защитника", desc : "Бонусное действие: призвать щит 30 фт. Союзники +2 к КД 1 мин." },
                { name: "Заклинания клятвы", desc : "Волшебное оружие, Изгнание", oathSpells: ["magic_weapon", "banishment"] }
            ],
            15: [
                { name: "Аура защиты", desc : "Бонус к спасброскам = половина уровня паладина (округление вниз)" },
                { name: "Заклинания клятвы", desc : "Противостояние, Воскрешение", oathSpells: ["commune", "resurrection"] }
            ],
            20: [ { name: "Страж реальности", desc : "Реакция: при телепортации существа 30 фт. 3к10 разрывающего урона, спас. Ловкость" } ]
        }
    },
    cleric: {
        life: {
            name: "ДОМЕН ЖИЗНИ",
            1: [
                { name: "Бонусное владение", desc : "Тяжёлые доспехи", modifiers: { armorProficiencies: ["heavy"] } },
                { name: "Ученик жизни", desc : "Лечение +1d4", specialLogic: { healingBonus: "1d4" } },
                { name: "Заклинания домена", desc : "Благословение, Лечение ран", domainSpells: ["bless", "cure_wounds"] }
            ],
            2: [ { name: "Божественный канал: Сохранение жизни", desc : "Лечение 5к6+уровень жреца в радиусе 30 фт.", channelDivinity: { id: "preserve_life", maxChargesFormula: "clericLevel >= 18 ? 3 : (clericLevel >= 6 ? 2 : 1)" } } ],
            3: [ { name: "Заклинания домена", desc : "Малое восстановление, Стабилизация", domainSpells: ["lesser_restoration", "stabilize"] } ],
            5: [ { name: "Заклинания домена", desc : "Чувство зверя, Защита от смерти", domainSpells: ["beast_sense", "death_ward"] } ],
            6: [ { name: "Благословенный целитель", desc : "При лечении других восстанавливаете 2 HP" } ],
            7: [ { name: "Заклинания домена", desc : "Защита от энергии, Возвращение мёртвых", domainSpells: ["protection_from_energy", "raise_dead"] } ],
            8: [ { name: "Божественный удар", desc : "Доп. 1d8 излучения при попадании оружием", specialLogic: { divineStrike: "1d8" } } ],
            9: [ { name: "Заклинания домена", desc : "Массовое лечение ран, Регенерация", domainSpells: ["mass_cure_wounds", "regenerate"] } ],
            17: [ { name: "Верховное исцеление", desc : "Лечение восстанавливает максимум HP" } ]
        },
        tempest: {
            name: "ДОМЕН БУРИ",
            1: [
                { name: "Оружие богов войны", desc : "Лёгкие/средние доспехи, щиты, боевое оружие", modifiers: { armorProficiencies: ["light", "medium", "shields"], weaponProficiencies: ["martial"] } },
                { name: "Заклинания домена", desc : "Громовая волна, Раскалывание", domainSpells: ["thunderwave", "shatter"] }
            ],
            2: [ { name: "Божественный канал: Гнев бури", desc : "3 существа на расстоянии 60 фт. спас. Лов или 3к6 грозового урона", channelDivinity: { id: "storms_wrath", maxChargesFormula: "clericLevel >= 18 ? 3 : (clericLevel >= 6 ? 2 : 1)" } } ],
            3: [ { name: "Заклинания домена", desc : "Порыв ветра, Призыв молнии", domainSpells: ["gust_of_wind", "call_lightning"] } ],
            5: [ { name: "Заклинания домена", desc : "Град, Ледяной шторм", domainSpells: ["sleet_storm", "ice_storm"] } ],
            6: [ { name: "Удар громовой стрелы", desc : "Бонусное действие: молния 30 фт. 3к6 грозового урона" } ],
            7: [ { name: "Заклинания домена", desc : "Разрушительная волна, Огненная туча", domainSpells: ["destructive_wave", "incendiary_cloud"] } ],
            8: [ { name: "Божественный удар", desc : "Доп. 1d6 грозового урона при попадании оружием", specialLogic: { divineStrike: "1d6" } } ],
            9: [ { name: "Заклинания домена", desc : "Землетрясение, Ураган", domainSpells: ["earthquake", "hurricane"] } ],
            17: [ { name: "Ходящий по ветру", desc : "Скорость +30 фт., можно летать по воздуху" } ]
        },
        light: {
            name: "ДОМЕН СВЕТА",
            1: [
                { name: "Защитная вспышка", desc : "Реакция: +1d4 к КД атакующего", specialLogic: { wardingFlare: "1d4" } },
                { name: "Заклинания домена", desc : "Огненные ладони, Огонь феи", domainSpells: ["burning_hands", "faerie_fire"] }
            ],
            2: [ { name: "Божественный канал: Свет зари", desc : "20-фут. конус: 2к6 излучения, яркий свет 1 мин.", channelDivinity: { id: "radiance_of_the_dawn", maxChargesFormula: "clericLevel >= 18 ? 3 : (clericLevel >= 6 ? 2 : 1)" } } ],
            3: [ { name: "Заклинания домена", desc : "Дневной свет, Огненная защита", domainSpells: ["daylight", "fire_shield"] } ],
            5: [ { name: "Заклинания домена", desc : "Огненный удар, Ожог", domainSpells: ["flame_strike", "scorching_ray"] } ],
            6: [ { name: "Охрана от ночи", desc : "Тёмное зрение 60 фт., сопротивление некротическому урону" } ],
            7: [ { name: "Заклинания домена", desc : "Огненная стена, Стена лезвий", domainSpells: ["wall_of_fire", "blade_barrier"] } ],
            8: [ { name: "Божественный удар", desc : "Доп. 1d6 излучения при попадании оружием", specialLogic: { divineStrike: "1d6" } } ],
            9: [ { name: "Заклинания домена", desc : "Солнечный взрыв, Огненный удар", domainSpells: ["sunburst", "flame_strike"] } ],
            17: [ { name: "Корона свечей", desc : "Свет 30 фт., сопротивление огню, цель в радиусе 5 фт. уязвима к огню" } ]
        },
        war: {
            name: "ДОМЕН ВОЙНЫ",
            1: [
                { name: "Бонусное владение", desc : "Средние/тяжёлые доспехи, щиты, боевое оружие", modifiers: { armorProficiencies: ["medium", "heavy", "shields"], weaponProficiencies: ["martial"] } },
                { name: "Священник войны", desc : "Бонусное действие: 1d8 урона", specialLogic: { warPriest: "1d8" } },
                { name: "Заклинания домена", desc : "Божественная милость, Щит веры", domainSpells: ["divine_favor", "shield_of_faith"] }
            ],
            2: [ { name: "Божественный канал: Направляющий удар", desc : "Бонус d10 к атаке / Благословение: +1d8 к спасброскам союзников", channelDivinity: { id: "guided_strike", maxChargesFormula: "clericLevel >= 18 ? 3 : (clericLevel >= 6 ? 2 : 1)" } } ],
            3: [ { name: "Заклинания домена", desc : "Волшебное оружие, Щит веры", domainSpells: ["magic_weapon", "shield_of_faith"] } ],
            5: [ { name: "Заклинания домена", desc : "Клинок поспешности, Плащ крестоносца", domainSpells: ["blades_of_haste", "crusaders_mantle"] } ],
            6: [ { name: "Дополнительная атака", desc : "Бонусное действие: бросок оружия вместо священника войны" } ],
            7: [ { name: "Заклинания домена", desc : "Огненный удар, Щит веры", domainSpells: ["flame_strike", "shield_of_faith"] } ],
            8: [ { name: "Божественный удар", desc : "Доп. 1d8 излучения при попадании оружием", specialLogic: { divineStrike: "1d8" } } ],
            9: [ { name: "Заклинания домена", desc : "Солнечный взрыв, Огненный удар", domainSpells: ["sunburst", "flame_strike"] } ],
            17: [ { name: "Воин богов", desc : "Бонусное действие: 2к8 урона, КД -1 для атак против вас" } ]
        },
        trickery: {
            name: "ДОМЕН ОБМАНА",
            1: [
                { name: "Благословение фантасмагории", desc : "Выучить заговор иллюзии", specialLogic: { illusionCantrip: true } },
                { name: "Заклинания домена", desc : "Скрытый облик, Тайное изображение Таши", domainSpells: ["disguise_self", "tashas_hidden_image"] }
            ],
            2: [ { name: "Божественный канал: Создать двойственность", desc : "Иллюзия-двойник на 1 мин.", channelDivinity: { id: "create_duplicity", maxChargesFormula: "clericLevel >= 18 ? 3 : (clericLevel >= 6 ? 2 : 1)" } } ],
            3: [ { name: "Заклинания домена", desc : "Затуманивание, Зеркальное изображение", domainSpells: ["blur", "mirror_image"] } ],
            5: [ { name: "Заклинания домена", desc : "Великая иллюзия, Обман", domainSpells: ["major_illusion", "mislead"] } ],
            6: [ { name: "Плащ теней", desc : "Бонусное действие: стать невидимым при спрятке" } ],
            7: [ { name: "Заклинания домена", desc : "Проекция образа, Изоляция", domainSpells: ["project_image", "sequester"] } ],
            8: [ { name: "Удар отчуждения", desc : "Доп. 1d10 психического урона при попадании оружием" } ],
            9: [ { name: "Заклинания домена", desc : "Программируемая иллюзия, Ткань", domainSpells: ["program_illusion", "weave"] } ],
            17: [ { name: "Эхо прошлого", desc : "Бонусное действие: ослепить и оглушить существо на 1 мин." } ]
        },
        nature: {
            name: "ДОМЕН ПРИРОДЫ",
            1: [
                { name: "Охрана природы", desc : "Лёгкие доспехи, заговор друидизма", modifiers: { armorProficiencies: ["light"] }, specialLogic: { druidcraftCantrip: true } },
                { name: "Заклинания домена", desc : "Дружба животных, Речь с животными", domainSpells: ["animal_friendship", "speak_with_animals"] }
            ],
            2: [ { name: "Божественный канал: Призыв леса", desc : "Слабо видимая местность 20 фт. / Владыка элементов: 2 спасброска", channelDivinity: { id: "conjure_woods", maxChargesFormula: "clericLevel >= 18 ? 3 : (clericLevel >= 6 ? 2 : 1)" } } ],
            3: [ { name: "Заклинания домена", desc : "Чувство зверя, Лунный луч", domainSpells: ["beast_sense", "moonbeam"] } ],
            5: [ { name: "Заклинания домена", desc : "Призыв молнии, Рост растений", domainSpells: ["call_lightning", "plant_growth"] } ],
            6: [ { name: "Чемпион долины", desc : "Доспехи не мешают заклинаниям, сопротивление урону" } ],
            7: [ { name: "Заклинания домена", desc : "Контроль ветров, Червяная чума", domainSpells: ["control_winds", "insect_plague"] } ],
            8: [ { name: "Гнев природы", desc : "Реакция: 2к8 некротического урона атакующему" } ],
            9: [ { name: "Заклинания домена", desc : "Мстительный ангел, Солнечный взрыв", domainSpells: ["avenging_angel", "sunburst"] } ],
            17: [ { name: "Мщение за поругание природы", desc : "Сопротивление всему урону, кроме психического и некротического" } ]
        },
        knowledge: {
            name: "ДОМЕН ЗНАНИЙ",
            1: [
                { name: "Благословение знаний", desc : "Выберите 2 навыка: бонус к проверкам", specialLogic: { bonusSkills: 2 } },
                { name: "Заклинания домена", desc : "Стрела бездны, Понимание языков", domainSpells: ["arrow_of_abyss", "comprehend_languages"] }
            ],
            2: [ { name: "Божественный канал: Чтение акашической записи", desc : "Узнайте информацию, скрытую от обычных чувств", channelDivinity: { id: "akashic_record", maxChargesFormula: "clericLevel >= 18 ? 3 : (clericLevel >= 6 ? 2 : 1)" } } ],
            3: [ { name: "Заклинания домена", desc : "Обнаружение объектов, Речь с мёртвыми", domainSpells: ["locate_object", "speak_with_dead"] } ],
            5: [ { name: "Заклинания домена", desc : "Незаметность, Предание", domainSpells: ["nondetection", "legend_lore"] } ],
            6: [ { name: "Древний инициат", desc : "Выучить заклинание 3-го круга другого класса" } ],
            7: [ { name: "Заклинания домена", desc : "Прорицание, Настройка", domainSpells: ["scrying", "tune"] } ],
            8: [ { name: "Знание веков", desc : "Ментальная связь с божеством: ответы на вопросы" } ],
            9: [ { name: "Заклинания домена", desc : "Связь с иной плоскостью, Зрение предтечи", domainSpells: ["contact_other_plane", "forerunner_sight"] } ],
            17: [ { name: "Чтение ткани", desc : "Воспринимаете магию как видимые нити, бонус к Магии" } ]
        },
        death: {
            name: "ДОМЕН СМЕРТИ",
            1: [
                { name: "Вкус смерти", desc : "Вместо изгнания нежити: 5 фт. уязвимость к некротическому урону", specialLogic: { tasteDeath: true } },
                { name: "Заклинания домена", desc : "Ледяное касание, Ложная жизнь", domainSpells: ["chill_touch", "false_life"] }
            ],
            2: [ { name: "Божественный канал: Вызвать гниение", desc : "Существо теряет лечение и сопротивление на 1 мин.", channelDivinity: { id: "cause_decay", maxChargesFormula: "clericLevel >= 18 ? 3 : (clericLevel >= 6 ? 2 : 1)" } } ],
            3: [ { name: "Заклинания домена", desc : "Луч бессилия, Тень", domainSpells: ["ray_of_enfeeblement", "shade"] } ],
            5: [ { name: "Заклинания домена", desc : "Оживление мёртвых, Удушающее облако", domainSpells: ["animate_dead", "cloudkill"] } ],
            6: [ { name: "Жнец", desc : "Крит при 19-20, доп. 1н6 некротического урона при попадании" } ],
            7: [ { name: "Заклинания домена", desc : "Заражение, Палец смерти", domainSpells: ["contagion", "finger_of_death"] } ],
            8: [ { name: "Отражение", desc : "Реакция: вычесть 1к8+Муд из урона атаки" } ],
            9: [ { name: "Заклинания домена", desc : "Увядание, Умирающий свет", domainSpells: ["blight", "dying_light"] } ],
            17: [ { name: "Пожирательная тьма", desc : "Тьма 10 фт., некротический урон при лечении в радиусе 30 фт." } ]
        },
        forge: {
            name: "ДОМЕН КУЗНИЦЫ",
            1: [
                { name: "Благословение кузницы", desc : "Средние доспехи, щиты", modifiers: { armorProficiencies: ["medium", "shields"] } },
                { name: "Заклинания домена", desc : "Сращивание ран, Создание пламени", domainSpells: ["fuse_wounds", "produce_flame"] }
            ],
            2: [ { name: "Божественный канал: Исцеление кузницы", desc : "Лечение 3к8+Муд / Оружие богов: +1к8 к урону оружия", channelDivinity: { id: "forge_panacea", maxChargesFormula: "clericLevel >= 18 ? 3 : (clericLevel >= 6 ? 2 : 1)" } } ],
            3: [ { name: "Заклинания домена", desc : "Доспехи Агатиса, Каменная кожа", domainSpells: ["armor_of_agathys", "stoneskin"] } ],
            5: [ { name: "Заклинания домена", desc : "Свобода движения, Огненный удар", domainSpells: ["freedom_of_movement", "flame_strike"] } ],
            6: [ { name: "Мастерство тяжёлых доспехов", desc : "Тяжёлые доспехи не налагают штраф на скрытность" } ],
            7: [ { name: "Заклинания домена", desc : "Стена лезвий, Огненная стена", domainSpells: ["blade_barrier", "wall_of_fire"] } ],
            8: [ { name: "Знаток войны", desc : "Улучшение оружия: +1 к атаке и урону на 1 час" } ],
            9: [ { name: "Заклинания домена", desc : "Контроль погоды, Солнечный взрыв", domainSpells: ["control_weather", "sunburst"] } ],
            17: [ { name: "Повелитель оружия", desc : "Создание магического оружия +1, +2, +3 при повышении уровня" } ]
        },
        grave: {
            name: "ДОМЕН МОГИЛЫ",
            1: [
                { name: "Путь к могиле", desc : "Некротический урон нежити и нечестивым: 1к8", specialLogic: { pathToGrave: true } },
                { name: "Глаза могилы", desc : "Тёмное зрение 30 фт." },
                { name: "Заклинания домена", desc : "Ледяное касание, Речь с мёртвыми", domainSpells: ["chill_touch", "speak_with_dead"] }
            ],
            2: [ { name: "Божественный канал: Коснуться могилы", desc : "Существо не лечится и не получает ВП 1 мин.", channelDivinity: { id: "touch_the_grave", maxChargesFormula: "clericLevel >= 18 ? 3 : (clericLevel >= 6 ? 2 : 1)" } } ],
            3: [ { name: "Заклинания домена", desc : "Мирный покой, Град", domainSpells: ["gentle_repose", "hailstorm"] } ],
            5: [ { name: "Заклинания домена", desc : "Антижизненный щит, Защита от смерти", domainSpells: ["antilife_shell", "death_ward"] } ],
            6: [ { name: "Затмевание", desc : "Лечение и некротический урон: половина до текущих HP, остаток сохраняется" } ],
            7: [ { name: "Заклинания домена", desc : "Увядание, Удушающее облако", domainSpells: ["blight", "cloudkill"] } ],
            8: [ { name: "Касание могилы", desc : "Реакция: атака по вам промахивается" } ],
            9: [ { name: "Заклинания домена", desc : "Палец смерти, Смена плоскости", domainSpells: ["finger_of_death", "plane_shift"] } ],
            17: [ { name: "Душа могилы", desc : "Смерть не влияет на вас: мгновенное возвращение с 1 HP" } ]
        },
        order: {
            name: "ДОМЕН ПОРЯДКА",
            1: [
                { name: "Домен порядка", desc : "Средние доспехи, щиты, простое оружие", modifiers: { armorProficiencies: ["medium", "shields"], weaponProficiencies: ["simple"] } },
                { name: "Заклинания домена", desc : "Приказ, Героизм", domainSpells: ["command", "heroism"] }
            ],
            2: [ { name: "Божественный канал: Оружие порядка", desc : "+1к8 к урону оружия на 1 мин.", channelDivinity: { id: "orders_weapon", maxChargesFormula: "clericLevel >= 18 ? 3 : (clericLevel >= 6 ? 2 : 1)" } } ],
            3: [ { name: "Заклинания домена", desc : "Малое восстановление, Волшебные круги", domainSpells: ["lesser_restoration", "magic_circle"] } ],
            5: [ { name: "Заклинания домена", desc : "Изгнание, Накладывание", domainSpells: ["banishment", "geas"] } ],
            6: [ { name: "Воздаяние порядка", desc : "Реакция: оглушить атакующего, если вы не двигаетесь" } ],
            7: [ { name: "Заклинания домена", desc : "Массовое лечение ран, Круг магии", domainSpells: ["mass_cure_wounds", "magic_circle"] } ],
            8: [ { name: "Непристрастность порядка", desc : "Бонус к спасброскам от эффектов, нарушающих порядок" } ],
            9: [ { name: "Заклинания домена", desc : "Антимагическое поле, Солнечный взрыв", domainSpells: ["antimagic_field", "sunburst"] } ],
            17: [ { name: "Божественный порядок", desc : "Иммунитет к очарованию и панике, союзники получают ВП" } ]
        },
        peace: {
            name: "ДОМЕН МИРА",
            1: [
                { name: "Благословение мира", desc : "Лечение +1к6 при использовании заклинаний исцеления", specialLogic: { peaceBlessing: "1d6" } },
                { name: "Заклинания домена", desc : "Лечение ран, Убежище", domainSpells: ["cure_wounds", "sanctuary"] }
            ],
            2: [ { name: "Божественный канал: Спокойствие навсегда", desc : "Существо не может атаковать или вредить на 1 мин.", channelDivinity: { id: "serene_forever", maxChargesFormula: "clericLevel >= 18 ? 3 : (clericLevel >= 6 ? 2 : 1)" } } ],
            3: [ { name: "Заклинания домена", desc : "Успокоение эмоций, Малое восстановление", domainSpells: ["calm_emotions", "lesser_restoration"] } ],
            5: [ { name: "Заклинания домена", desc : "Аура жизненности, Свобода движения", domainSpells: ["aura_of_vitality", "freedom_of_movement"] } ],
            6: [ { name: "Спокойствие", desc : "Бонусное действие: создать зону мира 20 фт. на 1 мин." } ],
            7: [ { name: "Заклинания домена", desc : "Массовое лечение ран, Очистение", domainSpells: ["mass_cure_wounds", "purify_food_and_drink"] } ],
            8: [ { name: "Свет исцеления", desc : "Аура 30 фт.: союзники получают лечение в начале хода" } ],
            9: [ { name: "Заклинания домена", desc : "Антимагическое поле, Возвращение мёртвых", domainSpells: ["antimagic_field", "raise_dead"] } ],
            17: [ { name: "Непрерывный мир", desc : "Иммунитет к страху, союзники в ауре получают ВП каждый ход" } ]
        },
        twilight: {
            name: "ДОМЕН СУМЕРЕК",
            1: [
                { name: "Святилище сумерек", desc : "60-фут. сфера: полумрак, лечение 2к6+Муд, ВП при входе", specialLogic: { twilightSanctuary: true } },
                { name: "Заклинания домена", desc : "Тьма, Огонь феи", domainSpells: ["darkness", "faerie_fire"] }
            ],
            2: [ { name: "Божественный канал: Щит сумерек", desc : "Реакция: вычесть 2к6 из урона по союзнику", channelDivinity: { id: "twilight_shield", maxChargesFormula: "clericLevel >= 18 ? 3 : (clericLevel >= 6 ? 2 : 1)" } } ],
            3: [ { name: "Заклинания домена", desc : "Маяк надежды, Малое восстановление", domainSpells: ["beacon_of_hope", "lesser_restoration"] } ],
            5: [ { name: "Заклинания домена", desc : "Свобода движения, Огненная защита", domainSpells: ["freedom_of_movement", "fire_shield"] } ],
            6: [ { name: "Щит сумерек улучшён", desc : "Щит сумерек: 3к6, можно защитить себя" } ],
            7: [ { name: "Заклинания домена", desc : "Массовое лечение ран, Защита от энергии", domainSpells: ["mass_cure_wounds", "protection_from_energy"] } ],
            8: [ { name: "Сумеречный шаг", desc : "Бонусное действие: телепортация 30 фт. в полумраке" } ],
            9: [ { name: "Заклинания домена", desc : "Антимагическое поле, Смена плоскости", domainSpells: ["antimagic_field", "plane_shift"] } ],
            17: [ { name: "Незримый мир", desc : "Святилище сумерек: бонусное действие, неконцентрация, +1к6" } ]
        },
        arcana: {
            name: "ДОМЕН АРКАНОВ",
            1: [
                { name: "Арканный инициат", desc : "2 заговора эвокации, 2 заклинания 1-го круга эвокации", specialLogic: { evocationCantrips: 2, evocationSpells: 2 } },
                { name: "Заклинания домена", desc : "Обнаружение магии, Волшебная рука", domainSpells: ["detect_magic", "mage_hand"] }
            ],
            2: [ { name: "Божественный канал: Арканное знание", desc : "Преимущество на проверки Мудрости (Магия)", channelDivinity: { id: "arcane_intellect", maxChargesFormula: "clericLevel >= 18 ? 3 : (clericLevel >= 6 ? 2 : 1)" } } ],
            3: [ { name: "Заклинания домена", desc : "Рассеивание магии, Ожог", domainSpells: ["dispel_magic", "scorching_ray"] } ],
            5: [ { name: "Заклинания домена", desc : "Огненная защита, Каменно-железная кожа", domainSpells: ["fire_shield", "stony_iron_skin"] } ],
            6: [ { name: "Арканное мастерство", desc : "Преимущество на спасброски от заклинаний" } ],
            7: [ { name: "Заклинания домена", desc : "Кольцо холода, Грозовой удар", domainSpells: ["cone_of_cold", "storm_bolt"] } ],
            8: [ { name: "Мощный заговор", desc : "Заговоры не расходуются при использовании" } ],
            9: [ { name: "Заклинания домена", desc : "Изнурение, Солнечный взрыв", domainSpells: ["imprisonment", "sunburst"] } ],
            17: [ { name: "Арканное вознесение", desc : "Летание, сопротивление урону, телепортация" } ]
        }
    },
    fighter: {
        title: 'БОЕВОЙ АРХЕТИП',
        options: [
            {
                value: 'champion',
                label: 'ЧЕМПИОН',
                modifiers: { skills: ['Athletics', 'Acrobatics'] },
                specialLogic: ['extra_attack_5', 'improved_critical_5', 'remarkable_athlete_7'],
                features: [
                    'Улучшенная критическая атака (крит на 19-20)',
                    'Замечательный атлет (бонус к проверкам ЛОВ/СИЛ без оружия)',
                    'Выживаемость (восстановление хитов при 0)',
                    'Непревзойдённый крит (крит на 18-20, доп. куб урона)'
                ],
                actions: [
                    { name: 'Улучшенная критика', type: 'Пассивная', level: 3, icon: '⚔', desc : 'Бросок 19 или 20 — критическая атака.' },
                    { name: 'Замечательный атлет', type: 'Свободное', level: 7, icon: '🏃', desc : 'Шагните 5 фт. или сделайте проверку СИЛ/ЛОВ владением.' },
                    { name: 'Выживаемость', type: 'Пассивная', level: 9, icon: '💚', desc : 'При падении до 0 хитов, восстановитесь до 1 хита. 3/отдых.' }
                ]
            },
            {
                value: 'battle_master',
                label: 'МАСТЕР БОЕВЫХ ИСКУССТВ',
                modifiers: { skills: ['Athletics', 'History', 'Intimidation', 'Perception', 'Survival'] },
                specialLogic: ['extra_attack_5', 'combat_superiority_3', 'relentless_9'],
                features: [
                    'Превосходство в бою (4 куба d8, манёвры)',
                    'Студент войны (бонусные навыки)',
                    'Беспощадность (восстановление куба при 0 хитов)',
                    'Улучшенное превосходство (доп. кубы и манёвр)'
                ],
                actions: [
                    { name: 'Манёвр превосходства', type: 'Бонусное', level: 3, icon: '🎯', desc : 'Потратьте куб превосходства для манёвра: Напор, Выметание, Манёвр отвлечения.' },
                    { name: 'Студент войны', type: 'Пассивная', level: 3, icon: '📖', desc : 'Выучите два дополнительных навыка на выбор.' },
                    { name: 'Беспощадность', type: 'Действие', level: 9, icon: '💀', desc : 'Когда существо падает до 0 хитов от вашей атаки, восстановите 1 куб.' }
                ]
            },
            {
                value: 'eldritch_knight',
                label: 'МИСТИЧЕСКИЙ РЫЦАРЬ',
                modifiers: { armor: 'Medium armor', weapons: 'Simple weapons, martial weapons', skills: ['Arcana', 'History'] },
                specialLogic: ['extra_attack_5', 'spellcasting_int_4', 'weapon_bond_4'],
                features: [
                    'Заклинание (INT, заговоры + 2 заклинания 1 кр.)',
                    'Связь с оружием (телепорт оружия)',
                    'Война магией (атака + заклинание 1 кр.)',
                    'Элдritch Мастер (доп. заговоры и ячейки)'
                ],
                actions: [
                    { name: 'Связь с оружием', type: 'Действие', level: 3, icon: '🗡', desc : 'Свяжитесь с оружием. Телепортируйте его в свободную руку.' },
                    { name: 'Война магией', type: 'Реакция', level: 7, icon: '✨', desc : 'После атаки, произнесите заклинание 1-2 круга.' }
                ]
            },
            {
                value: 'rune_knight',
                label: 'РУННЫЙ РЫЦАРЬ',
                modifiers: { skills: ['Athletics', 'History', 'Intimidation', 'Survival'] },
                specialLogic: ['extra_attack_5', 'runes_3'],
                features: [
                    'Руны (выберите 2: Щит, Скорость, Скала, Огненный Щит)',
                    'Сила великана (рост до 10 фт.)',
                    'Магический защитник (сопротивление урону)',
                    'Рунический защитник (бонус к КБ)'
                ],
                actions: [
                    { name: 'Руна Щита', type: 'Действие', level: 3, icon: '🛡', desc : 'Активируйте руну. +1 КБ до следующего хода.' },
                    { name: 'Сила великана', type: 'Действие', level: 18, icon: '🏔', desc : 'Вырастайте до 10 фт. +2 СИЛ, доп. урон.' }
                ]
            },
            {
                value: 'samurai',
                label: 'САМУРАЙ',
                modifiers: { skills: ['Athletics', 'History', 'Intimidation', 'Perception'] },
                specialLogic: ['extra_attack_5', 'fathers_intuition_3'],
                features: [
                    'Интуиция самурая (бонус к инициативе = мод. ЧА)',
                    'Боевое обращение (временные хиты)',
                    'Тенаситивность (восстановление хитов)',
                    'Сильное сердце (иммунитет к болезни)'
                ],
                actions: [
                    { name: 'Боевое обращение', type: 'Бонусное', level: 3, icon: '⛩', desc : 'Получите временные хиты = уровень воина × мод. СИЛ/ЛОВ.' },
                    { name: 'Тенаситивность', type: 'Действие', level: 13, icon: '💚', desc : 'Восстановите хиты = уровень воина × мод. ТЕЛ. 1/отдых.' }
                ]
            },
            {
                value: 'purple_dragon_knight',
                label: 'РЫЦАРЬ ПУРПУРНОГО ДРАКОНА',
                modifiers: { armor: 'Medium armor, shields', weapons: 'Simple weapons, martial weapons', skills: ['History', 'Intimidation', 'Perception', 'Survival'] },
                specialLogic: ['extra_attack_5', 'martial_mastery_3'],
                features: [
                    'Военное мастерство (доп. владения)',
                    'Защитник королевства (бонус к спасброскам)',
                    'Драконий рыцарь (сопротивление урону)',
                    'Драконий клык (доп. урон излучением)'
                ],
                actions: [
                    { name: 'Драконий рыцарь', type: 'Реакция', level: 9, icon: '🐉', desc : 'Сопротивление всему урону до начала следующего хода. 1/отдых.' },
                    { name: 'Драконий клык', type: 'Пассивная', level: 15, icon: '🔥', desc : 'Ваши атаки наносят доп. урон излучением.' }
                ]
            },
            {
                value: 'cavalier',
                label: 'КАВАЛЕРИСТ',
                modifiers: { skills: ['Animal Handling', 'History', 'Intimidation', 'Perception'] },
                specialLogic: ['extra_attack_5', 'ferocious_charges_3'],
                features: [
                    'Смертоносные атаки (преимущество на атаки с mounts)',
                    'Упорный защитник (реакция: атака по атакующему)',
                    'Неудержимый (бонус к спасброскам против принудительного перемещения)',
                    'Искусный наездник (бонус к инициативе на mounts)'
                ],
                actions: [
                    { name: 'Упорный защитник', type: 'Реакция', level: 7, icon: '🛡', desc : 'Когда существо в 5 фт. атакует кого-то другого, атакуйте его.' },
                    { name: 'Неудержимый', type: 'Пассивная', level: 10, icon: '⚔', desc : 'Преимущество на спасброски против принудительного перемещения.' }
                ]
            },
            {
                value: 'arcane_archer',
                label: 'МИСТИЧЕСКИЙ ЛУЧНИК',
                modifiers: { skills: ['Athletics', 'History', 'Perception', 'Stealth', 'Survival'] },
                specialLogic: ['extra_attack_5', 'arcane_shot_3'],
                features: [
                    'Заклинание (INT, заговоры + 2 заклинания 1 кр.)',
                    'Мистический выстрел (усиленные стрелы)',
                    'Вдохновляющее присутствие (бонус к спасброскам)',
                    'Боевое заклинание (доп. ячейки)'
                ],
                actions: [
                    { name: 'Мистический выстрел', type: 'Бонусное', level: 3, icon: '🏹', desc : 'Зарядите стрелу магической энергией для доп. эффектов.' },
                    { name: 'Вдохновляющее присутствие', type: 'Бонусное', level: 10, icon: '✨', desc : 'Союзники в 30 фт. получают преимущество на спасброски.' }
                ]
            },
            {
                value: 'echo_knight',
                label: 'РЫЦАРЬ ЭХА',
                modifiers: { skills: ['Athletics', 'History', 'Intimidation', 'Perception'] },
                specialLogic: ['extra_attack_5', 'echo_weapon_3'],
                features: [
                    'Эхо-оружие (2 эхо в других местах)',
                    'Фазовая координата (телепортация к эхо)',
                    'Призрак сражения (3 эхо, доп. действия)',
                    'Эхо-удар (одновременная атака всех эхо)'
                ],
                actions: [
                    { name: 'Фазовая координата', type: 'Бонусное', level: 7, icon: '🌀', desc : 'Телепортируйтесь к одному из ваших эхо.' },
                    { name: 'Призрак сражения', type: 'Действие', level: 15, icon: '⚔', desc : 'Каждое эхо совершает атаку. 1/отдых.' }
                ]
            },
            {
                value: 'psi_warrior',
                label: 'ПСИ-ВОИН',
                modifiers: { skills: ['History', 'Insight', 'Intimidation', 'Religion'] },
                specialLogic: ['extra_attack_5', 'psionic_power_3'],
                features: [
                    'Психическая сила (очки для психических способностей)',
                    'Психический удар (дистанционные атаки мыслями)',
                    'Невидимый страж (ментальный щит)',
                    'Психическое превосходство (доп. очки и способности)'
                ],
                actions: [
                    { name: 'Психический удар', type: 'Действие', level: 3, icon: '🧠', desc : 'Создайте психическое оружие и атакуйте на расстоянии.' },
                    { name: 'Невидимый страж', type: 'Реакция', level: 9, icon: '🛡', desc : 'Поглощайте урон психической энергией. 1/отдых.' }
                ]
            }
        ]
    },
    wizard: {
        title: 'ШКОЛА МАГИИ',
        evocation: {
            name: "ШКОЛА ЭВОКАЦИИ",
            2: [
                { name: "Талент эвокации", desc : "Стоимость обучения заклинаниям эвокации halved" },
                { name: "Формование заклинаний", desc : "Реакция: существа в зоне заклинания не получают урона при провале спасброска" }
            ],
            6: [
                { name: "Усиленная эвокация", desc : "Половина вашего уровня волшебника (округление вверх) прибавляется к кубов урона заклинаний эвокации" },
                { name: "Потентный заговор", desc : "Цель получает половину урона при успехе спасброска против заговора эвокации" }
            ],
            10: [ { name: "Взрывной эпизод", desc : "При смерти существа от вашего эвокационного урона: взрыв 5 фт., тот же тип урона 2к6, спас halved" } ],
            14: [ { name: "Шипящая магия", desc : "Заклинания эвокации: бонусное действие вместо действия; вы можете выбрать не затрагивать союзников автоматически" } ],
            17: [ { name: "Смертоносность", desc : "Критический удар заклинанием эвокации: бросьте все кубы урона дважды вместо одного" } ]
        },
        abjuration: {
            name: "ШКОЛА АБЮРАЦИИ",
            2: [
                { name: "Талент абюрации", desc : "Стоимость обучения заклинаниям абюрации halved" },
                { name: "Арканный барьер", desc : "Действие: создайте магический щит HP = 5 × уровень волшебника × мод. ИНТ. Поглощает урон. Восстанавливается при долгом отдыхе." }
            ],
            6: [
                { name: "Улучшенная абюрация", desc : "Успешный спасбросок против вашего заклинания абюрации: цель оглушена до конца следующего хода" },
                { name: "Проектирование барьера", desc : "Арканный барьер: вы можете перемещать его на 30 фт. как бонусное действие" }
            ],
            10: [ { name: "Абсолютная абюрация", desc : "Преимущество на спасброски против магии. При успехе: заклинание не действует на вас." } ],
            14: [ { name: "Проектирование щита", desc : "Арканный барьер: существует постоянно, восстанавливает HP каждый ход. Вы не можете быть очарованы или напуганы." } ],
            17: [ { name: "Абсолютная защита", desc : "Реакция: при получении урона, уменьшите его на 2к10 + мод. ИНТ. Арканный барьер не поглощает этот урон." } ]
        },
        necromancy: {
            name: "ШКОЛА НЕКРОМАНИИ",
            2: [
                { name: "Талент некромантии", desc : "Стоимость обучения заклинаниям некромантии halved" },
                { name: "Усиленное проклятие жизни", desc : "Некротический урон: при свержении существа, восстановите HP = половина восстановленного урона" }
            ],
            6: [
                { name: "Уязвимые духи", desc : "Некротический урон: цель теряет сопротивление некротическому урону на 1 минуту" },
                { name: "Распад", desc : "Некротический урон: при смерти цели, она превращается в слизь, атакующую последних атакующих" }
            ],
            10: [ { name: "Командование нежитью", desc : "Нежить и нечестивые существа не могут лечиться в 10 фт. от вас. Вы можете обращать их." } ],
            14: [ { name: "Касание смерти", desc : "Рукопашная атака: 4к6 некротического урона + мод. ИНТ. При свержении цели: она поднимается как нежить, служащая вам." } ],
            17: [ { name: "Клинок смерти", desc : "Вы создаете некротический клинок. Атаки: 2к8 некротического урона. При попадании: цель должна преуспеть в спасброске Тел или умереть." } ]
        },
        conjuration: {
            name: "ШКОЛА КОНЮРАЦИИ",
            2: [
                { name: "Талент конюрации", desc : "Стоимость обучения заклинаниям конюрации halved" },
                { name: "Малая конюрация", desc : "Бонусное действие: создайте неживой объект 1 куб. фт. на 1 час. Или оружие/инструмент, атаки с ним наносят 1к6 сил урона." }
            ],
            6: [
                { name: "Улучшенная малая конюрация", desc : "Малая конюрация: объекты могут быть светящимися, или создавать звук на 10 фт." },
                { name: "Благие порталы", desc : "Действие: создайте два связанных портала 5×5 фт. на 1 минуту. Существа проходят через них мгновенно." }
            ],
            10: [ { name: "Мастер конюрации", desc : "Малая конюрация: длительность 1 hora. Порталы: размер 10×10, длительность 10 минут." } ],
            14: [ { name: "Спонтанная конюрация", desc : "Расход пустой ячейки заклинания 2+: создайте существо из списка некромантии с HP = 10 × уровень ячейки." } ],
            17: [ { name: "Символ жизни", desc : "Действие: исцелите существо 5к5 + 5 × мод. ИНТ HP. Если исцеление восстанавливает его до максимальных HP, оно получает временные HP = ваш максимум." } ]
        },
        transmutation: {
            name: "ШКОЛА ТРАНСМУТАЦИИ",
            2: [
                { name: "Талент трансмутации", desc : "Стоимость обучения заклинаниям трансмутации halved" },
                { name: "Арканная адаптация", desc : "Изучив заклинание трансмутации 1-2 круга, вы можете поддерживать его без концентрации. При изучении нового - предыдущее заканчивается." }
            ],
            6: [
                { name: "Трансматация материи", desc : "Действие (10 мин): преобразуйте сырьё в продукт равной стоимости. Алмазы из угля, золото из серебра и т.д." },
                { name: "Восстановление", desc : "Короткий отдых: восстановите HP = 2к10 + мод. ИНТ." }
            ],
            10: [ { name: "Оптимизация", desc : "Долгий отдых: получите временные HP = 2 × уровень волшебника. Длительность 24 часа." } ],
            14: [ { name: "Мастер трансмутации", desc : "Трансматация материи: создавайте продукты стоимостью до 100 × уровень волшебника золотых." } ],
            17: [ { name: "Парадоксальная трансмутация", desc : "Действие: преобразуйте существо в 30 фт. в статую на 1 минуту. Спас Мудрость отменяет. По окончании: оно восстанавливает HP = 3к8." } ]
        },
        divination: {
            name: "ШКОЛА ДИВИНАЦИИ",
            2: [
                { name: "Талент дивинации", desc : "Стоимость обучения заклинаниям дивинации halved" },
                { name: "Предвидение", desc : "При начале долгого отдыха: бросьте 2d20, запишите результаты. Любой d20 бросок вами или против вас: замените на записанный." }
            ],
            6: [
                { name: "Улучшенное предвидение", desc : "Предвидение: бросайте 3d20 вместо 2d20 при долгом отдыхе" },
                { name: "Четвёртый глаз", desc : "Вы видите эфирную плоскость одновременно с материальной. Заклинания дивинации не требуют концентрации." }
            ],
            10: [ { name: "Ясновидец", desc : "Вы не спите 30 дней. По окончании: короткий отдых вместо долгого. Вы иммунны к эффектам сна." } ],
            14: [ { name: "Великое предвидение", desc : "Предвидение: бросайте 4d20. Вы можете передавать записанные броски другим существам." } ],
            17: [ { name: "Аврора", desc : "Действие: 60 фт. конус. Существа получают 6к10 излучающего урона. Спас Мудрость halved. При успехе: цель не ослеплена." } ]
        },
        illusion: {
            name: "ШКОЛА ИЛЛЮЗИИ",
            2: [
                { name: "Талент иллюзии", desc : "Стоимость обучения заклинаниям иллюзии halved" },
                { name: "Детализация иллюзий", desc : "Действие: сенсоры существ в 10 фт. от вас получают иллюзорные ощущения на 1 минуту." }
            ],
            6: [
                { name: "Искусная иллюзия", desc : "Ваши иллюзии становятся реальными: они наносят урон, блокируют проходы, поддерживают вес." },
                { name: "Великая иллюзия", desc : "Вы можете создавать иллюзии размером до 30 фт. куба." }
            ],
            10: [ { name: "Иллюзорная реальность", desc : "Действие: выберите иллюзию, созданную вами. Она становится реальной на 1 минуту, включая урон и эффекты." } ],
            14: [ { name: "Иллюзорное существо", desc : "Вы можете создавать иллюзорные существа, которые действуют автономно и могут использовать ваши заклинания." } ],
            17: [ { name: "Иллюзорное мастерство", desc : "Ваши иллюзии невозможно отличить от реальности без магического вмешательства. Спас Инт автоматически проваливается." } ]
        },
        enchantment: {
            name: "ШКОЛА ОЧАРОВАНИЯ",
            2: [
                { name: "Талент очарования", desc : "Стоимость обучения заклинаниям очарования halved" },
                { name: "Усиленная интуиция", desc : "Изучив заклинание очарования 1-2 круга, вы получаете преимущество на спасброски против очарования и страха." }
            ],
            6: [
                { name: "Устойчивость к очарованию", desc : "Преимущество на спасброски против очарования. При успехе: цель не может попытаться очаровать вас 24 часа." },
                { name: "Психическое доминирование", desc : "Действие: очаруйте существо в 30 фт. на 1 минуту. Спас Мудрость отменяет. Вы знаете, очаровано ли оно эмоциями." }
            ],
            10: [ { name: "Мастер очарования", desc : "Действие: создайте иллюзию разговора с духом существа в 5 фт. на 1 минуту. Оно получает преимущество на спасброски." } ],
            14: [ { name: "Ментальное подчинение", desc : "Вы можете использовать очарование как действие. Цель должна преуспеть в спасброске Мудрости или быть очарована на 1 час." } ],
            17: [ { name: "Гипнотический раб", desc : "Действие: очаруйте существо в 60 фт. на 30 дней. Оно считает вас близким другом. Спас Мудрость при восприятии дружбы." } ]
        }
    },
    rogue: {
        title: 'БОЕВОЙ АРХЕТИП',
        options: [
            {
                value: 'thief',
                label: 'ВОР',
                modifiers: { skills: ['Sleight of Hand', 'Stealth', 'Deception', 'Persuasion'] },
                specialLogic: ['expertise_1', 'fast_hands_3', 'supreme_sneak_3', 'second_story_9'],
                features: [
                    { name: 'Быстрые руки (предметы как бонусное действие)', level: 3 },
                    { name: 'Второй этаж (лазание и падение без урона)', level: 3 },
                    { name: 'Великолепная скрытность (преимущество Скрытности)', level: 9 },
                    { name: 'Использование магического предмета (1/отдых)', level: 13 }
                ],
                actions: [
                    { name: 'Быстрые руки', type: 'Бонусное', level: 3, icon: '🤲', desc : 'Используйте предмет, сделайте проверку ЛОВ или уклонитесь.' },
                    { name: 'Великолепная скрытность', type: 'Пассивная', level: 3, icon: '👤', desc : 'Преимущество на проверки Скрытности.' },
                    { name: 'Второй этаж', type: 'Пассивная', level: 9, icon: '🏃', desc : 'Скорость лазания = скорость. Падение без урона до 50 фт.' },
                    { name: 'Магический предмет', type: 'Действие', level: 13, icon: '🔮', desc : 'Используйте магический предмет 1 раз без затрат. 1/отдых.' }
                ]
            },
            {
                value: 'assassin',
                label: 'УБИЙЦА',
                modifiers: { skills: ['Deception', 'Stealth', 'Sleight of Hand', 'Insight'], tools: 'disguise kit, poisoner\'s kit' },
                specialLogic: ['expertise_1', 'assassinate_3', 'infiltration_9'],
                features: [
                    { name: 'Убийство (крит при surprise, иммунитет лечению)', level: 3 },
                    { name: 'Изучение цели (преимущество против изученных)', level: 3 },
                    { name: 'Мастер инфильтрации (создание личностей)', level: 9 },
                    { name: 'Непобедимость (сопротивление всему урону 1 ход)', level: 13 }
                ],
                actions: [
                    { name: 'Убийство', type: 'Пассивная', level: 3, icon: '💀', desc : 'Критические атаки против застигнутых врасплох. Цели не лечатся.' },
                    { name: 'Изучение цели', type: 'Действие', level: 3, icon: '👁', desc : 'Изучите цель за 1 минуту. Преимущество на атаки.' },
                    { name: 'Мастер инфильтрации', type: 'Действие', level: 9, icon: '🎭', desc : 'Создайте до 3 ложных личностей с документами.' },
                    { name: 'Непобедимость', type: 'Реакция', level: 13, icon: '🛡', desc : 'Сопротивление всему урону до начала следующего хода. 1/отдых.' }
                ]
            },
            {
                value: 'arcane_trickster',
                label: 'МИСТИЧЕСКИЙ ЛОВКАЧ',
                modifiers: { skills: ['Deception', 'Sleight of Hand', 'Stealth', 'Arcana'] },
                specialLogic: ['expertise_1', 'spellcasting_int_3', 'mage_hand_3'],
                features: [
                    { name: 'Заклинание (INT, заговоры + 2 заклинания 1 кр.)', level: 3 },
                    { name: 'Ловкость магической руки (иллюзии, кража)', level: 3 },
                    { name: 'Магическая скрытная атака (заклинание + скрытый удар)', level: 9 },
                    { name: 'Вор заклинаний (перехват ячеек)', level: 17 }
                ],
                actions: [
                    { name: 'Ловкость магической руки', type: 'Бонусное', level: 3, icon: '🖐', desc : 'Магическая рука крадёт, прячет, или создаёт иллюзии.' },
                    { name: 'Магическая скрытная атака', type: 'Пассивная', level: 9, icon: '✨', desc : 'Произнесите заклинание вместо скрытого удара.' },
                    { name: 'Вор заклинаний', type: 'Реакция', level: 13, icon: '🔮', desc : 'Перехватите заклинание, нацеленное на вас. Сохраните в ячейку.' }
                ]
            },
            {
                value: 'phantom',
                label: 'ФАНТОМ',
                modifiers: { skills: ['Deception', 'Intimidation', 'Persuasion', 'Stealth'] },
                specialLogic: ['expertise_1', 'psychic_blades_3', 'undying_fear_9'],
                features: [
                    { name: 'Психические клинки (дистанционные скрытые удары)', level: 3 },
                    { name: 'Слова из преисподней (лечение из мрака)', level: 3 },
                    { name: 'Неумирающий страх (страх + психический урон)', level: 9 },
                    { name: 'Разговор с мёртвыми (речь с духами)', level: 13 }
                ],
                actions: [
                    { name: 'Психические клинки', type: 'Пассивная', level: 3, icon: '🗡', desc : 'Скрытый удар на расстоянии до 30 фт.' },
                    { name: 'Слова из преисподней', type: 'Бонусное', level: 3, icon: '🌑', desc : 'Исцелите себя некротической энергией.' },
                    { name: 'Неумирающий страх', type: 'Действие', level: 9, icon: '💀', desc : 'Цель в 10 фт. пугается и получает психический урон.' }
                ]
            },
            {
                value: 'swashbuckler',
                label: 'ДУЭЛЯНТ',
                modifiers: { skills: ['Acrobatics', 'Deception', 'Performance', 'Persuasion'] },
                specialLogic: ['expertise_1', 'fancy_footwork_3', 'rakish_aura_5'],
                features: [
                    { name: 'Изящная походка (нет атак возможности)', level: 3 },
                    { name: 'Рассеянная аура (бонус к инициативе)', level: 3 },
                    { name: 'Панах (очарование цели для скрытого удара)', level: 9 },
                    { name: 'Неуязвимость (сопротивление урону)', level: 13 }
                ],
                actions: [
                    { name: 'Изящная походка', type: 'Пассивная', level: 3, icon: '💃', desc : 'Нет атак возможности, если нет союзников рядом.' },
                    { name: 'Рассеянная аура', type: 'Пассивная', level: 5, icon: '✨', desc : 'Добавьте мод. ХА к броскам инициативы.' },
                    { name: 'Панах', type: 'Бонусное', level: 3, icon: '🎭', desc : 'Очаруйте цель на 1 минуту для скрытого удара.' }
                ]
            },
            {
                value: 'scout',
                label: 'СКАУТ',
                modifiers: { skills: ['Athletics', 'Insight', 'Perception', 'Survival', 'Stealth'] },
                specialLogic: ['expertise_1', 'surprise_attack_3', 'ambush_9'],
                features: [
                    { name: 'Атака sorpresa (доп. кубы скрытого удара)', level: 3 },
                    { name: 'Превосходная инициатива (преимущество)', level: 3 },
                    { name: 'Засада (бонусный ход в начале боя)', level: 9 },
                    { name: 'Непроницаемость (сопротивление урону)', level: 13 }
                ],
                actions: [
                    { name: 'Атака sorpresa', type: 'Пассивная', level: 3, icon: '⚔', desc : '+1 куб скрытого удара против застигнутых целей.' },
                    { name: 'Превосходная инициатива', type: 'Пассивная', level: 3, icon: '👁', desc : 'Преимущество на броски инициативы.' },
                    { name: 'Засада', type: 'Бонусное', level: 9, icon: '💥', desc : 'Дополнительный ход в первом раунде surprise атаки.' }
                ]
            },
            {
                value: 'mastermind',
                label: 'КОМБИНАТОР',
                modifiers: { skills: ['Deception', 'Insight', 'Intimidation', 'Persuasion'] },
                specialLogic: ['expertise_1', 'masters_plan_3', 'misdirection_9'],
                features: [
                    { name: 'Мастер планов (преимущество на инициативу, скрытый удар без преимущества)', level: 3 },
                    { name: 'Неверное направление (скрытый удар через союзника)', level: 9 },
                    { name: 'Удалённая разведка (телепортация через предмет)', level: 13 },
                    { name: 'Скрытый мастер (сопротивление психическому урону)', level: 17 }
                ],
                actions: [
                    { name: 'Мастер планов', type: 'Пассивная', level: 3, icon: '🧠', desc : 'Преимущество на инициативу. Скрытый удар без преимущества.' },
                    { name: 'Неверное направление', type: 'Пассивная', level: 9, icon: '👥', desc : 'Скрытый удар через союзника в 5 фт. от цели.' },
                    { name: 'Удалённая разведка', type: 'Действие', level: 13, icon: '👁', desc : 'Телепортируйтесь к предмету, который держали.' }
                ]
            },
            {
                value: 'inquisitive',
                label: 'СЫЩИК',
                modifiers: { skills: ['Insight', 'Persuasion', 'Performance', 'Deception'] },
                specialLogic: ['expertise_1', 'heroic_inquiry_3', 'fearless_9'],
                features: [
                    { name: 'Героический запрос (доп. информация о цели)', level: 3 },
                    { name: 'Неудержимый (восстановление хитов бонусным действием)', level: 3 },
                    { name: 'Бесстрашный (иммунитет к испугу)', level: 9 },
                    { name: 'Серое пёрышко (создание ложных личностей)', level: 13 }
                ],
                actions: [
                    { name: 'Героический запрос', type: 'Бонусное', level: 3, icon: '🔍', desc : 'Задайте вопрос о цели в 30 фт. Получите дополнительную информацию.' },
                    { name: 'Неудержимый', type: 'Бонусное', level: 3, icon: '💪', desc : 'Восстановите хиты, равные БМ. 1/отдых.' },
                    { name: 'Бесстрашный', type: 'Пассивная', level: 9, icon: '🛡', desc : 'Иммунитет к эффекту испуга.' }
                ]
            },
            {
                value: 'soulknife',
                label: 'КЛИНОК ДУШИ',
                modifiers: { skills: ['Arcana', 'Deception', 'Insight', 'Stealth'] },
                specialLogic: ['expertise_1', 'psychic_blades_3', 'shadowy_dodge_9'],
                features: [
                    { name: 'Психические клинки (дистанционные атаки мыслями)', level: 3 },
                    { name: 'Скрытый резерв (временные хиты)', level: 3 },
                    { name: 'Теневое уклонение (сопротивление урону)', level: 9 },
                    { name: 'Усиленные клинки (увеличенный урон)', level: 13 }
                ],
                actions: [
                    { name: 'Психические клинки', type: 'Пассивная', level: 3, icon: '🗡', desc : 'Атаки оружием наносят психический урон на расстоянии.' },
                    { name: 'Скрытый резерв', type: 'Реакция', level: 3, icon: '🌀', desc : 'Получите временные хиты, равные БМ.' },
                    { name: 'Теневое уклонение', type: 'Реакция', level: 9, icon: '🌑', desc : 'Сопротивление всему урону до начала следующего хода.' }
                ]
            }
        ]
    },
    barbarian: {
        options: [
            {
                value: "berserker",
                label: "Путь Берсерка",
                specialLogic: ["frenzy_rage"],
                features: {
                    3: [
                        { name: "Бешенство", desc: "Когда вы впадаете в ярость, вы можете задействовать бешенство. Пока ярость длится, вы можете в каждый свой ход совершать одну атаку ближнего боя бонусным действием. По окончании ярости вы получаете один уровень усталости." }
                    ],
                    6: [
                        { name: "Безликая ярость", desc: "Вы не можете быть очарованы или испуганы, пока находитесь в состоянии ярости. Если вы были очарованы или испуганы до входа в ярость, действие этого эффекта приостанавливается на время ярости." }
                    ],
                    10: [
                        { name: "Пугающее присутствие", desc: "Вы можете действием напугать существо в пределах 30 футов. Если цель вас видит или слышит, она должна преуспеть в спасброске Мудрости (Сл 8 + бонус мастерства + модификатор Харизмы), иначе станет испуганной до конца вашего следующего хода." }
                    ],
                    14: [
                        { name: "Возмездие", desc: "Когда вы получаете урон от существа, находящегося в пределах 5 футов от вас, вы можете использовать свою реакцию, чтобы совершить атаку оружием ближнего боя по этому существу." }
                    ]
                },
                actions: {
                    3: [
                        { id: "bb_ber_frenzy", name: "Атака бешенства", cost: "Бонусное действие", desc: "Совершите одну атаку оружием ближнего боя, пока активна ярость в режиме бешенства." }
                    ],
                    10: [
                        { id: "bb_ber_intimidate", name: "Пугающее присутствие", cost: "Действие", desc: "Спасбросок Мудрости для существа в пределах 30 футов. При провале оно пугается до конца вашего следующего хода." }
                    ]
                }
            },
            {
                value: "totem_warrior",
                label: "Путь Тотемного Воина",
                specialLogic: ["totem_spirit"],
                features: {
                    3: [
                        { name: "Искатель духов", desc: "Ваш путь тесно связан с природой. Вы получаете возможность сотворять заклинания «Разговор с животными» и «Чувство зверей», но только в виде ритуалов." },
                        { name: "Тотемный дух", desc: "Вы выбираете тотемного духа и получаете его свойства. Медведь: сопротивление всем видам урона в ярости, кроме психического. Орел: рывок бонусным действием и помеха врагам на провоцированные атаки. Волк: союзники получают преимущество на атаки ближнего боя по врагам в пределах 5 футов от вас." }
                    ],
                    6: [
                        { name: "Аспект зверя", desc: "Вы получаете магические свойства в зависимости от тотема. Медведь: удвоение грузоподъемности и преимущество на проверки Силы по поднятию/тяге предметов. Орел: вы можете четко видеть на расстоянии до 1 мили и не имеете помех на проверки Внимания в сумерках. Волк: вы можете выслеживать существ во время быстрого перемещения и незаметно двигаться в нормальном темпе." }
                    ],
                    10: [
                        { name: "Прогулка духов", desc: "Вы можете сотворить заклинание «Коммуна с природой» в виде ритуала. Дух-проводник предстает перед вами, чтобы сообщить нужные сведения." }
                    ],
                    14: [
                        { name: "Тотемное гармонирование", desc: "Вы получаете новые боевые свойства. Медведь: враги в пределах 5 футов совершают атаки по вашим союзникам с помехой, если видят вас. Орел: в ярости вы получаете скорость полета, равную скорости ходьбы (но падаете в конце хода). Волк: вы можете бонусным действием сбить существо с ног при попадании по нему атакой ближнего боя." }
                    ]
                },
                actions: {}
            },
            {
                value: "battlerager",
                label: "Путь Бушующего в Бою",
                specialLogic: ["spiked_armor_combat"],
                features: {
                    3: [
                        { name: "Владение шипованным доспехом", desc: "Вы получаете право использовать шипованный доспех в качестве оружия." },
                        { name: "Шипованный смерч", desc: "Когда вы находитесь в ярости и на вас надет шипованный доспех, вы можете использовать бонусное действие, чтобы совершить одну атаку ближнего боя шипами доспеха по существу в пределах 5 футов от вас." }
                    ],
                    6: [
                        { name: "Безрассудный рывок", desc: "Когда вы совершаете безрассудную атаку в ярости, вы также получаете временные хиты, равные вашему модификатору Телосложения, которые исчезают по окончании ярости." }
                    ],
                    10: [
                        { name: "Шипованный щит", desc: "Когда вы успешно совершаете захват существа, оно получает 3 колющих урона от ваших шипов. Вы наносите этот урон в начале каждого своего хода, пока удерживаете цель." }
                    ],
                    14: [
                        { name: "Шипованное возмездие", desc: "Когда существо в пределах 5 футов попадает по вам атакой ближнего боя, оно получает 3 колющих урона от вашего шипованного доспеха, если вы в ярости и дееспособны." }
                    ]
                },
                actions: {
                    3: [
                        { id: "bb_bat_spikes", name: "Атака шипами доспеха", cost: "Бонусное действие", desc: "Нанесите 1d4 + мод. Силы колющего урона существу в пределах 5 футов (требуется ярость и шипованный доспех)." }
                    ]
                }
            },
            {
                value: "storm_herald",
                label: "Путь Буревестника",
                specialLogic: ["storm_aura"],
                features: {
                    3: [
                        { name: "Аура бури", desc: "Вы излучаете магическую ауру в радиусе 10 футов. Аура активируется при входе в ярость и обновляется бонусным действием. Выберите стихию: Пустыня (все враги в ауре получают 2 урона огнем), Море (один враг проходит спасбросок Ловкости или получает 1d6 электричества), Тундра (союзники в ауре получают 2 временных хита)." }
                    ],
                    6: [
                        { name: "Оберег бури", desc: "Вы получаете пассивное сопротивление типу урона в зависимости от выбранной стихии ауры: Пустыня — огонь, Море — электричество, Тундра — холод. Вы также не страдаете от экстремальных погодных условий среды." }
                    ],
                    10: [
                        { name: "Призыв бури", desc: "Вы можете наделить своей защитой союзников. Находясь в вашей Ауре бури, дружественные существа получают сопротивление урону того типа, который дает вам особенность «Оберег бури»." }
                    ],
                    14: [
                        { name: "Око бури", desc: "Эффекты ауры достигают пика. Пустыня: когда враг бьет вас в ауре, он получает урон огнем. Море: удар молнии сбивает цель с ног при провале спасброска Силы. Тундра: активируя ауру, вы можете снизить скорость выбранного врага до 0 футов до начала вашего следующего хода." }
                    ]
                },
                actions: {
                    3: [
                        { id: "bb_sth_aura", name: "Активация Ауры бури", cost: "Бонусное действие", desc: "Обновите действие эффектов вашей ауры в радиусе 10 футов (Огонь, Молния или Временные хиты)." }
                    ]
                }
            },
            {
                value: "ancestral_guardian",
                label: "Путь Предка-Хранителя",
                specialLogic: ["ancestral_protectors"],
                features: {
                    3: [
                        { name: "Защитники предков", desc: "При входе в ярость вокруг вас появляются духи воинов. Первая цель, которую вы поражаете атакой в свой ход, становится объектом охоты духов. Она совершает атаки по любым целям, кроме вас, с помехой, а ее цели получают сопротивление этому урону." }
                    ],
                    6: [
                        { name: "Дух-щит", desc: "Если существо, которое вы видите в пределах 30 футов от вас, получает урон, вы можете реакцией уменьшить этот урон на 2d6 с помощью призыва призрачного щита. На высших уровнях кубы увеличиваются (3d6 на 10-м, 4d6 на 14-м)." }
                    ],
                    10: [
                        { name: "Совет предков", desc: "Вы можете сотворить заклинание «Ясновидение» или «Гадание» без траты ячеек заклинаний, вступая в прямой ментальный контакт с духами ваших прародителей." }
                    ],
                    14: [
                        { name: "Увещевание предков", desc: "Когда ваш Дух-щит успешно уменьшает урон от атаки врага, этот враг мгновенно получает урон силой в количестве, равном значению, на которое был уменьшен урон атаки." }
                    ]
                },
                actions: {
                    6: [
                        { id: "bb_anc_shield", name: "Дух-щит", cost: "Реакция", desc: "Уменьшите урон, получаемый союзником в пределах 30 футов, на 2d6 / 3d6 / 4d6 единиц." }
                    ]
                }
            },
            {
                value: "zealot",
                label: "Путь Фанатика",
                specialLogic: ["zealot_divine_fury"],
                features: {
                    3: [
                        { name: "Божественная кара", desc: "Первое существо, по которому вы попадаете атакой оружия в каждый свой ход под действием ярости, получает дополнительный урон в количестве 1d6 + половина вашего уровня варвара. Тип урона: излучение или некротический." },
                        { name: "Проводник божества", desc: "Божественные силы облегчают ваше возвращение в мир живых. Заклинания, направленные на ваше воскрешение (такие как «Возрождение»), не требуют материальных компонентов (алмазов)." }
                    ],
                    6: [
                        { name: "Фанатичный фокус", desc: "Если вы проваливаете спасбросок, находясь в ярости, вы можете перебросить кубик и обязаны использовать новый результат. Используется один раз за каждую ярость." }
                    ],
                    10: [
                        { name: "Боевой клич фанатика", desc: "Вы можете действием издать мощный религиозный клич. До четырех союзников в пределах 60 футов получают преимущество на броски атак и спасброски до начала вашего следующего хода." }
                    ],
                    14: [
                        { name: "Ярость за гранью смерти", desc: "Пока ваша ярость активна, падение хитов до 0 не приводит к потере сознания. Вы продолжаете делать спасброски от смерти и умираете от накопленных провалов только в том случае, если ярость завершилась, а ваши хиты все еще равны 0." }
                    ]
                },
                actions: {
                    10: [
                        { id: "bb_zea_cry", name: "Боевой клич фанатика", cost: "Действие", desc: "Дайте преимущество на атаки и спасброски 4 союзникам в пределах 60 футов на 1 раунд. (1 раз в долгий отдых)." }
                    ]
                }
            },
            {
                value: "wild_magic",
                label: "Путь Дикой Магии",
                specialLogic: ["wild_magic_barbarian"],
                features: {
                    3: [
                        { name: "Магическое чутье", desc: "Вы можете действием активировать зрение, позволяющее видеть присутствие магии или активированных заклинаний в пределах 60 футов укрытий." },
                        { name: "Всплеск дикой магии", desc: "Каждый раз, когда вы впадаете в ярость, вы обязаны бросить d8 по таблице дикой магии варвара, чтобы мгновенно вызвать неконтролируемый хаотический эффект вокруг себя." }
                    ],
                    6: [
                        { name: "Укрепляющий всплеск", desc: "Вы можете коснуться существа (включая себя) действием, чтобы даровать ему благословение. Существо может добавить 1d3 к проверкам характеристик и атакам на 10 минут, либо восстановить ячейку заклинаний 1–3 уровня." }
                    ],
                    10: [
                        { name: "Нестабильный всплеск", desc: "Находясь в ярости, в момент получения урона или провала спасброска вы можете реакцией совершить новый бросок по таблице дикой магии, заменив текущий эффект на новый." }
                    ],
                    14: [
                        { name: "Контролируемый всплеск", desc: "Каждый раз, когда вы совершаете бросок по таблице дикой магии при входе в ярость, вы можете бросить кубик дважды и выбрать любой из двух результатов. Если выпали одинаковые числа, эффект выбирается вами вручную." }
                    ]
                },
                actions: {
                    3: [
                        { id: "bb_wm_sense", name: "Магическое чутье", cost: "Действие", desc: "Обнаружение источников магии в пределах 60 футов. Использований в день: бонус мастерства." }
                    ],
                    6: [
                        { id: "bb_wm_infuse", name: "Укрепляющий всплеск", cost: "Действие", desc: "Дайте существу +1d3 к броскам или восстановите ему ячейку заклинаний 1-3 уровня. (Использований в день: бонус мастерства)." }
                    ]
                }
            },
            {
                value: "beast",
                label: "Путь Зверя",
                specialLogic: ["beast_natural_weapons"],
                features: {
                    3: [
                        { name: "Форма зверя", desc: "При входе в ярость вы можете вырастить природное оружие. Укусы: восстанавливают хиты, равные бонусу мастерства, если у вас меньше половины здоровья. Когти: позволяют совершить одну дополнительную атаку когтями в этот ход. Хвост: увеличивает КД реакцией на 1d8 против текущей атаки." }
                    ],
                    6: [
                        { name: "Бестиальная адаптация", desc: "После отдыха вы можете выбрать физическое свойство тела: получение скорости плавания и дыхания под водой, получение скорости лазания по стенам без проверок, либо увеличение дальности прыжков в длину." }
                    ],
                    10: [
                        { name: "Инфекционная ярость", desc: "Когда вы поражаете цель природным оружием в ярости, вы можете заставить ее сделать спасбросок Мудрости. При провале цель обязана атаковать выбранное вами существо, либо получить 2d12 психического урона." }
                    ],
                    14: [
                        { name: "Звериный зов", desc: "Вы можете призывать силу стаи. До двух союзников в пределах 30 футов могут использовать реакцию, чтобы получить дополнительные 2d6 урона к своим атакам на текущем раунде." }
                    ]
                },
                actions: {}
            },
            {
                value: "giant",
                label: "Путь Великана",
                specialLogic: ["giant_size_rage"],
                features: {
                    3: [
                        { name: "Сила великана", desc: "Вы изучаете Великанский язык и заговор Манипуляция стихиями (Thaumaturgy)." },
                        { name: "Ярость великана", desc: "В ярости вы увеличиваетесь до Большого размера, ваша досягаемость атак увеличивается на 5 футов, а дополнительный урон ярости применяется к броскам метательного оружия." }
                    ],
                    6: [
                        { name: "Стихийное оружие", desc: "Когда вы входите в ярость, удерживаемое оружие наполняется силой стихий (огонь, холод, кислота, электричество или гром) и наносит дополнительно 1d6 этого урона. Оружие получает свойство «метательное» с возвратом в руку." }
                    ],
                    10: [
                        { name: "Могучий бросок", desc: "Вы можете бонусным действием схватить существо размером Меньше вас и бросить его на расстояние до 30 футов. Цель должна пройти спасбросок Ловкости, иначе получит дробящий урон и упадет плашмя." }
                    ],
                    14: [
                        { name: "Полувеличественная форма", desc: "В ярости ваш размер увеличивается до Огромного. Ваша досягаемость возрастает еще на 5 футов (всего +10 футов к базе), а стихийный урон вашего оружия увеличивается до 2d6." }
                    ]
                },
                actions: {
                    10: [
                        { id: "bb_gia_throw", name: "Могучий бросок существа", cost: "Бонусное действие", desc: "Бросьте существо на расстояние до 30 футов. Спасбросок Ловкости предотвращает падение плашмя и урон." }
                    ]
                }
            }
        ]
    },
    sorcerer: {
        draconicBloodline: {
            name: "НАСЛЕДИЕ ДРАКОНЬЕЙ КРОВИ",
            1: [
                { name: "Драконий предок", desc : "Выберите дракона-предка; сопротивление его типу урона на ур. 3; +1 к любой характеристике" },
                { name: "Драконьи черты", desc : "Рост 1 фт./уровень чародея (макс. +3); драконье дыхание 1/отдых" }
            ],
            6: [ { name: "Амфибия", desc : "Возможность дышать под водой; создание воздушных карманов для других" } ],
            14: [ { name: "Драконье преодоление", desc : "Союзники 3 фт. получают сопротивление типу урона вашего дракона-предка" } ],
            18: [ { name: "Драконье превращение", desc : "Бонусное действие: крылья +полёт 50 фт.; +1 к КД; драконье дыхание без затрат 1/отдых" } ]
        },
        wildMagic: {
            name: "ДИКАЯ МАГИЯ",
            1: [
                { name: "Бурная магия", desc : "При получении урона бросьте d20 для случайного дикого эффекта" },
                { name: "Магическая вариация", desc : "При касте заклинания 1+ круга: бросьте d20 для возможного дикого эффекта" }
            ],
            6: [
                { name: "Расцветающая магия", desc : "При броске инициативы восстановите потраченные ячейки, сумма уровней ≤ половина уровня чародея (округление вниз)" },
                { name: "Магическая резистентность", desc : "Сопротивление урону от заклинаний" }
            ],
            14: [
                { name: "Контролируемая магия", desc : "Спасбросок Инт (КС 15) для отмены дикого эффекта; при успехе выберите эффект из таблицы" },
                { name: "Сверхзаряд", desc : "При касте заклинания 3+ круга: бросьте d20; при 17+ бросьте d8: доп. урон или лечение" }
            ],
            18: [ { name: "Сороческий шторм", desc : "Бонусное действие: 30-фт сфера дикой магии; существа спас. Мудрость или 4к6 разрывающего урона + случайный эффект" } ]
        },
        divineSoul: {
            name: "БОЖЕСТВЕННАЯ ДУША",
            1: [
                { name: "Божественное провидение", desc : "Выберите божество; его заклинания доступны вам; +1 к любой характеристике" },
                { name: "Чародейская стойкость", desc : "Спасброски от болезней и очарования с преимуществом; сопротивление болезням" }
            ],
            6: [
                { name: "Благодать богов", desc : "2 раза/долгий отдых: при 0 HP или провале спасброска, перебросьте +2" },
                { name: "Подлинное знание", desc : "Телепатическая связь с божеством; знание ответов на простые вопросы" }
            ],
            14: [
                { name: "Небесное крыло", desc : "Бонусное действие: крылья +полёт 30 фт. на 1 мин., 1/отдых" },
                { name: "Божественное магическое знание", desc : "Выучите 2 заклинания 4 круга от вашего божества" }
            ],
            18: [ { name: "Небесное вознесение", desc : "Иммунитет к болезням и очарованию; при 0 HP автоматически восстановите 1 HP (1/долгий отдых)" } ]
        },
        shadowMagic: {
            name: "ТЕНЕВАЯ МАГИЯ",
            1: [
                { name: "Создание тени", desc : "Действие: призвать теневое существо в 60 фт.; 1/долгий отдых; подчиняется вам" },
                { name: "Видение в темноте", desc : "Тёмное зрение 60 фт.; щит от солнечных эффектов" }
            ],
            6: [
                { name: "Теневой шаг", desc : "Бонусное действие: телепортация между тенями на 60 фт., 1/отдых" },
                { name: "Глаза в темноте", desc : "Призыв невидимых глаз-шпионов в 30 фт.; тёмное зрение через них" }
            ],
            14: [
                { name: "Сила могилы", desc : "При снижении до 0 HP: восстановите 1 HP + 1к8 (1/долгий отдых); спасброски от смерти с преимуществом" },
                { name: "Проклятый пёс", desc : "Призыв теневой собаки-преследователя; атакует последнюю вашу цель" }
            ],
            18: [ { name: "Угасание", desc : "Бонусное действие: 15-фт конус 6к6 некротического урона; спас. Тел; при провале цель напугана 1 мин." } ]
        },
        stormSorcery: {
            name: "ШТОРМОВОЕ КОЛДОВСТВО",
            1: [
                { name: "Молниеносная душа", desc : "Сопротивление электрическому урону; заклинания электричества/грома с помехой на спасброски целей" },
                { name: "Поток молний", desc : "Заклинания электричества/грома: доп. 1к6 урона; 1/ход при попадании" }
            ],
            6: [
                { name: "Штормовой щит", desc : "Бонусное действие: ветер 20 фт. вокруг; труднопроходимая местность для других; вы не подвержены эффектам ветра" },
                { name: "Термическое тело", desc : "Сопротивление огненному и холодному урону" }
            ],
            14: [
                { name: "Гнев бури", desc : "Бонусное действие: 30-фт сфера шторма; электрический урон 3к6 при входе/ходе в зоне; полёт 30 фт." },
                { name: "Молниеносное оружие", desc : "Реакция: доп. 2к6 электрического урона к атаке в 60 фт." }
            ],
            18: [ { name: "Буря-хозяин", desc : "Иммунитет к электрическому, огненному, холодному урону; Гнев бури без затрат действия" } ]
        },
        aberrantMind: {
            name: "АБЕРРАНТНЫЙ РАЗУМ",
            1: [
                { name: "Владение разумом", desc : "Интеллект = основная характеристика заклинаний; телепатическая речь 60 фт." },
                { name: "Возвышенное познание", desc : "Интеллект минимум 13; выучите 3 заклинания 1 круга из списка чародея" },
                { name: "Заклинания происхождения", desc : "Телепатия, Обнаружение мыслей", originSpells: ["telepathy", "detect_thoughts"] }
            ],
            3: [ { name: "Заклинания происхождения", desc : "Стрелы хаоса, Защита от оружием", originSpells: ["chaos_arrows", "weaponward"] } ],
            5: [ { name: "Заклинания происхождения", desc : "Мысленный щит, Огненный шар", originSpells: ["mind_blank", "fireball"] } ],
            6: [
                { name: "Разум над материей", desc : "Иммунитет к ядам, болезням, психическому урону; спасброски от очарования/оглушения с преимуществом" },
                { name: "Телекинез", desc : "Выучили телекинез 1 ур. бесплатно; перемещение объектов/существ 5 фт." }
            ],
            7: [ { name: "Заклинания происхождения", desc : "Стена сил, Психический удар", originSpells: ["wall_of_force", "psychic_spear"] } ],
            9: [ { name: "Заклинания происхождения", desc : "Одержимость, Психический взрыв", originSpells: ["dominate", "mind_slash"] } ],
            14: [
                { name: "Психическая диссонанс", desc : "Заклинания: доп. психический урон 2к6; при касте 3+ круга бросьте d6 для дикого психического эффекта" },
                { name: "Повышенное познание", desc : "Интеллект минимум 17; выучите 2 заклинания 5 круга из списка чародея" }
            ],
            18: [ { name: "Психическая буря", desc : "Бонусное действие: 20-фт сфера 6к6 психического урона; спас. Инт; при провале цель очарована 1 мин." } ]
        },
        clockworkSoul: {
            name: "ЗАВОДНАЯ ДУША",
            1: [
                { name: "Ремесло созидания", desc : "Выберите характеристику; +1 к ней; при создании персонажа +2 к ней вместо +1" },
                { name: "Функциональное волшебство", desc : "Реакция: при касте заклинания или атаке по вам, отмените эффект (1/отдых)" },
                { name: "Заклинания происхождения", desc : "Щит, Обнаружение магии", originSpells: ["shield", "detect_magic"] }
            ],
            3: [ { name: "Заклинания происхождения", desc : "Защита от энергиями, Ледяная стрела", originSpells: ["protection_from_elements", "ice_arrow"] } ],
            5: [ { name: "Заклинания происхождения", desc : "Героизм, Огненный шар", originSpells: ["heroism", "fireball"] } ],
            6: [
                { name: "Устранение неполадок", desc : "Бонусное действие: восстановите потраченные ячейки, сумма уровней ≤ половина уровня чародея (округление вниз), 1/отдых" },
                { name: "Восстановление порядка", desc : "Преимущество на спасброски от очарования/оглушения; сопротивление психическому урону" }
            ],
            7: [ { name: "Заклинания происхождения", desc : "Стена сил, Грозовой удар", originSpells: ["wall_of_force", "lightning_bolt"] } ],
            9: [ { name: "Заклинания происхождения", desc : "Пожелание, Пространственный разлом", originSpells: ["wish", "spatial_rift"] } ],
            14: [
                { name: "Синергия", desc : "При касте заклинания лечения/восстановления: союзники 30 фт. получают ВП = 1к6 + уровень чародея/2" },
                { name: "Системный сбой", desc : "При касте 3+ круга: цель с проваленным спасброском оглушена до конца вашего следующего хода" }
            ],
            18: [ { name: "Великий архитектор", desc : "Бонусное действие: 30-фт сфера; союзники лечение 2к8, враги 2к8 разрывающего урона, спас. Мудрость" } ]
        },
        lunarSorcery: {
            name: "ЛУННОЕ ЧАРОДЕЙСТВО",
            1: [
                { name: "Путь луны", desc : "Выберите фазу луны; каждая фаза даёт разные бонусы; +1 к любой характеристике" },
                { name: "Лунный свет", desc : "Тёмное зрение 60 фт.; свечение 10 фт.; заклинания света не нарушают темноту" },
                { name: "Заклинания происхождения", desc : "Луч бессилия, Щит веры", originSpells: ["ray_of_enfeeblement", "shield_of_faith"] }
            ],
            3: [ { name: "Заклинания происхождения", desc : "Защита от энергиями, Ледяная стрела", originSpells: ["protection_from_elements", "ice_arrow"] } ],
            5: [ { name: "Заклинания происхождения", desc : "Героизм, Огненный шар", originSpells: ["heroism", "fireball"] } ],
            6: [
                { name: "Лунная фаза", desc : "Бонусное действие: смените фазу луны; эффект зависит от фазы (рост/полнолуние/убывание/новолуние)" },
                { name: "Лунное сопротивление", desc : "Сопротивление некротическому и излучающему урону" }
            ],
            7: [ { name: "Заклинания происхождения", desc : "Стена сил, Грозовой удар", originSpells: ["wall_of_force", "lightning_bolt"] } ],
            9: [ { name: "Заклинания происхождения", desc : "Пожелание, Пространственный разлом", originSpells: ["wish", "spatial_rift"] } ],
            14: [
                { name: "Лунный взрыв", desc : "Бонусное действие: 20-фт сфера 3к8 некротического или излучающего урона, спас. Тел; эффект зависит от фазы" },
                { name: "Лунное ослепление", desc : "При попадании по вам: атака с помехой; при провале атаки отражена на другую цель в 30 фт." }
            ],
            18: [ { name: "Лунный ангел", desc : "Бонусное действие: крылья +полёт 60 фт.; свечение 30 фт.; иммунитет к тёмному урону; Лунный взрыв без затрат" } ]
        }
    },
    warlock: {
        archfey: {
            name: "АРХИФЕЯ",
            1: [
                { name: "Присутствие Архифеи", desc : "Бонусное действие: существо в 30 фт. должно преуспеть в спасброске Мудрости или быть очаровано/напугано на 1 минуту" },
                { name: "Заклинания покровителя", desc : "Волшебный огонь, Сон, Лунный луч, Проход без следа", originSpells: ["faerie_fire", "sleep", "moonbeam", "pass_without_trace"] }
            ],
            6: [
                { name: "Побег через туман", desc : "Реакция: при получении урона станьте невидимым, пока не прекратите атаковать и не бросите заклинания, 1/отдых" },
                { name: "Заклинания покровителя", desc : "Туманность, Шаг в туман", originSpells: ["fog_cloud", "misty_step"] }
            ],
            10: [
                { name: "Ведовская защита", desc : "Реакция: когда существо в 5 фт. от вас получает урон, оно получает временные ХП = 1к10 + мод. ХАР, 1/отдых" },
                { name: "Заклинания покровителя", desc : "Коварный смех Ташы, Кошмар", originSpells: ["tashas_hideous_laughter", "nightmare"] }
            ],
            14: [
                { name: "Темный морок", desc : "В 30-фт радиусе от вас все существа кроме вас получают disadvantage на спасброски; вы можете телепортироваться на 50 фт. как бонусное действие, 1/отдых" },
                { name: "Заклинания покровителя", desc : "Иллюзорный рельеф, Обращение с животными", originSpells: ["hallucinatory_terrain", "speak_with_animals"] }
            ]
        },
        fiend: {
            name: "ИСЧАДИЕ",
            1: [
                { name: "Благословение тёмного", desc : "Когда существо проваливает спасбросок против вашего заклинания, оно получает временные ХП = 2 × уровень колдуна" },
                { name: "Заклинания покровителя", desc : "Адский укор, Огненные ладони, Пламя, Огненный снаряд", originSpells: ["hellish_rebuke", "burning_hands", "produce_flame", "fire_bolt"] }
            ],
            6: [
                { name: "Удача тёмного", desc : "Реакция: при получении урона восстановьте 1к6 + уровень колдуна ХП, 1/отдых" },
                { name: "Заклинания покровителя", desc : "Облако яда, Щит веры", originSpells: ["cloudkill", "shield_of_faith"] }
            ],
            10: [
                { name: "Адское сопротивление", desc : "Сопротивление огненному урону; при получении огненного урона существо получает 2к6 огненного урона" },
                { name: "Заклинания покровителя", desc : "Огненный удар, Облако яда", originSpells: ["flame_strike", "cloudkill"] }
            ],
            14: [
                { name: "Бросок через ад", desc : "Бонусное действие: телепортируйте видимое существо в 30 фт. на 20 фт. в случайное место, ТЕЛ спас отменяет" },
                { name: "Заклинания покровителя", desc : "Вихрь пламени, Вспышка солнца", originSpells: ["incendiary_cloud", "sunburst"] }
            ]
        },
        greatOldOne: {
            name: "ВЕЛИКИЙ ДРЕВНИЙ",
            1: [
                { name: "Пробуждённый разум", desc : "Телепатическая связь с любым существом в 30 фт., которое понимает хотя бы один язык" },
                { name: "Заклинания покровителя", desc : "Диссонансный шёпот, Обнаружение мыслей, Магическая рука, Щит", originSpells: ["dissonant_whispers", "detect_thoughts", "magic_hand", "shield"] }
            ],
            6: [
                { name: "Жажда разума", desc : "Бонусное действие: психический урон 3к6 существу в 60 фт., которое может вас воспринимать, Муд спас уменьшает вдвое" },
                { name: "Заклинания покровителя", desc : "Замедление, Команда", originSpells: ["slow", "command"] }
            ],
            10: [
                { name: "Подлые мысли", desc : "Существа не могут телепатически общаться с другими существами в 30 фт. от вас" },
                { name: "Заклинания покровителя", desc : "Безумие, Изгнание", originSpells: ["confusion", "banishment"] }
            ],
            14: [
                { name: "Дальняя речь", desc : "Пробуждённый разум работает на неограниченной дистанции; вы можете использовать Обнаружение мыслей как ритуал" },
                { name: "Заклинания покровителя", desc : "Доминирование, Телекинез", originSpells: ["dominate_person", "telekinesis"] }
            ]
        },
        undying: {
            name: "БЕССМЕРТНЫЙ",
            1: [
                { name: "Бессмертный страж", desc : "При падении до 0 ХП вы не умираете, а теряете сознание; при получении урона встаёте с 1 ХП" },
                { name: "Заклинания покровителя", desc : "Нанесение ран, Огненный снаряд, Свет, Щит", originSpells: ["inflict_wounds", "fire_bolt", "light", "shield"] }
            ],
            6: [
                { name: "Глаза мёртвых", desc : "Тёмное зрение 60 фт.; вы видите невидимых существ и существ в невидимости" },
                { name: "Заклинания покровителя", desc : "Удержание человека, Ускоренное отступление", originSpells: ["hold_person", "expeditious_retreat"] }
            ],
            10: [
                { name: "Неумолимое изменение", desc : "При 0 ХП автоматически встаёте с 1 ХП, 1/отдых; сопротивление некротическому и некротическому урону" },
                { name: "Заклинания покровителя", desc : "Маяк надежды, Героизм", originSpells: ["beacon_of_hope", "heroism"] }
            ],
            14: [
                { name: "Ужасная смерть", desc : "Бонусное действие: 15-фт конус 4к8 некротического урона, ТЕЛ спас; при провале цель пугается на 1 минуту" },
                { name: "Заклинания покровителя", desc : "Удержание чудовища, Массовое нанесение ран", originSpells: ["hold_monster", "mass_inflict_wounds"] }
            ]
        },
        hexblade: {
            name: "ВЕДЬМОВСКОЙ КЛИНОК",
            1: [
                { name: "Ведьмовский воин", desc : "Выберите модификатор для атак оружием; выберите одну категорию оружия для владения; восстанавливаете ХП = 1к6 + мод. при использовании ячейки заклинания" },
                { name: "Заклинания покровителя", desc : "Щит, Поразительная критика, Огненный снаряд, Луч холода", originSpells: ["shield", "chromatic_orb", "fire_bolt", "ray_of_frost"] }
            ],
            6: [
                { name: "Проклятое призрак", desc : "Бонусное действие: призвать призрак ведьмовского клинка на 1 минуту; атака 1к8 + мод. психического урона" },
                { name: "Заклинания покровителя", desc : "Магическое оружие, Мелкое безумие", originSpells: ["magic_weapon", "minor_illusion"] }
            ],
            10: [
                { name: "Ведьмовской клинок", desc : "При критическом попадании цель получает disadvantage на все спасброски до конца следующего вашего хода" },
                { name: "Заклинания покровителя", desc : "Лунный луч, Щит веры", originSpells: ["moonbeam", "shield_of_faith"] }
            ],
            14: [
                { name: "Мастер проклятий", desc : "Ваши проклятия накладывают disadvantage на все атаки цели; при смерти проклятой цели восстанавливаете ХП = максимальные ХП" },
                { name: "Заклинания покровителя", desc : "Огненный шар, Туманность", originSpells: ["fireball", "fog_cloud"] }
            ]
        },
        celestial: {
            name: "НЕБОЖИТЕЛЬ",
            1: [
                { name: "Излучающая душа", desc : "Заклинания наносят излучающий урон; вы излучаете тусклый свет на 10 фт." },
                { name: "Заклинания покровителя", desc : "Руководство, Свет, Божественная милость, Щит веры", originSpells: ["guidance", "light", "divine_favor", "shield_of_faith"] }
            ],
            6: [
                { name: "Вспышка защиты", desc : "Реакция: при получении урона союзники в 5 фт. получают временные ХП = 1к10 + уровень колдуна, 1/отдых" },
                { name: "Заклинания покровителя", desc : "Лунный луч, Лечебное слово", originSpells: ["moonbeam", "healing_word"] }
            ],
            10: [
                { name: "Свет зари", desc : "Бонусное действие: 60-фт конус 2к8 излучающего урона, ТЕЛ спас; при провале цель ослеплена до конца следующего вашего хода" },
                { name: "Заклинания покровителя", desc : "Героизм, Очищение пищи и воды", originSpells: ["heroism", "purify_food_and_water"] }
            ],
            14: [
                { name: "Небесное сопротивление", desc : "Сопротивление кислотному, холодному, огненному, электрическому и громовому урону" },
                { name: "Заклинания покровителя", desc : "Лечение, Воскрешение", originSpells: ["heal", "resurrection"] }
            ]
        },
        fathomless: {
            name: "БЕЗДОННЫЙ",
            1: [
                { name: "Щупальце глубин", desc : "Щупальца на спине; бонусное действие: атака щупальцем 1к6 + мод. ХАР или удержание цели" },
                { name: "Дар моря", desc : "Тёмное зрение 30 фт. под водой; скорость плавания равна ходьбе" },
                { name: "Заклинания покровителя", desc : "Холодное прикосновение, Щит, Лунный луч, Туманность", originSpells: ["chill_touch", "shield", "moonbeam", "fog_cloud"] }
            ],
            6: [
                { name: "Океаническая душа", desc : "Сопротивление холодному урону; заклинания могут наносить холодный урон вместо базового типа" },
                { name: "Защитное щупальце", desc : "Реакция: щупальце блокирует атаку, нанося 1к6 + мод. ХАР урона атакующему, 1/отдых" },
                { name: "Заклинания покровителя", desc : "Паучье лазание, Ускоренное отступление", originSpells: ["spider_climb", "expeditious_retreat"] }
            ],
            10: [
                { name: "Упорная хватка", desc : "Щупальца наносят 2к6 урона; при попадании цель замедлена; сопротивление замедлению" },
                { name: "Заклинания покровителя", desc : "Героизм, Героизм", originSpells: ["heroism", "heroism"] }
            ],
            14: [
                { name: "Прыжок через пучину", desc : "Бонусное действие: телепортация на 60 фт. через воду или туман; сопротивление холодному урону" },
                { name: "Заклинания покровителя", desc : "Изгнание, Жизнь и смерть", originSpells: ["banishment", "life_death"] }
            ]
        },
        genie: {
            name: "ГЕНИЙ",
            1: [
                { name: "Благословение гения", desc : "Добавьте d6 к одному броску d20, 1/отдых; выберите тип джинна: даив, дод, эфрит, марид" },
                { name: "Сосуд гения", desc : "При 0 ХП автоматически встаёте с 1 ХП, 1/отдых; сопротивление урону типа джинна" },
                { name: "Заклинания покровителя", desc : "Руководство, Щит, Лунный луч, Проход без следа", originSpells: ["guidance", "shield", "moonbeam", "pass_without_trace"] }
            ],
            6: [
                { name: "Вихрь магии", desc : "При броске заклинания 1-4 круга цель получает замедление, отталкивание или оглушение на 1 ход" },
                { name: "Заклинания покровителя", desc : "Туманность, Ускоренное отступление", originSpells: ["fog_cloud", "expeditious_retreat"] }
            ],
            10: [
                { name: "Элементальное святилище", desc : "Бонусное действие: сфера 15 фт. с эффектом, зависящим от типа джинна, 1/отдых" },
                { name: "Заклинания покровителя", desc : "Героизм, Героизм", originSpells: ["heroism", "heroism"] }
            ],
            14: [
                { name: "Ограниченное желание", desc : "Бонусное действие: воспроизведите эффект заклинания желания, 1/отдых; преимущество на спасброски от очарования и оглушения" },
                { name: "Заклинания покровителя", desc : "Свободное движение, Изоляция", originSpells: ["freedom_of_movement", "gentle_repose"] }
            ]
        },
        undead: {
            name: "НЕЖИТЬ",
            1: [
                { name: "Слуга нежити", desc : "Призыв нежити слуги; бонусное действие: переместите слугу на 30 фт или атакуйте 1к8 некротического урона" },
                { name: "Прикосновение смерти", desc : "При критическом попадании оружием цель теряет максимум ХП = 1к6" },
                { name: "Заклинания покровителя", desc : "Холодное прикосновение, Щит, Луч холода, Туманность", originSpells: ["chill_touch", "shield", "ray_of_frost", "fog_cloud"] }
            ],
            6: [
                { name: "Взор нежити", desc : "Бонусное действие: существо в 30 фт. получает disadvantage на атаки до конца следующего вашего хода, Муд спас отменяет" },
                { name: "Заклинания покровителя", desc : "Удержание человека, Ускоренное отступление", originSpells: ["hold_person", "expeditious_retreat"] }
            ],
            10: [
                { name: "Смертельный голод", desc : "Бонусное действие: 15-фт конус 4к8 некротического урона, ТЕЛ спас; при провале цель теряет сопротивление некротическому урону" },
                { name: "Заклинания покровителя", desc : "Героизм, Героизм", originSpells: ["heroism", "heroism"] }
            ],
            14: [
                { name: "Власть над смертью", desc : "Когда существо умирает в 30 фт. от вас, оно встаёт как нежить под вашим контролем на 1 минуту, 1/отдых" },
                { name: "Заклинания покровителя", desc : "Удержание чудовища, Массовое нанесение ран", originSpells: ["hold_monster", "mass_inflict_wounds"] }
            ]
        }
    },
    ranger: {
        hunter: {
            name: "ОХОТНИК",
            3: [
                { name: "Охотничья добыча", desc : "Выбор: Преследователь/Защитник/Приманка" },
                { name: "Удар колосса", desc : "При атаке цели с половиной HP доп. 1к8 урона, 1/ход" }
            ],
            7: [ { name: "Охотничья добыча", desc : "Выбор: Взрыв/Ловушка/Опустошение при крите или снижении HP цели" } ],
            11: [ { name: "Неутомимый охотник", desc : "Игнорирование труднопроходимой местности; союзники 3 фт. тоже" } ],
            15: [ { name: "Внезапный удар", desc : "Преимущество на атаки против существ, которые не видят вас" } ]
        },
        beastMaster: {
            name: "ПОВЕЛИТЕЛЬ ЗВЕРЕЙ",
            3: [
                { name: "Боевая связь", desc : "Зверь-компаньон с 2×уровень следопыта HP, ваши спасброски" },
                { name: "Приказ боевой подготовки", desc : "Компаньон совершает действия в ваш ход" }
            ],
            7: [
                { name: "Натренированный спутник", desc : "Компаньон получает бонусные действия: Преследователь/Защитник/Приманка" },
                { name: "Обмен заклинаниями", desc : "Заклинания на компаньона: Защита от зла и добра, Охота на дикого зверя, Лес" }
            ],
            11: [
                { name: "Натюрель-де-бат", desc : "Компаньон делает 2 атаки за ход; вы можете перемещаться через его клетку" },
                { name: "Обмен заклинаниями", desc : "Заклинания на компаньона: Свобода движения, Огненный удар" }
            ],
            15: [
                { name: "Единый инстинкт", desc : "Бонусное действие: до начала вашего хода компаньон атакует; вы можете действовать за него" },
                { name: "Обмен заклинаниями", desc : "Заклинания на компаньона: Непроницаемость, Воскрешение" }
            ]
        },
        horizonWalker: {
            name: "СТРАННИК ГОРИЗОНТА",
            3: [
                { name: "Чужак в чужих краях", desc : "Преимущество на спас. Мудрость от страха; скорость +10 фт." },
                { name: "Скиталец между мирами", desc : "Магия не скрывает вас от обнаружения; сопротивление урону 1 круг/отдых" },
                { name: "Заклинания архетипа", desc : "Дорожное проклятие, Обнаружение магии", archetypeSpells: ["wayfare_curse", "detect_magic"] }
            ],
            5: [ { name: "Заклинания архетипа", desc : "Защита от энергиями, Ледяная стрела", archetypeSpells: ["protection_from_elements", "ice_arrow"] } ],
            7: [
                { name: "Независимый странник", desc : "Иммунитет к магическому замедлению и телепортации против воли" },
                { name: "Заклинания архетипа", desc : "Героизм, Изгнание", archetypeSpells: ["heroism", "banishment"] }
            ],
            11: [
                { name: "Планарное чутьё", desc : "Чувствуете планарные аномалии в радиусе 60 фт.; преимущество на спас. от магии" },
                { name: "Заклинания архетипа", desc : "Несущий мир, Смена плоскости", archetypeSpells: ["conjure_woodland_beings", "plane_shift"] }
            ],
            15: [
                { name: "Разлом небес", desc : "Бонусное действие: 30-фт конус 4к6 разрывающего урона, спас. Ловкость, 1/отдых" },
                { name: "Заклинания архетипа", desc : "Антимагическое поле, Солнечный взрыв", archetypeSpells: ["antimagic_field", "sunburst"] }
            ]
        },
        gloomStalker: {
            name: "СУМРАЧНЫЙ ОХОТНИК",
            3: [
                { name: "Ужасное присутствие", desc : "Бонусное действие: существа 10 фт. спас. Мудрость или напуганы 1 мин., 1/долгий отдых" },
                { name: "Волна из мрака", desc : "При инициативе: 3к6 тёмного урона всем в 10 фт., спас. Ловкость" },
                { name: "Сумрачное восприятие", desc : "Тёмное зрение 60 фт.; преимущество на инициативу" }
            ],
            7: [
                { name: "Стелс мастер", desc : "Первое действие в бою: невидимость до первой атаки или заклинания" },
                { name: "Железная воля", desc : "Преимущество на спас. Мудрость от очарования и оглушения" }
            ],
            11: [
                { name: "Искусный охотник", desc : "Крит при 19-20; доп. 1к6 урона от критов; игнорирование преимущества против вас" },
                { name: "Ночной кошмар", desc : "Существа не могут закончить ход в 10 фт. от вас, если вы не оглушены" }
            ],
            15: [ { name: "Шестое чувство", desc : "Атаки по вам с помехой, если вы их не видите; уклонение без затрат действия" } ]
        },
        monsterSlayer: {
            name: "УБИЙЦА ЧУДОВИЩ",
            3: [
                { name: "Тактики убийцы", desc : "Реакция: отмена преимущества противника или наложение помехи" },
                { name: "Враг чудовищ", desc : "Преимущество на проверки против монстров; изучение их слабостей" },
                { name: "Заклинания архетипа", desc : "Огненные ладони, Щит веры", archetypeSpells: ["burning_hands", "shield_of_faith"] }
            ],
            5: [ { name: "Заклинания архетипа", desc : "Защита от энергиями, Ледяная стрела", archetypeSpells: ["protection_from_elements", "ice_arrow"] } ],
            7: [
                { name: "Опасный инстинкт", desc : "При получении урона: реакция для атаки с преимуществом" },
                { name: "Заклинания архетипа", desc : "Героизм, Изгнание", archetypeSpells: ["heroism", "banishment"] }
            ],
            11: [
                { name: "Разрушитель иллюзий", desc : "Сопротивление психическому урону; преимущество на спас. от магии монстров" },
                { name: "Заклинания архетипа", desc : "Несущий мир, Смена плоскости", archetypeSpells: ["conjure_woodland_beings", "plane_shift"] }
            ],
            15: [
                { name: "Убийца чудовищ", desc : "Крит при 18-20 против изученных монстров; доп. 1к8 урона" },
                { name: "Заклинания архетипа", desc : "Антимагическое поле, Солнечный взрыв", archetypeSpells: ["antimagic_field", "sunburst"] }
            ]
        },
        feyWanderer: {
            name: "СТРАННИК ФЕЙ",
            3: [
                { name: "Шаг через листву", desc : "Бонусное действие: телепортация на 30 фт. к видимому месту, 3/отдых" },
                { name: "Заклинания архетипа", desc : "Огненные ладони, Щит веры", archetypeSpells: ["burning_hands", "shield_of_faith"] }
            ],
            5: [ { name: "Заклинания архетипа", desc : "Защита от энергиями, Ледяная стрела", archetypeSpells: ["protection_from_elements", "ice_arrow"] } ],
            7: [
                { name: "Дикая защита", desc : "Бонусное действие: сопротивление всему урону 1 мин., 1/отдых" },
                { name: "Заклинания архетипа", desc : "Героизм, Изгнание", archetypeSpells: ["heroism", "banishment"] }
            ],
            11: [
                { name: "Порыв фей", desc : "При критическом ударе: доп. 1к8 некротического или излучающего урона" },
                { name: "Заклинания архетипа", desc : "Несущий мир, Смена плоскости", archetypeSpells: ["conjure_woodland_beings", "plane_shift"] }
            ],
            15: [
                { name: "Гнев фей", desc : "Бонусное действие: 10 фт. конус 4к6 хаотичного урона, спас. Ловкость" },
                { name: "Заклинания архетипа", desc : "Антимагическое поле, Солнечный взрыв", archetypeSpells: ["antimagic_field", "sunburst"] }
            ]
        },
        swarmkeeper: {
            name: "ХРАНИТЕЛЬ РОЯ",
            3: [
                { name: "Призыв роя", desc : "Действие: призвать невидимый рой на 1 час. 3 действия роя: атака, защита, лечение" },
                { name: "Заклинания архетипа", desc : "Огненные ладони, Щит веры", archetypeSpells: ["burning_hands", "shield_of_faith"] }
            ],
            5: [ { name: "Заклинания архетипа", desc : "Защита от энергиями, Ледяная стрела", archetypeSpells: ["protection_from_elements", "ice_arrow"] } ],
            7: [
                { name: "Рой-убийца", desc : "Рой атакует с преимуществом; при попадании цель с помехой на следующие атаки" },
                { name: "Заклинания архетипа", desc : "Героизм, Изгнание", archetypeSpells: ["heroism", "banishment"] }
            ],
            11: [
                { name: "Рой-целитель", desc : "Рой лечит 1к6+Муд при попадании союзника; вы получаете ВП" },
                { name: "Заклинания архетипа", desc : "Несущий мир, Смена плоскости", archetypeSpells: ["conjure_woodland_beings", "plane_shift"] }
            ],
            15: [
                { name: "Повелитель роя", desc : "Рой делает 2 атаки; при критическом ударе доп. 1к6 урона" },
                { name: "Заклинания архетипа", desc : "Антимагическое поле, Солнечный взрыв", archetypeSpells: ["antimagic_field", "sunburst"] }
            ]
        },
        drakewarden: {
            name: "НАЕЗДНИК НА ДРЕЙКЕ",
            3: [
                { name: "Призыв дрейка", desc : "Действие: призвать дрейка (огонь/кислота/холод) на 1 час. 1 атака, КД 13" },
                { name: "Дыхание дракона", desc : "Бонусное действие: дрейк делает 5-фт конус 1к6 урона типа, 3/отдых" },
                { name: "Заклинания архетипа", desc : "Огненные ладони, Щит веры", archetypeSpells: ["burning_hands", "shield_of_faith"] }
            ],
            5: [ { name: "Заклинания архетипа", desc : "Защита от энергиями, Ледяная стрела", archetypeSpells: ["protection_from_elements", "ice_arrow"] } ],
            7: [
                { name: "Чешуйчатый щит", desc : "Дрейк может вставать между вами и атакой, 1к6+Муд урона атакующему" },
                { name: "Заклинания архетипа", desc : "Героизм, Изгнание", archetypeSpells: ["heroism", "banishment"] }
            ],
            11: [
                { name: "Древний дух", desc : "Дрейк делает 2 атаки; сопротивление урону типа дракона для вас и дрейка" },
                { name: "Заклинания архетипа", desc : "Несущий мир, Смена плоскости", archetypeSpells: ["conjure_woodland_beings", "plane_shift"] }
            ],
            15: [
                { name: "Дыхание древнего дракона", desc : "Дрейк: 10-фт конус 3к6 урона типа; вы получаете ВП и сопротивление" },
                { name: "Заклинания архетипа", desc : "Антимагическое поле, Солнечный взрыв", archetypeSpells: ["antimagic_field", "sunburst"] }
            ]
        }
    },
    bard: {
        title: 'КОЛЛЕГИЯ',
        options: [
            {
                value: 'SWORDS',
                label: 'КОЛЛЕГИЯ МЕЧЕЙ',
                modifiers: { armor: 'Medium armor', weapons: 'scimitar', skills: ['Performance'] },
                specialLogic: ['extra_attack_6', 'fighting_style_swords'],
                features: [
                    { name: 'Дополнительные владения', level: 3, desc: 'Вы получаете владение средними доспехами и скимитарами. Вы можете использовать скимитар в качестве фокусирующего элемента для заклинаний барда.' },
                    { name: 'Росчерк клинка', level: 3, desc: 'Вы учитесь исполнять впечатляющие демонстрации боевого мастерства. Когда вы совершаете действие Атака в свой ход, ваша скорость ходьбы увеличивается на 10 футов до конца текущего хода. Если атака оружием в этот ход попадает по существу, вы можете использовать один из вариантов Росчерка клинка.' },
                    { name: 'Дополнительная атака', level: 6, desc: 'Вы можете совершить две атаки вместо одной, когда совершаете действие Атака в свой ход.' },
                    { name: 'Мастерский росчерк', level: 14, desc: 'Когда вы используете умение Росчерк клинка, вы можете бросить к6 вместо траты кости бардовского вдохновения для росчерков.' }
                ],
                actions: [
                    { name: 'Росчерк клинка: Оборонительный росчерк', type: 'Бонусное', level: 3, icon: '🛡', desc : 'Тратите 1 кость вдохновения. Нанести цели дополнительный урон. Результат броска кости прибавляется к вашему КД до начала следующего хода.', spendInspiration: true },
                    { name: 'Росчерк клинка: Режущий росчерк', type: 'Бонусное', level: 3, icon: '⚔', desc : 'Тратите 1 кость вдохновения. Нанести цели дополнительный урон, а также нанести этот урон любому другому существу в пределах 5 футов от вас.', spendInspiration: true },
                    { name: 'Росчерк клинка: Мобильный росчерк', type: 'Бонусное', level: 3, icon: '💨', desc : 'Тратите 1 кость вдохновения. Нанести цели дополнительный урон. Оттолкнуть цель на 5 футов плюс результат броска кости и переместиться за ней.', spendInspiration: true }
                ]
            },
            {
                value: 'college_of_lore',
                label: 'КОЛЛЕГИЯ ЗНАНИЙ',
                modifiers: { skills: ['Arcana', 'History', 'Investigation', 'Medicine', 'Religion'] },
                specialLogic: ['extra_skills_3', 'additional_magical_secrets_6'],
                features: [
                    { name: 'Дополнительные навыки', level: 3, desc: 'Вы получаете владение тремя навыками на ваш выбор.' },
                    { name: 'Острые слова', level: 3, desc: 'Вы можете использовать кость вдохновения реакцией, чтобы вычесть результат из броска атаки, урона или проверки характеристики врага в пределах 60 футов.' },
                    { name: 'Дополнительные тайны магии', level: 6, desc: 'Вы изучаете два заклинания любого класса. Они идут сверх лимита таблицы барда и всегда считаются заклинаниями барда.' },
                    { name: 'Несравненное мастерство', level: 14, desc: 'Когда вы совершаете проверку характеристики, вы можете бросить кость своего вдохновения и прибавить результат к броску d20.' }
                ],
                actions: [
                    { name: 'Острые слова', type: 'Реакция', level: 3, icon: '✋', desc : 'Тратите 1 кость вдохновения. Вычтите результат из броска атаки, урона или проверки характеристики врага в 60 фт.', spendInspiration: true }
                ]
            },
            {
                value: 'college_of_valor',
                label: 'КОЛЛЕГИЯ ДОБЛЕСТИ',
                modifiers: { armor: 'Light armor', weapons: 'Simple weapons, longswords, scimitars, shortswords, martial weapons', skills: ['Athletics', 'Insight', 'Intimidation'] },
                specialLogic: ['extra_attack_6'],
                features: [
                    { name: 'Дополнительные владения', level: 3, desc: 'Вы получаете владение щитами, средними и тяжелыми доспехами, а также воинским оружием.' },
                    { name: 'Боевое вдохновение', level: 3, desc: 'Существо, у которого есть кость вашего бардовского вдохновения, может бросить эту кость и прибавить результат к броску урона оружием, либо реакцией к своему КД против одной атаки.' },
                    { name: 'Дополнительная атака', level: 6, desc: 'Вы можете совершить две атаки вместо одной, когда совершаете действие Атака в свой ход.' },
                    { name: 'Тактический удар', level: 10, desc: 'Когда существо попадает по вам атакой ближнего боя, вы можете реакцией совершить по нему одну атаку оружием.' },
                    { name: 'Боевая магия', level: 14, desc: 'Когда вы используете действие для сотворения заклинания барда, вы можете совершить одну атаку оружием в качестве бонусного действия.' }
                ],
                actions: [
                    { name: 'Боевое вдохновение', type: 'Бонусное', level: 3, icon: '🎵', desc : 'Тратите 1 кость вдохновения. Цель прибавляет результат к броску урона или к КД реакцией.', spendInspiration: true },
                    { name: 'Тактический удар', type: 'Реакция', level: 10, icon: '⚡', desc : 'Когда существо попадает по вам, совершите по нему одну атаку оружием.' },
                    { name: 'Боевая магия', type: 'Бонусное', level: 14, icon: '✨', desc : 'Совершить одну атаку оружием сразу после сотворения заклинания барда.' }
                ]
            },
            {
                value: 'college_of_whispers',
                label: 'КОЛЛЕГИЯ ШЕПОТОВ',
                modifiers: { skills: ['Deception', 'Intimidation', 'Investigation', 'Stealth'] },
                features: [
                    { name: 'Психические клинки', level: 3, desc: 'Один раз в ход при попадании оружием вы можете потратить кость вдохновения, чтобы нанести цели дополнительный психический урон (2к6 на 3 ур., растет с уровнем).' },
                    { name: 'Слова ужаса', level: 3, desc: 'Если вы говорите с существом наедине в течение 1 минуты, вы можете заставить его пройти спасбросок Мудрости или стать испуганным вами на 1 час.' },
                    { name: 'Мантия шепотов', level: 6, desc: 'Когда гуманоид умирает в пределах 30 футов от вас, вы можете реакцией поймать его тень. Вы можете использовать её, чтобы принять его идеальный облик и получить базовую информацию о нем на 1 час.' },
                    { name: 'Теневые знания', level: 14, desc: 'Вы шепчете фразу существу, заставляя его верить, что вы знаете его самый грязный секрет. Цель становится послушной и выполняет ваши команды из страха разоблачения в течение 8 часов.' }
                ],
                actions: [
                    { name: 'Психические клинки', type: 'Бонусное', level: 3, icon: '🔪', desc : 'Тратите 1 кость вдохновения. Нанести дополнительный психический урон при попадании оружием.', spendInspiration: true }
                ]
            },
            {
                value: 'college_of_glamour',
                label: 'КОЛЛЕГИЯ ОЧАРОВАНИЯ',
                modifiers: { skills: ['Deception', 'Performance', 'Persuasion'] },
                specialLogic: ['glamour_mantle'],
                features: [
                    { name: 'Мантия вдохновения', level: 3, desc: 'Бонусным действием вы тратите одну кость бардовского вдохновения, чтобы принять величественный облик. До пяти союзников в пределах 60 футов получают по 5 временных ОЗ (число ОЗ растет с уровнем барда: на 5 ур. -> 8 ОЗ, на 10 ур. -> 11 ОЗ, на 15 ур. -> 14 ОЗ). Каждый из этих союзников может немедленно использовать свою реакцию, чтобы переместиться на свою скорость без провокации атак.' },
                    { name: 'Пленительное выступление', level: 3, desc: 'Если вы выступаете в течение 10 минут, вы можете магически очаровать аудиторию. До БМ-количества существ, проваливших спасбросок Мудрости, становятся очарованными вами на 1 час. Они дружелюбны к вам, превозносят вас перед другими и защищают от критиков.' },
                    { name: 'Мантия величия', level: 6, desc: 'Бонусным действием вы принимаете величественный облик на 1 минуту. В течение этого времени вы можете сотворять заклинание Приказ в качестве бонусного действия в каждый свой ход, не тратя ячейки заклинаний. Существа, очарованные вами, автоматически проваливают спасбросок против этого заклинания.' },
                    { name: 'Несокрушимое величие', level: 14, desc: 'Ваш облик становится магически прекрасным и чистым. Когда существо атакует вас впервые в свой ход, оно должно пройти спасбросок Харизмы. При провале оно не может атаковать вас в этот ход, и его атака перенаправляется на другую цель (или пропадает). При успехе оно атакует вас, но имеет помеху на все спасброски против ваших заклинаний до конца вашего следующего хода.' }
                ],
                actions: [
                    { name: 'Мантия вдохновения', type: 'Бонусное', level: 3, icon: '👑', desc : 'Тратите 1 кость вдохновения: до 5 союзников в 60 фт. получают временные ОЗ и могут переместиться реакцией без провокации атак.', spendInspiration: true },
                    { name: 'Пленительное выступление', type: 'Действие', level: 3, icon: '🎭', desc : '10 минут выступления: до БМ-количества существ, проваливших спасбросок Мудрости, очарованы вами на 1 час.' },
                    { name: 'Мантия величия', type: 'Бонусное', level: 6, icon: '🌟', desc : 'Величественный облик на 1 минуту. Право творить Приказ бонусным действием каждый ход без ячеек. Очарованные существа проваливают спасбросок.' }
                ]
            },
            {
                value: 'college_of_eloquence',
                label: 'КОЛЛЕГИЯ КРАСНОРЕЧИЯ',
                modifiers: { skills: ['Deception', 'Insight', 'Persuasion'] },
                features: [
                    { name: 'Серебряный язык', level: 3, desc: 'Любой бросок d20 на проверку Убеждения или Обмана со значением 9 или ниже автоматически считается за 10.' },
                    { name: 'Тревожные слова', level: 3, desc: 'Бонусным действием вы тратите кость вдохновения и вычитаете результат из следующего спасброска выбранной цели до начала вашего следующего хода.' },
                    { name: 'Невредимое вдохновение', level: 6, desc: 'Если бросок союзника с вашей костью вдохновения провалился, кость НЕ тратится и остается у него для следующего использования.' },
                    { name: 'Всеобщая речь', level: 6, desc: 'Действием вы можете магически заставить БМ-количество существ понимать вашу речь в течение 1 часа, преодолевая любые языковые барьеры.' },
                    { name: 'Заразное вдохновение', level: 14, desc: 'Когда союзник успешно применяет ваше вдохновение, вы можете реакцией немедленно передать еще одну кость вдохновения другому существу в пределах 60 футов без траты своего пула.' }
                ],
                actions: [
                    { name: 'Тревожные слова', type: 'Бонусное', level: 3, icon: '🗣', desc : 'Тратите 1 кость вдохновения. Уменьшить следующий спасбросок выбранной цели на результат броска.', spendInspiration: true },
                    { name: 'Заразное вдохновение', type: 'Реакция', level: 14, icon: '💫', desc : 'Когда союзник успешно применяет вдохновение, передать еще одну кость другому существу в 60 фт.' }
                ]
            },
            {
                value: 'college_of_creation',
                label: 'КОЛЛЕГИЯ ТВОРЧЕСТВА',
                modifiers: { skills: ['Arcana', 'History', 'Investigation'], tools: '2 craft kits' },
                features: [
                    { name: 'Поток потенциала', level: 3, desc: 'Ваши кости вдохновения дают доп. эффекты: при атаке наносится урон по площади, при спасброске даются временные хиты, при проверке характеристики можно перебросить кость вдохновения.' },
                    { name: 'Творческое выступление', level: 3, desc: 'Действием вы можете материализовать один немагический предмет в свободном пространстве. Предмет исчезает через число часов, равное БМ.' },
                    { name: 'Оживляющее выступление', level: 6, desc: 'Действием вы оживляете один предмет среднего или меньшего размера, превращая его в послушного спутника под вашим контролем на 1 час.' },
                    { name: 'Творческое крещендо', level: 14, desc: 'Вы можете создавать несколько материализованных предметов одновременно, а ограничения по их стоимости полностью снимаются.' }
                ],
                actions: [
                    { name: 'Творческое выступление', type: 'Действие', level: 3, icon: '🎨', desc : 'Материализовать немагический предмет из воздуха в пределах 10 футов.' },
                    { name: 'Оживляющее выступление', type: 'Действие', level: 6, icon: '⚗', desc : 'Оживить один неодушевленный предмет, превратив его в боевого спутника.' }
                ]
            },
            {
                value: 'college_of_spirits',
                label: 'КОЛЛЕГИЯ ДУХОВ',
                modifiers: { skills: ['Insight', 'Medicine', 'Religion', 'Survival'] },
                features: [
                    { name: 'Направляющий шепот', level: 3, desc: 'Ваш заговор Наведение (Guidance) теперь имеет дистанцию 60 футов вместо касания.' },
                    { name: 'Истории с Изнанки', level: 3, desc: 'Бонусным действием вы взываете к духам через фокус и бросаете кость по таблице историй, получая случайный боевой или защитный эффект.' },
                    { name: 'Духовный проводник', level: 6, desc: 'Вы используете карты, череп или доску духа как магическую фокусировку. Когда вы сотворяете заклинание, восстанавливающее ОЗ или наносящее урон звуком/некротической энергией/излучением, добавьте к броску 1к6.' },
                    { name: 'Мистическая связь', level: 14, desc: 'Используя Истории с Изнанки, вы бросаете кубик дважды по таблице историй и сами выбираете, какой из двух эффектов применить.' }
                ],
                actions: [
                    { name: 'Истории с Изнанки', type: 'Бонусное', level: 3, icon: '👻', desc : 'Бросить кость по таблице духов и получить случайную историю с магическим эффектом.' }
                ]
            }
        ]
    },
        druid: {
            title: 'КРУГ',
            land: {
                name: 'КРУГ ЗЕМЛИ',
                2: [
                    { name: 'Восстановление земли', requiredLevel: 2, desc : 'Бонусное действие вне боя: восстановите слот заклинания' }
                ],
                3: [
                    { name: 'Заклинания круга', requiredLevel: 3, desc : 'Ягода добра, Разговор с животными', circleSpells: ['goodberry', 'speak_with_animals'] }
                ],
                6: [
                    { name: 'Заклинания круга', requiredLevel: 6, desc : 'Прохождение без следа, Незаметность', circleSpells: ['pass_without_trace', 'nondetection'] }
                ],
                10: [
                    { name: 'Заклинания круга', requiredLevel: 10, desc : 'Ледяной шторм, Обнаружение животного или растения', circleSpells: ['ice_storm', 'locate_animal_or_plant'] }
                ],
                14: [
                    { name: 'Заклинания круга', requiredLevel: 14, desc : 'Общение с природой, Наблюдение', circleSpells: ['commune_with_nature', 'scrying'] },
                    { name: 'Шаг земли', requiredLevel: 14, desc : 'Перемещение по растительности и труднопроходимой местности без штрафа' }
                ]
            },
            moon: {
                name: 'КРУГ ЛУНЫ',
                2: [
                    { name: 'Первобытное пробуждение', requiredLevel: 2, desc : 'Дикие формы с БО до 1/2. Принятие формы — бонусное действие. Боевая дикая форма.' },
                    { name: 'Заклинания круга', requiredLevel: 2, desc : 'Призыв животных, Рост шипов', circleSpells: ['conjure_animals', 'spike_growth'] }
                ],
                6: [
                    { name: 'Заклинания круга', requiredLevel: 6, desc : 'Лунный луч, Растительность', circleSpells: ['moonbeam', 'plant_growth'] }
                ],
                10: [
                    { name: 'Заклинания круга', requiredLevel: 10, desc : 'Ледяной шторм, Обнаружение животного или растения', circleSpells: ['ice_storm', 'locate_animal_or_plant'] },
                    { name: 'Первобытный удар', requiredLevel: 10, desc : 'Урон в дикой форме игнорирует сопротивление' }
                ],
                14: [
                    { name: 'Заклинания круга', requiredLevel: 14, desc : 'Огненная туча', circleSpells: ['incendiary_cloud'] },
                    { name: 'Элементальная дикая форма', requiredLevel: 14, desc : 'Формы элементалей доступны' }
                ]
            },
            spores: {
                name: 'КРУГ СПОР',
                2: [
                    { name: 'Смертоносные капли', requiredLevel: 2, desc : 'При исцелении создается зона спор, наносящая 1d6 ядовитого урона' },
                    { name: 'Грибковое облако', requiredLevel: 2, desc : 'Заклинания лечения создают облако спор в радиусе 5 футов' }
                ],
                6: [
                    { name: 'Грибковое заражение', requiredLevel: 6, desc : 'При смерти существа взрывается спорами, 3d10 ядовитого урона' }
                ],
                10: [
                    { name: 'Смертельный вихрь', requiredLevel: 10, desc : 'Бонусное действие: 4d8 некротического урона в радиусе 30 футов' }
                ]
            },
            dream: {
                name: 'КРУГ МЕЧТ',
                2: [
                    { name: 'Цветок судьбы', requiredLevel: 2, desc : 'При исцелении бросайте d6 для дополнительных эффектов' },
                    { name: 'Заклинания круга', requiredLevel: 2, desc : 'Огонь феи', circleSpells: ['faerie_fire'] }
                ],
                6: [
                    { name: 'Заклинания круга', requiredLevel: 6, desc : 'Предзнаменование', circleSpells: ['augury'] }
                ],
                10: [
                    { name: 'Заклинания круга', requiredLevel: 10, desc : 'Мечта, Обнаружение существа', circleSpells: ['dream', 'locate_creature'] }
                ],
                14: [
                    { name: 'Заклинания круга', requiredLevel: 14, desc : 'Наблюдение, Круг телепортации', circleSpells: ['scrying', 'teleportation_circle'] },
                    { name: 'Завороженная земля', requiredLevel: 14, desc : 'При смерти создайте зону иллюзии, исцеляющую союзников' }
                ]
            },
            stars: {
                name: 'КРУГ ЗВЁЗД',
                2: [
                    { name: 'Звёздная искра', requiredLevel: 2, desc : 'Бонусное действие: 2d6 лучистого урона или восстановление 1d6+2 ОЗ' },
                    { name: 'Заклинания круга', requiredLevel: 2, desc : 'Дневной свет', circleSpells: ['daylight'] }
                ],
                6: [
                    { name: 'Заклинания круга', requiredLevel: 6, desc : 'Лунный луч', circleSpells: ['moonbeam'] }
                ],
                10: [
                    { name: 'Заклинания круга', requiredLevel: 10, desc : 'Ледяной шторм', circleSpells: ['ice_storm'] }
                ],
                14: [
                    { name: 'Заклинания круга', requiredLevel: 14, desc : 'Огненная туча', circleSpells: ['incendiary_cloud'] },
                    { name: 'Астрологическое изменение', requiredLevel: 14, desc : 'В дикой форме получайте сопротивление ко всему урону, кроме психического и некротического' }
                ]
            },
            wildfire: {
                name: 'КРУГ ПОЖАРА',
                2: [
                    { name: 'Дух пожара', requiredLevel: 2, desc : 'Призыв духа пожара, наносящего 3d8 урона' },
                    { name: 'Заклинания круга', requiredLevel: 2, desc : 'Огненные ладони', circleSpells: ['burning_hands'] }
                ],
                6: [
                    { name: 'Заклинания круга', requiredLevel: 6, desc : 'Огненная стрела', circleSpells: ['fire_bolt'] }
                ],
                10: [
                    { name: 'Заклинания круга', requiredLevel: 10, desc : 'Огненный шторм', circleSpells: ['fire_storm'] }
                ],
                14: [
                    { name: 'Заклинания круга', requiredLevel: 14, desc : 'Огненная туча', circleSpells: ['incendiary_cloud'] },
                    { name: 'Пожарный страж', requiredLevel: 14, desc : 'Дух пожара становится более мощным и может действовать независимо' }
                ]
            },
            shepherd: {
                name: 'КРУГ ПАСТОХА',
                2: [
                    { name: 'Духи тотемов', requiredLevel: 2, desc : 'При вызове животных они получают бонус к спасброскам' },
                    { name: 'Заклинания круга', requiredLevel: 2, desc : 'Разговор с животными', circleSpells: ['speak_with_animals'] }
                ],
                6: [
                    { name: 'Заклинания круга', requiredLevel: 6, desc : 'Лунный луч, Растительность', circleSpells: ['moonbeam', 'plant_growth'] }
                ],
                10: [
                    { name: 'Заклинания круга', requiredLevel: 10, desc : 'Ледяной шторм', circleSpells: ['ice_storm'] }
                ],
                14: [
                    { name: 'Заклинания круга', requiredLevel: 14, desc : 'Огненная туча', circleSpells: ['incendiary_cloud'] },
                    { name: 'Голос жизни', requiredLevel: 14, desc : 'При смерти существа в зоне вашего заклинания, оно возвращается к жизни' }
                ]
            }
        },
    monk: {
        openHand: {
            name: "ПУТЬ ОТКРЫТОЙ ЛАДОНИ",
            3: [ { name: "Техника открытой ладони", desc : "При попадании рукопашной атакой: сбить с ног, оттолкнуть 15 фт. или лишить реакции до конца следующего хода цели." } ],
            6: [ { name: "Целостность тела", desc : "Действием восстанавливает ОЗ, равные 3×уровню монаха. 1/долгий отдых." } ],
            11: [ { name: "Тихий дух", desc : "Преимущество на спасброски против очарования и страха." } ],
            17: [ { name: "Дрожащая ладонь", desc : "Бонусное действие: трясущий удар. Цель спас. Тел или 7к10 урона, половина при успехе. Тратит 3 ки.", specialLogic: { kiCost: 3 } } ]
        },
        shadow: {
            name: "ПУТЬ ТЕНИ",
            3: [
                { name: "Шаг тени", desc : "Бонусное действие: телепортация между тенями до 60 фт. Тратит 2 ки.", specialLogic: { kiCost: 2 } },
                { name: "Атака из тени", desc : "Бонусное действие: невидимый удар из тени. 3д6 психического урона, спас. Мудрость. Тратит 2 ки.", specialLogic: { kiCost: 2 } }
            ],
            6: [ { name: "Искусство теней", desc : "Выучить заклинания: тень, иллюзорные предметы, невидимость, зеркальное изображение." } ],
            11: [ { name: "Соткать тень", desc : "Бонусное действие: создать затенённую область 20 фт. Союзники невидимы, враги с помехой на атаки. Тратит 3 ки.", specialLogic: { kiCost: 3 } } ],
            17: [ { name: "Соткать ужас", desc : "Бонусное действие: существо в тени спас. Мудрость или оглушено 1 мин. Тратит 3 ки.", specialLogic: { kiCost: 3 } } ]
        },
        fourElements: {
            name: "ПУТЬ ЧЕТЫРЁХ СТИХИЙ",
            3: [
                { name: "Ученик четырёх стихий", desc : "Бонусное действие: использовать ки для эффектов стихий: огонь, воздух, земля, вода.", specialLogic: { kiCost: 1 } },
                { name: "Рука стихий", desc : "Модифицирует Шквал ударов: огонь (2д6), воздух (оттолкнуть), земля (сбить с ног), вода (лечение 2д6).", specialLogic: { kiCost: 1 } }
            ],
            6: [ { name: "Искусство стихий", desc : "Выучить заклинания: туман, огненные ладони, порыв ветра, ледяная стрела, щит веры, телекинез." } ],
            11: [ { name: "Истинное владение стихиями", desc : "Использование стихийных эффектов больше не требует концентрации." } ],
            17: [ { name: "Вечный вихрь", desc : "Бонусное действие: зона 20 фт. Союзники +10 фт. скорости, невидимость. Враги спас. Мудрость или 6д10 разрывающего урона. Тратит 4 ки.", specialLogic: { kiCost: 4 } } ]
        },
        longDeath: {
            name: "ПУТЬ ДОЛГОЙ СМЕРТИ",
            3: [
                { name: "Прикосновение смерти", desc : "Рукопашная атака оружием: доп. 1д8 некротического урона (не требует ки).", specialLogic: { extraDamage: "1d8" } },
                { name: "Гнев смерти", desc : "При попадании оружием: цель спас. Тел или 3д6 некротического урона, половина при успехе.", specialLogic: { extraDamage: "3d6" } }
            ],
            6: [
                { name: "Искусство долгой смерти", desc : "Выучить заклинания: ледяное касание, ложная жизнь, защита от смерти, луч бессилия, тень." },
                { name: "Неумирающий гнев", desc : "Гнев смерти: при успехе спасброска цель всё равно теряет лечение." }
            ],
            11: [ { name: "Прикосновение могилы", desc : "Бонусное действие: рукопашная атака. При попадании цель теряет лечение и ВП 1 мин, спас. Мудрость." } ],
            17: [ { name: "Неумирающий", desc : "При падении до 0 ОЗ: автоматически stabilizируетcя. Сопротивление некротическому и нежити." } ]
        },
        kensei: {
            name: "ПУТЬ КЭНСЭЯ",
            3: [
                { name: "Оружие кэнсэя", desc : "Выберите 4 оружия. Они считаются оружием монаха." },
                { name: "Мастерство оружия", desc : "Преимущество на спасброски против эффектов, заставляющих отпустить оружие." }
            ],
            6: [
                { name: "Искусство кэнсэя", desc : "Выучить заклинания: телекинез, волшебное оружие, щит веры, клинок поспешности, изгнание." },
                { name: "Заточка лезвия", desc : "Бонусное действие: оружие +1 к атаке и урону 1 мин. Тратит 1 ки.", specialLogic: { kiCost: 1 } }
            ],
            11: [
                { name: "Удар без промаха", desc : "Атаки оружием кэнсэя игнорируют укрытие до лёгкого." },
                { name: "Дополнительная атака", desc : "Бонусное действие: рукопашная атака оружием кэнсэя." }
            ],
            17: [ { name: "Боевой дух", desc : "Бонусное действие: невидимость 1 мин. Тратит 4 ки.", specialLogic: { kiCost: 4 } } ]
        },
        drunkenMaster: {
            name: "ПУТЬ ПЬЯНОГО МАСТЕРА",
            3: [
                { name: "Пьяная техника", desc : "При промахе по вам: атакующий с помехой на остальные атаки до конца хода." },
                { name: "Непредсказуемое опьянение", desc : "При попадании по вам: переместите атакующего до 5 фт. на свободное место." }
            ],
            6: [ { name: "Состояние опьянения", desc : "Действием: 1 мин иммунитет к эффектам с помехой, страху, срыванию. Скорость +10 фт., преимущество на спас vs оглушение/сбивание. Тратит 2 ки.", specialLogic: { kiCost: 2 } } ],
            11: [ { name: "Дrunken Frenzy", desc : "При получении урона: бонусное действие рукопашная атака." } ],
            17: [ { name: "Вращение", desc : "Бонусное действие: все атаки по вам с помехой 1 мин. Тратит 4 ки.", specialLogic: { kiCost: 4 } } ]
        },
        sunSoul: {
            name: "ПУТЬ СОЛНЕЧНОЙ ДУШИ",
            3: [
                { name: "Излучение солнца", desc : "Бонусное действие: зона 30 фт. яркий свет. Враги в темноте слепы. Союзники лечение 2д8. Тратит 3 ки.", specialLogic: { kiCost: 3 } },
                { name: "Рука солнца", desc : "Модифицирует Шквал ударов: доп. 2д8 излучения." }
            ],
            6: [ { name: "Искусство солнца", desc : "Выучить заклинания: огонь феи, щит веры, благословение, дневной свет, огненная защита, огненные ладони." } ],
            11: [ { name: "Рассеивающий свет", desc : "Действием: рассеять заклинание 3-го круга или ниже в радиусе 30 фт." } ],
            17: [ { name: "Звёздное сияние", desc : "Бонусное действие: 60-фт конус 10д10 излучения, спас. Лов. Тратит 4 ки.", specialLogic: { kiCost: 4 } } ]
        },
        astralSelf: {
            name: "ПУТЬ АСТРАЛЬНОГО ТЕЛА",
            3: [
                { name: "Астральное тело", desc : "Бонусное действие: создать астральную копию 30 фт. Тратит 2 ки.", specialLogic: { kiCost: 2 } },
                { name: "Проекция астрального тела", desc : "Астральная копия: телепортация к ней, атака от неё (3д6 некротического), перемещение союзника." }
            ],
            6: [ { name: "Искусство астрального тела", desc : "Выучить заклинания: телекинез, зеркальное изображение, щит веры, туман, невидимость, телепортация." } ],
            11: [ { name: "Путешествие астрала", desc : "Скорость астрала +30 фт. Можно телепортироваться к нему в реакции при получении урона." } ],
            17: [ { name: "Поток чакр", desc : "Бонусное действие: астрал создаёт зону 20 фт. Союзники лечение 3д8, враги 3д8 разрывающий урон. Тратит 4 ки.", specialLogic: { kiCost: 4 } } ]
        },
        mercy: {
            name: "ПУТЬ МИЛОСЕРДИЯ",
            3: [
                { name: "Рука милосердия", desc : "Бонусное действие: рукопашная атака. При попадании цель спас. Тел или оглушена 1 мин. Тратит 2 ки.", specialLogic: { kiCost: 2 } },
                { name: "Исцеляющее прикосновение", desc : "Бонусное действие: лечение 2д8+Муд. Тратит 2 ки.", specialLogic: { kiCost: 2 } }
            ],
            6: [ { name: "Искусство милосердия", desc : "Выучить заклинания: ледяное касание, ложная жизнь, лечение ран, луч бессилия, малое восстановление." } ],
            11: [ { name: "Вдохновляющее прикосновение", desc : "Исцеляющее прикосновение: цель получает ВП и скорость +10 фт. 1 мин." } ],
            17: [ { name: "Божественное прикосновение", desc : "Бонусное действие: 30 фт. зона. Союзники лечение 4д8, враги 4д8 некротического урон, спас. Тел. Тратит 4 ки.", specialLogic: { kiCost: 4 } } ]
        },
        ascendantDragon: {
            name: "ПУТЬ ВОСХОДЯЩЕГО ДРАКОНА",
            3: [
                { name: "Крылья дракона", desc : "Бонусное действие: вырастают крылья, полёт 1 мин. Тратит 2 ки.", specialLogic: { kiCost: 2 } },
                { name: "Дыхание дракона", desc : "Бонусное действие: 15-фт конус 2д8 (огонь/холод/кислота/мокрота/гроза). Тратит 2 ки.", specialLogic: { kiCost: 2 } }
            ],
            6: [
                { name: "Искусство восходящего дракона", desc : "Выучить заклинания: туман, щит веры, огненные ладони, ледяная стрела, телекинез, огненная защита." },
                { name: "Эликсир жизни", desc : "Бонусное действие: лечение 4д8. Тратит 2 ки.", specialLogic: { kiCost: 2 } }
            ],
            11: [ { name: "Восхождение дракона", desc : "Крылья: скорость полёта = скорость. Сопротивление урону дыхания дракона." } ],
            17: [ { name: "Восходящий дракон", desc : "Бонусное действие: 15-фт конус 6д8 урона + оттолкнуть 15 фт. Сопротивление всему урону 1 мин. Тратит 4 ки.", specialLogic: { kiCost: 4 } } ]
        }
    },
    warlock: {
        title: 'ПОКРОВИТЕЛЬ',
        options: [
            { value: 'archfey', label: 'АРХИФЕЯ', features: ['Присутствие Архифеи', 'Побег через туман', 'Ведовская защита', 'Темный морок'] },
            { value: 'fiend', label: 'ИСЧАДИЕ', features: ['Благословение тёмного', 'Удача тёмного', 'Адское сопротивление', 'Бросок через ад'] },
            { value: 'greatOldOne', label: 'ВЕЛИКИЙ ДРЕВНИЙ', features: ['Пробуждённый разум', 'Жажда разума', 'Подлые мысли', 'Дальняя речь'] },
            { value: 'undying', label: 'БЕССМЕРТНЫЙ', features: ['Бессмертный страж', 'Глаза мёртвых', 'Неумолимое изменение', 'Ужасная смерть'] },
            { value: 'hexblade', label: 'ВЕДЬМОВСКОЙ КЛИНОК', features: ['Ведьмовский воин', 'Проклятое призрак', 'Ведьмовской клинок', 'Мастер проклятий'] },
            { value: 'celestial', label: 'НЕБОЖИТЕЛЬ', features: ['Излучающая душа', 'Вспышка защиты', 'Свет зари', 'Небесное сопротивление'] },
            { value: 'fathomless', label: 'БЕЗДОННЫЙ', features: ['Щупальце глубин', 'Океаническая душа', 'Упорная хватка', 'Прыжок через пучину'] },
            { value: 'genie', label: 'ГЕНИЙ', features: ['Благословение гения', 'Вихрь магии', 'Элементальное святилище', 'Ограниченное желание'] },
            { value: 'undead', label: 'НЕЖИТЬ', features: ['Слуга нежити', 'Взор нежити', 'Смертельный голод', 'Власть над смертью'] }
        ]
    },
    '': {
        title: 'SUBCLASS',
        options: []
    },
    artificer: {
        title: 'СПЕЦИАЛИЗАЦИЯ',
        alchemist: {
            name: "АЛХИМИК",
            3: [
                { name: "Восстанавливающая алхимия", desc : "Вы можете выбрать 4 алхимические инфузии вместо стандартных. Они исцеляют и усиливают.", modifiers: { toolProficiencies: ["alchemist_supplies"] } },
                { name: "Алхимический катализатор", desc : "Бонусное действие: потратьте ячейку заклинания 1-го уровня или выше, чтобы исцелить существо в 60 футах на 2d8+INT за уровень ячейки." },
                { artificerSpells: ["cure-wounds", "lesser-restoration"] }
            ],
            5: [
                { name: "Химическое мастерство", desc : "Вы можете создавать алхимические эликсиры без затрат материалов. 1 эликсир за длительный отдых." },
                { artificerSpells: ["heroism", "protection-from-energy"] }
            ],
            9: [
                { name: "Алхимик-мастер", desc : "Ваши алхимические инфузии длятся вдвое дольше. Вы можете создать 2 эликсира за длительный отдых." },
                { artificerSpells: ["freedom-of-movement", "stoneskin"] }
            ],
            13: [
                { name: "Расширенный рецепт", desc : "Ваши эликсиры дают дополнительные эффекты: сопротивление урону, невидимость, или полёт на 1 час." },
                { artificerSpells: ["antimagic-field", "teleportation-circle"] }
            ],
            15: [
                { name: "Эликсир жизни", desc : "Вы можете создать эликсир, который мгновенно восстанавливает 5d10+50 HP и лечит все болезни и проклятия." },
                { artificerSpells: ["resurrection", "wish"] }
            ]
        },
        artillerist: {
            name: "АРТИЛЛЕРИСТ",
            3: [
                { name: "Бездонная пушка", desc : "Действие: создайте магическую пушку в пустой клетке в 60 футах. Пушка 1 к4, 1 HP. Длится 1 час.", modifiers: { toolProficiencies: ["smiths_tools"] } },
                { name: "Пушка дуги", desc : "Пушка делает дальнюю атаку: 60 фт, 2d6 силовой урон." },
                { name: "Пушка пламени", desc : "Каждое существо в 10-футовом конусе делает спасбросок Ловкости или получает 2d6 огненного урона." },
                { artificerSpells: ["magic-weapon", "shield"] }
            ],
            5: [
                { name: "Абьюрационная защита", desc : "Пока пушка активна, вы и союзники в 30 футах получаете сопротивление к урону от заклинаний." },
                { artificerSpells: ["fireball", "hunger-of-hadar"] }
            ],
            9: [
                { name: "Взрывной заряд", desc : "Когда существо в 5 футах от пушки умирает, пушка взрывается: 3d8 огненного урона в 20-футовом радиусе." },
                { artificerSpells: ["wall-of-fire", "fire-storm"] }
            ],
            13: [
                { name: "Улучшенная бездонная пушка", desc : "Вы можете иметь 2 пушки одновременно. Пушка имеет 2 HP и бросает 2 к4 для типа урона." },
                { artificerSpells: ["cone-of-cold", "incendiary-cloud"] }
            ],
            15: [
                { name: "Боевой робот", desc : "Ваши пушки действуют в вашем ходу. Бонусное действие: переместите пушку на 30 фт и атакуйте." },
                { artificerSpells: ["meteor-bolt", "sunbeam"] }
            ]
        },
        battleSmith: {
            name: "БОЕВОЙ КУЗНЕЦ",
            3: [
                { name: "Стальной защитник", desc : "Вы создаёте магического защитника: волк, медведь, или грифон. 10 HP, скорость 30 фт, КД 13+Лов.", modifiers: { toolProficiencies: ["smiths_tools"] } },
                { name: "Атака защитника", desc : "Защитник делает атаку оружием: 1d6+ИНТ урона. Действие: атака или захват." },
                { artificerSpells: ["animal-friendship", "find-familiar"] }
            ],
            5: [
                { name: "Ударная сила", desc : "Защитник наносит +1d8 урона. Вы можете командовать защитником бонусным действием." },
                { artificerSpells: ["meld-into-stone", "warding-bond"] }
            ],
            9: [
                { name: "Сердце лифтёра", desc : "Защитник получает: темное зрение 60 фт, преимущество на спасброски, сопротивление к немагическому урону." },
                { artificerSpells: ["freedom-of-movement", "stoneskin"] }
            ],
            13: [
                { name: "Улучшенный защитник", desc : "Защитник получает +1 к КД, может использовать действие разделения для двух атак." },
                { artificerSpells: ["antimagic-field", "cone-of-cold"] }
            ],
            15: [
                { name: "Душа стали", desc : "Вы можете вступить в защитника. Вы получаете его скорость, сопротивление, и темное зрение." },
                { artificerSpells: ["resurrection", "incendiary-cloud"] }
            ]
        },
        armorer: {
            name: "БРОННИК",
            3: [
                { name: "Создание брони", desc : "После длительного отдыха вы создаёте магическую броню. Вы можете носить её как магический предмет.", modifiers: { toolProficiencies: ["leatherworker_tools"] } },
                { name: "Интегрированная защита", desc : "Магическая броня даёт бонус +1 к КД и сопротивление к урону от заклинаний." },
                { artificerSpells: ["armor", "shield"] }
            ],
            5: [
                { name: "Атребусная броня", desc : "Броня имеет реактивное оружие: реакция, 60 фт, 1d10+ИНТ урона. Два типа на выбор." },
                { name: "Глушительная броня", desc : "Броня создаёт звуковое поле: 5 футов, 3d8 звукового урона, CON спасбросок." },
                { artificerSpells: ["fire-shield", "gust-of-wind"] }
            ],
            9: [
                { name: "Энергетическая проекция", desc : "Бонусное действие: выпустить энергию из брони. 30 фт линия, 2d8 урона (огонь/молния), ДEX спасбросок." },
                { artificerSpells: ["wall-of-fire", "freedom-of-movement"] }
            ],
            13: [
                { name: "Улучшенная броня", desc : "Магическая броня даёт +2 к КД. Вы получаете скорость 40 фт и преимущество на спасброски от страха." },
                { artificerSpells: ["freedom-of-movement", "stoneskin"] }
            ],
            15: [
                { name: "Элитная броня", desc : "Броня даёт +3 к КД. Энергетическая проекция наносит 4d8 урона и отбрасывает цели на 10 фт." },
                { artificerSpells: ["antimagic-field", "incendiary-cloud"] }
            ]
        }
    }
};
