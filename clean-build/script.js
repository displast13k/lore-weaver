var panels = document.querySelectorAll('.sidebar-panel');
var sidebarTabs = document.querySelectorAll('.sidebar-tab');
var sidebarContainer = document.getElementById('sidebar');
var spellTooltip = document.getElementById('spell-tooltip');

var currentPanel = 'character-config';
var characterState = {
    level: 1,
    race: '',
    class: '',
    subclass: '',
    background: '',
    abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    proficiencyBonus: 2,
    hpCurrent: 0,
    hpMax: 0,
    hpTemp: 0,
    speed: 30,
    attacksPerAction: 1,
    armor: '',
    hasShield: false,
    passivePerception: 10,
    inspiration: 0,
    inspirationPoints: 0,
    maxInspirationPoints: 1,
    proficientSaves: { str: false, dex: false, con: false, int: false, wis: false, cha: false },
    proficientSkills: {},
    pendingChoices: { skills: 0, spells: 0, stats: 0 },
    spellBuckets: {},
    showAllClasses: false,
    hitDiceRemaining: 0,
    hitDicePool: 0,
    spellSlots: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0 },
    maxSpellSlots: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0 },
    shortRestRecharge: [],
    longRestRecharge: [],
    poolSelectedValue: null,
    poolUsedValues: {},
    poolUnlocked: false,
    fixedSkills: {},
    expertiseSkills: {},
    isConfirmed: false,
    hungryJawsUsed: false,
    chosenLanguages: [],
    pendingChoices: { skills: 0, spells: 0, stats: 0, cantrips: 0, languages: 0 },
    bonusPoints: 0,
    bonusPointsTotal: 0,
    asiTotal: 0,
    asiSkillCount: 0,
    asiChoices: {},
    asiFeatChoices: {},
    asiFeatResilient: {},

    asiFeatWeaponMaster: {},

    asiFeatWeaponChoices: {},

    asiSkilledSkills: {},
    inventory: [],
    fightingStyle: '',
    swordsWeaponProf: '',
    firearmsProf: false,
    totemSpirit: '',
    featStatBonuses: {},
    lizardfolkHunterSkills: ['', ''],
    aasimarHeritage: ''
};

// FEATS_LIBRARY загружается из data/feats.js (глобальная константа)

function getSpellSelectionLimit() {
    const cls = characterState.class || '';
    const level = characterState.level;
    const req = PHB_REQUIREMENTS[cls];
    if (!req) return 0;

    // Prepared casters: Class Level + Spellcasting Ability Mod
    const preparedClasses = ['cleric', 'wizard', 'druid', 'paladin', 'ranger', 'artificer'];
    if (preparedClasses.indexOf(cls) !== -1) {
        const abilityKey = getSpellcastingAbility();
        const mod = calculateModifier(characterState.abilities[abilityKey] || 10);
        if (cls === 'paladin') {
            return Math.max(1, mod + Math.floor(level / 2));
        }
        return Math.max(1, level + mod);
    }

    // Known casters: use PHB progression table
    const progression = CLASS_SPELL_PROGRESSION[cls];
    if (progression && progression[level]) {
        return progression[level].spells || 0;
    }

    return req.spellsToChoose;
}

function getSpellSelectionMaxLevel() {
    const cls = characterState.class || '';
    const level = characterState.level;
    const progression = CLASS_SPELL_PROGRESSION[cls];
    if (progression && progression[level]) {
        return progression[level].maxSpellLevel || 0;
    }
    return 0;
}

function getSpellSelectionCantripCount() {
    const cls = characterState.class || '';
    const level = characterState.level;
    const progression = CLASS_SPELL_PROGRESSION[cls];
    if (progression && progression[level]) {
        return progression[level].cantrips || 0;
    }
    return 0;
}

// ===== MAGICAL SECRETS (Bard) =====

function getMagicalSecretsSlots() {
    var level = characterState.level;
    var base = 0;
    if (level >= 10) base = 2;
    if (level >= 14) base = 4;
    if (level >= 18) base = 6;
    if (characterState.subclass === 'college_of_lore' && level >= 6) base += 2;
    return base;
}



function renderSpellSelection() {
    const cls = characterState.class || '';
    const sub = characterState.subclass || '';
    const req = PHB_REQUIREMENTS[cls];
    const isHalfCaster = (sub === 'eldritch_knight' || sub === 'arcane_trickster');
    const accessKey = isHalfCaster ? sub : cls;
    const access = CLASS_SPELL_ACCESS[accessKey] || [];
    const container = document.getElementById('spell-selection-container');
    if (!container) return;

    container.innerHTML = '';

    // Totem Warrior gets ritual spells even though barbarian has no spell access
    var isTotemWarrior = (cls === 'barbarian' && sub === 'totem_warrior' && characterState.level >= 3);
    if (!cls || (access.length === 0 && !isTotemWarrior)) {
        container.innerHTML = '<div style="color: #9e9e9e; padding: 10px;">Сначала выберите класс заклинателя</div>';
        return;
    }

    // === Spell search input ===
    var existingSearch = document.getElementById('spell-search-input');
    if (!existingSearch) {
        var searchWrapper = document.createElement('div');
        searchWrapper.id = 'spell-search-wrapper';
        searchWrapper.className = 'spell-search-wrapper';

        var searchInput = document.createElement('input');
        searchInput.id = 'spell-search-input';
        searchInput.type = 'text';
        searchInput.className = 'spell-search-input';
        searchInput.placeholder = 'Поиск заклинаний...';

        var clearBtn = document.createElement('button');
        clearBtn.id = 'spell-search-clear';
        clearBtn.className = 'spell-search-clear';
        clearBtn.innerHTML = '&#10005;';
        clearBtn.style.display = 'none';

        searchWrapper.appendChild(searchInput);
        searchWrapper.appendChild(clearBtn);
        container.appendChild(searchWrapper);

        searchInput.addEventListener('input', function() {
            var query = searchInput.value.trim().toLowerCase();
            clearBtn.style.display = query ? 'block' : 'none';
            filterSpellCards(query);
        });

        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            filterSpellCards('');
            searchInput.focus();
        });
    }

    const maxSpellLevel = getSpellSelectionMaxLevel();
    const loreSecretsMaxLevel = (characterState.subclass === 'college_of_lore' && characterState.level >= 6 && characterState.showAllClasses) ? Math.min(maxSpellLevel, 3) : maxSpellLevel;
    const cantripLimit = getSpellSelectionCantripCount();
    const baseSpellLimit = getSpellSelectionLimit();
    const secretsBonusLimit = getMagicalSecretsSlots();
    const cantripCount = countBaseCantrips();
    const spellCount = countBaseSpells();
    const secretsCount = countAllMagicalSecrets();

    // === Spell bucket selector ===
    var requiredBuckets = getRequiredSpellBuckets();
    if (requiredBuckets.length > 0) {
        // Ensure activeSpellBucket is set to a valid bucket
        if (!characterState.activeSpellBucket) characterState.activeSpellBucket = requiredBuckets[0].key;
        var foundBucket = false;
        requiredBuckets.forEach(function(b) { if (b.key === characterState.activeSpellBucket) foundBucket = true; });
        if (!foundBucket) characterState.activeSpellBucket = requiredBuckets[0].key;

        var bucketSelector = document.createElement('div');
        bucketSelector.className = 'spell-bucket-selector';
        bucketSelector.id = 'spell-bucket-selector';

        requiredBuckets.forEach(function(bucket) {
            var bucketArr = characterState.spellBuckets[bucket.key] || [];
            var fillCount = bucketArr.length;
            var pct = bucket.limit > 0 ? Math.round((fillCount / bucket.limit) * 100) : 0;
            var isActive = characterState.activeSpellBucket === bucket.key;

            var btn = document.createElement('button');
            btn.className = 'spell-bucket-btn' + (isActive ? ' active' : '') + (pct === 100 ? ' filled' : '');
            btn.setAttribute('data-bucket', bucket.key);

            var bucketLabel = bucket.key === 'class_base' ? 'Базовые' :
                bucket.key === 'class_cantrips' ? 'Заговоры' :
                bucket.key === 'totem_rituals' ? 'Ритуальные (Тотем)' :
                bucket.key.indexOf('magical_secrets_') === 0 ? 'Тайны ' + bucket.key.split('_')[2] : bucket.key;
            btn.innerHTML = '<span class="spell-bucket-label">' + bucketLabel + '</span><span class="spell-bucket-fill">' + fillCount + '/' + bucket.limit + ' (' + pct + '%)</span>';

            btn.addEventListener('click', function() {
                characterState.activeSpellBucket = bucket.key;
                renderSpellSelection();
            });

            bucketSelector.appendChild(btn);
        });

        container.appendChild(bucketSelector);
    }

    const abilityKey = getSpellcastingAbility();
    const spellMod = abilityKey ? calculateModifier(characterState.abilities[abilityKey] || 10) : 0;
    const spellDC = 8 + characterState.proficiencyBonus + spellMod;
    const spellAttack = characterState.proficiencyBonus + spellMod;

    // === Global spell counter bar ===
    const statusBar = document.getElementById('spell-status-bar');
    if (statusBar) {
        if (isTotemWarrior) {
            statusBar.classList.remove('hidden');
            statusBar.innerHTML = '<span class="spell-counter-item">Ритуальные заклинания (Тотемный Воин): <strong>Доступны как ритуалы</strong></span>';
        } else {
            statusBar.classList.remove('hidden');
            var counterHtml =
                '<span class="spell-counter-item">Заклинания (' + (PHB_LOCALE && PHB_LOCALE.ru && PHB_LOCALE.ru.classes && PHB_LOCALE.ru.classes[cls] ? PHB_LOCALE.ru.classes[cls] : cls) + '): <strong>' + spellCount + '</strong> / ' + baseSpellLimit + '</span>' +
                '<span class="spell-counter-sep">|</span>' +
                '<span class="spell-counter-item">Заговоров: <strong>' + cantripCount + '</strong> / ' + cantripLimit + '</span>';
            if (secretsBonusLimit > 0) {
                counterHtml += '<span class="spell-counter-sep">|</span>' +
                    '<span class="spell-counter-item magical-secrets-counter">Тайны Магии: <strong>' + secretsCount + '</strong> / ' + secretsBonusLimit + '</span>';
            }
            statusBar.innerHTML = counterHtml;
        }
    }

    // === Spell slot visualization ===
    renderSpellSlots();
    renderSpellSlotResources();

    // Determine active bucket mode
    var activeBucket = characterState.activeSpellBucket || 'class_base';
    var isMagicalSecretsMode = activeBucket.indexOf('magical_secrets') === 0;

    // Build dedup set: all spell names already in ANY bucket
    var occupiedSpells = {};
    requiredBuckets.forEach(function(b) {
        (characterState.spellBuckets[b.key] || []).forEach(function(n) { occupiedSpells[n] = true; });
    });

    const spellSource = isMagicalSecretsMode ? window.SPELL_LIBRARY : SPELL_LIBRARY;
    Object.keys(spellSource).forEach(function(levelKey) {
        const spells = spellSource[levelKey] || [];
        if (spells.length === 0) return;

        // Filter by maxSpellLevel: потолок равен максимальному кругу ячеек БАРДА на текущем уровне
        if (levelKey !== 'cantrip' && loreSecretsMaxLevel > 0) {
            const spellLevel = parseInt(levelKey, 10);
            if (spellLevel > loreSecretsMaxLevel) return;
        }

        // ЖЕСТКАЯ ФИЛЬТРАЦИЯ ПО ТИПУ КОРЗИНЫ: действует ТОЛЬКО в режиме создания персонажа.
        // В игровом режиме (isConfirmed) отключаем — показываем ВСЕ выбранные заклинания.
        if (!characterState.isConfirmed) {
            if (activeBucket === 'class_cantrips') {
                if (levelKey !== 'cantrip') return;
            }
            else if (activeBucket === 'class_base') {
                if (levelKey === 'cantrip') return;
            }
        }

        // Универсальный фильтр заклинаний по классу персонажа
        // В режиме Тайн магии — ОБХОД фильтрации: показываем ВСЕ заклинания из SPELL_LIBRARY
        var classFilter;
        if (isMagicalSecretsMode || (activeBucket && activeBucket.startsWith('magical_secrets'))) {
            classFilter = function() { return true; };
        }
        else if (activeBucket === 'class_base' || activeBucket === 'class_cantrips' || activeBucket === 'totem_rituals') {
            classFilter = function(spell) {
                var currentClass = characterState.class || '';
                if (!currentClass || currentClass === '') return false;
                var hasClass = spell.classes && spell.classes.some(function(c) { return c.toUpperCase() === currentClass.toUpperCase(); });
                // Totem Warrior ritual spells: Speak with Animals, Beast Sense, Commune with Nature
                if (characterState.subclass === 'totem_warrior' && characterState.level >= 3) {
                    var totemRituals = ['Speak with Animals', 'Beast Sense', 'Commune with Nature'];
                    if (totemRituals.indexOf(spell.name) !== -1) return true;
                }
                // PHB 2014: заклинания из Тайн магии считаются заклинаниями барда
                if (hasClass) return true;
                if (characterState.spellBuckets) {
                    for (var msKey in characterState.spellBuckets) {
                        if (msKey.indexOf('magical_secrets_') === 0) {
                            var msArr = characterState.spellBuckets[msKey];
                            if (Array.isArray(msArr) && msArr.indexOf(spell.name) !== -1) return true;
                        }
                    }
                }
                return hasClass;
            };
        }
        else {
            classFilter = function() { return true; };
        }
        // Собираем все заклинания из всех корзин
        var allKnownSpells = [];
        if (characterState.spellBuckets) {
            for (var bk in characterState.spellBuckets) {
                var bkt = characterState.spellBuckets[bk];
                if (Array.isArray(bkt)) allKnownSpells = allKnownSpells.concat(bkt);
                else if (bkt && Array.isArray(bkt.selected)) allKnownSpells = allKnownSpells.concat(bkt.selected);
            }
        }

        // В игровом режиме показываем только заклинания персонажа, в режиме редактирования — доступные
        var spellsToRender = characterState.isConfirmed
            ? spells.filter(classFilter).filter(function(s) { return allKnownSpells.indexOf(s.name) !== -1; })
            : spells.filter(classFilter).filter(function(s) { return !occupiedSpells[s.name]; });

        if (spellsToRender.length === 0) {
            return;
        }

        const known = getKnownSpells()[levelKey] || [];
        const levelLabel = levelKey === 'cantrip' ? 'ЗНАКИ' : levelKey + ' УРОВЕНЬ';

        // Per-bucket remaining slots
        var bucketArr = characterState.spellBuckets[activeBucket] || [];
        var bucketLimit = 0;
        requiredBuckets.forEach(function(b) { if (b.key === activeBucket) bucketLimit = b.limit; });
        var remainingInCategory = Math.max(0, bucketLimit - bucketArr.length);

        const section = document.createElement('div');
        section.className = 'spell-selection-section';

        const header = document.createElement('div');
        header.className = 'spell-selection-header';
        header.innerHTML = '<span class="spell-selection-title">' + levelLabel + '</span>';

        // Reset button - clears known spells AND magical secrets for this level
        if (!isMagicalSecretsMode) {
            const resetBtn = document.createElement('button');
            resetBtn.className = 'spell-reset-btn';
            resetBtn.textContent = 'Сбросить';
            resetBtn.addEventListener('click', function() {
                var known = getKnownSpells()[levelKey] || [];
                known.forEach(function(n) { removeSpellFromKnown(n); });
                var secrets = getMagicalSecrets();
                secrets.forEach(function(name) {
                    var s = findSpellByName(name);
                    if (s && s.level === levelKey) removeSpellFromSecrets(name);
                });
                renderSpellSelection();
                recalculateAll();
                updateGlobalValidation();
            });
            header.appendChild(resetBtn);
        }

        // Clear secrets button in Magical Secrets mode
        if (isMagicalSecretsMode) {
            const clearSecretsBtn = document.createElement('button');
            clearSecretsBtn.className = 'spell-reset-btn magical-secrets-clear';
            clearSecretsBtn.textContent = 'Очистить тайны';
            clearSecretsBtn.addEventListener('click', function() {
                setMagicalSecrets([]);
                renderSpellSelection();
                recalculateAll();
                updateGlobalValidation();
            });
            header.appendChild(clearSecretsBtn);
        }

        // Global reset button on the first spell level section (cantrip)
        if (levelKey === 'cantrip') {
            const globalResetBtn = document.createElement('button');
            globalResetBtn.className = 'spell-reset-btn spell-reset-all';
            globalResetBtn.textContent = 'Сбросить всё';
            globalResetBtn.addEventListener('click', function() {
                setKnownSpells({ cantrip: [], '1': [], '2': [] });
                setMagicalSecrets([]);
                renderSpellSelection();
                recalculateAll();
                updateGlobalValidation();
            });
            header.appendChild(globalResetBtn);
        }

        section.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'spell-selection-grid';

        spellsToRender.forEach(function(spell) {
            var isSecret = isSpellMagicalSecret(spell.name);
            var inBucket = bucketArr.indexOf(spell.name) !== -1;

            // В игровом режиме проверяем, выбрано ли заклинание в ЛЮБОЙ корзине
            var inAnyBucket = inBucket;
            if (!inAnyBucket && characterState.spellBuckets) {
                for (var abk in characterState.spellBuckets) {
                    var abArr = characterState.spellBuckets[abk];
                    if (Array.isArray(abArr) && abArr.indexOf(spell.name) !== -1) {
                        inAnyBucket = true;
                        break;
                    }
                }
            }

            const card = document.createElement('div');
            card.className = 'spell-card';
            if (characterState.isConfirmed || inBucket) card.classList.add('spell-known');
            if (isMagicalSecretsMode && isSecret) card.classList.add('magical-secret');
            if (isSecret) card.classList.add('magical-secret-item');
            requiredBuckets.forEach(function(b) {
                if (b.key.indexOf('magical_secrets_') === 0 && (characterState.spellBuckets[b.key] || []).indexOf(spell.name) !== -1) {
                    card.classList.add('magical-secret');
                }
            });

            var loc = locSpell(spell);

            // Tooltip: always attached for all cards
            card.addEventListener('mouseenter', function(e) {
                showSpellTooltip(e, loc, spell.name);
            });
            card.addEventListener('mousemove', function(e) {
                var tt = document.getElementById('spell-tooltip');
                if (tt) {
                    tt.style.left = (e.pageX + 15) + 'px';
                    tt.style.top = (e.pageY + 15) + 'px';
                }
            });
            card.addEventListener('mouseleave', function() {
                hideSpellTooltip();
            });

            // В игровом режиме: клик по ЛЮБОЙ карточке открывает детали заклинания
            if (characterState.isConfirmed) {
                card.onclick = function() {
                    showSpellDetails(spell.name);
                };
            } else {
                // Режим создания: выбор/снятие заклинания по активной корзине
                var canSelect = !inBucket && remainingInCategory > 0;
                if (!canSelect && !inBucket) {
                    card.classList.add('spell-unavailable');
                }
                if (canSelect) {
                    card.onclick = function() {
                        handleSpellClick(spell.name, levelKey);
                    };
                }
            }

            var schoolClass = 'spell-card-school school-' + loc.school.toLowerCase();
            var secretBadge = isSecret ? '<div class="spell-card-badge">Тайна</div>' : '';
            card.innerHTML = '<div class="spell-card-name">' + loc.name + '</div><div class="' + schoolClass + '">' + loc.school + '</div><div class="spell-card-attack">' + (SPELL_SHORT_DESCRIPTIONS_RU[loc.name] || "Описание уточняется...") + '</div>' + secretBadge;

            card.ondblclick = function() {
                showSpellDetails(spell.name);
            };

            grid.appendChild(card);
        });

        section.appendChild(grid);
        container.appendChild(section);
    });

    // Show over-limit warning (per bucket)
    var overParts = [];
    requiredBuckets.forEach(function(b) {
        var arr = characterState.spellBuckets[b.key] || [];
        var over = arr.length - b.limit;
        if (over > 0) {
            var bLabel = b.key === 'class_base' ? 'базовых' : 'тайн ' + b.key.split('_')[2];
            overParts.push(over + ' ' + bLabel + ' сверх (макс ' + b.limit + ')');
        }
    });
    if (overParts.length > 0) {
        var warning = document.createElement('div');
        warning.className = 'spell-over-limit';
        warning.textContent = 'Слишком много заклинаний (' + overParts.join(', ') + ')';
        container.appendChild(warning);
    }

    updateSpellsTabHeader(spellDC, spellAttack);
}

// ===== SPELL SEARCH FILTER =====

function filterSpellCards(query) {
    var cards = document.querySelectorAll('.spell-card');
    cards.forEach(function(card) {
        var nameEl = card.querySelector('.spell-card-name');
        var schoolEl = card.querySelector('.spell-card-school');
        var name = nameEl ? nameEl.textContent.toLowerCase() : '';
        var school = schoolEl ? schoolEl.textContent.toLowerCase() : '';
        if (!query) {
            card.style.display = '';
            return;
        }
        card.style.display = (name.indexOf(query) !== -1 || school.indexOf(query) !== -1) ? '' : 'none';
    });

    // Hide empty spell sections
    var sections = document.querySelectorAll('.spell-selection-section');
    sections.forEach(function(section) {
        var grid = section.querySelector('.spell-selection-grid');
        if (!grid) return;
        var visibleCards = grid.querySelectorAll('.spell-card:not([style*="display: none"])');
        var shouldHide = visibleCards.length === 0;
        section.style.display = shouldHide ? 'none' : '';
    });
}

// ===== SPELL TOOLTIP =====

function findSpellByName(spellName) {
    var found = null;
    Object.keys(SPELL_LIBRARY).forEach(function(levelKey) {
        var spells = SPELL_LIBRARY[levelKey] || [];
        for (var i = 0; i < spells.length; i++) {
            if (spells[i].name === spellName) {
                found = spells[i];
                return;
            }
        }
    });
    return found;
}

function showSpellTooltip(e, spellData, spellName) {
    var tooltip = document.getElementById('spell-tooltip');
    if (!tooltip) return;

    var schoolColor = '';
    var schoolLower = (spellData.school || '').toLowerCase();
    if (schoolLower === 'эвокация' || schoolLower === 'evocation') schoolColor = '#ef5350';
    else if (schoolLower === 'защита' || schoolLower === 'abjuration') schoolColor = '#64b5f6';
    else if (schoolLower === 'призыв' || schoolLower === 'conjuration') schoolColor = '#81c784';
    else if (schoolLower === 'некромантия' || schoolLower === 'necromancy') schoolColor = '#ab47bc';
    else if (schoolLower === 'очарование' || schoolLower === 'enchantment') schoolColor = '#f48fb1';
    else if (schoolLower === 'предвидение' || schoolLower === 'divination') schoolColor = '#ffd54f';
    else if (schoolLower === 'превращение' || schoolLower === 'transmutation') schoolColor = '#4dd0e1';
    else if (schoolLower === 'иллюзия' || schoolLower === 'illusion') schoolColor = '#ce93d8';

    var html = '<div class="tooltip-title">' + spellData.name + '</div>';
    if (spellData.school) {
        html += '<div class="tooltip-row"><span class="tooltip-label">Школа:</span> <span style="color:' + schoolColor + ';">' + spellData.school + '</span></div>';
    }
    if (spellData.target) html += '<div class="tooltip-row"><span class="tooltip-label">Дистанция:</span> ' + spellData.target + '</div>';
    if (spellData.castingTime) html += '<div class="tooltip-row"><span class="tooltip-label">Время каста:</span> ' + spellData.castingTime + '</div>';
    var desc = spellData.damage || spellData.effect || spellData.description || '';
    if (desc) html += '<div class="tooltip-desc">' + desc + '</div>';

    tooltip.innerHTML = html;
    tooltip.classList.remove('hidden');
    tooltip.style.display = 'block';
    tooltip.style.left = (e.pageX + 15) + 'px';
    tooltip.style.top = (e.pageY + 15) + 'px';
}

function hideSpellTooltip() {
    var tooltip = document.getElementById('spell-tooltip');
    if (!tooltip) return;
    tooltip.style.display = 'none';
    tooltip.classList.add('hidden');
}

// ===== SPELL DETAIL MODAL =====

function showSpellDetails(spellName) {
    var overlay = document.getElementById('spell-modal-overlay');
    if (!overlay) return;

    var found = findSpellByName(spellName);

    if (!found) return;

    // Localize spell data for display
    var loc = locSpell(found);

    currentSpellData = found;

    var titleEl = document.getElementById('spell-modal-title');
    var levelEl = document.getElementById('spell-modal-level');
    var schoolEl = document.getElementById('spell-modal-school');
    var targetEl = document.getElementById('spell-modal-target');
    var castTimeEl = document.getElementById('spell-modal-casting-time');
    var componentsEl = document.getElementById('spell-modal-components');
    var durationEl = document.getElementById('spell-modal-duration');
    var bodyEl = document.getElementById('spell-modal-body');

    if (titleEl) titleEl.textContent = loc.name;
    if (levelEl) {
        var levelText = loc.level === 'cantrip' ? (SPELL_PARAM_LOCALE_RU.levelNames['cantrip'] || 'Заговор') :
            loc.level + '-й уровень';
        levelEl.textContent = levelText;
    }
    if (schoolEl) {
        var schoolText = loc.school || '';
        schoolEl.className = 'spell-modal-school school-' + (loc.school || '').toLowerCase();
        schoolEl.textContent = schoolText;
    }
    if (targetEl) targetEl.textContent = loc.target || '—';
    if (castTimeEl) castTimeEl.textContent = loc.castingTime || '1 действие';
    if (componentsEl) componentsEl.textContent = loc.components || 'V';
    if (durationEl) durationEl.textContent = loc.duration || 'Мгновенно';

    var description = loc.description || loc.effect || loc.damage || '';
    if (bodyEl) {
        if (description) {
            bodyEl.textContent = description;
        } else {
            bodyEl.textContent = 'Описание уточняется...';
        }
    }

    overlay.classList.remove('hidden');
}

function closeSpellModal() {
    var overlay = document.getElementById('spell-modal-overlay');
    if (overlay) overlay.classList.add('hidden');
    currentSpellData = null;
}

function updateSpellsTabHeader(dc, attack) {
    const abilityKey = getSpellcastingAbility();
    const abilityNames = { str: 'STR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'WIS', cha: 'CHA' };
    const abilityName = abilityKey ? abilityNames[abilityKey] || abilityKey.toUpperCase() : '—';

    const header = document.querySelector('.spellcasting-header');
    if (!header) return;

    const abilityEl = header.querySelector('.spellcasting-ability');
    const dcEl = header.querySelector('.spell-save-dc');
    const modEl = header.querySelector('.spell-modifier');

    if (abilityEl) abilityEl.textContent = 'Spellcasting Ability: ' + abilityName;
    if (dcEl) dcEl.textContent = 'Спасбросок ' + dc;
    if (modEl) modEl.textContent = 'Spell Modifier +' + (attack >= 0 ? '' : '') + attack;
}

function getArmorClassOptions(characterState) {
    const cls = characterState.class || '';
    const proficiencies = CLASS_ARMOR[cls] || [];
    const dexMod = calculateModifier(characterState.abilities.dex || 10);
    const wisMod = calculateModifier(characterState.abilities.wis || 10);

    const options = [];

    if (proficiencies.includes('Light armor')) {
        options.push({ label: 'Light Armor', ac: 11 + dexMod });
        options.push({ label: 'Light Armor + Shield', ac: 11 + dexMod + 2 });
    }
    if (proficiencies.includes('Medium armor')) {
        options.push({ label: 'Medium Armor', ac: 14 + Math.min(2, dexMod) });
        options.push({ label: 'Medium Armor + Shield', ac: 14 + Math.min(2, dexMod) + 2 });
    }
    if (proficiencies.includes('Heavy armor')) {
        options.push({ label: 'Heavy Armor', ac: 16 });
        options.push({ label: 'Heavy Armor + Shield', ac: 18 });
    }

    if (cls === 'barbarian') {
        options.push({ label: 'Unarmored', ac: 10 + dexMod + calculateModifier(characterState.abilities.con || 10) });
        options.push({ label: 'Unarmored + Shield', ac: 10 + dexMod + calculateModifier(characterState.abilities.con || 10) + 2 });
    }

    if (cls === 'monk') {
        options.push({ label: 'Unarmored', ac: 10 + dexMod + Math.max(0, wisMod) });
        options.push({ label: 'Unarmored + Shield', ac: 10 + dexMod + Math.max(0, wisMod) + 2 });
    }

    if (options.length === 0) {
        options.push({ label: 'Unarmored', ac: 10 + dexMod });
        options.push({ label: 'Shield', ac: 12 });
    }

    return options;
}

function updateSkills() {
    readBaseAbilities();
    characterState.proficiencyBonus = calculateProficiencyBonus(characterState.level);

    const req = PHB_REQUIREMENTS[characterState.class || ''];
    const classSkills = req && req.skillsFrom ? req.skillsFrom : [];
    const pending = characterState.pendingChoices.skills;

    const rows = document.querySelectorAll('.skill-row');

    // Always rebuild fixedSkills from current background
    const bgSkills = BACKGROUND_SKILLS[characterState.background] || [];
    characterState.fixedSkills = {};
    bgSkills.forEach(function(skill) {
        characterState.fixedSkills[skill] = true;
        characterState.proficientSkills[skill] = true;
    });

    // Read lizardfolk Hunter's Lore selectors live from DOM
    const lizSkill1El = document.getElementById('skill-race-1')?.querySelector('.lf-skill-selected');
    const lizSkill2El = document.getElementById('skill-race-2')?.querySelector('.lf-skill-selected');
    const lizSkill1 = lizSkill1El?.getAttribute('data-en') || '';
    const lizSkill2 = lizSkill2El?.getAttribute('data-en') || '';

    // Build a lookup: lowercase selector value -> capitalized DOM skill name
    var lfSkillMap = {};
    rows.forEach(function(row) {
        var nameEl = row.querySelector('.skill-name');
        if (!nameEl) return;
        var sn = getSkillKeyFromEl(nameEl);
        lfSkillMap[sn.toLowerCase()] = sn;
    });

    // Apply lizardfolk Hunter's Lore skills as fixed (sync lowercase state to capitalized keys)
    if (characterState.race === 'lizardfolk' && characterState.lizardfolkHunterSkills) {
        characterState.lizardfolkHunterSkills.forEach(function(skill) {
            if (skill) {
                var capped = lfSkillMap[skill.toLowerCase()];
                if (capped) {
                    characterState.fixedSkills[capped] = true;
                    characterState.proficientSkills[capped] = true;
                }
            }
        });
    }

    // Apply dots, class markers, and fixed markers
    rows.forEach(function(row) {
        const dot = row.querySelector('.proficiency-dot');
        const nameEl = row.querySelector('.skill-name');
        if (!nameEl) return;
        const skillName = getSkillKeyFromEl(nameEl);
        const isLizardfolkSkill = characterState.race === 'lizardfolk' && (skillName.toLowerCase() === (lizSkill1 || '').toLowerCase() || skillName.toLowerCase() === (lizSkill2 || '').toLowerCase());
        const isProficient = !!characterState.proficientSkills[skillName] || isLizardfolkSkill;
        const isFixed = !!characterState.fixedSkills[skillName] || isLizardfolkSkill;

        if (dot) {
            dot.classList.toggle('filled', isProficient);
            dot.classList.toggle('expertise', isProficient && !!characterState.expertiseSkills[skillName]);
        }
        row.classList.toggle('fixed-skill', isFixed);
        row.classList.toggle('lizardfolk-skill', isLizardfolkSkill);
        row.classList.remove('class-skill-selected', 'class-skill-pending');

        if (characterState.isConfirmed) {
            const isClassSkill = row.hasAttribute('data-class-skill') && classSkills.indexOf(skillName) !== -1;
            row.classList.toggle('class-skill-selected', isClassSkill && isProficient);
            row.classList.toggle('class-skill-pending', isClassSkill && !isProficient && pending > 0);
        } else {
            // Clear expertise dots when not confirmed
            if (dot) dot.classList.remove('expertise');
        }
    });

    if (!rows.length) { console.error('Ошибка: Элемент .skill-row не найден в DOM!'); return; }

    // Jack of All Trades: bard level >= 2 grants floor(profBonus/2) to non-proficient skills
    const hasJoat = characterState.class === 'bard' && characterState.level >= 2 && characterState.isConfirmed;
    const joatBonus = hasJoat ? Math.floor(characterState.proficiencyBonus / 2) : 0;

    // Calculate bonuses: Modifier + (Proficient ? Proficiency_Bonus : 0) + JOAT if applicable
    rows.forEach(function(row, i) {
        const dot = row.querySelector('.proficiency-dot');
        const abilityEl = row.querySelector('.skill-ability');
        const nameEl = row.querySelector('.skill-name');
        const bonusEl = row.querySelector('.skill-bonus');

        if (!nameEl) { console.error('Ошибка: .skill-name не найден в .skill-row[' + i + ']!'); return; }
        if (!bonusEl) { console.error('Ошибка: .skill-bonus не найден в .skill-row[' + i + ']!'); return; }

        const skillName = getSkillKeyFromEl(nameEl);
        const abilityKey = PHB_TABLES.skillsData[skillName];
        if (!abilityKey) return;

        const abilityBase = characterState.abilities[abilityKey] || 10;
        const raceBonus = RACE_STATS[characterState.race] && RACE_STATS[characterState.race][abilityKey] || 0;
        const featBonusSc = getTotalFeatBonus(abilityKey);
        const effectiveScore = abilityBase + raceBonus + featBonusSc;
        const baseMod = calculateModifier(effectiveScore);
        const isLizardfolkSkill2 = characterState.race === 'lizardfolk' && (skillName === lizSkill1 || skillName === lizSkill2);
        const isProficient = !!characterState.proficientSkills[skillName] || isLizardfolkSkill2;
        const isExpertise = isProficient && !!characterState.expertiseSkills[skillName];

        // Before CONFIRM: show +0
        if (!characterState.isConfirmed) {
            bonusEl.textContent = '+0';
            bonusEl.title = '';
            row.classList.remove('joat-active');
        } else {
            // Total = Ability_Modifier + (Proficient ? Proficiency_Bonus : 0) + (Expertise ? Proficiency_Bonus : 0) + JOAT
            const profAdd = isProficient ? characterState.proficiencyBonus : 0;
            const expertiseAdd = isExpertise ? characterState.proficiencyBonus : 0;
            const joatAdd = (!isProficient && hasJoat) ? joatBonus : 0;
            const totalBonus = baseMod + profAdd + expertiseAdd + joatAdd;
            bonusEl.textContent = (totalBonus >= 0 ? '+' : '') + totalBonus;

            // Visual indicator for JOAT-boosted non-proficient skills
            row.classList.toggle('joat-active', joatAdd > 0);

            // Tooltip: show breakdown on hover — components must sum to Итого
            let tooltipParts = [skillName, 'База: ' + (baseMod >= 0 ? '+' : '') + baseMod + ' (' + effectiveScore + ')'];
            if (isExpertise) {
                tooltipParts.push('Мастерство: +' + profAdd);
                tooltipParts.push('Экспертиза: +' + expertiseAdd);
            } else if (profAdd > 0) {
                tooltipParts.push('Мастерство: +' + profAdd);
            }
            if (joatAdd > 0) tooltipParts.push('JOAT: +' + joatAdd);
            tooltipParts.push('Итого: ' + (totalBonus >= 0 ? '+' : '') + totalBonus);
            bonusEl.title = tooltipParts.join(' | ');
        }

        if (skillName === 'Perception') {
            const profAdd = isProficient ? characterState.proficiencyBonus : 0;
            const expertiseAdd = isExpertise ? characterState.proficiencyBonus : 0;
            const joatAdd = (!isProficient && hasJoat) ? joatBonus : 0;
            characterState.passivePerception = 10 + (characterState.isConfirmed ?
                profAdd + expertiseAdd + joatAdd + baseMod : 0);
        }
    });
}

  function updateSavingThrows() {
    readBaseAbilities();
    characterState.proficiencyBonus = calculateProficiencyBonus(characterState.level);
    const hasClass = !!characterState.class;

    if (!characterState.isConfirmed) {
        ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(function(k) {
            characterState.proficientSaves[k] = false;
        });
    }

    const module = document.getElementById('module-saving-throws');
    if (!module) return;

    const rows = module.querySelectorAll('.saving-row');
    rows.forEach(function(row, i) {
        const dot = row.querySelector('.proficiency-dot');
        const nameEl = row.querySelector('.saving-name');
        const bonusEl = row.querySelector('.bonus-hex');

        if (!nameEl || !bonusEl) return;

        const saveData = PHB_TABLES.savingThrows[i];
        if (!saveData) return;

        const abilityKey = saveData.key;
        const abilityAbbr = PHB_TABLES.abilityAbbr[abilityKey] || saveData.name;
        const abilityBase = characterState.abilities[abilityKey] || 10;
        const raceBonus = RACE_STATS[characterState.race] && RACE_STATS[characterState.race][abilityKey] || 0;
        const featBonusSt = getTotalFeatBonus(abilityKey);
        const effectiveScore = abilityBase + raceBonus + featBonusSt;
        const baseMod = calculateModifier(effectiveScore);

        const isProficient = !!characterState.proficientSaves[abilityKey];
        const isClassSave = characterState.class && CLASS_SAVING_THROWS[characterState.class] && CLASS_SAVING_THROWS[characterState.class].indexOf(abilityKey) !== -1;

        // Before CONFIRM: show +0
        // After CONFIRM: Total = Ability_Modifier + (Proficient ? Proficiency_Bonus : 0)
        const profAdd = (isProficient && hasClass) ? characterState.proficiencyBonus : 0;
        const totalBonus = characterState.isConfirmed ? (baseMod + profAdd) : 0;

        bonusEl.textContent = (totalBonus >= 0 ? '+' : '') + totalBonus;
        nameEl.textContent = abilityAbbr + ' ' + (totalBonus >= 0 ? '+' : '') + totalBonus;

        // Tooltip: show breakdown on hover (only after CONFIRM)
        if (characterState.isConfirmed) {
            const tooltip = abilityAbbr + ' | База: ' + (baseMod >= 0 ? '+' : '') + baseMod + ' (' + effectiveScore + ')' +
                (profAdd > 0 ? ' | Мастерство: +' + profAdd : ' | Мастерство: 0') +
                ' | Итого: ' + (totalBonus >= 0 ? '+' : '') + totalBonus;
            bonusEl.title = tooltip;
            nameEl.title = tooltip;
        } else {
            bonusEl.title = '';
            nameEl.title = '';
        }

        if (dot) {
            dot.classList.toggle('filled', isProficient);
            dot.classList.toggle('active-saving', isProficient);
            row.classList.toggle('active-saving', isProficient);
        }

        row.classList.toggle('class-save', isClassSave);
    });
}

function showSenseTooltip(e, text) {
    var tooltip = document.getElementById('sense-tooltip');
    if (!tooltip) return;
    tooltip.textContent = text;
    tooltip.style.display = 'block';
    tooltip.style.left = (e.pageX + 15) + 'px';
    tooltip.style.top = (e.pageY + 15) + 'px';
}

function hideSenseTooltip() {
    var tooltip = document.getElementById('sense-tooltip');
    if (!tooltip) return;
    tooltip.style.display = 'none';
}

function showACTooltip(e, text) {
    var tooltip = document.getElementById('ac-tooltip');
    if (!tooltip) return;
    tooltip.textContent = text;
    tooltip.style.display = 'block';
    tooltip.style.left = (e.pageX + 15) + 'px';
    tooltip.style.top = (e.pageY + 15) + 'px';
}

function hideACTooltip() {
    var tooltip = document.getElementById('ac-tooltip');
    if (!tooltip) return;
    tooltip.style.display = 'none';
}

function updateSenses() {
    const hasClass = !!characterState.class;
    const wisBase = characterState.abilities.wis || 10;
    const wisRaceBonus = RACE_STATS[characterState.race] && RACE_STATS[characterState.race].wis || 0;
    const wisFeatBonus = getTotalFeatBonus('wis');
    const wisMod = calculateModifier(wisBase + wisRaceBonus + wisFeatBonus);
    const intBase = characterState.abilities.int || 10;
    const intRaceBonus = RACE_STATS[characterState.race] && RACE_STATS[characterState.race].int || 0;
    const intFeatBonus = getTotalFeatBonus('int');
    const intMod = calculateModifier(intBase + intRaceBonus + intFeatBonus);
    const prof = characterState.proficiencyBonus;

    // Jack of All Trades: bard level >= 2 grants floor(profBonus/2) to non-proficient passive checks
    const hasJoat = characterState.class === 'bard' && characterState.level >= 2 && characterState.isConfirmed;
    const joatBonus = hasJoat ? Math.floor(prof / 2) : 0;

    let passivePerception = 10;
    let passiveInvestigation = 10;
    let passiveInsight = 10;
    let percBreakdown = '10 (База)';
    let invBreakdown = '10 (База)';
    let insBreakdown = '10 (База)';

    if (hasClass) {
        const hasProfPerception = !!characterState.proficientSkills['Perception'];
        const hasExpertisePerception = !!characterState.expertiseSkills['Perception'];
        const hasProfInvestigation = !!characterState.proficientSkills['Investigation'];
        const hasExpertiseInvestigation = !!characterState.expertiseSkills['Investigation'];
        const hasProfInsight = !!characterState.proficientSkills['Insight'];
        const hasExpertiseInsight = !!characterState.expertiseSkills['Insight'];

        // Passive Perception
        const percProfAdd = hasProfPerception ? prof : 0;
        const percExpertiseAdd = hasExpertisePerception ? prof : 0;
        const percJoatAdd = (!hasProfPerception && hasJoat) ? joatBonus : 0;
        passivePerception = 10 + wisMod + percProfAdd + percExpertiseAdd + percJoatAdd;
        percBreakdown = buildSenseBreakdown(wisMod, 'WIS', percProfAdd, percExpertiseAdd, percJoatAdd);

        // Passive Investigation
        const invProfAdd = hasProfInvestigation ? prof : 0;
        const invExpertiseAdd = hasExpertiseInvestigation ? prof : 0;
        const invJoatAdd = (!hasProfInvestigation && hasJoat) ? joatBonus : 0;
        passiveInvestigation = 10 + intMod + invProfAdd + invExpertiseAdd + invJoatAdd;
        invBreakdown = buildSenseBreakdown(intMod, 'INT', invProfAdd, invExpertiseAdd, invJoatAdd);

        // Passive Insight
        const insProfAdd = hasProfInsight ? prof : 0;
        const insExpertiseAdd = hasExpertiseInsight ? prof : 0;
        const insJoatAdd = (!hasProfInsight && hasJoat) ? joatBonus : 0;
        passiveInsight = 10 + wisMod + insProfAdd + insExpertiseAdd + insJoatAdd;
        insBreakdown = buildSenseBreakdown(wisMod, 'WIS', insProfAdd, insExpertiseAdd, insJoatAdd);
    }

    characterState.passivePerception = passivePerception;

    const senseRows = document.querySelectorAll('.sense-row');
    senseRows.forEach(function(row) {
        const valueEl = row.querySelector('.sense-value');
        if (!valueEl) return;

        const skillKey = row.getAttribute('data-skill');
        if (skillKey === 'Perception') {
            valueEl.textContent = characterState.isConfirmed ? (hasClass ? passivePerception : '—') : '10';
            valueEl.setAttribute('data-tooltip', percBreakdown);
        } else if (skillKey === 'Investigation') {
            valueEl.textContent = characterState.isConfirmed ? (hasClass ? passiveInvestigation : '—') : '10';
            valueEl.setAttribute('data-tooltip', invBreakdown);
        } else if (skillKey === 'Insight') {
            valueEl.textContent = characterState.isConfirmed ? (hasClass ? passiveInsight : '—') : '10';
            valueEl.setAttribute('data-tooltip', insBreakdown);
        }
    });
}

function resetVisuals() {
    // Reset ability modifiers
    var abilityMods = document.querySelectorAll('.ability-mod');
    abilityMods.forEach(function(el) { el.textContent = '-'; el.classList.remove('has-race-bonus'); });

    // Reset race bonus badges
    var raceBonuses = document.querySelectorAll('.race-bonus');
    raceBonuses.forEach(function(el) { el.remove(); });

    // Reset proficiency badges
    var profBadges = document.querySelectorAll('.ability-prof-badge');
    profBadges.forEach(function(el) { el.remove(); });

    // Reset skill bonuses
    var skillMods = document.querySelectorAll('.skill-bonus');
    skillMods.forEach(function(el) { el.textContent = '+0'; });

    // Reset skill proficiency dots
    var skillDots = document.querySelectorAll('.skill-row .proficiency-dot');
    skillDots.forEach(function(dot) { dot.classList.remove('filled'); });

    // Reset skill class-skill CSS
    var skillRows = document.querySelectorAll('.skill-row');
    skillRows.forEach(function(row) { row.classList.remove('class-skill'); });

    // Reset save bonuses
    var saveMods = document.querySelectorAll('.save-mod');
    saveMods.forEach(function(el) { el.textContent = '+0'; });

    // Reset save proficiency dots
    var saveDots = document.querySelectorAll('.saving-row .proficiency-dot');
    saveDots.forEach(function(dot) { dot.classList.remove('filled'); });

    // Reset save class-save CSS
    var saveRows = document.querySelectorAll('.saving-row');
    saveRows.forEach(function(row) { row.classList.remove('class-save'); });

    // Reset HP
    var hpCurrent = document.querySelector('.hp-current');
    if (hpCurrent) hpCurrent.textContent = '0';
    var hpMax = document.querySelector('.hp-max');
    if (hpMax) hpMax.textContent = '0';

    // Reset initiative
    var initBadge = document.querySelector('.initiative-badge .badge-value');
    if (initBadge) initBadge.textContent = '+0';

    // Reset senses
    var senseValues = document.querySelectorAll('.sense-value');
    senseValues.forEach(function(el) { el.textContent = '10'; });

    // Reset proficiencies body
    var profContainer = document.getElementById('proficiencies-body');
    if (profContainer) profContainer.innerHTML = '';

    // Reset inspiration
    var inspBadge = document.querySelector('.inspiration-badge');
    if (inspBadge) inspBadge.style.background = '#555555';

    // Reset AC
    var acBadge = document.querySelector('.ac-badge .badge-value');
    if (acBadge) acBadge.textContent = '10';

    // Reset hit dice display
    var hitDiceBox = document.querySelector('.hit-dice-box');
    if (hitDiceBox) hitDiceBox.textContent = '—';

    // Reset defense values
    var defenseValues = document.querySelectorAll('.defense-value');
    defenseValues.forEach(function(el) { el.textContent = '—'; });

    // Reset passive perception
    var passivePerceptionEl = document.querySelector('.passive-perception-value');
    if (passivePerceptionEl) passivePerceptionEl.textContent = '10';
}

function highlightPrimaryAttributes() {
    const cls = characterState.class || '';
    const primaryKeys = CLASS_PRIMARY_ABILITIES[cls] || [];
    const abilityEls = document.querySelectorAll('.ability-mod');

    abilityEls.forEach(function(el) {
        el.style.boxShadow = '';
        el.style.borderColor = '';
    });

    if (primaryKeys.length === 0 || !characterState.isConfirmed) return;

    const abilityKeys = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    const abilityAbbrMap = { str: 'STR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'WIS', cha: 'CHA' };

    abilityKeys.forEach(function(key) {
        if (primaryKeys.indexOf(key) !== -1) {
            const idx = abilityKeys.indexOf(key);
            const modEl = document.querySelectorAll('.ability-mod')[idx];
            if (modEl) {
                modEl.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
                modEl.style.borderColor = '#ffd700';
            }
        }
    });
}

function autoApplyClassSaves() {
    const cls = characterState.class || '';
    const classSaves = CLASS_SAVING_THROWS[cls] || [];

    const module = document.getElementById('module-saving-throws');
    if (!module) return;

    const rows = module.querySelectorAll('.saving-row');

    if (characterState.isConfirmed) {
        // After CONFIRM: only ensure class saves are filled, preserve user choices
        rows.forEach(function(row) {
            const dot = row.querySelector('.proficiency-dot');
            if (!dot) return;
            const saveData = PHB_TABLES.savingThrows[Array.from(rows).indexOf(row)];
            if (!saveData) return;
            const abilityKey = saveData.key;
            const isClassSave = classSaves.indexOf(abilityKey) !== -1;
            if (isClassSave) {
                dot.classList.add('filled');
                characterState.proficientSaves[abilityKey] = true;
                row.classList.add('class-save');
            }
        });
        return;
    }

    // Before CONFIRM: clear ALL old marks
    rows.forEach(function(row) {
        const dot = row.querySelector('.proficiency-dot');
        const nameEl = row.querySelector('.saving-name');
        if (dot) dot.classList.remove('filled');
        row.classList.remove('class-save');
        if (nameEl) {
            const saveData = PHB_TABLES.savingThrows[Array.from(rows).indexOf(row)];
            if (saveData) {
                const abbr = PHB_TABLES.abilityAbbr[saveData.key] || saveData.name;
                nameEl.textContent = abbr;
            }
        }
    });

    // Reset proficientSaves
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(function(k) {
        characterState.proficientSaves[k] = false;
    });

    if (classSaves.length === 0) return;

    // Now: apply class saves
    rows.forEach(function(row) {
        const dot = row.querySelector('.proficiency-dot');
        const nameEl = row.querySelector('.saving-name');
        if (!nameEl || !dot) return;

        const saveData = PHB_TABLES.savingThrows[Array.from(rows).indexOf(row)];
        if (!saveData) return;

        const abilityKey = saveData.key;
        const isClassSave = classSaves.indexOf(abilityKey) !== -1;

        if (isClassSave) {
            dot.classList.add('filled');
            characterState.proficientSaves[abilityKey] = true;
            row.classList.add('class-save');
        }
    });
}

// ===== EXPERTISE UI =====

function getExpertiseRequired() {
    var expertiseData = EXPERTISE_CLASSES ? EXPERTISE_CLASSES[characterState.class] : null;
    if (!expertiseData || !expertiseData.milestones) return 0;
    var required = 0;
    for (var i = 0; i < expertiseData.milestones.length; i++) {
        if (characterState.level >= expertiseData.milestones[i].level) {
            required = expertiseData.milestones[i].total;
        }
    }
    return required;
}

function updateExpertiseUI() {
    var expertiseSection = document.getElementById('expertise-selection');
    var expertiseList = document.getElementById('expertise-skill-list');
    var expertiseHint = document.getElementById('expertise-hint');
    if (!expertiseSection || !expertiseList) return;

    var required = getExpertiseRequired();

    if (required <= 0) {
        expertiseSection.classList.add('hidden');
        return;
    }

    expertiseSection.classList.remove('hidden');

    var expertiseCount = 0;
    Object.keys(characterState.expertiseSkills).forEach(function(key) {
        if (characterState.expertiseSkills[key]) expertiseCount++;
    });

    if (expertiseHint) {
        expertiseHint.textContent = "Выбрано: " + expertiseCount + " / " + required;
    }

    // Build list of proficient skills
    expertiseList.innerHTML = '';
    var allRows = document.querySelectorAll('.skill-row');
    allRows.forEach(function(row) {
        var nameEl = row.querySelector('.skill-name');
        var dot = row.querySelector('.proficiency-dot');
        if (!nameEl || !dot) return;

        var skillName = getSkillKeyFromEl(nameEl);
        var isProficient = !!characterState.proficientSkills[skillName];

        if (!isProficient) return;

        var isExpert = !!characterState.expertiseSkills[skillName];

        var skillItem = document.createElement('div');
        skillItem.className = 'config-expertise-item';
        if (isExpert) skillItem.classList.add('expertise-selected');
        skillItem.setAttribute('data-skill', skillName);

        var dotIndicator = document.createElement('span');
        dotIndicator.className = 'config-expertise-dot';
        if (isExpert) dotIndicator.classList.add('filled');

        var skillLabel = document.createElement('span');
        skillLabel.className = 'config-expertise-label';
        skillLabel.textContent = nameEl.textContent.trim();

        skillItem.appendChild(dotIndicator);
        skillItem.appendChild(skillLabel);
        expertiseList.appendChild(skillItem);
    });
}

function recalculateAll() {
    applySpecialLogic();
    updateStats();
    updateSkills();
    autoApplyClassSaves();
    updateSavingThrows();
    updateSenses();
    updateInspiration();
    updateProficiencies();
    updateSpeed();
    updateDynamicFeatures();
    updateActions();
    updateEquipmentTab();
    updateExpertiseUI();
    renderSpellSelection();
    updateGlobalValidation();
    return characterState;
}

function getItemCategorySortKey(type) {
    if (type === 'weapon') return 1;
    if (type === 'armor') return 2;
    if (type === 'shield') return 3;
    return 4;
}

function getItemCategoryName(type) {
    if (type === 'weapon') return 'Оружие';
    if (type === 'armor') return 'Броня';
    if (type === 'shield') return 'Щиты';
    return 'Снаряжение';
}

function sortItemsByCategory(items) {
    return items.slice().sort(function(a, b) {
        var ca = getItemCategorySortKey(a.type);
        var cb = getItemCategorySortKey(b.type);
        if (ca !== cb) return ca - cb;
        return a.name.localeCompare(b.name, 'ru');
    });
}

function renderEquipRow(item, index, container) {
    var template = BASE_ITEMS[item.key];
    if (!template) return;

    var row = document.createElement('div');
    row.className = 'equip-row';

    var statusIcon = item.isEquipped ? '✅' : '⬜';
    var btnText = item.isEquipped ? 'Снять' : 'Экипировать';
    var btnClass = item.isEquipped ? 'equip-btn unequip' : 'equip-btn equip';

    var details = '';
    if (template.type === 'weapon') {
        details = template.damage + ' ' + template.damageType + ' | ' + (template.range || '5 ft.');
    } else if (template.type === 'armor') {
        details = 'AC: ' + template.baseAC;
    } else if (template.type === 'shield') {
        details = '+2 AC';
    }

    row.innerHTML = '<span class="equip-icon">' + statusIcon + '</span>' +
        '<span class="equip-name">' + item.name + '</span>' +
        '<span class="equip-details">' + details + '</span>' +
        '<button class="' + btnClass + '" data-index="' + index + '">' + btnText + '</button>';

    container.appendChild(row);
}

function renderInventoryCategoryHeader(categoryName, container) {
    var header = document.createElement('div');
    header.className = 'inventory-category-header';
    header.textContent = categoryName;
    container.appendChild(header);
}

function updateEquipmentTab() {
    var container = document.getElementById('equipment-list');
    if (!container) return;

    container.innerHTML = '';

    if (!characterState.inventory || characterState.inventory.length === 0) {
        container.innerHTML = '<div style="padding: 15px; color: #9e9e9e; font-size: 13px;">Нет снаряжения. Выберите класс.</div>';
        return;
    }

    var sorted = sortItemsByCategory(characterState.inventory);
    var lastCategory = '';

    sorted.forEach(function(item, _ignored) {
        var catName = getItemCategoryName(item.type);
        if (catName !== lastCategory) {
            renderInventoryCategoryHeader(catName, container);
            lastCategory = catName;
        }
        var realIndex = characterState.inventory.indexOf(item);
        renderEquipRow(item, realIndex, container);
    });

    container.querySelectorAll('.equip-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var idx = parseInt(this.getAttribute('data-index'), 10);
            if (characterState.inventory[idx]) {
                characterState.inventory[idx].isEquipped = !characterState.inventory[idx].isEquipped;
                updateEquipmentTab();
                updateAC();
                updateActions();
            }
        });
    });
}

function inventorySearch(query) {
    var resultsContainer = document.getElementById('inventory-search-results');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = '';

    if (!query || query.trim().length === 0) {
        resultsContainer.classList.add('hidden');
        return;
    }

    resultsContainer.classList.remove('hidden');

    var q = query.toLowerCase();
    var matches = [];
    var inventoryKeys = new Set();
    if (characterState.inventory) {
        characterState.inventory.forEach(function(item) {
            inventoryKeys.add(item.key);
        });
    }

    Object.keys(BASE_ITEMS).forEach(function(key) {
        var item = BASE_ITEMS[key];
        if (item.name.toLowerCase().indexOf(q) !== -1 || key.toLowerCase().indexOf(q) !== -1) {
            matches.push({ key: key, template: item, inInventory: inventoryKeys.has(key) });
        }
    });

    matches.sort(function(a, b) {
        var ca = getItemCategorySortKey(a.template.type);
        var cb = getItemCategorySortKey(b.template.type);
        if (ca !== cb) return ca - cb;
        return a.template.name.localeCompare(b.template.name, 'ru');
    });

    if (matches.length === 0) {
        resultsContainer.innerHTML = '<div style="padding: 10px 15px; color: #9e9e9e; font-size: 12px;">Ничего не найдено</div>';
        return;
    }

    var lastCategory = '';
    matches.forEach(function(match) {
        var template = match.template;
        var catName = getItemCategoryName(template.type);
        if (catName !== lastCategory) {
            var header = document.createElement('div');
            header.className = 'inventory-category-header';
            header.textContent = catName;
            resultsContainer.appendChild(header);
            lastCategory = catName;
        }

        var row = document.createElement('div');
        row.className = 'equip-row search-result-row';

        var icon = template.type === 'weapon' ? '⚔' : template.type === 'armor' ? '🛡' : '🛡';
        var details = '';
        if (template.type === 'weapon') {
            details = template.damage + ' ' + template.damageType + ' | ' + (template.range || '5 ft.');
        } else if (template.type === 'armor') {
            details = 'AC: ' + template.baseAC;
        } else if (template.type === 'shield') {
            details = '+2 AC';
        }

        var alreadyIn = match.inInventory;
        var addBtnText = alreadyIn ? '✓' : '+';
        var addBtnClass = alreadyIn ? 'equip-btn add-disabled' : 'equip-btn add-item';

        row.innerHTML = '<span class="equip-icon">' + icon + '</span>' +
            '<span class="equip-name">' + template.name + '</span>' +
            '<span class="equip-details">' + details + '</span>' +
            '<button class="' + addBtnClass + '" data-key="' + match.key + '">' + addBtnText + '</button>';

        resultsContainer.appendChild(row);
    });

    resultsContainer.querySelectorAll('.add-item').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var key = this.getAttribute('data-key');
            var template = BASE_ITEMS[key];
            if (!template) return;

            characterState.inventory.push({
                key: key,
                name: template.name,
                type: template.type,
                isEquipped: false
            });

            var currentQuery = document.getElementById('inventory-search').value;
            updateEquipmentTab();
            inventorySearch(currentQuery);
        });
    });
}

function updateDynamicFeatures() {
    if (characterState.race) {
        const raceFeatures = generateRaceFeatures(characterState.race);
        updateFeaturesDynamic('config-race-features-list', raceFeatures);
    }
    if (characterState.class) {
        const classFeatures = generateClassFeatures(characterState.class);
        updateFeaturesDynamic('config-class-features-list', classFeatures);
    }
}

function renderResourceDashboard() {
    var container = document.querySelector('.actions-container');
    if (!container) return;

    var existing = document.getElementById('resource-dashboard');
    if (existing) existing.remove();

    var hasSpells = (CLASS_SPELL_ACCESS[characterState.class] || []).length > 0;
    var hasSubclassSpells = (CLASS_SPELL_ACCESS[characterState.subclass] || []).length > 0;
    var hasClass = characterState.class === 'bard';
    var hasRace = characterState.race === 'lizardfolk';

    if (!hasSpells && !hasSubclassSpells && !hasClass && !hasRace) return;

    var dashboard = document.createElement('div');
    dashboard.id = 'resource-dashboard';
    dashboard.className = 'resource-dashboard';

    // --- Left column: Magic spell slots ---
    if (hasSpells || hasSubclassSpells) {
        var leftCol = document.createElement('div');
        leftCol.className = 'resource-dashboard-left';

        var magicLabel = document.createElement('div');
        magicLabel.className = 'resource-section-label';
        magicLabel.textContent = 'МАГИЯ';
        leftCol.appendChild(magicLabel);

        var slotsGrid = document.createElement('div');
        slotsGrid.className = 'spell-slots-grid';

        const slots = calculateSpellSlots(characterState.level);
        const maxSlots = {};
        for (let i = 1; i <= 9; i++) {
            maxSlots[i] = characterState.maxSpellSlots[i.toString()] || slots[i - 1];
        }

        for (let lvl = 1; lvl <= 9; lvl++) {
            if (maxSlots[lvl] <= 0) continue;

            var cell = document.createElement('div');
            cell.className = 'spell-slot-cell';

            var lvlLabel = document.createElement('span');
            lvlLabel.className = 'spell-slot-lvl';
            lvlLabel.textContent = lvl;
            cell.appendChild(lvlLabel);

            var diamondWrap = document.createElement('div');
            diamondWrap.className = 'spell-slot-diamonds';

            var cur = characterState.spellSlots[lvl.toString()] || 0;
            for (var s = 0; s < maxSlots[lvl]; s++) {
                var d = document.createElement('div');
                d.className = 'resource-diamond spell-diamond';
                if (s < cur) d.classList.add('active');
                d.addEventListener('click', (function(lvl, s) {
                    return function() {
                        var mx = characterState.maxSpellSlots[lvl.toString()] || 0;
                        var c = characterState.spellSlots[lvl.toString()] || 0;
                        if (s < c) {
                            characterState.spellSlots[lvl.toString()] = c - 1;
                            addInspirationLog('Израсходована ячейка ' + lvl + '-го уровня. Осталось: ' + (c - 1) + ' / ' + mx);
                            renderResourceDashboard();
                            renderSpellSlots();
                        }
                    };
                })(lvl, s));
                diamondWrap.appendChild(d);
            }

            cell.appendChild(diamondWrap);

            var cnt = document.createElement('span');
            cnt.className = 'resources-count';
            cnt.textContent = cur + '/' + maxSlots[lvl];
            cell.appendChild(cnt);

            slotsGrid.appendChild(cell);
        }

        leftCol.appendChild(slotsGrid);
        dashboard.appendChild(leftCol);
    }

    // --- Right column: Class + Race resources stacked ---
    if (hasClass || hasRace) {
        var rightCol = document.createElement('div');
        rightCol.className = 'resource-dashboard-right';

        if (hasClass) {
            var classBlock = document.createElement('div');
            classBlock.className = 'resource-mini-block';

            var classLbl = document.createElement('div');
            classLbl.className = 'resource-section-label';
            classLbl.textContent = 'КЛАСС';
            classBlock.appendChild(classLbl);

            var chaScore = characterState.abilities.cha || 10;
            var chaRaceBonus = RACE_STATS[characterState.race] && RACE_STATS[characterState.race].cha || 0;
            var chaFeatBonus = getTotalFeatBonus('cha');
            var chaMod = calculateModifier(chaScore + chaRaceBonus + chaFeatBonus);
            var maxPoints = Math.max(1, chaMod);
            characterState.maxInspirationPoints = maxPoints;
            if (characterState.inspirationPoints === undefined || characterState.inspirationPoints === null) characterState.inspirationPoints = maxPoints;
            if (characterState.inspirationPoints > maxPoints) characterState.inspirationPoints = maxPoints;

            var inspDie = 'd6';
            if (characterState.level >= 15) inspDie = 'd12';
            else if (characterState.level >= 10) inspDie = 'd10';
            else if (characterState.level >= 5) inspDie = 'd8';

            var classRow = document.createElement('div');
            classRow.className = 'resource-row';

            for (var i = 0; i < maxPoints; i++) {
                var cd = document.createElement('div');
                cd.className = 'resource-diamond class-diamond';
                if (i < characterState.inspirationPoints) cd.classList.add('active');
                cd.title = 'Вдохновение (' + inspDie + ')';
                cd.addEventListener('click', (function(die) {
                    return function() {
                        if (characterState.inspirationPoints > 0) {
                            characterState.inspirationPoints -= 1;
                            addInspirationLog('Бард использует кость вдохновения (' + die + '). Осталось: ' + characterState.inspirationPoints);
                            renderResourceDashboard();
                        }
                    };
                })(inspDie));
                classRow.appendChild(cd);
            }

            var classCnt = document.createElement('span');
            classCnt.className = 'resources-count';
            classCnt.textContent = characterState.inspirationPoints + '/' + maxPoints;
            classRow.appendChild(classCnt);

            classBlock.appendChild(classRow);
            rightCol.appendChild(classBlock);
        }

        if (hasRace) {
            var raceBlock = document.createElement('div');
            raceBlock.className = 'resource-mini-block';

            var raceLbl = document.createElement('div');
            raceLbl.className = 'resource-section-label';
            raceLbl.textContent = 'РАСА';
            raceBlock.appendChild(raceLbl);

            var raceRow = document.createElement('div');
            raceRow.className = 'resource-row';

            var rd = document.createElement('div');
            rd.className = 'resource-diamond race-diamond';
            if (!characterState.hungryJawsUsed) rd.classList.add('active');
            rd.title = 'Хищная пасть';
            rd.addEventListener('click', function() {
                if (!characterState.hungryJawsUsed) {
                    characterState.hungryJawsUsed = true;
                    var profBonus = characterState.proficiencyBonus;
                    addInspirationLog('Людоящер использует Хищную пасть! (+' + profBonus + ' темп. хитов)');
                    renderResourceDashboard();
                }
            });
            raceRow.appendChild(rd);

            var raceCnt = document.createElement('span');
            raceCnt.className = 'resources-count';
            raceCnt.textContent = (characterState.hungryJawsUsed ? 0 : 1) + '/1';
            raceRow.appendChild(raceCnt);

            raceBlock.appendChild(raceRow);
            rightCol.appendChild(raceBlock);
        }

        dashboard.appendChild(rightCol);
    }

    container.insertBefore(dashboard, container.firstChild);
}

function spendInspirationPoint(actionName) {
    if (characterState.inspirationPoints <= 0) {
        addInspirationLog('<span style="color:#e57373">Нет костей вдохновения!</span>');
        return false;
    }
    characterState.inspirationPoints--;
    addInspirationLog('<span style="color:#ffd700">' + actionName + '</span> — использована кость вдохновения. Осталось: ' + characterState.inspirationPoints);
    renderResourceDashboard();
    return true;
}

function rollInspirationDie(dieStr) {
    var roll = Math.floor(Math.random() * parseInt(dieStr.replace('d', ''))) + 1;
    addInspirationLog('Бросок ' + dieStr + ': <span style="color:#ffd700;font-weight:bold">' + roll + '</span>');
}

function rollDice(dieStr, name, damageType) {
    var parts = dieStr.split('d');
    var count = parseInt(parts[0]) || 1;
    var sides = parseInt(parts[1]);
    var total = 0;
    var rolls = [];
    for (var i = 0; i < count; i++) {
        var r = Math.floor(Math.random() * sides) + 1;
        rolls.push(r);
        total += r;
    }
    var typeColor = 'color:#e57373';
    if (damageType === 'piercing') typeColor = 'color:#b388ff';
    else if (damageType === 'slashing') typeColor = 'color:#ff8a65';
    var rollText = rolls.join(' + ');
    addInspirationLog('<strong>' + name + '</strong>: ' + rollText + ' = <span style="color:#ffd700;font-weight:bold">' + total + '</span> <span style="' + typeColor + '">' + (damageType || '') + '</span>');
}

function addInspirationLog(html) {
    var combatLog = document.getElementById('combat-log-messages');
    if (!combatLog) return;
    var now = new Date();
    var timestamp = now.toLocaleTimeString('en-US', { hour12: false });
    var logCard = document.createElement('div');
    logCard.className = 'log-card';
    var ts = document.createElement('div');
    ts.className = 'log-timestamp';
    ts.textContent = timestamp;
    var msg = document.createElement('div');
    msg.className = 'log-message';
    msg.innerHTML = html;
    logCard.appendChild(ts);
    logCard.appendChild(msg);
    combatLog.insertBefore(logCard, combatLog.firstChild);
}

function toggleSidebar() {
    sidebarContainer.classList.toggle('active');
}

function showTab(panelId) {
    currentPanel = panelId;
    sidebarTabs.forEach(function(tab) {
        const isActive = tab.getAttribute('data-panel') === panelId;
        tab.classList.toggle('active', isActive);
    });
    panels.forEach(function(panel) {
        const isActive = panel.id === 'panel-' + panelId;
        panel.classList.toggle('active', isActive);
        panel.classList.toggle('hidden', !isActive);
    });
}

function updateSubclassTitle(className) {
    const titleEl = document.getElementById('subclass-title');
    const title = subclassTitles[className] || 'SUBCLASS';
    titleEl.textContent = title;
}

document.addEventListener('click', function(e) {
    const triggerBtn = e.target.closest('.sidebar-trigger-btn');
    if (triggerBtn) {
        const targetTab = triggerBtn.getAttribute('data-tab');
        if (targetTab) {
            showTab(targetTab);
        }
        sidebarContainer.classList.toggle('active');
        const sidebarBody = sidebarContainer.querySelector('.sidebar-body');
        if (sidebarBody) {
            sidebarBody.classList.toggle('active');
        }
        return;
    }

    const closeBtn = e.target.closest('.sidebar-close-btn');
    if (closeBtn) {
        sidebarContainer.classList.remove('active');
        const sidebarBody = sidebarContainer.querySelector('.sidebar-body');
        if (sidebarBody) {
            sidebarBody.classList.remove('active');
        }
        return;
    }

    const sidebarTab = e.target.closest('.sidebar-tab');
    if (sidebarTab) {
        const targetTab = sidebarTab.getAttribute('data-panel');
        if (targetTab) {
            showTab(targetTab);
        }
        return;
    }

    const tabLink = e.target.closest('.tab-link');
    if (tabLink) {
        const targetTab = tabLink.getAttribute('data-tab');
        if (targetTab) {
            document.querySelectorAll('.tab-link').forEach(function(btn) {
                btn.classList.remove('active');
            });
            tabLink.classList.add('active');

            document.querySelectorAll('.tab-pane').forEach(function(pane) {
                pane.classList.remove('active');
            });
            const targetPane = document.getElementById('tab-' + targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
            }

            if (targetTab === 'spells') {
                renderSpellSelection();
            }
        }
        return;
    }
});

document.addEventListener('click', function(e) {
    const levelUpBtn = e.target.closest('#config-level-up');
    if (levelUpBtn) {
        adjustLevel(1);
        return;
    }

    const levelDownBtn = e.target.closest('#config-level-down');
    if (levelDownBtn) {
        adjustLevel(-1);
        return;
    }
});

// Click sense value to roll d20 for that sense
document.addEventListener('click', function(e) {
    const senseValue = e.target.closest('.sense-value');
    if (!senseValue) return;
    const senseRow = senseValue.closest('.sense-row');
    if (!senseRow) return;
    const skillName = senseRow.getAttribute('data-skill');
    if (!skillName) return;
    rollSkill(skillName, senseValue);
});

// Sense tooltip on hover
document.addEventListener('mouseover', function(e) {
    const senseValue = e.target.closest('.sense-value');
    if (!senseValue) return;
    var tooltip = senseValue.getAttribute('data-tooltip');
    if (tooltip) showSenseTooltip(e, tooltip);
});

document.addEventListener('mouseout', function(e) {
    const senseValue = e.target.closest('.sense-value');
    if (!senseValue) return;
    hideSenseTooltip();
});

// AC tooltip on hover
document.addEventListener('mouseover', function(e) {
    const acEl = e.target.closest('.shield-value');
    if (!acEl) return;
    var tooltip = acEl.getAttribute('data-tooltip');
    if (tooltip) showACTooltip(e, tooltip);
});

document.addEventListener('mouseout', function(e) {
    const acEl = e.target.closest('.shield-value');
    if (!acEl) return;
    hideACTooltip();
});

// Click skill bonus to roll d20 for that skill
document.addEventListener('click', function(e) {
    const skillBonus = e.target.closest('.skill-bonus');
    if (!skillBonus) return;
    const skillRow = skillBonus.closest('.skill-row');
    if (!skillRow) return;
    const skillName = getSkillKeyFromEl(skillRow.querySelector('.skill-name'));
    if (!skillName) return;
    rollSkill(skillName, skillBonus);
});

// Proficiency toggle delegation for skills and saving throws
document.addEventListener('click', function(e) {
    const dot = e.target.closest('.proficiency-dot');
    if (!dot) return;

    const skillRow = dot.closest('.skill-row');
    if (skillRow) {
    const skillName = getSkillKeyFromEl(skillRow.querySelector('.skill-name'));
        const isFilled = dot.classList.contains('filled');
        const isExpertise = dot.classList.contains('expertise');

        // Check if this is a fixed skill (from background/race)
        const isFixedSkill = characterState.fixedSkills && characterState.fixedSkills[skillName];

        // Prevent unfilling fixed skills
        if ((isFilled || isExpertise) && isFixedSkill) {
            return;
        }

        const req = PHB_REQUIREMENTS[characterState.class || ''];
        const isClassSkill = req && req.skillsFrom && req.skillsFrom.indexOf(skillName) !== -1;

        if (isClassSkill && characterState.class) {
            const skillLimit = (req.skillsToChoose || 0) + (characterState.asiSkillCount || 0) + (characterState._bonusSkillSlots || 0);
            let nonFixedCount = 0;
            Object.keys(characterState.proficientSkills).forEach(function(k) {
                if (characterState.proficientSkills[k] && !characterState.fixedSkills[k]) nonFixedCount++;
            });
            const remaining = skillLimit - nonFixedCount;

            if (!isFilled && !isExpertise && remaining <= 0) {
                return;
            }

            if ((isFilled || isExpertise) && remaining > 0) {
                return;
            }
        }

        // Count current expertise skills
        var expertiseCount = 0;
        Object.keys(characterState.expertiseSkills).forEach(function(key) {
            if (characterState.expertiseSkills[key]) expertiseCount++;
        });

        // Expertise limit: only for bard/rogue, uses EXPERTISE_CLASSES data
        var expertiseLimit = getExpertiseRequired();

        // Cycle: empty → filled (proficient) → expertise → empty
        if (!isFilled && !isExpertise) {
            dot.classList.add('filled');
            characterState.proficientSkills[skillName] = true;
            characterState.expertiseSkills[skillName] = false;
        } else if (isFilled && !isExpertise) {
            // Block adding expertise when level < 3 or over limit
            if (expertiseLimit === 0 || expertiseCount >= expertiseLimit) {
                return;
            }
            dot.classList.add('expertise');
            characterState.expertiseSkills[skillName] = true;
        } else if (isExpertise) {
            dot.classList.remove('filled', 'expertise');
            characterState.proficientSkills[skillName] = false;
            characterState.expertiseSkills[skillName] = false;
        }
        recalculateAll();
        updateGlobalValidation();
        return;
    }

    const savingRow = dot.closest('.saving-row');
    if (savingRow) {
        const saveNameEl = savingRow.querySelector('.saving-name');
        if (!saveNameEl) return;
        const saveAbility = saveNameEl.textContent.trim().substring(0, 3).toLowerCase();
        const cls = characterState.class || '';
        const classSaves = CLASS_SAVING_THROWS[cls] || [];

        // Block removing class saves for new characters (level 1, no confirmed settings)
        const isClassSave = classSaves.indexOf(saveAbility) !== -1;
        const isFilled = dot.classList.contains('filled');

        if (isClassSave && isFilled && characterState.level === 1 && !characterState._settingsConfirmed) {
            return;
        }

        dot.classList.toggle('filled');
        characterState.proficientSaves[saveAbility] = dot.classList.contains('filled');
        recalculateAll();
        updateGlobalValidation();
        return;
    }
});

// Expertise selection click handler in config panel
document.addEventListener('click', function(e) {
    var expertiseItem = e.target.closest('.config-expertise-item');
    if (!expertiseItem) return;

    var skillName = expertiseItem.getAttribute('data-skill');
    if (!skillName) return;

    var required = getExpertiseRequired();
    var expertiseCount = 0;
    Object.keys(characterState.expertiseSkills).forEach(function(key) {
        if (characterState.expertiseSkills[key]) expertiseCount++;
    });

    var isCurrentlyExpert = !!characterState.expertiseSkills[skillName];

    if (isCurrentlyExpert) {
        // Remove expertise
        characterState.expertiseSkills[skillName] = false;
    } else {
        // Add expertise if under limit
        if (expertiseCount >= required) return;
        characterState.expertiseSkills[skillName] = true;
    }

    recalculateAll();
});

// Choice modal event delegation
document.addEventListener('click', function(e) {
    // Close button
    if (e.target.closest('#choice-modal-close')) {
        closeChoiceModal();
        return;
    }

    // Confirm button
    if (e.target.closest('#choice-modal-confirm-btn')) {
        if (currentChoiceCallback) {
            currentChoiceCallback(currentChoiceSelected.slice());
        }
        closeChoiceModal();
        return;
    }

    // Choice item toggle
    var item = e.target.closest('.choice-modal-item');
    if (item) {
        var val = item.getAttribute('data-value');
        var idx = currentChoiceSelected.indexOf(val);
        var choices = BACKGROUND_CHOICES[characterState.background] || {};
        var maxCount = choices.languages || 0;

        if (idx !== -1) {
            currentChoiceSelected.splice(idx, 1);
            item.classList.remove('selected');
        } else if (currentChoiceSelected.length < maxCount) {
            currentChoiceSelected.push(val);
            item.classList.add('selected');
        }

        updateChoiceFooter(maxCount);
        return;
    }

    // Click on overlay (outside modal)
    if (e.target.closest('#choice-modal-overlay') && !e.target.closest('.choice-modal')) {
        closeChoiceModal();
        return;
    }
});

// Escape key closes choice modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        var overlay = document.getElementById('choice-modal-overlay');
        if (overlay && !overlay.classList.contains('hidden')) {
            closeChoiceModal();
        }
    }
});

function adjustLevel(delta) {
    const newLevel = characterState.level + delta;
    if (newLevel < 1 || newLevel > 20) return;

    // Block Bard Swords level 4+ without fighting style
    if (delta > 0 && characterState.class === 'bard' && characterState.subclass === 'SWORDS' && newLevel >= 4 && !characterState.fightingStyle) {
        return;
    }

    const oldHpCurrent = characterState.hpCurrent;
    const oldLevel = characterState.level;
    const oldClass = characterState.class;
    characterState.level = newLevel;

    // ASI at levels 4, 8, 12, 16, 19 — track pending choices
    var asiLevels = [4, 8, 12, 16, 19];
    asiLevels.forEach(function(asiLevel) {
        if (oldLevel < asiLevel && newLevel >= asiLevel) {
            characterState.asiTotal++;
            characterState.asiChoices[asiLevel] = 'pending';
        }
        if (oldLevel >= asiLevel && newLevel < asiLevel) {
            if (characterState.asiChoices[asiLevel] === 'stats') {
                characterState.bonusPoints = Math.max(0, characterState.bonusPoints - 2);
                characterState.asiChoices[asiLevel] = 'pending';
            } else if (characterState.asiChoices[asiLevel] === 'skill') {
                characterState.asiSkillCount = Math.max(0, characterState.asiSkillCount - 1);
                characterState.asiChoices[asiLevel] = 'pending';
            } else if (characterState.asiChoices[asiLevel] === 'feat') {
                removeFeatEffects(asiLevel);
                characterState.asiFeatChoices[asiLevel] = '';
                characterState.asiFeatResilient[asiLevel] = '';
                characterState.asiFeatWeaponMaster[asiLevel] = '';
                characterState.asiFeatWeaponChoices[asiLevel] = [];
                characterState.asiSkilledSkills[asiLevel] = [];
                characterState.asiChoices[asiLevel] = 'pending';
            }
            characterState.asiTotal = Math.max(0, characterState.asiTotal - 1);
        }
    });

    updateLevelDisplay();

    // Check subclass unlock on level up
    if (oldClass && CLASS_SUBCLASS_LEVELS[oldClass] && oldLevel < CLASS_SUBCLASS_LEVELS[oldClass] && newLevel >= CLASS_SUBCLASS_LEVELS[oldClass]) {
        unlockSubclass(oldClass);
    }

    // Check subclass lock on level down
    if (oldClass && CLASS_SUBCLASS_LEVELS[oldClass] && oldLevel >= CLASS_SUBCLASS_LEVELS[oldClass] && newLevel < CLASS_SUBCLASS_LEVELS[oldClass]) {
        if (characterState.subclass) {
            characterState.subclass = '';
            const subclassSelect = document.getElementById('config-subclass-select');
            if (subclassSelect) subclassSelect.value = '';
            const featuresBlock = document.getElementById('config-subclass-features');
            if (featuresBlock) featuresBlock.classList.add('hidden');
            const featuresList = document.getElementById('config-subclass-features-list');
            if (featuresList) featuresList.innerHTML = '';
            lockSubclass(oldClass);
        }
    }

    // Clear expertise when level drops below 3
    if (oldLevel >= 3 && newLevel < 3) {
        characterState.expertiseSkills = {};
    }

    // Reset Lore toggle when level drops below 6
    if (oldLevel >= 6 && newLevel < 6 && characterState.subclass === 'college_of_lore') {
        characterState.showAllClasses = false;
    }

    // Update Swords selectors on level change
    updateSwordsSelectors();

    // Update Totem Spirit selector on level change
    updateTotemSpiritSelector();

    // Update Aasimar Celestial Heritage on level change
    updateAasimarHeritageUI();

    recalculateAll();
    // Preserve relative HP: cap old HP to new max
    characterState.hpCurrent = Math.min(Math.max(0, oldHpCurrent), characterState.hpMax);

    // Re-render spells to show new options at new level
    renderSpellSelection();
    updateBonusPointsUI();
    updateASIChoices();
    updateGlobalValidation();
}

// ===== SPELL SLOT VISUALIZATION =====

function renderSpellSlots() {
    const container = document.getElementById('spell-slots-container');
    if (!container) return;

    const cls = characterState.class || '';
    const sub = characterState.subclass || '';
    const isHalfCaster = (sub === 'eldritch_knight' || sub === 'arcane_trickster');
    const accessKey = isHalfCaster ? sub : cls;
    const access = CLASS_SPELL_ACCESS[accessKey] || [];

    if (access.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = '';

    const slots = calculateSpellSlots(characterState.level);
    const maxSlots = {};
    for (let i = 1; i <= 9; i++) {
        maxSlots[i] = characterState.maxSpellSlots[i.toString()] || slots[i - 1];
    }

    for (let lvl = 1; lvl <= 9; lvl++) {
        if (maxSlots[lvl] <= 0) continue;

        const row = document.createElement('div');
        row.className = 'spell-slot-row';

        const label = document.createElement('span');
        label.className = 'spell-slot-level';
        label.textContent = lvl;
        row.appendChild(label);

        const slotDots = document.createElement('div');
        slotDots.className = 'spell-slot-dots';

        const current = characterState.spellSlots[lvl.toString()] || 0;
        for (let s = 0; s < maxSlots[lvl]; s++) {
            const dot = document.createElement('span');
            dot.className = 'spell-slot-dot';
            if (s < current) {
                dot.classList.add('spell-slot-filled');
            }
            slotDots.appendChild(dot);
        }

        row.appendChild(slotDots);
        container.appendChild(row);
    }
}

// ===== SPELL SLOT RESOURCES — unified into renderResourceDashboard =====
function renderSpellSlotResources() {
    renderResourceDashboard();
}

function takeShortRest() {
    const cls = characterState.class;
    const conMod = calculateModifier(characterState.abilities.con);
    const hitDie = CLASS_HIT_DIE[cls] || 0;
    let totalHeal = 0;
    let hdSpent = 0;
    let logMsgs = [];

    // Spend Hit Dice
    if (characterState.hitDiceRemaining > 0 && hitDie > 0) {
        const canSpend = Math.min(characterState.hitDiceRemaining, Math.ceil(characterState.level / 2));
        for (let i = 0; i < canSpend; i++) {
            if (characterState.hpCurrent >= characterState.hpMax) break;
            const roll = Math.floor(Math.random() * hitDie) + 1;
            const heal = roll + conMod;
            characterState.hpCurrent = Math.min(characterState.hpCurrent + heal, characterState.hpMax);
            totalHeal += heal;
            characterState.hitDiceRemaining--;
            hdSpent++;
        }
        if (hdSpent > 0) {
            logMsgs.push('Spent ' + hdSpent + ' HD (d' + hitDie + '): +' + totalHeal + ' HP');
        }
    }

    // Warlock: restore pact slots on short rest
    if (cls === 'warlock') {
        const warlockSlots = calculateSpellSlots(characterState.level);
        const pactSlotsCount = Math.max(0, Math.floor(characterState.level / 2));
        const pactSlotLevel = Math.min(5, Math.ceil(characterState.level / 3));
        let restored = 0;
        for (let i = 0; i < pactSlotsCount; i++) {
            if (i < 9 && characterState.spellSlots[pactSlotLevel.toString()] < warlockSlots[pactSlotLevel - 1]) {
                characterState.spellSlots[pactSlotLevel.toString()] = warlockSlots[pactSlotLevel - 1];
                restored++;
            }
        }
        if (restored > 0) {
            logMsgs.push('Warlock: Restored ' + restored + ' pact slot(s) (d' + (pactSlotLevel * 2) + ')');
        }
    }

    // Recharge short rest resources (Action Surge, Second Wind, etc.)
    const shortRestRecharge = characterState.shortRestRecharge || [];
    shortRestRecharge.forEach(function(item) {
        item.used = false;
    });
    if (shortRestRecharge.length > 0) {
        logMsgs.push('Recharged ' + shortRestRecharge.length + ' short rest resource(s)');
    }

    // Restores Bardic Inspiration (class feature, all bards)
    if (characterState.class === 'bard') {
        characterState.inspirationPoints = characterState.maxInspirationPoints;
        logMsgs.push('Вдохновение восстановлено (' + characterState.inspirationPoints + ')');
    }

    // Restore Hungry Jaws (Lizardfolk racial)
    if (characterState.race === 'lizardfolk' && characterState.hungryJawsUsed) {
        characterState.hungryJawsUsed = false;
        logMsgs.push('Хищная пасть восстановлена');
    }

    // Update display
    updateRestPanel();
    renderSpellSlots();
    updateActions();

    // Add to combat log
    addRestLog('Short Rest', logMsgs);
}

function takeLongRest() {
    const cls = characterState.class;
    const conMod = calculateModifier(characterState.abilities.con);
    const hitDie = CLASS_HIT_DIE[cls] || 0;
    let hdRecovered = 0;
    let logMsgs = [];

    // Restore HP
    const hpBefore = characterState.hpCurrent;
    characterState.hpCurrent = characterState.hpMax;
    if (hpBefore < characterState.hpMax) {
        logMsgs.push('Fully restored ' + characterState.hpMax + ' HP');
    }

    // Restore temp HP to 0
    if (characterState.hpTemp > 0) {
        logMsgs.push('Cleared ' + characterState.hpTemp + ' temp HP');
        characterState.hpTemp = 0;
    }

    // Recover half Hit Dice (minimum 1)
    if (characterState.hitDicePool > 0) {
        hdRecovered = Math.max(1, Math.ceil(characterState.hitDicePool / 2));
        characterState.hitDiceRemaining = Math.min(characterState.hitDiceRemaining + hdRecovered, characterState.hitDicePool);
        logMsgs.push('Recovered ' + hdRecovered + ' Hit Dice (d' + hitDie + ')');
    }

    // Restore all spell slots
    if (cls) {
        const slots = calculateSpellSlots(characterState.level);
        let slotsRestored = 0;
        for (let i = 0; i < 9; i++) {
            const level = (i + 1).toString();
            if (characterState.spellSlots[level] < slots[i]) {
                slotsRestored += (slots[i] - characterState.spellSlots[level]);
                characterState.spellSlots[level] = slots[i];
            }
        }
        if (slotsRestored > 0) {
            logMsgs.push('Restored ' + slotsRestored + ' spell slot(s)');
        }
    }

    // Recharge long rest resources
    const longRestRecharge = characterState.longRestRecharge || [];
    longRestRecharge.forEach(function(item) {
        item.used = false;
    });
    if (longRestRecharge.length > 0) {
        logMsgs.push('Recharged ' + longRestRecharge.length + ' long rest resource(s)');
    }

    // Restore Bardic Inspiration on long rest
    if (characterState.class === 'bard') {
        characterState.inspirationPoints = characterState.maxInspirationPoints;
        logMsgs.push('Вдохновение восстановлено (' + characterState.inspirationPoints + ')');
    }

    // Restore Hungry Jaws (Lizardfolk racial)
    if (characterState.race === 'lizardfolk' && characterState.hungryJawsUsed) {
        characterState.hungryJawsUsed = false;
        logMsgs.push('Хищная пасть восстановлена');
    }

    // Update display
    updateRestPanel();
    renderSpellSlots();
    updateActions();

    // Add to combat log
    addRestLog('Long Rest', logMsgs);
}

function addRestLog(restType, messages) {
    const combatLog = document.getElementById('combat-log-messages');
    if (!combatLog) return;

    const now = new Date();
    const timestamp = now.toLocaleTimeString('en-US', { hour12: false });

    const logCard = document.createElement('div');
    logCard.className = 'log-card';

    const ts = document.createElement('div');
    ts.className = 'log-timestamp';
    ts.textContent = timestamp;

    const msg = document.createElement('div');
    msg.className = 'log-message';

    const typeClass = restType === 'Long Rest' ? 'heal' : 'magic';
    let html = '<span class="highlight">Character</span> took <span class="' + typeClass + '">' + restType + '</span>';
    messages.forEach(function(m) {
        html += ' &#8212; ' + m;
    });
    msg.innerHTML = html;

    logCard.appendChild(ts);
    logCard.appendChild(msg);
    combatLog.insertBefore(logCard, combatLog.firstChild);
}

function updateRestPanel() {
    const conMod = calculateModifier(characterState.abilities.con);
    const hitDie = CLASS_HIT_DIE[characterState.class] || 0;
    const maxHDRecovery = Math.ceil(characterState.level / 2);
    let potentialHeal = 0;
    for (let i = 0; i < Math.min(characterState.hitDiceRemaining, maxHDRecovery); i++) {
        potentialHeal += Math.floor(hitDie / 2) + 1 + conMod;
    }

    const hdAvail = document.getElementById('rest-hd-available');
    const hdTotal = document.getElementById('rest-hd-total');
    const hpRecovery = document.getElementById('rest-hp-recovery');
    const hpCurrent = document.getElementById('rest-hp-current');
    const hpMax = document.getElementById('rest-hp-max');
    const hdRecover = document.getElementById('rest-hd-recover');

    if (hdAvail) hdAvail.textContent = characterState.hitDiceRemaining;
    if (hdTotal) hdTotal.textContent = characterState.hitDicePool;
    if (hpRecovery) hpRecovery.textContent = Math.max(0, potentialHeal);
    if (hpCurrent) hpCurrent.textContent = characterState.hpCurrent;
    if (hpMax) hpMax.textContent = characterState.hpMax;
    if (hdRecover) hdRecover.textContent = characterState.hitDicePool > 0 ? Math.max(1, Math.ceil(characterState.hitDicePool / 2)) : 0;
}

// ===== END REST SYSTEM =====

// ===== SUBCLASS FEATURES (auto-generated) =====

const subclassFeatures = {};
Object.keys(subclassData).forEach(function(cls) {
    if (!cls) return;
    const sData = subclassData[cls];
    subclassFeatures[cls] = {};
    if (Array.isArray(sData.options)) {
        sData.options.forEach(function(opt) {
            subclassFeatures[cls][opt.value] = opt.features;
        });
    } else {
        Object.keys(sData).forEach(function(key) {
            if (key === 'title') return;
            const entry = sData[key];
            if (!entry) return;
            subclassFeatures[cls][key] = [];
            if (entry.features) {
                Object.keys(entry.features).sort(function(a, b) { return Number(a) - Number(b); }).forEach(function(lvl) {
                    if (Array.isArray(entry.features[lvl])) {
                        entry.features[lvl].forEach(function(f) {
                            subclassFeatures[cls][key].push(typeof f === 'string' ? { name: f, level: Number(lvl) } : Object.assign({}, f, { level: Number(lvl) }));
                        });
                    }
                });
            } else {
                Object.keys(entry).sort(function(a, b) { return Number(a) - Number(b); }).forEach(function(lvl) {
                    if (!isNaN(Number(lvl)) && Number(lvl) > 0 && Array.isArray(entry[lvl])) {
                        entry[lvl].forEach(function(f) {
                            subclassFeatures[cls][key].push(typeof f === 'string' ? { name: f, level: Number(lvl) } : Object.assign({}, f, { level: Number(lvl) }));
                        });
                    }
                });
            }
        });
    }
});

// ===== FEATURE DISPLAY FUNCTIONS =====

function updateFeatures(selectId, featuresListId, data) {
    const selectEl = document.getElementById(selectId);
    const featuresBlock = document.getElementById(featuresListId.replace('-list', ''));
    const featuresList = document.getElementById(featuresListId);

    if (!selectEl || !featuresBlock || !featuresList) {
        console.error('updateFeatures: элементы не найдены');
        return;
    }

    const value = selectEl.value;
    let featureList = [];

    if (value && data[value] && data[value].features) {
        featureList = data[value].features;
        featuresBlock.classList.remove('hidden');
    } else {
        featuresBlock.classList.add('hidden');
    }

    featuresList.innerHTML = '';
    featureList.forEach(function(feature) {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
}

function updateFeaturesDynamic(featuresListId, featureList) {
    const featuresBlock = document.getElementById(featuresListId.replace('-list', ''));
    const featuresList = document.getElementById(featuresListId);

    if (!featuresBlock || !featuresList) {
        console.error('updateFeaturesDynamic: элементы не найдены');
        return;
    }

    if (featureList && featureList.length > 0) {
        featuresBlock.classList.remove('hidden');
    } else {
        featuresBlock.classList.add('hidden');
    }

    featuresList.innerHTML = '';
    featureList.forEach(function(feature) {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
}

function generateRaceFeatures(raceKey) {
    if (!raceKey) return [];
    const features = [];
    const stats = RACE_STATS[raceKey] || {};
    const speed = RACE_SPEED[raceKey] || 30;
    const darkvision = RACE_DARKVISION[raceKey] || false;
    const language = RACE_LANGUAGES[raceKey] || null;
    const hpBonus = RACE_HP_BONUS[raceKey] || 0;

    const statParts = [];
    Object.keys(stats).forEach(function(k) {
        statParts.push('+' + stats[k] + ' ' + abilityNameRu(k));
    });
    if (statParts.length) features.push(statParts.join(', '));
    features.push('Скорость: ' + speed + ' фт');
    if (darkvision) features.push('Тёмное зрение (60 фт)');
    if (language) features.push('Язык: ' + language);
    if (hpBonus > 0) features.push('Бонус хитов: +' + hpBonus + ' за уровень');

    if (raceKey === 'dwarf') features.push('Дварфская устойчивость', 'Владение оружием дварфов', 'Знание камня');
    else if (raceKey === 'elf') features.push('Острые чувства', 'Фейское происхождение', 'Транс');
    else if (raceKey === 'human') features.push('Языки: Общий + один на выбор');
    else if (raceKey === 'halfling') features.push('Везучий (переброс единиц)', 'Отважный (преимущество против страха)', 'Малый рост');
    else if (raceKey === 'half-elf') features.push('Фейское происхождение', 'Языки: Общий, Эльфийский + один');
    else if (raceKey === 'tiefling') features.push('Адское сопротивление (огонь)', 'Адское порицание (1/день)');
    else if (raceKey === 'dragonborn') features.push('Дышание огнём (1/отдых 1к10)', 'Уязвимость к дракону', 'Свирепость');
    else if (raceKey === 'gnome') features.push('Гномья изобретательность', 'Малый рост');
    else if (raceKey === 'half-orc') features.push('Свирепость (доп. атака при 1)', 'Жестокая критика (+1 куб)');
    else if (raceKey === 'lizardfolk') {
        features.push('Природная броня (КБ 13 + мод. ЛОВ)', 'Укус (1к6 + СИЛ)');
        features.push('Голодная пасть: временные хиты = Бонус мастерства (' + characterState.proficiencyBonus + ')');
        features.push('Задержка дыхания (15 мин)', 'Хитрый ремесленник');
    }
    else if (raceKey === 'tabaxi') features.push('Скорость (бон. действие +10 фт)', 'Ловкие когти', 'Любопытство');
    else if (raceKey === 'goliath') features.push('Скала (сопротивление падению)', 'Статус (бонус к INT/WIS/CHA)', 'Натиск');
    else if (raceKey === 'aasimar') features.push('Небесное сопротивление (свет)', 'Несущий свет (заговор Light)', 'Исцеляющие руки ({prof}d4, 1/кор. отдых)');

    return features;
}

function generateClassFeatures(classKey) {
    if (!classKey) return [];
    const features = [];
    const hitDie = CLASS_HIT_DIE[classKey] || 8;
    const primaryAbils = CLASS_PRIMARY_ABILITIES[classKey] || [];
    const saves = CLASS_SAVING_THROWS[classKey] || [];
    const armorData = CLASS_ARMOR[classKey] || '';
    const spellAbility = CLASS_SPELL_ABILITY[classKey] || null;

    features.push('Кость хитов: 1к' + hitDie);

    if (primaryAbils.length) {
        const abils = primaryAbils.map(function(a) { return abilityNameRu(a); });
        features.push('Основная характеристика: ' + abils.join(', '));
    }

    if (saves.length) {
        const saveNames = saves.map(function(a) { return abilityNameRu(a); });
        features.push('Спасброски: ' + saveNames.join(', '));
    }

    if (armorData) features.push('Владения: ' + armorData);

    if (spellAbility) features.push('Заклинания (' + spellAbility.toUpperCase() + ')');

    if (classKey === 'paladin') features.push('Божественное восприятие', 'Целительные руки (5 × уровень хитов)');
    else if (classKey === 'cleric') features.push('Божественный канал', 'Изгнание нежити');
    else if (classKey === 'fighter') features.push('Боевой стиль на выбор', 'Второе дыхание (1к10 + уровень хитов)');
    else if (classKey === 'wizard') features.push('Восстановление магии (1 ячейка за уровень)');
    else if (classKey === 'rogue') features.push('Мастерство (2 навыка)', 'Удар вкрадкую (1к6 + уровень-1)');
    else if (classKey === 'barbarian') features.push('Ярость (2 + уровень/4 в день)', 'Небронированная защита');
    else if (classKey === 'sorcerer') features.push('Источник магии (очки для ячеек)', 'Метамания');
    else if (classKey === 'ranger') features.push('Избранный враг', 'Избранная местность');
    else if (classKey === 'bard') features.push('Бардовское вдохновение');
    else if (classKey === 'druid') features.push('Друидоведение (WIS)', 'Дикая форма');
    else if (classKey === 'monk') features.push('Небронированное передвижение', 'Боевое искусство (d' + Math.min(12, 4 + Math.floor((characterState.level - 1) / 4) * 2) + ')');
    else if (classKey === 'warlock') features.push('Магия пакта (ячейки, CHA)', 'Зловещие призывы');
    else if (classKey === 'artificer') features.push('Инструменты ремесла (2 набора)', 'Инфузия предметов');

    return features;
}

function updateRaceSelectors() {
    var lfBlock = document.getElementById('lizardfolk-hunter-skills');
    var lfSkill1 = document.getElementById('skill-race-1');
    var lfSkill2 = document.getElementById('skill-race-2');
    if (!lfBlock || !lfSkill1 || !lfSkill2) return;

    if (characterState.race === 'lizardfolk') {
        lfBlock.classList.remove('hidden');
        populateLfSkillDropdown(lfSkill1, characterState.lizardfolkHunterSkills ? characterState.lizardfolkHunterSkills[0] : '');
        populateLfSkillDropdown(lfSkill2, characterState.lizardfolkHunterSkills ? characterState.lizardfolkHunterSkills[1] : '');
    } else {
        lfBlock.classList.add('hidden');
        clearLfSkillDropdown(lfSkill1, 'НАВЫК 1');
        clearLfSkillDropdown(lfSkill2, 'НАВЫК 2');
        characterState.lizardfolkHunterSkills = [];
    }
}

function populateLfSkillDropdown(wrapper, selectedValue) {
    var hunterSkills = [
        { value: 'athletics', label: 'Атлетика' },
        { value: 'intimidation', label: 'Запугивание' },
        { value: 'perception', label: 'Восприятие' },
        { value: 'stealth', label: 'Скрытность' },
        { value: 'survival', label: 'Выживание' }
    ];
    var selectedEl = wrapper.querySelector('.lf-skill-selected');
    var dropdownEl = wrapper.querySelector('.lf-skill-dropdown');
    if (!selectedEl || !dropdownEl) return;
    if (dropdownEl.children.length > 0) return;
    hunterSkills.forEach(function(s) {
        var item = document.createElement('div');
        item.className = 'lf-skill-dropdown-item' + (s.value === selectedValue ? ' selected' : '');
        item.textContent = s.label;
        item.setAttribute('data-value', s.value);
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            var val = this.getAttribute('data-value');
            selectedEl.setAttribute('data-en', val);
            selectedEl.textContent = this.textContent;
            dropdownEl.querySelectorAll('.lf-skill-dropdown-item').forEach(function(it) { it.classList.remove('selected'); });
            this.classList.add('selected');
            dropdownEl.classList.add('hidden');
            wrapper.classList.remove('lf-skill-open');
            if (!characterState.lizardfolkHunterSkills) characterState.lizardfolkHunterSkills = ['', ''];
            if (wrapper.id === 'skill-race-1') characterState.lizardfolkHunterSkills[0] = val;
            else characterState.lizardfolkHunterSkills[1] = val;
            updateSkills();
            updateGlobalValidation();
        });
        dropdownEl.appendChild(item);
    });
    if (selectedValue) {
        selectedEl.setAttribute('data-en', selectedValue);
        selectedEl.textContent = hunterSkills.find(function(s) { return s.value === selectedValue; })?.label || '';
    }
}

function clearLfSkillDropdown(wrapper, placeholder) {
    var selectedEl = wrapper.querySelector('.lf-skill-selected');
    var dropdownEl = wrapper.querySelector('.lf-skill-dropdown');
    if (selectedEl) { selectedEl.setAttribute('data-en', ''); selectedEl.textContent = placeholder; }
    if (dropdownEl) dropdownEl.innerHTML = '';
}

function updateAasimarHeritageUI() {
    const heritageSelection = document.getElementById('aasimar-heritage-selection');
    const heritageSelect = document.getElementById('config-aasimar-heritage-select');
    const heritageFeaturesBlock = document.getElementById('config-aasimar-heritage-features');
    const heritageFeaturesList = document.getElementById('config-aasimar-heritage-features-list');

    if (!heritageSelection || !heritageSelect || !heritageFeaturesBlock || !heritageFeaturesList) return;

    if (characterState.race !== 'aasimar' || characterState.level < 3) {
        heritageSelection.classList.add('hidden');
        heritageSelect.classList.add('hidden');
        heritageFeaturesBlock.classList.add('hidden');
        if (characterState.aasimarHeritage) {
            characterState.aasimarHeritage = '';
            heritageSelect.value = '';
        }
        return;
    }

    heritageSelection.classList.remove('hidden');
    heritageSelect.classList.remove('hidden');

    if (heritageSelect.options.length <= 1) {
        heritageSelect.innerHTML = '<option value="">ВЫБРАТЬ</option>';
        if (window.RACE_FEATURES && window.RACE_FEATURES.aasimar_subtypes) {
            window.RACE_FEATURES.aasimar_subtypes.forEach(function(sub) {
                var opt = document.createElement('option');
                opt.value = sub.value;
                opt.textContent = sub.label;
                heritageSelect.appendChild(opt);
            });
        }
    }

    if (characterState.aasimarHeritage) {
        heritageSelect.value = characterState.aasimarHeritage;
        if (window.RACE_FEATURES && window.RACE_FEATURES.aasimar_subtypes) {
            var subtypes = window.RACE_FEATURES.aasimar_subtypes;
            for (var hi = 0; hi < subtypes.length; hi++) {
                if (subtypes[hi].value === characterState.aasimarHeritage) {
                    updateFeaturesDynamic('config-aasimar-heritage-features-list', subtypes[hi].features);
                    break;
                }
            }
        }
    }
}

function updateSubclassOptions(className) {
    const requiredLevel = CLASS_SUBCLASS_LEVELS[className];
    const unlockLevel = requiredLevel || 20;
    const subclassSelect = document.getElementById('config-subclass-select');
    const subclassFeaturesList = document.getElementById('config-subclass-features-list');
    const subclassFeaturesBlock = document.getElementById('config-subclass-features');
    const subclassSelection = document.getElementById('subclass-selection');

    if (!subclassSelect || !subclassFeaturesList || !subclassFeaturesBlock || !subclassSelection) {
        console.error('updateSubclassOptions: элементы не найдены');
        return;
    }

    // Check if subclass is unlocked at current level
    if (characterState.level < unlockLevel) {
        subclassSelect.classList.add('hidden');
        subclassFeaturesBlock.classList.add('hidden');
        if (subclassFeaturesList) subclassFeaturesList.innerHTML = '';

        // Show unlock message
        let unlockMsg = document.getElementById('subclass-unlock-msg');
        if (!unlockMsg) {
            unlockMsg = document.createElement('div');
            unlockMsg.id = 'subclass-unlock-msg';
            unlockMsg.className = 'subclass-unlock-msg';
            subclassSelection.insertBefore(unlockMsg, subclassSelection.firstChild);
        }
        unlockMsg.classList.remove('hidden');
        unlockMsg.textContent = 'Unlocked at Level ' + unlockLevel;

        // Reset subclass if locked
        if (characterState.subclass) {
            characterState.subclass = '';
            subclassSelect.value = '';
        }
        return;
    }

    // Subclass is unlocked - hide message, show selector
    subclassSelect.classList.remove('hidden');
    subclassSelection.classList.remove('hidden');
    const unlockMsg = document.getElementById('subclass-unlock-msg');
    if (unlockMsg) unlockMsg.classList.add('hidden');

    // Clear existing options
    subclassSelect.innerHTML = '<option value="">SELECT</option>';

    const clsData = subclassData[className];
    if (!clsData) return;

    // Add new options — support both array format (options: [{value,label}]) and key-based format
    if (Array.isArray(clsData.options)) {
        clsData.options.forEach(function(option) {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            subclassSelect.appendChild(opt);
        });
    } else {
        Object.keys(clsData).forEach(function(key) {
            if (key === 'title') return;
            const entry = clsData[key];
            if (entry && entry.name) {
                const opt = document.createElement('option');
                opt.value = key;
                opt.textContent = entry.name;
                subclassSelect.appendChild(opt);
            }
        });
    }

    // Update subclass title
    updateSubclassTitle(className);

    // Hide subclass features until selection
    subclassFeaturesBlock.classList.add('hidden');
}

function unlockSubclass(className) {
    // Trigger a re-render of the subclass section with fade-in
    updateSubclassOptions(className);
    const subclassSelect = document.getElementById('config-subclass-select');
    if (subclassSelect) {
        subclassSelect.style.animation = 'none';
        subclassSelect.offsetHeight; // force reflow
        subclassSelect.style.animation = 'subclassFadeIn 0.4s ease-out';
    }
}

function lockSubclass(className) {
    updateSubclassOptions(className);
}

function updateSwordsSelectors() {
    var fsBlock = document.getElementById('swords-fighting-style');
    var wpBlock = document.getElementById('swords-weapon-prof');
    var fsSelect = document.getElementById('config-fighting-style-select');
    var wpSelect = document.getElementById('config-swords-weapon-select');
    var isSwords = characterState.class === 'bard' && characterState.subclass === 'SWORDS';
    var isFighter = characterState.class === 'fighter';
    var isPaladin = characterState.class === 'paladin';

    if (!fsBlock || !wpBlock) return;

    var showFightingStyle = (isFighter && characterState.level >= 1) || (isPaladin && characterState.level >= 2) || (isSwords && characterState.level >= 3);
    var showWeaponProf = isSwords && characterState.level >= 3;

    if (showFightingStyle) {
        fsBlock.classList.remove('hidden');
        if (fsSelect) fsSelect.value = characterState.fightingStyle || '';
    } else {
        fsBlock.classList.add('hidden');
        if (fsSelect) fsSelect.value = '';
        characterState.fightingStyle = '';
    }

    if (showWeaponProf) {
        wpBlock.classList.remove('hidden');
        if (wpSelect) wpSelect.value = characterState.swordsWeaponProf || '';
    } else {
        wpBlock.classList.add('hidden');
        if (wpSelect) wpSelect.value = '';
        characterState.swordsWeaponProf = '';
    }
}

function updateTotemSpiritSelector() {
    var totemBlock = document.getElementById('totem-spirit-selection');
    var totemSelect = document.getElementById('config-totem-spirit-select');
    var isTotemWarrior = characterState.class === 'barbarian' && characterState.subclass === 'totem_warrior';

    if (!totemBlock || !totemSelect) return;

    if (isTotemWarrior && characterState.level >= 3) {
        totemBlock.classList.remove('hidden');
        // Restore saved value
        totemSelect.value = characterState.totemSpirit || '';

        // Auto-populate ritual spells for Totem Warrior
        if (!characterState.spellBuckets) characterState.spellBuckets = {};
        if (!characterState.spellBuckets.totem_rituals) characterState.spellBuckets.totem_rituals = [];

        // Level 3: Speak with Animals, Beast Sense
        var level3Spells = ['Speak with Animals', 'Beast Sense'];
        // Level 10: Commune with Nature
        var level10Spells = characterState.level >= 10 ? ['Commune with Nature'] : [];
        var allRitualSpells = level3Spells.concat(level10Spells);

        allRitualSpells.forEach(function(spellName) {
            if (characterState.spellBuckets.totem_rituals.indexOf(spellName) === -1) {
                characterState.spellBuckets.totem_rituals.push(spellName);
            }
        });

        renderSpellSelection();
    } else {
        totemBlock.classList.add('hidden');
        totemSelect.value = '';
        characterState.totemSpirit = '';

        // Clear ritual spells when switching away from Totem Warrior
        if (characterState.spellBuckets) {
            characterState.spellBuckets.totem_rituals = [];
        }
        renderSpellSelection();
    }
}

function updateSubclassFeatures(subclassValue) {
    const featuresList = document.getElementById('config-subclass-features-list');
    const featuresBlock = document.getElementById('config-subclass-features');

    if (!featuresList || !featuresBlock) return;

    const cls = characterState.class;
    var features = subclassFeatures[cls] && subclassFeatures[cls][subclassValue];

    if (!features || !features.length) {
        featuresBlock.classList.add('hidden');
        return;
    }

    // Filter features by level
    var lvl = characterState.level;
    var filtered = features.filter(function(f) {
        if (typeof f === 'string') return true;
        var req = f.level != null ? f.level : (f.requiredLevel != null ? f.requiredLevel : null);
        return req == null || req <= lvl;
    });

    if (!filtered.length) {
        featuresBlock.classList.add('hidden');
        return;
    }

    featuresBlock.classList.remove('hidden');
    featuresList.innerHTML = '';
    filtered.forEach(function(feature) {
        const li = document.createElement('li');
        li.textContent = typeof feature === 'string' ? feature : (feature.name || String(feature));
        featuresList.appendChild(li);
    });
}

// ===== BONUS POINTS UI =====

function updateBonusPointsUI() {
    var bonusCounter = document.getElementById('bonus-points-counter');
    var bonusBlock = document.getElementById('bonus-points-block');
    if (!bonusCounter) return;

    var remaining = characterState.bonusPoints;
    bonusCounter.textContent = remaining;

    // Show bonus block only when level >= 4
    if (bonusBlock) {
        if (characterState.level >= 4) {
            bonusBlock.classList.remove('hidden');
        } else {
            bonusBlock.classList.add('hidden');
        }
    }

    // Update ability +/- buttons: disable + if stat >= 20 or no points, disable - if stat at pool base
    var shields = document.querySelectorAll('.ability-shield[data-ability]');
    shields.forEach(function(shield) {
        var plusBtn = shield.querySelector('.ability-plus-btn');
        var minusBtn = shield.querySelector('.ability-minus-btn');
        if (!plusBtn || !minusBtn) return;

        var abilityKey = shield.getAttribute('data-ability');
        var currentVal = characterState.abilities[abilityKey] || 10;

        // Enable + if points available and stat < 20
        if (remaining > 0 && currentVal < 20) {
            plusBtn.classList.remove('disabled');
        } else {
            plusBtn.classList.add('disabled');
        }

        // Enable - if stat > 10 (can't go below base 10)
        if (currentVal > 10) {
            minusBtn.classList.remove('disabled');
        } else {
            minusBtn.classList.add('disabled');
        }
    });
}

// ===== ASI CHOICE SYSTEM =====

function updateASIChoices() {
    var container = document.getElementById('config-asi-choices');
    if (!container) return;

    container.innerHTML = '';
    var asiLevels = [4, 8, 12, 16, 19];

    asiLevels.forEach(function(asiLevel) {
        if (characterState.level < asiLevel) return;
        var choice = characterState.asiChoices[asiLevel];
        if (!choice) return;

        var row = document.createElement('div');
        row.className = 'config-asi-level-row';

        var label = document.createElement('div');
        label.className = 'config-asi-level-label';
        label.textContent = 'Ур. ' + asiLevel;
        row.appendChild(label);

        if (choice === 'pending') {
            var btnWrap = document.createElement('div');
            btnWrap.className = 'config-asi-btn-wrap';

            var statsBtn = document.createElement('button');
            statsBtn.className = 'config-asi-btn';
            statsBtn.textContent = '+2 к Характеристикам';
            statsBtn.id = 'asi-stats-btn-' + asiLevel;
            statsBtn.addEventListener('click', function() {
                chooseASIStats(asiLevel);
            });
            btnWrap.appendChild(statsBtn);

            var featBtn = document.createElement('button');
            featBtn.className = 'config-feat-btn';
            featBtn.id = 'asi-feat-btn-' + asiLevel;
            var savedFeat = characterState.asiFeatChoices[asiLevel] || '';
            var savedFeatData = findFeatInLibrary(savedFeat);
            featBtn.textContent = savedFeatData ? savedFeatData.nameRu : '— Черта (Feat) —';
            if (savedFeatData) featBtn.classList.add('has-choice');
            var featOverlay = document.createElement('div');
            featOverlay.className = 'config-feat-overlay hidden';
            featOverlay.id = 'asi-feat-overlay-' + asiLevel;
            FEATS_LIBRARY.forEach(function(feat) {
                var item = document.createElement('div');
                item.className = 'config-feat-item';
                item.textContent = feat.nameRu;
                if (feat.name === savedFeat) item.classList.add('selected');
                item.addEventListener('click', function() {
                    onASIFeatChange(asiLevel, feat.name);
                    featOverlay.classList.add('hidden');
                });
                featOverlay.appendChild(item);
            });
            featBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                document.querySelectorAll('.config-feat-overlay').forEach(function(o) {
                    if (o !== featOverlay) o.classList.add('hidden');
                });
                featOverlay.classList.toggle('hidden');
            });
            btnWrap.appendChild(featBtn);
            btnWrap.appendChild(featOverlay);

            row.appendChild(btnWrap);
        } else if (choice === 'stats') {
            var doneBtn = document.createElement('button');
            doneBtn.className = 'config-asi-btn chosen-stats';
            doneBtn.textContent = '+2 к Характеристикам ✓';
            doneBtn.disabled = true;
            row.appendChild(doneBtn);
        } else if (choice === 'feat') {
            var featName = characterState.asiFeatChoices[asiLevel] || '';
            var featData = findFeatInLibrary(featName);
            var display = featData ? featData.nameRu : featName;
            var doneBtn = document.createElement('button');
            doneBtn.className = 'config-asi-btn chosen-feat';
            doneBtn.textContent = display + ' ✓';
            doneBtn.disabled = true;
            row.appendChild(doneBtn);

            // Show sub-options for Resilient/Weapon Master if needed
            if (featData && (featData.type === 'resilient' || featData.type === 'weaponmaster')) {
                renderFeatSubOptions(asiLevel, row, featData);
            }
        }

        container.appendChild(row);
    });
}

function chooseASIStats(asiLevel) {
    if (!characterState.asiChoices[asiLevel]) return;
    removeFeatEffects(asiLevel);
    characterState.asiChoices[asiLevel] = 'stats';
    characterState.asiFeatChoices[asiLevel] = '';
    characterState.bonusPoints += 2;
    characterState.bonusPointsTotal += 2;
    updateBonusPointsUI();
    updateASIChoices();
    updateGlobalValidation();
}

function onASIFeatChange(asiLevel, featName) {
    if (!featName || featName === '') {
        characterState.asiFeatChoices[asiLevel] = '';
        removeFeatEffects(asiLevel);
        characterState.asiChoices[asiLevel] = 'pending';
        var statsBtn = document.getElementById('asi-stats-btn-' + asiLevel);
        if (statsBtn) statsBtn.classList.remove('disabled');
        updateASIChoices();
        updateGlobalValidation();
        return;
    }

    removeFeatEffects(asiLevel);
    characterState.asiFeatChoices[asiLevel] = featName;
    characterState.asiChoices[asiLevel] = 'feat';

    var featData = findFeatInLibrary(featName);
    if (featData && (featData.type === 'resilient' || featData.type === 'weaponmaster' || featData.type === 'skilled')) {
        // Wait for sub-options to be chosen; apply on sub-option change
        updateASIChoices();
        updateGlobalValidation();
        return;
    }

    applyFeatEffects(asiLevel, featName);

    var statsBtn2 = document.getElementById('asi-stats-btn-' + asiLevel);
    if (statsBtn2) statsBtn2.classList.add('disabled');
    updateASIChoices();
    updateGlobalValidation();
}

function renderFeatSubOptions(asiLevel, row, featData) {
    var subRow = document.createElement('div');
    subRow.className = 'config-asi-sub-options';

    if (featData.type === 'resilient') {
        var savedAbility = characterState.asiFeatResilient[asiLevel] || '';
        var abilitySelect = document.createElement('select');
        abilitySelect.className = 'config-feat-sub-select';
        abilitySelect.id = 'asi-resilient-ability-' + asiLevel;
        var noneOpt = document.createElement('option');
        noneOpt.value = '';
        noneOpt.textContent = '— Выбрать характеристику —';
        abilitySelect.appendChild(noneOpt);
        abilities.forEach(function(ab) {
            var opt = document.createElement('option');
            opt.value = ab;
            opt.textContent = abilityAbbr[ab] + ' (' + ab.toUpperCase() + ')';
            if (ab === savedAbility) opt.selected = true;
            abilitySelect.appendChild(opt);
        });
        abilitySelect.addEventListener('change', function() {
            characterState.asiFeatResilient[asiLevel] = abilitySelect.value;
            applyFeatEffects(asiLevel, characterState.asiFeatChoices[asiLevel]);
            updateGlobalValidation();
        });
        subRow.appendChild(abilitySelect);
    } else if (featData.type === 'skilled') {
        var savedSkills = characterState.asiSkilledSkills[asiLevel] || [];
        var skillWrap = document.createElement('div');
        skillWrap.className = 'config-asi-skill-checks';
        var skillLabel = document.createElement('div');
        skillLabel.className = 'config-sub-label';
        skillLabel.textContent = 'Выбери 3 навыка:';
        subRow.appendChild(skillLabel);
        skillsData.forEach(function(sk) {
            var lbl = document.createElement('label');
            lbl.className = 'config-skill-check-label';
            var chk = document.createElement('input');
            chk.type = 'checkbox';
            chk.className = 'config-skill-check';
            chk.value = sk.name;
            chk.id = 'asi-skilled-skill-' + asiLevel + '-' + sk.name;
            if (savedSkills.indexOf(sk.name) !== -1) chk.checked = true;
            chk.addEventListener('change', function() {
                var chosen = [];
                skillWrap.querySelectorAll('input.config-skill-check:checked').forEach(function(c) {
                    chosen.push(c.value);
                });
                characterState.asiSkilledSkills[asiLevel] = chosen;
                chosen.forEach(function(sname) {
                    characterState.proficientSkills[sname] = true;
                });
                applyFeatEffects(asiLevel, characterState.asiFeatChoices[asiLevel]);
                updateGlobalValidation();
            });
            lbl.appendChild(chk);
            lbl.appendChild(document.createTextNode(' ' + (sk.nameRu || sk.name)));
            skillWrap.appendChild(lbl);
        });
        subRow.appendChild(skillWrap);
    } else if (featData.type === 'weaponmaster') {
        var savedAbility = characterState.asiFeatWeaponMaster[asiLevel] || '';
        var abilitySelect = document.createElement('select');
        abilitySelect.className = 'config-feat-sub-select';
        abilitySelect.id = 'asi-wm-ability-' + asiLevel;
        var noneOpt = document.createElement('option');
        noneOpt.value = '';
        noneOpt.textContent = '— Выбрать характеристику —';
        abilitySelect.appendChild(noneOpt);
        abilities.forEach(function(ab) {
            var opt = document.createElement('option');
            opt.value = ab;
            opt.textContent = abilityAbbr[ab] + ' (' + ab.toUpperCase() + ')';
            if (ab === savedAbility) opt.selected = true;
            abilitySelect.appendChild(opt);
        });
        abilitySelect.addEventListener('change', function() {
            characterState.asiFeatWeaponMaster[asiLevel] = abilitySelect.value;
            applyFeatEffects(asiLevel, characterState.asiFeatChoices[asiLevel]);
            updateGlobalValidation();
        });
        subRow.appendChild(abilitySelect);

        var savedWeapons = characterState.asiFeatWeaponChoices[asiLevel] || [];
        var weaponWrap = document.createElement('div');
        weaponWrap.className = 'config-asi-weapon-checks';
        var allWeapons = ['Light Hammer', 'Dagger', 'Scimitar', 'Hand Crossbow', 'Quarterstaff', 'Spear', 'Light Mace', 'Whip', 'Sickle', 'Unarmed Strike'];
        allWeapons.forEach(function(wpn) {
            var lbl = document.createElement('label');
            lbl.className = 'config-weapon-check-label';
            var chk = document.createElement('input');
            chk.type = 'checkbox';
            chk.className = 'config-weapon-check';
            chk.value = wpn;
            chk.id = 'asi-wm-wpn-' + asiLevel + '-' + wpn.replace(/\s/g, '');
            if (savedWeapons.indexOf(wpn) !== -1) chk.checked = true;
            chk.addEventListener('change', function() {
                var chosen = [];
                weaponWrap.querySelectorAll('input.config-weapon-check:checked').forEach(function(c) {
                    chosen.push(c.value);
                });
                characterState.asiFeatWeaponChoices[asiLevel] = chosen;
                applyFeatEffects(asiLevel, characterState.asiFeatChoices[asiLevel]);
                updateGlobalValidation();
            });
            lbl.appendChild(chk);
            lbl.appendChild(document.createTextNode(' ' + wpn));
            weaponWrap.appendChild(lbl);
        });
        subRow.appendChild(weaponWrap);
    }

    row.appendChild(subRow);
}

function applyFeatEffects(asiLevel, featName) {
    var featData = findFeatInLibrary(featName);
    if (!featData) return;

    var fn = featName.toLowerCase();
    var ftype = featData.type;

    if (ftype === 'gunner') {
        addFeatStatBonus('dex', featData.nameRu);
        characterState.firearmsProf = true;
        recalculateAll();
        updateBonusPointsUI();
    } else if (ftype === 'skilled') {
        var chosenSkills = characterState.asiSkilledSkills[asiLevel] || [];
        chosenSkills.forEach(function(sname) {
            characterState.proficientSkills[sname] = true;
        });
        characterState.asiSkillCount = chosenSkills.length;
        recalculateAll();
    } else if (ftype === 'tough') {
        var hpBonus = characterState.level * 2;
        characterState.hpMax += hpBonus;
        characterState.hpCurrent = Math.min(characterState.hpCurrent + hpBonus, characterState.hpMax);
        updateStats();
    } else if (ftype === 'alert') {
        characterState.initiativeBonus = (characterState.initiativeBonus || 0) + 5;
        updateStats();
    } else if (ftype === 'resilient') {
        var savedAbility = characterState.asiFeatResilient[asiLevel];
        if (savedAbility) {
            addFeatStatBonus(savedAbility, featData.nameRu);
            characterState.proficientSaves[savedAbility] = true;
            recalculateAll();
            updateBonusPointsUI();
        }
    } else if (ftype === 'weaponmaster') {
        var wmAbility = characterState.asiFeatWeaponMaster[asiLevel];
        if (wmAbility) {
            addFeatStatBonus(wmAbility, featData.nameRu);
            recalculateAll();
            updateBonusPointsUI();
        }
        var wmWeapons = characterState.asiFeatWeaponChoices[asiLevel] || [];
        if (wmWeapons.length > 0) {
            characterState.weaponMasterWeapons = wmWeapons.slice();
        }
    }
    // Generic feats: just record name, no stat changes
}

function removeFeatEffects(asiLevel) {
    var oldFeat = characterState.asiFeatChoices[asiLevel] || '';
    if (!oldFeat) return;
    var featData = findFeatInLibrary(oldFeat);
    if (!featData) return;

    var ftype = featData.type;

    if (ftype === 'gunner') {
        removeFeatStatBonus('dex', featData.nameRu);
        characterState.firearmsProf = false;
        recalculateAll();
        updateBonusPointsUI();
    } else if (ftype === 'skilled') {
        var oldSkills = characterState.asiSkilledSkills[asiLevel] || [];
        oldSkills.forEach(function(sname) {
            characterState.proficientSkills[sname] = false;
        });
        characterState.asiSkilledSkills[asiLevel] = [];
        characterState.asiSkillCount = Math.max(0, characterState.asiSkillCount - oldSkills.length);
    } else if (ftype === 'tough') {
        var hpBonus = characterState.level * 2;
        characterState.hpMax = Math.max(1, characterState.hpMax - hpBonus);
        characterState.hpCurrent = Math.min(characterState.hpCurrent, characterState.hpMax);
        updateStats();
    } else if (ftype === 'alert') {
        characterState.initiativeBonus = Math.max(0, (characterState.initiativeBonus || 0) - 5);
        updateStats();
    } else if (ftype === 'resilient') {
        var savedAbilityR = characterState.asiFeatResilient[asiLevel];
        if (savedAbilityR) {
            removeFeatStatBonus(savedAbilityR, featData.nameRu);
            characterState.proficientSaves[savedAbilityR] = false;
            recalculateAll();
            updateBonusPointsUI();
        }
        characterState.asiFeatResilient[asiLevel] = '';
    } else if (ftype === 'weaponmaster') {
        var wmAbilityR = characterState.asiFeatWeaponMaster[asiLevel];
        if (wmAbilityR) {
            removeFeatStatBonus(wmAbilityR, featData.nameRu);
            recalculateAll();
            updateBonusPointsUI();
        }
        characterState.asiFeatWeaponMaster[asiLevel] = '';
        characterState.asiFeatWeaponChoices[asiLevel] = [];
        characterState.weaponMasterWeapons = [];
    }
}

// ===== POOL UNLOCK & VALIDATION =====

function checkPoolUnlock() {
    if (characterState.poolUnlocked) return;
    if (characterState.race && characterState.class) {
        characterState.poolUnlocked = true;
        const poolBlock = document.getElementById('ability-pool-block');
        if (poolBlock) poolBlock.classList.remove('config-locked');
    }
}

function rollSkill(skillName, element) {
    if (!characterState.isConfirmed) return;
    const d20 = rollD20();
    const bonus = getSkillBonus(skillName);
    const total = d20 + bonus;
    const sign = bonus >= 0 ? '+' : '';
    var displayName = skillName;
    if (PHB_LOCALE.ru && PHB_LOCALE.ru.skills && PHB_LOCALE.ru.skills[skillName])
        displayName = PHB_LOCALE.ru.skills[skillName];
    const msg = '<span class="highlight">' + displayName + '</span> roll: d20=' + d20 + ' ' + sign + bonus + ' = <span class="heal">' + total + '</span>';
    addLogHTML(msg);
    if (element) {
        element.classList.add('roll-flash');
        setTimeout(function() { element.classList.remove('roll-flash'); }, 400);
    }
}



// ===== COMBAT LOG =====

function addToLog(message, type) {
    if (!type) type = 'info';
    var combatLog = document.getElementById('combat-log-messages');
    if (!combatLog) return;

    var now = new Date();
    var timestamp = now.toLocaleTimeString('en-US', { hour12: false });

    var logCard = document.createElement('div');
    logCard.className = 'log-card';

    var ts = document.createElement('div');
    ts.className = 'log-timestamp';
    ts.textContent = timestamp;

    var msg = document.createElement('div');
    msg.className = 'log-message';

    var colorMap = { info: '#bdbdbd', success: '#81c784', system: '#ffd700' };
    var color = colorMap[type] || '#bdbdbd';
    msg.style.color = color;
    msg.textContent = message;

    logCard.appendChild(ts);
    logCard.appendChild(msg);
    combatLog.insertBefore(logCard, combatLog.firstChild);
    combatLog.scrollTop = 0;
}

// ===== CONFIRM / SAVE =====

function saveCharacterSettings() {
    var settings = {
        level: characterState.level,
        xp: characterState.xp || 0,
        race: characterState.race,
        class: characterState.class,
        subclass: characterState.subclass,
        background: characterState.background,
        abilities: { str: characterState.abilities.str, dex: characterState.abilities.dex, con: characterState.abilities.con, int: characterState.abilities.int, wis: characterState.abilities.wis, cha: characterState.abilities.cha },
        fightingStyle: characterState.fightingStyle,
        swordsWeaponProf: characterState.swordsWeaponProf,
        totemSpirit: characterState.totemSpirit
    };
    console.log('Character settings saved:', settings);

    characterState._settingsConfirmed = true;
    initSpellSlots();

    // Full restore Bardic Inspiration on confirm
            if (characterState.class === 'bard') {
                try {
                    var chaScore = characterState.abilities.cha || 10;
                    var chaRaceBonus = (RACE_STATS && RACE_STATS[characterState.race]) ? RACE_STATS[characterState.race].cha : 0;
                    characterState.maxInspirationPoints = Math.max(1, calculateModifier(chaScore + chaRaceBonus + getTotalFeatBonus('cha')));
                    characterState.inspirationPoints = characterState.maxInspirationPoints;
                } catch(e) { console.error('Bard inspiration calc error:', e); }
            }

    recalculateAll();
    renderSpellSelection();

    // Mark all pool values as used after confirm
    characterState.poolUnlocked = true;
    var poolBlock = document.getElementById('ability-pool-block');
    if (poolBlock) poolBlock.classList.add('config-locked');
    var poolValues = document.querySelectorAll('.pool-value');
    poolValues.forEach(function(pv) { pv.classList.add('used'); pv.classList.remove('selected'); });

    // Generate combat log report
    var raceCap = characterState.race.charAt(0).toUpperCase() + characterState.race.slice(1);
    var classCap = CLASS_NAMES_RU[characterState.class] || characterState.class.charAt(0).toUpperCase() + characterState.class.slice(1);
    var bgCap = characterState.background ? characterState.background.charAt(0).toUpperCase() + characterState.background.slice(1) : '—';

    addToLog('Character confirmed: ' + raceCap + ' ' + classCap + ' Level ' + characterState.level + '.', 'success');
    addToLog('Background: ' + bgCap, 'info');
    addToLog('Stats — STR: ' + settings.abilities.str + ', DEX: ' + settings.abilities.dex + ', CON: ' + settings.abilities.con + ', INT: ' + settings.abilities.int + ', WIS: ' + settings.abilities.wis + ', CHA: ' + settings.abilities.cha, 'info');

    var cantripCount = countBaseCantrips();
    var spellCount = countBaseSpells();
    var totalSpells = cantripCount + spellCount;
    if (totalSpells > 0) {
        addToLog('Spells learned: ' + totalSpells + ' (including ' + cantripCount + ' cantrip(s))', 'system');
    }

    addToLog('Movement speed: ' + characterState.speed + ' ft.', 'info');

    window.characterState.isConfirmed = true;
    console.log("[Игровой режим] Персонаж успешно подтвержден.");

    const hintsBox = document.getElementById('validation-hints-box');
    if (hintsBox) {
        hintsBox.style.display = 'none';
    }

    const confirmBtn = document.getElementById('config-confirm-btn');
    if (confirmBtn) {
        confirmBtn.style.display = 'none';
    }

    if (typeof window.recalculateAll === 'function') {
        window.recalculateAll();
    }
}

function transitionToCharacterSheet() {
    var mainGrid = document.getElementById('main-grid');
    var sidebar = document.getElementById('sidebar-container');
    if (mainGrid) {
        mainGrid.style.opacity = '0';
        mainGrid.style.transition = 'opacity 0.5s ease';
    }
    if (sidebar) {
        sidebar.classList.remove('active');
    }
    setTimeout(function() {
        if (mainGrid) {
            mainGrid.style.opacity = '1';
        }
        showTab('combat-log');
        updateGlobalValidation();
    }, 500);
}

// ===== GLOBAL CLICK HANDLERS =====

window.handleSkillClick = function(skillName) {
    if (!skillName) return;
    var rows = document.querySelectorAll('.skill-row');
    var targetRow = null;
    rows.forEach(function(r) {
        var name = r.querySelector('.skill-name');
        if (name && getSkillKeyFromEl(name) === skillName) targetRow = r;
    });
    if (!targetRow) return;
    var dot = targetRow.querySelector('.proficiency-dot');
    if (!dot) return;

    var isFilled = dot.classList.contains('filled');
    var isExpertise = dot.classList.contains('expertise');
    var isFixedSkill = characterState.fixedSkills && characterState.fixedSkills[skillName];

    if ((isFilled || isExpertise) && isFixedSkill) return;

    var req = PHB_REQUIREMENTS[characterState.class || ''];
    var isClassSkill = req && req.skillsFrom && req.skillsFrom.indexOf(skillName) !== -1;

    if (isClassSkill && characterState.class) {
        var skillLimit = (req.skillsToChoose || 0) + (characterState.asiSkillCount || 0) + (characterState._bonusSkillSlots || 0);
        var nonFixedCount = 0;
        Object.keys(characterState.proficientSkills).forEach(function(k) {
            if (characterState.proficientSkills[k] && !characterState.fixedSkills[k]) nonFixedCount++;
        });
        var remaining = skillLimit - nonFixedCount;
        if (!isFilled && !isExpertise && remaining <= 0) return;
        if ((isFilled || isExpertise) && remaining > 0) return;
    }

    var expertiseCount = 0;
    Object.keys(characterState.expertiseSkills).forEach(function(key) {
        if (characterState.expertiseSkills[key]) expertiseCount++;
    });

    var expertiseLimit = getExpertiseRequired();

    if (!isFilled && !isExpertise) {
        dot.classList.add('filled');
        characterState.proficientSkills[skillName] = true;
        characterState.expertiseSkills[skillName] = false;
    } else if (isFilled && !isExpertise) {
        if (expertiseLimit === 0 || expertiseCount >= expertiseLimit) return;
        dot.classList.add('expertise');
        characterState.expertiseSkills[skillName] = true;
    } else if (isExpertise) {
        dot.classList.remove('filled', 'expertise');
        characterState.proficientSkills[skillName] = false;
        characterState.expertiseSkills[skillName] = false;
    }
    recalculateAll();
    updateGlobalValidation();
};

window.handleSpellClick = function(spellName) {
    const state = window.characterState;
    if (!state) return;

    const activeBucketKey = state.activeSpellBucket || 'class_base';

    if (!state.spellBuckets) state.spellBuckets = {};
    if (!state.spellBuckets[activeBucketKey]) {
        state.spellBuckets[activeBucketKey] = [];
    }

    const bucketArr = state.spellBuckets[activeBucketKey];

    const requiredBuckets = window.getRequiredSpellBuckets ? window.getRequiredSpellBuckets() : [];
    let maxLimit = 0;
    requiredBuckets.forEach(function(b) { if (b.key === activeBucketKey) maxLimit = b.limit; });

    // Find the spell in the library to determine its level
    const currentSpellObj = findSpellByName(spellName);
    const isCantrip = currentSpellObj && (currentSpellObj.level === 'cantrip' || currentSpellObj.level === 0 || currentSpellObj.level === '0');

    var relevantCount = bucketArr.length;

    const index = bucketArr.indexOf(spellName);

    if (index > -1) {
        bucketArr.splice(index, 1);
        console.log(`[Spell Buckets] Удалено заклинание: ${spellName} из корзины ${activeBucketKey}`);
    } else {
        if (relevantCount >= maxLimit && maxLimit > 0) {
            console.warn(`[Spell Buckets] Превышен лимит для корзины ${activeBucketKey}: макс ${maxLimit}`);
            return;
        }
        bucketArr.push(spellName);
        console.log(`[Spell Buckets] Добавлено заклинание: ${spellName} в корзину ${activeBucketKey}`);
    }

    if (typeof renderSpellSelection === 'function') {
        renderSpellSelection();
    }
    if (typeof window.recalculateAll === 'function') {
        window.recalculateAll();
    }
    if (typeof updateGlobalValidation === 'function') {
        updateGlobalValidation();
    }
};

window.handleAbilityClick = function(abilityKey) {
    if (!abilityKey) return;
    var poolBlock = document.getElementById('ability-pool-block');
    if (poolBlock && poolBlock.classList.contains('config-locked')) return;
    if (characterState.poolSelectedValue === null) return;

    characterState.abilities[abilityKey] = characterState.poolSelectedValue;

    var poolEl = document.querySelector('.pool-value[data-value="' + characterState.poolSelectedValue + '"]');
    if (poolEl) {
        poolEl.classList.add('used');
        poolEl.classList.remove('selected');
    }
    characterState.poolSelectedValue = null;
    recalculateAll();
    updateGlobalValidation();
};

window.handleAbilityPlus = function(abilityKey) {
    if (!abilityKey) return;
    if (characterState.bonusPoints <= 0) return;
    var currentVal = characterState.abilities[abilityKey] || 10;
    if (currentVal >= 20) return;
    characterState.abilities[abilityKey] = currentVal + 1;
    characterState.bonusPoints--;
    recalculateAll();
    updateBonusPointsUI();
    updateGlobalValidation();
};

window.handleAbilityMinus = function(abilityKey) {
    if (!abilityKey) return;
    var currentVal = characterState.abilities[abilityKey] || 10;
    if (currentVal <= 10) return;
    characterState.abilities[abilityKey] = currentVal - 1;
    characterState.bonusPoints++;
    recalculateAll();
    updateBonusPointsUI();
    updateGlobalValidation();
};

window.handlePoolClick = function(val) {
    var poolBlock = document.getElementById('ability-pool-block');
    if (poolBlock && poolBlock.classList.contains('config-locked')) return;

    if (characterState.poolSelectedValue === val) {
        characterState.poolSelectedValue = null;
        var el = document.querySelector('.pool-value[data-value="' + val + '"]');
        if (el) el.classList.remove('selected');
    } else {
        document.querySelectorAll('.pool-value').forEach(function(pv) { pv.classList.remove('selected'); });
        characterState.poolSelectedValue = val;
        var el = document.querySelector('.pool-value[data-value="' + val + '"]');
    if (el) el.classList.add('selected');
}
};

// ===== DOMContentLoaded =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация PHB Engine...');

    resetToBlankSheet();
    migrateToSpellBuckets();

    const classSelect = document.getElementById('config-class-select');
    if (classSelect) {
        classSelect.addEventListener('change', function() {
            characterState.class = this.value;
            if (characterState.class === 'bard') {
                try {
                    var chaScore = characterState.abilities.cha || 10;
                    var chaRaceBonus = (RACE_STATS && RACE_STATS[characterState.race]) ? RACE_STATS[characterState.race].cha : 0;
                    characterState.maxInspirationPoints = Math.max(1, calculateModifier(chaScore + chaRaceBonus + getTotalFeatBonus('cha')));
                    characterState.inspirationPoints = characterState.maxInspirationPoints;
                } catch(e) { console.error('Bard inspiration calc error:', e); }
            }
            initStartingEquipment(this.value);
            autoApplyClassSaves();
            highlightPrimaryAttributes();
            updateSubclassOptions(this.value);
            updateSwordsSelectors();
            updateTotemSpiritSelector();
            const classFeatures = generateClassFeatures(this.value);
            updateFeaturesDynamic('config-class-features-list', classFeatures);
            recalculateAll();
            checkPoolUnlock();
            updateGlobalValidation();
        });
    }

    const raceSelect = document.getElementById('config-race-select');
    if (raceSelect) {
        raceSelect.addEventListener('change', function() {
            characterState.race = this.value;
            if (characterState.race) {
                document.getElementById('config-race-features').classList.remove('hidden');
                updateFeaturesDynamic('config-race-features-list', generateRaceFeatures(characterState.race));
            } else {
                document.getElementById('config-race-features').classList.add('hidden');
            }
            updateAasimarHeritageUI();
            updateRaceSelectors();
            recalculateAll();
            checkPoolUnlock();
            updateGlobalValidation();
        });
    }

    const lfWrapper1 = document.getElementById('skill-race-1');
    const lfWrapper2 = document.getElementById('skill-race-2');
    [lfWrapper1, lfWrapper2].forEach(function(wrapper) {
        if (!wrapper) return;
        wrapper.addEventListener('click', function(e) {
            e.stopPropagation();
            var dropdown = this.querySelector('.lf-skill-dropdown');
            if (!dropdown) return;
            var isOpen = !dropdown.classList.contains('hidden');
            [lfWrapper1, lfWrapper2].forEach(function(w) {
                if (w && w !== wrapper) {
                    w.querySelector('.lf-skill-dropdown')?.classList.add('hidden');
                    w.classList.remove('lf-skill-open');
                }
            });
            dropdown.classList.toggle('hidden', isOpen);
            this.classList.toggle('lf-skill-open', !isOpen);
        });
    });
    document.addEventListener('click', function(e) {
        [lfWrapper1, lfWrapper2].forEach(function(w) {
            if (w && !w.contains(e.target)) {
                w.querySelector('.lf-skill-dropdown')?.classList.add('hidden');
                w.classList.remove('lf-skill-open');
            }
        });
    });

    // Aasimar Celestial Heritage selector
    const aasimarHeritageSelect = document.getElementById('config-aasimar-heritage-select');
    if (aasimarHeritageSelect) {
        aasimarHeritageSelect.addEventListener('change', function() {
            characterState.aasimarHeritage = this.value;
            if (window.RACE_FEATURES && window.RACE_FEATURES.aasimar_subtypes) {
                var subtypes = window.RACE_FEATURES.aasimar_subtypes;
                for (var hi = 0; hi < subtypes.length; hi++) {
                    if (subtypes[hi].value === this.value) {
                        updateFeaturesDynamic('config-aasimar-heritage-features-list', subtypes[hi].features);
                        break;
                    }
                }
            }
            recalculateAll();
        });
    }

    const subclassSelect = document.getElementById('config-subclass-select');
    if (subclassSelect) {
        subclassSelect.addEventListener('change', function() {
            // Reset Lore toggle when switching away from Lore
            if (characterState.subclass === 'college_of_lore' && this.value !== 'college_of_lore') {
                characterState.showAllClasses = false;
            }
            characterState.subclass = this.value;
            updateSubclassFeatures(this.value);
            updateSwordsSelectors();
            updateTotemSpiritSelector();
            updateGlobalValidation();
            recalculateAll();
        });
    }

    // Swords fighting style selector
    const fightingStyleSelect = document.getElementById('config-fighting-style-select');
    if (fightingStyleSelect) {
        fightingStyleSelect.addEventListener('change', function() {
            characterState.fightingStyle = this.value;
            recalculateAll();
            updateGlobalValidation();
        });
    }

    // Swords weapon proficiency selector
    const swordsWeaponSelect = document.getElementById('config-swords-weapon-select');
    if (swordsWeaponSelect) {
        swordsWeaponSelect.addEventListener('change', function() {
            characterState.swordsWeaponProf = this.value;
            recalculateAll();
            updateGlobalValidation();
        });
    }

    // Totem Spirit selector
    const totemSpiritSelect = document.getElementById('config-totem-spirit-select');
    if (totemSpiritSelect) {
        totemSpiritSelect.addEventListener('change', function() {
            characterState.totemSpirit = this.value;
            recalculateAll();
            updateGlobalValidation();
        });
    }

    const backgroundSelect = document.getElementById('config-background-select');
    if (backgroundSelect) {
        backgroundSelect.addEventListener('change', function() {
            characterState.background = this.value;
            updateFeatures('config-background-select', 'config-background-features-list', featureData.background);

            // Clear old fixed skills from state and DOM
            characterState.fixedSkills = {};
            document.querySelectorAll('.skill-row.fixed-skill').forEach(function(row) {
                row.classList.remove('fixed-skill');
                const oldDot = row.querySelector('.proficiency-dot');
                if (oldDot) oldDot.classList.remove('filled');
                delete characterState.proficientSkills[getSkillKeyFromEl(row.querySelector('.skill-name'))];
            });

            // Auto-apply new background skills as fixed
            const bgSkills = BACKGROUND_SKILLS[this.value] || [];
            bgSkills.forEach(function(skill) {
                characterState.proficientSkills[skill] = true;
                characterState.fixedSkills[skill] = true;
            });
            // Sync dots in DOM
            document.querySelectorAll('.skill-row').forEach(function(row) {
                const nameEl = row.querySelector('.skill-name');
                const dot = row.querySelector('.proficiency-dot');
                if (nameEl && dot && bgSkills.indexOf(getSkillKeyFromEl(nameEl)) !== -1) {
                    dot.classList.add('filled');
                    row.classList.add('fixed-skill');
                }
            });

            // Clear old chosen languages
            characterState.chosenLanguages = [];

            // Open choice modal if background has language choices
            var choices = BACKGROUND_CHOICES[this.value] || {};
            if (choices.languages > 0) {
                showChoicePrompt(
                    'языков',
                    choices.languages,
                    COMMON_LANGUAGES,
                    'Выбор языков',
                    function(selected) {
                        characterState.chosenLanguages = selected.slice();
                        updateGlobalValidation();
                    }
                );
            }

            updateGlobalValidation();
        });
    }

    // ===== ABILITY SCORE POOL =====
    // Pool value selection and ability score assignment handled via onclick attributes in HTML

    // ===== CONFIRM BUTTON =====
    const confirmBtn = document.getElementById('config-confirm-btn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            if (confirmBtn.disabled || confirmBtn.classList.contains('is-disabled')) return;
            characterState.isConfirmed = true;
            saveCharacterSettings();
            recalculateAll();

            // Mark confirmed state on root for CSS accent and counter hiding
            const screenRoot = document.querySelector('.screen-root');
            if (screenRoot) {
                screenRoot.classList.add('character-confirmed');
                screenRoot.classList.add('confirmed-mode');
            }

            // Collapse config sidebar
            const sidebar = document.getElementById('sidebar-container');
            if (sidebar) {
                sidebar.classList.remove('active');
            }

            transitionToCharacterSheet();
        });
    }

    recalculateAll();
    updateLevelDisplay();
    updateBonusPointsUI();
    updateGlobalValidation();

    // Initialize rest panel state
    initHitDice();
    initSpellSlots();
    updateRestPanel();

    // Short rest button
    const shortRestBtn = document.getElementById('btn-short-rest');
    if (shortRestBtn) {
        shortRestBtn.addEventListener('click', function() {
            takeShortRest();
        });
    }

    // Long rest button
    const longRestBtn = document.getElementById('btn-long-rest');
    if (longRestBtn) {
        longRestBtn.addEventListener('click', function() {
            takeLongRest();
        });
    }

    // ===== SPELL MODAL =====
    const modalOverlay = document.getElementById('spell-modal-overlay');
    const modalClose = document.getElementById('spell-modal-close');

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeSpellModal();
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeSpellModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentSpellData) {
            closeSpellModal();
        }
    });

    // ===== INVENTORY SEARCH =====
    const inventorySearchInput = document.getElementById('inventory-search');
    const inventorySearchClear = document.getElementById('inventory-search-clear');

    if (inventorySearchInput) {
        inventorySearchInput.addEventListener('input', function() {
            inventorySearch(this.value);
        });
    }

    if (inventorySearchClear) {
        inventorySearchClear.addEventListener('click', function() {
            if (inventorySearchInput) {
                inventorySearchInput.value = '';
                inventorySearch('');
            }
        });
    }

    // Apply Russian locale
    applyLocale('ru');
});
