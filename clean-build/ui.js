// ===== UI RENDERING FUNCTIONS =====
// Equipment helpers, resource dashboard, locale, choice prompt, stats, validation, utilities

// ===== EQUIPMENT HELPERS =====

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

// ===== RESOURCE DASHBOARD =====

function renderResourceDashboard() {
    var container = document.querySelector('.actions-container');
    if (!container) return;

    var existing = document.getElementById('resource-dashboard');
    if (existing) existing.remove();

    var hasSpells = (CLASS_SPELL_ACCESS[characterState.class] || []).length > 0;
    var hasClass = characterState.class === 'bard';
    var hasRace = characterState.race === 'lizardfolk';

    if (!hasSpells && !hasClass && !hasRace) return;

    var dashboard = document.createElement('div');
    dashboard.id = 'resource-dashboard';
    dashboard.className = 'resource-dashboard';

    // --- Left column: Magic spell slots ---
    if (hasSpells) {
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

// ===== LOCALE =====

function applyLocale(localeCode) {
    var locale = PHB_LOCALE[localeCode];
    if (!locale) return;

    // Section titles
    if (locale.sections) {
        document.querySelectorAll('.section-title').forEach(function(el) {
            var en = el.textContent;
            if (locale.sections[en]) el.textContent = locale.sections[en];
        });
    }

    // Rest section titles
    if (locale.rest) {
        document.querySelectorAll('.rest-section-title').forEach(function(el) {
            var en = el.textContent;
            if (locale.rest[en]) el.textContent = locale.rest[en];
        });
    }

    // Subclass title
    if (locale.subclassTitle) {
        var st = document.getElementById('subclass-title');
        if (st) st.textContent = locale.subclassTitle;
    }

    // Skill names — store English key in data-en-name before translating
    if (locale.skills) {
        document.querySelectorAll('.skill-name').forEach(function(el) {
            var en = el.textContent;
            if (locale.skills[en]) {
                el.setAttribute('data-en-name', en);
                el.textContent = locale.skills[en];
            }
        });
    }

    // Ability names
    if (locale.abilities) {
        document.querySelectorAll('.ability-name').forEach(function(el) {
            var en = el.textContent;
            if (locale.abilities[en]) el.textContent = locale.abilities[en];
        });
    }

    // Saving throw names — update the text in .saving-name elements
    if (locale.saves) {
        var saveRows = document.querySelectorAll('.saving-row');
        var saveAbbrs = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
        saveRows.forEach(function(row, i) {
            if (i < saveAbbrs.length) {
                var nameEl = row.querySelector('.saving-name');
                if (nameEl && locale.saves[saveAbbrs[i]]) {
                    nameEl.textContent = locale.saves[saveAbbrs[i]];
                }
            }
        });
    }

    // Sense names
    if (locale.senses) {
        document.querySelectorAll('.sense-name').forEach(function(el) {
            var en = el.textContent;
            if (locale.senses[en]) el.textContent = locale.senses[en];
        });
    }

    // Tab names
    if (locale.tabs) {
        document.querySelectorAll('.tab-link').forEach(function(el) {
            var en = el.textContent;
            if (locale.tabs[en]) el.textContent = locale.tabs[en];
        });
    }

    // Tab empty placeholders
    if (locale.tabPlaceholders) {
        document.querySelectorAll('.tab-empty-placeholder').forEach(function(el) {
            var en = el.textContent;
            if (locale.tabPlaceholders[en]) el.textContent = locale.tabPlaceholders[en];
        });
    }

    // Spell modal labels
    if (locale.spellModal) {
        document.querySelectorAll('.spell-modal-detail-label').forEach(function(el) {
            var en = el.textContent;
            if (locale.spellModal[en]) el.textContent = locale.spellModal[en];
        });
    }

    // Action rows
    if (locale.actions) {
        document.querySelectorAll('.action-name').forEach(function(el) {
            var en = el.textContent;
            if (locale.actions[en]) el.textContent = locale.actions[en];
        });
    }
}

// ===== CHOICE MODAL =====

var currentChoiceCallback = null;
var currentChoiceType = '';
var currentChoiceSelected = [];

function showChoicePrompt(type, count, options, title, callback) {
    currentChoiceType = type;
    currentChoiceSelected = characterState.chosenLanguages.slice() || [];
    currentChoiceCallback = callback;

    var overlay = document.getElementById('choice-modal-overlay');
    var titleEl = document.getElementById('choice-modal-title');
    var subtitleEl = document.getElementById('choice-modal-subtitle');
    var listEl = document.getElementById('choice-modal-list');
    var footerEl = document.getElementById('choice-modal-footer');

    titleEl.textContent = title || 'Выбор ' + type;
    subtitleEl.textContent = 'Выберите ' + count + ' ' + type;

    listEl.innerHTML = '';

    options.forEach(function(opt) {
        var item = document.createElement('div');
        item.className = 'choice-modal-item';
        if (currentChoiceSelected.indexOf(opt) !== -1) {
            item.classList.add('selected');
        }
        item.setAttribute('data-value', opt);

        var check = document.createElement('div');
        check.className = 'choice-modal-item-check';

        var label = document.createElement('div');
        label.className = 'choice-modal-item-label';
        label.textContent = opt;

        item.appendChild(check);
        item.appendChild(label);
        listEl.appendChild(item);
    });

    updateChoiceFooter(count);

    footerEl.innerHTML = '';
    var btn = document.createElement('button');
    btn.className = 'choice-modal-confirm';
    btn.id = 'choice-modal-confirm-btn';
    btn.textContent = 'Готово';
    btn.disabled = currentChoiceSelected.length !== count;
    footerEl.appendChild(btn);

    overlay.classList.remove('hidden');
}

function updateChoiceFooter(count) {
    var footerEl = document.getElementById('choice-modal-footer');
    var countEl = document.getElementById('choice-modal-count');
    if (countEl) countEl.remove();

    countEl = document.createElement('div');
    countEl.className = 'choice-modal-count';
    countEl.id = 'choice-modal-count';

    var selected = currentChoiceSelected.length;
    countEl.textContent = selected + ' из ' + count;

    if (selected === count) {
        countEl.classList.add('done');
    } else {
        countEl.classList.add('pending');
    }

    var btn = document.getElementById('choice-modal-confirm-btn');
    if (btn) btn.disabled = selected !== count;

    footerEl.appendChild(countEl);
}

function closeChoiceModal() {
    var overlay = document.getElementById('choice-modal-overlay');
    if (overlay) overlay.classList.add('hidden');
    currentChoiceCallback = null;
    currentChoiceType = '';
    currentChoiceSelected = [];
}

// ===== STATS UPDATE =====

function readBaseAbilities() {
    // characterState.abilities is source of truth — kept in sync by pool/+/− handlers
}

function updateAC() {
    const shieldValue = document.querySelector('.shield-value');
    if (!shieldValue) { console.error('Ошибка: Элемент .shield-value не найден в DOM!'); return; }
    var result = calculateAC(characterState);
    shieldValue.textContent = result.value;
    shieldValue.setAttribute('data-tooltip', result.breakdown);
}

function resetToBlankSheet() {
    characterState.proficientSkills = {};
    characterState.fixedSkills = {};
    characterState.proficientSaves = { str: false, dex: false, con: false, int: false, wis: false, cha: false };
    characterState.isConfirmed = false;
    characterState.spellBuckets = {};
    characterState.showAllClasses = false;
    characterState.fightingStyle = '';
    characterState.swordsWeaponProf = '';
    characterState.firearmsProf = false;
    characterState.attacksPerAction = 1;
    characterState._bonusMagicalSecrets = 0;
    characterState._bonusSkillSlots = 0;

    characterState.featStatBonuses = {};
    characterState.spellBuckets = {};
    characterState.totemSpirit = '';

    document.querySelectorAll('.skill-row .proficiency-dot.filled').forEach(function(dot) {
        dot.classList.remove('filled');
    });
    document.querySelectorAll('.skill-row.fixed-skill').forEach(function(row) {
        row.classList.remove('fixed-skill');
    });
    document.querySelectorAll('.saving-row .proficiency-dot.filled').forEach(function(dot) {
        dot.classList.remove('filled');
    });
    document.querySelectorAll('.saving-row.class-save').forEach(function(row) {
        row.classList.remove('class-save');
    });

    // Clean up confirmed state classes
    var screenRoot = document.querySelector('.screen-root');
    if (screenRoot) {
        screenRoot.classList.remove('character-confirmed');
        screenRoot.classList.remove('confirmed-mode');
    }
    var confirmBtn = document.getElementById('config-confirm-btn');
    if (confirmBtn) {
        confirmBtn.classList.remove('confirm-urgent');
        confirmBtn.style.display = '';
    }
}

function updateStats() {
    readBaseAbilities();
    characterState.proficiencyBonus = calculateProficiencyBonus(characterState.level);

    const shields = document.querySelectorAll('.ability-shield');
    if (!shields.length) { console.error('Ошибка: Элемент .ability-shield не найден в DOM!');     return characterState;
}
    const keys = PHB_TABLES.abilities;

    shields.forEach(function(shield, i) {
        const key = keys[i];
        const base = characterState.abilities[key];
        const raceBonus = RACE_STATS[characterState.race] && RACE_STATS[characterState.race][key] || 0;
        const featBonus = getTotalFeatBonus(key);
        const effective = base + raceBonus + featBonus;
        const mod = calculateModifier(effective);

        // Display effective score (base + race bonus + feat bonus)
        const baseEl = shield.querySelector('.ability-base');
        if (baseEl) baseEl.textContent = effective;

        const modEl = shield.querySelector('.ability-mod');
        if (!modEl) { console.error('Ошибка: .ability-mod не найден внутри .ability-shield[' + i + ']!'); return; }

        if (characterState.isConfirmed) {
            modEl.textContent = (mod >= 0 ? '+' : '') + mod;
        } else {
            modEl.textContent = '0';
        }

        // Race bonus badge — only show when confirmed
        let raceBonusEl = shield.querySelector('.race-bonus');
        if (raceBonusEl) raceBonusEl.remove();
        shield.classList.remove('has-race-bonus');

        if (characterState.isConfirmed && raceBonus > 0) {
            shield.classList.add('has-race-bonus');
            raceBonusEl = document.createElement('span');
            raceBonusEl.className = 'race-bonus';
            raceBonusEl.textContent = '+' + raceBonus;
            shield.appendChild(raceBonusEl);
        }

        // Feat bonus badge — only show when confirmed
        let featBonusEl = shield.querySelector('.feat-bonus');
        if (featBonusEl) featBonusEl.remove();
        shield.classList.remove('has-feat-bonus');
        if (modEl) modEl.removeAttribute('title');

        if (characterState.isConfirmed && featBonus > 0) {
            shield.classList.add('has-feat-bonus');
            featBonusEl = document.createElement('span');
            featBonusEl.className = 'feat-bonus';
            featBonusEl.textContent = '\u2605';
            shield.appendChild(featBonusEl);

            var tooltip = getFeatBonusTooltip(key);
            if (tooltip && modEl) {
                modEl.setAttribute('title', tooltip);
            }
        }
    });

    updateAC();

    if (characterState.isConfirmed) {
        const profBadge = document.querySelector('.proficiency-badge .badge-value');
        if (!profBadge) { console.error('Ошибка: Элемент .proficiency-badge .badge-value не найден!'); }
        else { profBadge.textContent = (characterState.proficiencyBonus >= 0 ? '+' : '') + characterState.proficiencyBonus; }

        const speedBadge = document.querySelector('.speed-badge .badge-value');
        if (!speedBadge) { console.error('Ошибка: Элемент .speed-badge .badge-value не найден!'); }
        else { speedBadge.textContent = characterState.speed || 30; }

        const initMod = calculateModifier(characterState.abilities.dex + (RACE_STATS[characterState.race] && RACE_STATS[characterState.race].dex || 0) + getTotalFeatBonus('dex'));
        // Jack of All Trades: bard level >= 2 adds floor(profBonus/2) to non-proficient checks (Initiative)
        const hasJoat = characterState.class === 'bard' && characterState.level >= 2 && characterState.isConfirmed;
        const joatBonus = hasJoat ? Math.floor(characterState.proficiencyBonus / 2) : 0;
        const alertBonus = characterState.initiativeBonus || 0;
        const finalInit = initMod + joatBonus + alertBonus;
        const initEl = document.querySelector('.initiative-value');
        if (!initEl) { console.error('Ошибка: Элемент .initiative-value не найден!'); }
        else {
            initEl.textContent = (finalInit >= 0 ? '+' : '') + finalInit;
            if (hasJoat) initEl.title = 'Initiative | База: ' + (initMod >= 0 ? '+' : '') + initMod + ' | JOAT: +' + joatBonus + ' | Итого: ' + (finalInit >= 0 ? '+' : '') + finalInit;
            else initEl.title = '';
        }

        const conBase = characterState.abilities.con || 10;
        const conRaceBonus = RACE_STATS[characterState.race] && RACE_STATS[characterState.race].con || 0;
        const conFeatBonus = getTotalFeatBonus('con');
        const conMod = calculateModifier(conBase + conRaceBonus + conFeatBonus);
        const oldHpMax = characterState.hpMax;
        characterState.hpMax = calculateHitPoints(characterState.level, conMod, characterState.class);
        if (characterState.hpMax !== oldHpMax || characterState.hpCurrent === 0) {
            characterState.hpCurrent = characterState.hpMax;
        } else {
            characterState.hpCurrent = Math.min(characterState.hpCurrent, characterState.hpMax);
        }
        const hpDisplay = document.querySelector('.hp-current');
        if (!hpDisplay) { console.error('Ошибка: Элемент .hp-current не найден!'); }
        else { hpDisplay.textContent = characterState.hpCurrent + ' / ' + characterState.hpMax; }

        const hitDiceCurrent = document.querySelector('.hit-dice-current');
        const hitDiceMax = document.querySelector('.hit-dice-max');
        const hitDiceType = document.querySelector('.hit-dice-type');
        if (!hitDiceCurrent || !hitDiceMax || !hitDiceType) {
            console.error('Ошибка: Hit Dice элементы не найдены!');
        } else {
            const hitDie = CLASS_HIT_DIE[characterState.class] || 8;
            const classKey = characterState.class;
            if (classKey && classKey !== '') {
                hitDiceMax.textContent = characterState.level;
                hitDiceCurrent.textContent = characterState.hpCurrent > 0 ? characterState.level : 0;
                hitDiceType.textContent = 'd' + hitDie;
            } else {
                hitDiceMax.textContent = '0';
                hitDiceCurrent.textContent = '0';
                hitDiceType.textContent = 'd8';
            }
        }
    }
    return characterState;
}

function updateInspiration() {
    const badge = document.querySelector('.inspiration-badge');
    if (badge) {
        badge.style.background = characterState.inspiration > 0 ? '#ffd600' : '#555555';
    }
}

function updateProficiencies() {
    if (!characterState.isConfirmed) return;
    const container = document.getElementById('proficiencies-body');
    if (!container) return;
    container.innerHTML = '';

    const armor = CLASS_ARMOR[characterState.class] || [];
    const weapons = CLASS_WEAPONS[characterState.class] || '';
    const tools = BACKGROUND_TOOLS[characterState.background] || '';
    const raceLang = RACE_LANGUAGES[characterState.race];

    let toolSet = new Set();
    if (tools && tools !== 'None') {
        tools.split(',').forEach(function(t) { toolSet.add(t.trim()); });
    }
    if (featureData.class[characterState.class]) {
        featureData.class[characterState.class].features.forEach(function(f) {
            var featStr = typeof f === 'string' ? f : (f.name || f.nameRu || '');
            if (featStr.toLowerCase().indexOf('tool') !== -1) {
                var parts = featStr.split(',');
                parts.forEach(function(p) { toolSet.add(p.trim()); });
            }
        });
    }

    var armorGroup = document.createElement('div');
    armorGroup.className = 'prof-group';
    if (armor.length > 0) {
        armorGroup.innerHTML = '<div class="prof-label">Armor</div><div class="prof-value">' + armor.join(', ') + '</div>';
    } else {
        armorGroup.classList.add('hidden');
        armorGroup.innerHTML = '<div class="prof-label">Armor</div><div class="prof-value">None</div>';
    }
    container.appendChild(armorGroup);

    var weaponsGroup = document.createElement('div');
    weaponsGroup.className = 'prof-group';
    if (weapons) {
        weaponsGroup.innerHTML = '<div class="prof-label">Weapons</div><div class="prof-value">' + weapons + '</div>';
    } else {
        weaponsGroup.classList.add('hidden');
        weaponsGroup.innerHTML = '<div class="prof-label">Weapons</div><div class="prof-value">None</div>';
    }
    container.appendChild(weaponsGroup);

    var toolsGroup = document.createElement('div');
    toolsGroup.className = 'prof-group';
    var toolArr = Array.from(toolSet);
    if (toolArr.length > 0) {
        toolsGroup.innerHTML = '<div class="prof-label">Tools</div><div class="prof-value">' + toolArr.join(', ') + '</div>';
    } else {
        toolsGroup.classList.add('hidden');
        toolsGroup.innerHTML = '<div class="prof-label">Tools</div><div class="prof-value">None</div>';
    }
    container.appendChild(toolsGroup);

    let langArr = ['Common'];
    if (raceLang) langArr.push(raceLang);
    if (characterState.race === 'human') langArr.push('one extra language');
    if (characterState.race === 'half-elf') langArr.push('one extra language');
    var chosenLangs = characterState.chosenLanguages || [];
    chosenLangs.forEach(function(l) { langArr.push(l); });
    const langGroup = document.createElement('div');
    langGroup.className = 'prof-group';
    langGroup.innerHTML = '<div class="prof-label">Languages</div><div class="prof-value">' + langArr.join(', ') + '</div>';
    container.appendChild(langGroup);
}

function updateSpeed() {
    var speedVal = RACE_SPEED[characterState.race] || 30;
    characterState.speed = speedVal;
    var speedBadge = document.querySelector('.speed-badge .badge-value');
    if (speedBadge) {
        speedBadge.textContent = speedVal;
    }
}

function updateActions() {
    var container = document.querySelector('.actions-container');
    if (!container) return;

    container.innerHTML = '';

    // --- UNIFIED RESOURCE DASHBOARD ---
    renderResourceDashboard();

    // --- WEAPON ATTACK SECTION ---
    var hasWeapons = false;
    if (characterState.inventory) {
        characterState.inventory.forEach(function(item) {
            if (item.isEquipped && item.type === 'weapon') hasWeapons = true;
        });
    }

    if (hasWeapons) {
        var wSection = document.createElement('div');
        wSection.className = 'actions-section-header';
        var attacksCount = characterState.attacksPerAction || 1;
        wSection.textContent = 'Атаки оружием' + (attacksCount > 1 ? ' (×' + attacksCount + ' за действие)' : '');
        container.appendChild(wSection);

        if (characterState.inventory) {
            characterState.inventory.forEach(function(item) {
                if (!item.isEquipped || item.type !== 'weapon') return;
                var template = BASE_ITEMS[item.key];
                if (!template) return;

                var abilityKey = template.ability || 'str';
                var abilityScore = characterState.abilities[abilityKey] || 10;
                var raceBonus = RACE_STATS[characterState.race] && RACE_STATS[characterState.race][abilityKey] || 0;
                var featBonusW = getTotalFeatBonus(abilityKey);
                var mod = calculateModifier(abilityScore + raceBonus + featBonusW);
                var isProf = isWeaponProficient(item.key);
                var hitBonus = mod + (isProf ? characterState.proficiencyBonus : 0);

                var icon = '⚔';
                if (template.properties.indexOf('thrown') !== -1) icon = '🎯';
                if (template.properties.indexOf('ammunition') !== -1) {
                    icon = (template.name && template.name.indexOf('Мушкет') !== -1) ? '🔫' : '🏹';
                }

                var notes = '';
                if (template.properties.length > 0) notes = template.properties.join(', ');

                var dmgStr = template.damage;
                if (mod > 0) dmgStr += '+' + mod;
                else if (mod < 0) dmgStr += ' ' + mod;
                var card = document.createElement('div');
                card.className = 'action-card weapon-card';
                card.innerHTML = '<div class="action-card-header">' +
                    '<div class="action-card-title-row">' +
                        '<span class="action-icon">' + icon + '</span>' +
                        '<span class="action-card-name">' + template.name + '</span>' +
                    '</div>' +
                    '<span class="action-card-sub">' + (template.range || '5 ft.') + ' | ' + notes + '</span>' +
                    '</div>' +
                    '<div class="action-card-stats">' +
                        '<span class="stat-hit">+' + hitBonus + ' hit</span>' +
                        '<span class="stat-dmg">' + dmgStr + ' ' + template.damageType + '</span>' +
                    '</div>';
                container.appendChild(card);
            });
        }
    }



    // --- CLASS ABILITIES SECTION ---

    var inspDie = 'd6';
    if (characterState.level >= 15) inspDie = 'd12';
    else if (characterState.level >= 10) inspDie = 'd10';
    else if (characterState.level >= 5) inspDie = 'd8';

    var restDie = 'd6';
    if (characterState.level >= 20) restDie = 'd12';
    else if (characterState.level >= 16) restDie = 'd10';
    else if (characterState.level >= 10) restDie = 'd8';

    var abilityCards = [];

    // --- RACE FEATURES (data-driven) ---
    (function() {
        if (window.RACE_FEATURES && window.RACE_FEATURES[characterState.race]) {
            var raceFeatures = window.RACE_FEATURES[characterState.race];
            raceFeatures.forEach(function(f) {
                if (f.level && characterState.level < f.level) return;
                var card = document.createElement('div');
                card.className = 'action-card class-ability-card';
                var typeClass = '';
                if (f.type === 'Реакция' || f.type === 'Бонусное') typeClass = ' red';
                var desc = f.desc || f.description || '';
                desc = desc.replace(/\{prof\}/g, characterState.proficiencyBonus);
                desc = desc.replace(/\{str\}/g, calculateModifier(characterState.abilities.str || 10));
                desc = desc.replace(/\{dex\}/g, calculateModifier(characterState.abilities.dex || 10));
                desc = desc.replace(/\{level\}/g, characterState.level);
                card.innerHTML = '<div class="action-card-header">' +
                    '<div class="action-card-title-row">' +
                        '<span class="action-icon">' + (f.icon || '✦') + '</span>' +
                        '<span class="action-card-name">' + f.name + '</span>' +
                    '</div>' +
                    '<span class="action-card-sub' + typeClass + '">' + (f.type || 'Пассивная') + '</span>' +
                    '</div>' +
                    '<div class="action-card-stats">' +
                        '<span class="stat-desc">' + desc + '</span>' +
                    '</div>';
                abilityCards.push(card);
            });
        }
    })();

    // --- AASIMAR CELESTIAL HERITAGE ACTION (level 3+) ---
    (function() {
        if (characterState.race === 'aasimar' && characterState.level >= 3 && characterState.aasimarHeritage) {
            if (window.RACE_FEATURES && window.RACE_FEATURES.aasimar_subtypes) {
                var subtypes = window.RACE_FEATURES.aasimar_subtypes;
                for (var ai = 0; ai < subtypes.length; ai++) {
                    if (subtypes[ai].value === characterState.aasimarHeritage && subtypes[ai].action) {
                        var af = subtypes[ai].action;
                        var card = document.createElement('div');
                        card.className = 'action-card class-ability-card';
                        var typeClass = '';
                        if (af.type === 'Реакция' || af.type === 'Бонусное') typeClass = ' red';
                        var desc = af.desc || af.description || '';
                        desc = desc.replace(/\{prof\}/g, characterState.proficiencyBonus);
                        desc = desc.replace(/\{str\}/g, calculateModifier(characterState.abilities.str || 10));
                        desc = desc.replace(/\{dex\}/g, calculateModifier(characterState.abilities.dex || 10));
                        desc = desc.replace(/\{level\}/g, characterState.level);
                        card.innerHTML = '<div class="action-card-header">' +
                            '<div class="action-card-title-row">' +
                                '<span class="action-icon">' + (af.icon || '✦') + '</span>' +
                                '<span class="action-card-name">' + af.name + '</span>' +
                            '</div>' +
                            '<span class="action-card-sub' + typeClass + '">' + (af.type || 'Пассивная') + '</span>' +
                            '</div>' +
                            '<div class="action-card-stats">' +
                                '<span class="stat-desc">' + desc + '</span>' +
                            '</div>';
                        abilityCards.push(card);
                        break;
                    }
                }
            }
        }
    })();

    // --- CLASS BASE FEATURES (data-driven) ---
    (function() {
        if (window.CLASS_BASE_FEATURES && window.CLASS_BASE_FEATURES[characterState.class]) {
            var classFeatures = window.CLASS_BASE_FEATURES[characterState.class];
            classFeatures.forEach(function(f) {
                if (f.level && characterState.level < f.level) return;
                var card = document.createElement('div');
                card.className = 'action-card class-ability-card';
                var typeClass = '';
                if (f.type === 'Реакция' || f.type === 'Бонусное') typeClass = ' red';
                var desc = f.desc || f.description || '';
                desc = desc.replace(/\{prof\}/g, characterState.proficiencyBonus);
                desc = desc.replace(/\{str\}/g, calculateModifier(characterState.abilities.str || 10));
                desc = desc.replace(/\{dex\}/g, calculateModifier(characterState.abilities.dex || 10));
                desc = desc.replace(/\{level\}/g, characterState.level);
                desc = desc.replace(/\{inspDie\}/g, inspDie);
                desc = desc.replace(/\{restDie\}/g, restDie);
                card.innerHTML = '<div class="action-card-header">' +
                    '<div class="action-card-title-row">' +
                        '<span class="action-icon">' + (f.icon || '✦') + '</span>' +
                        '<span class="action-card-name">' + f.name + '</span>' +
                    '</div>' +
                    '<span class="action-card-sub' + typeClass + '">' + (f.type || 'Пассивная') + '</span>' +
                    '</div>' +
                    '<div class="action-card-stats">' +
                        '<span class="stat-desc">' + desc + '</span>' +
                    '</div>';
                abilityCards.push(card);
            });
        }
    })();

    // --- BARD SWORDS FIGHTING STYLE ---
    (function() {
        if (characterState.class === 'bard' && characterState.subclass === 'SWORDS' && characterState.fightingStyle) {
            var fsDesc = '';
            if (characterState.fightingStyle === 'dueling') fsDesc = '+2 к броскам атаки при использовании одноручного оружия.';
            else if (characterState.fightingStyle === 'two-weapon') fsDesc = '+2 к броскам урона при сражении двумя оружиями.';
            if (fsDesc) {
                var card = document.createElement('div');
                card.className = 'action-card class-ability-card';
                card.innerHTML = '<div class="action-card-header">' +
                    '<div class="action-card-title-row">' +
                        '<span class="action-icon">⚔️</span>' +
                        '<span class="action-card-name">' + (characterState.fightingStyle === 'dueling' ? 'Дуэлянт' : 'Сражение двумя оружиями') + '</span>' +
                    '</div>' +
                    '<span class="action-card-sub">Пассивная</span>' +
                    '</div>' +
                    '<div class="action-card-stats"><span class="stat-desc">' + fsDesc + '</span></div>';
                abilityCards.push(card);
            }
        }
    })();

    // --- SUBCLASS FEATURES ---
    (function() {
        if (!window.subclassData || !window.subclassData[characterState.class] || !characterState.subclass) return;
        var clsData = window.subclassData[characterState.class];

        // Determine if using options-array format or key-based format
        var isOptionsFormat = Array.isArray(clsData.options);

        if (isOptionsFormat) {
            // --- OPTIONS ARRAY FORMAT (bard, fighter, rogue, warlock) ---
            var subData = null;
            var classOptions = clsData.options;
            var subValue = String(characterState.subclass).toLowerCase().trim();
            for (var bi = 0; bi < classOptions.length; bi++) {
                if (String(classOptions[bi].value).toLowerCase().trim() === subValue) {
                    subData = classOptions[bi];
                    break;
                }
            }
            if (subData && subData.features) {
                var featObj = subData.features;
                // Handle both flat arrays (Bard) and level-keyed objects (Barbarian, etc.)
                if (Array.isArray(featObj)) {
                    featObj.forEach(function(f) {
                        var featName = typeof f === 'string' ? f : (f.name || f.nameRu || "Без названия");
                        var featDesc = typeof f === 'string' ? '' : (f.desc || f.description || '');
                        var featLevel = typeof f === 'object' ? (f.level || 0) : 0;
                        if (featLevel > characterState.level) return;
                        var card = document.createElement('div');
                        card.className = 'action-card class-ability-card';
                        card.innerHTML = '<div class="action-card-header">' +
                            '<div class="action-card-title-row">' +
                                '<span class="action-icon">✦</span>' +
                                '<span class="action-card-name">' + featName + '</span>' +
                            '</div>' +
                            '<span class="action-card-sub">УМЕНИЕ</span>' +
                            '</div>' +
                            (featDesc ? '<div class="action-card-stats"><span class="stat-desc">' + featDesc + '</span></div>' : '');
                        abilityCards.push(card);
                    });
                } else {
                    // Level-keyed object: { 3: [...], 6: [...], ... }
                    Object.keys(featObj).sort(function(a, b) { return Number(a) - Number(b); }).forEach(function(lvlKey) {
                        var lvl = parseInt(lvlKey, 10);
                        if (isNaN(lvl) || lvl > characterState.level) return;
                        var featArr = featObj[lvlKey];
                        if (!Array.isArray(featArr)) return;
                        featArr.forEach(function(f) {
                            var featName = typeof f === 'string' ? f : (f.name || f.nameRu || "Без названия");
                            var featDesc = typeof f === 'string' ? '' : (f.desc || f.description || '');
                            var card = document.createElement('div');
                            card.className = 'action-card class-ability-card';
                            card.innerHTML = '<div class="action-card-header">' +
                                '<div class="action-card-title-row">' +
                                    '<span class="action-icon">✦</span>' +
                                    '<span class="action-card-name">' + featName + '</span>' +
                                '</div>' +
                                '<span class="action-card-sub">УМЕНИЕ</span>' +
                                '</div>' +
                                (featDesc ? '<div class="action-card-stats"><span class="stat-desc">' + featDesc + '</span></div>' : '');
                            abilityCards.push(card);
                        });
                    });
                }
            }
        } else {
            // --- KEY-BASED FORMAT (paladin, cleric, druid, monk, artificer, barbarian, wizard, sorcerer) ---
            // Case-insensitive subclass key lookup
            var subEntry = null;
            var subValueLower = String(characterState.subclass).toLowerCase().trim();
            if (clsData[characterState.subclass]) {
                subEntry = clsData[characterState.subclass];
            } else {
                Object.keys(clsData).forEach(function(k) {
                    if (k.toLowerCase().trim() === subValueLower && clsData[k].name) {
                        subEntry = clsData[k];
                    }
                });
            }
            if (!subEntry) return;

            // Check for features wrapper object (barbarian/wizard/sorcerer style: features: { 3: ["str1"], 6: [...] })
            if (subEntry.features && typeof subEntry.features === 'object' && !Array.isArray(subEntry.features)) {
                Object.keys(subEntry.features).sort(function(a, b) { return Number(a) - Number(b); }).forEach(function(lvlKey) {
                    var lvl = parseInt(lvlKey, 10);
                    if (isNaN(lvl) || lvl > characterState.level) return;
                    var featArr = subEntry.features[lvlKey];
                    if (!Array.isArray(featArr)) return;
                    featArr.forEach(function(f) {
                        var featName = typeof f === 'string' ? f : (f.name || f.nameRu || "Без названия");
                        var featDesc = typeof f === 'string' ? '' : (f.description || f.desc || '');
                        var card = document.createElement('div');
                        card.className = 'action-card class-ability-card';
                        card.innerHTML = '<div class="action-card-header">' +
                            '<div class="action-card-title-row">' +
                                '<span class="action-icon">✦</span>' +
                                '<span class="action-card-name">' + featName + '</span>' +
                            '</div>' +
                            '<span class="action-card-sub">УМЕНИЕ</span>' +
                            '</div>' +
                            (featDesc ? '<div class="action-card-stats"><span class="stat-desc">' + featDesc + '</span></div>' : '');
                        abilityCards.push(card);
                    });
                });
            } else {
                // Direct level-key format (paladin/cleric style: 3: [{name, description}], 5: [...])
                Object.keys(subEntry).forEach(function(lvlKey) {
                    if (lvlKey === 'name') return;
                    var lvl = parseInt(lvlKey, 10);
                    if (isNaN(lvl) || lvl > characterState.level) return;
                    var featureArr = subEntry[lvlKey];
                    if (!Array.isArray(featureArr)) return;
                    featureArr.forEach(function(f) {
                        var featName = typeof f === 'string' ? f : (f.name || "Без названия");
                        var featDesc = typeof f === 'string' ? '' : (f.desc || f.description || '');
                        var card = document.createElement('div');
                        card.className = 'action-card class-ability-card';
                        card.innerHTML = '<div class="action-card-header">' +
                            '<div class="action-card-title-row">' +
                                '<span class="action-icon">✦</span>' +
                                '<span class="action-card-name">' + featName + '</span>' +
                            '</div>' +
                            '<span class="action-card-sub">УМЕНИЕ</span>' +
                            '</div>' +
                            (featDesc ? '<div class="action-card-stats"><span class="stat-desc">' + featDesc + '</span></div>' : '');
                        abilityCards.push(card);
                    });
                });
            }
        }
    })();

    // --- GENERIC SUBCLASS ACTIONS ---
    if (characterState.isConfirmed && characterState.subclass && window.subclassData && window.subclassData[characterState.class]) {
        var clsData = window.subclassData[characterState.class];
        var isOptionsFormat = Array.isArray(clsData.options);

        if (isOptionsFormat) {
            // --- OPTIONS ARRAY FORMAT ACTIONS ---
            var currentSubclass = null;
            var subVal = String(characterState.subclass).toLowerCase().trim();
            for (var si = 0; si < clsData.options.length; si++) {
                if (String(clsData.options[si].value).toLowerCase().trim() === subVal) {
                    currentSubclass = clsData.options[si];
                    break;
                }
            }
            var _createActionCard = function(action) {
                (function(action) {
                    var card = document.createElement('div');
                    card.className = 'action-card class-ability-card';
                    var typeClass = '';
                    var costField = action.cost || action.type || '';
                    if (costField === 'Реакция' || costField === 'Бонусное') typeClass = ' red';
                    card.innerHTML = '<div class="action-card-header">' +
                        '<div class="action-card-title-row">' +
                            '<span class="action-icon">' + (action.icon || '✦') + '</span>' +
                            '<span class="action-card-name">' + action.name + '</span>' +
                        '</div>' +
                        '<span class="action-card-sub' + typeClass + '">' + costField + '</span>' +
                        '</div>' +
                        '<div class="action-card-stats">' +
                            '<span class="stat-desc">' + (action.desc || action.description || '') + '</span>' +
                        '</div>';
                    if (action.spendInspiration) {
                        card.className += ' inspiration-spend-btn';
                        card.addEventListener('click', function() {
                            if (spendInspirationPoint(action.name)) rollInspirationDie(inspDie);
                        });
                    }
                    abilityCards.push(card);
                })(action);
            };
            if (currentSubclass && currentSubclass.actions) {
                var actObj = currentSubclass.actions;
                if (Array.isArray(actObj)) {
                    actObj.forEach(function(action) {
                        if (characterState.level < action.level) return;
                        _createActionCard(action);
                    });
                } else {
                    Object.keys(actObj).sort(function(a, b) { return Number(a) - Number(b); }).forEach(function(lvlKey) {
                        var lvl = parseInt(lvlKey, 10);
                        if (isNaN(lvl) || lvl > characterState.level) return;
                        var actArr = actObj[lvlKey];
                        if (!Array.isArray(actArr)) return;
                        actArr.forEach(function(action) {
                            _createActionCard(action);
                        });
                    });
                }
            }
        } else {
            // --- KEY-BASED FORMAT ACTIONS (channelDivinity, etc.) ---
            // Case-insensitive subclass key lookup
            var subEntry = null;
            var subValLower = String(characterState.subclass).toLowerCase().trim();
            if (clsData[characterState.subclass]) {
                subEntry = clsData[characterState.subclass];
            } else {
                Object.keys(clsData).forEach(function(k) {
                    if (k.toLowerCase().trim() === subValLower && clsData[k].name) {
                        subEntry = clsData[k];
                    }
                });
            }
            if (!subEntry) return;

            // Check for features wrapper (barbarian/wizard/sorcerer style)
            if (subEntry.features && typeof subEntry.features === 'object' && !Array.isArray(subEntry.features)) {
                Object.keys(subEntry.features).sort(function(a, b) { return Number(a) - Number(b); }).forEach(function(lvlKey) {
                    var lvl = parseInt(lvlKey, 10);
                    if (isNaN(lvl) || lvl > characterState.level) return;
                    var featArr = subEntry.features[lvlKey];
                    if (!Array.isArray(featArr)) return;
                    featArr.forEach(function(f) {
                        if (!f.channelDivinity) return;
                        (function(f) {
                            var card = document.createElement('div');
                            card.className = 'action-card class-ability-card';
                            card.innerHTML = '<div class="action-card-header">' +
                                '<div class="action-card-title-row">' +
                                    '<span class="action-icon">✦</span>' +
                                    '<span class="action-card-name">' + f.name + '</span>' +
                                '</div>' +
                                '<span class="action-card-sub red">Действие</span>' +
                                '</div>' +
                                '<div class="action-card-stats"><span class="stat-desc">' + (f.desc || f.description || '') + '</span></div>';
                            abilityCards.push(card);
                        })(f);
                    });
                });
            } else {
                // Direct level-key format (paladin/cleric style)
                Object.keys(subEntry).forEach(function(lvlKey) {
                    if (lvlKey === 'name') return;
                    var lvl = parseInt(lvlKey, 10);
                    if (isNaN(lvl) || lvl > characterState.level) return;
                    var featureArr = subEntry[lvlKey];
                    if (!Array.isArray(featureArr)) return;
                    featureArr.forEach(function(f) {
                        if (!f.channelDivinity) return;
                        var cd = f.channelDivinity;
                        (function(f, cd) {
                            var card = document.createElement('div');
                            card.className = 'action-card class-ability-card';
                            card.innerHTML = '<div class="action-card-header">' +
                                '<div class="action-card-title-row">' +
                                    '<span class="action-icon">✦</span>' +
                                    '<span class="action-card-name">' + f.name + '</span>' +
                                '</div>' +
                                '<span class="action-card-sub red">Действие</span>' +
                                '</div>' +
                                '<div class="action-card-stats"><span class="stat-desc">' + (f.desc || f.description || '') + '</span></div>';
                            abilityCards.push(card);
                        })(f, cd);
                    });
                });
            }
        }
    }

    if (abilityCards.length > 0) {
        var cSection = document.createElement('div');
        cSection.className = 'actions-section-header';
        cSection.textContent = 'Классовые способности';
        container.appendChild(cSection);
        abilityCards.forEach(function(card) { container.appendChild(card); });
    }
}

function updateLevelDisplay() {
    const levelDisplay = document.getElementById('config-level-display');
    if (!levelDisplay) { console.error('Ошибка: Элемент #config-level-display не найден в DOM!'); return; }
    levelDisplay.textContent = characterState.level;

    const levelSlider = document.getElementById('level-slider');
    if (levelSlider) {
        levelSlider.value = characterState.level;
        levelSlider.setAttribute('aria-valuenow', characterState.level);
        levelSlider.setAttribute('aria-valuetext', characterState.level);
    }
}

function updateGlobalValidation() {
    const state = window.characterState;
    if (!state) return;

    var hintsContainer = document.getElementById('validation-hints-box');
    if (!hintsContainer) {
        hintsContainer = document.createElement('div');
        hintsContainer.id = 'validation-hints-box';
        hintsContainer.style.cssText = 'padding: 10px 0; font-size: 13px; line-height: 1.6;';
        var cb = document.getElementById('config-confirm-btn');
        if (cb && cb.parentNode) {
            cb.parentNode.insertBefore(hintsContainer, cb);
        }
    }

    var allValid = true;
    var hints = [];
    var ok = '<div class="hint-ok">✔ ';
    var miss = '<div class="hint-miss">❌ ';

    // --- 1. ХАРАКТЕРИСТИКИ ---
    var usedPools = document.querySelectorAll('.pool-value.used').length;
    if (usedPools === 6) {
        hints.push(ok + 'Характеристики: распределено 6 из 6</div>');
    } else {
        allValid = false;
        hints.push(miss + 'Характеристики: распределено ' + usedPools + ' из 6</div>');
    }

    // --- Detect race / class / background from selects ---
    var selectEls = document.querySelectorAll('select');
    var raceSel = false, classSel = false, bgSel = false, validCnt = 0;
    selectEls.forEach(function(s) {
        var v = s.value;
        if (!v || v === 'ВЫБРАТЬ') return;
        validCnt++;
        var id = (s.id || '').toLowerCase();
        if (id.includes('class')) classSel = true;
        else if (id.includes('race')) raceSel = true;
        else if (id.includes('bg') || id.includes('background')) bgSel = true;
    });
    if (validCnt >= 3) { raceSel = true; classSel = true; bgSel = true; }

    if (raceSel) hints.push(ok + 'Раса: ' + (state.raceKey || 'выбрана') + '</div>');
    else { allValid = false; hints.push(miss + 'Выберите расу</div>'); }

    if (classSel) hints.push(ok + 'Класс: ' + (state.classKey || 'выбран') + '</div>');
    else { allValid = false; hints.push(miss + 'Выберите класс</div>'); }

    if (bgSel) hints.push(ok + 'Предыстория: ' + (state.backgroundKey || 'выбрана') + '</div>');
    else { allValid = false; hints.push(miss + 'Выберите предысторию</div>'); }

    // --- 2. НАВЫКИ ---
    var skillTarget = window.PHB_REQUIREMENTS && window.PHB_REQUIREMENTS[state.class]
        ? window.PHB_REQUIREMENTS[state.class].skillsToChoose || 0 : 0;
    skillTarget += (state._bonusSkillSlots || 0);
    var isLf = state.race === 'lizardfolk';
    if (isLf) skillTarget += 2;

    var profArr = state.proficientSkills || {};
    var fixedArr = state.fixedSkills || {};
    var skillChosen = 0;
    Object.keys(profArr).forEach(function(k) { if (profArr[k] && !fixedArr[k]) skillChosen++; });
    if (isLf) {
        var dom1 = document.getElementById('config-lizardfolk-skill1');
        var dom2 = document.getElementById('config-lizardfolk-skill2');
        var lfSkills = state.lizardfolkHunterSkills || [];
        if (dom1 ? dom1.value : lfSkills[0]) skillChosen++;
        if (dom2 ? dom2.value : lfSkills[1]) skillChosen++;
    }

    if (raceSel && classSel && bgSel) {
        if (skillChosen === skillTarget || skillTarget === 0) {
            hints.push(ok + 'Навыки: выбрано ' + skillChosen + ' из ' + skillTarget + '</div>');
        } else {
            allValid = false;
            hints.push(miss + 'Навыки: выбрано ' + skillChosen + ' из ' + skillTarget + '</div>');
        }
    } else {
        allValid = false;
        hints.push(miss + 'Навыки: требуются раса и класс</div>');
    }

    // --- 3. КОМПЕТЕНЦИИ (Expertise) — Bard / Rogue only ---
    var expReq = typeof window.getExpertiseRequired === 'function' ? window.getExpertiseRequired() : 0;
    if (expReq > 0) {
        var expCnt = 0;
        Object.keys(state.expertiseSkills || {}).forEach(function(k) { if (state.expertiseSkills[k]) expCnt++; });
        if (expCnt >= expReq) {
            hints.push(ok + 'Компетенции: отмечено ' + expCnt + ' из ' + expReq + '</div>');
        } else {
            allValid = false;
            hints.push(miss + 'Компетенции: отмечено ' + expCnt + ' из ' + expReq + '</div>');
        }
    }

    // --- 4. МАГИЧЕСКИЙ ЛИМИТ (cantrips + spells) ---
    var buckets = window.getRequiredSpellBuckets ? window.getRequiredSpellBuckets() : [];
    var isCaster = buckets.length > 0 && !(state.class === 'barbarian' && state.subclass === 'totem_warrior');
    if (isCaster) {
        var canSel = 0, canLim = 0, spSel = 0, spLim = 0;
        buckets.forEach(function(bd) {
            if (!bd) return;
            var arr = state.spellBuckets && state.spellBuckets[bd.key] ? state.spellBuckets[bd.key] : [];
            var cnt = Array.isArray(arr) ? arr.length : 0;
            var lim = bd.limit || bd.max || 0;
            if (bd.type === 'cantrip') { canSel += cnt; canLim += lim; }
            else if (bd.type === 'spell') { spSel += cnt; spLim += lim; }
        });
        if (canSel >= canLim) {
            hints.push(ok + 'Заговоры: выбрано ' + canSel + ' из ' + canLim + '</div>');
        } else {
            allValid = false;
            hints.push(miss + 'Заговоры: выбрано ' + canSel + ' из ' + canLim + '</div>');
        }
        if (spSel >= spLim) {
            hints.push(ok + 'Заклинания: выбрано ' + spSel + ' из ' + spLim + '</div>');
        } else {
            allValid = false;
            hints.push(miss + 'Заклинания: выбрано ' + spSel + ' из ' + spLim + '</div>');
        }
    }

    // --- Подкласс (3+) ---
    if (state.level >= 3) {
        if (state.subclass && state.subclass !== 'ВЫБРАТЬ' && state.subclass !== '') {
            hints.push(ok + 'Подкласс: выбран</div>');
        } else {
            allValid = false;
            hints.push(miss + 'Выберите подкласс</div>');
        }
    }

    // --- Swords fighting style ---
    if (state.class === 'bard' && state.subclass === 'SWORDS') {
        if (state.fightingStyle && state.fightingStyle !== 'ВЫБРАТЬ' && state.fightingStyle !== '') {
            hints.push(ok + 'Боевой стиль: выбран</div>');
        } else {
            allValid = false;
            hints.push(miss + 'Выберите боевой стиль</div>');
        }
    }

    // --- Totem spirit ---
    if (state.class === 'barbarian' && state.subclass === 'totem_warrior' && state.level >= 3) {
        if (state.totemSpirit && state.totemSpirit !== 'ВЫБРАТЬ' && state.totemSpirit !== '') {
            hints.push(ok + 'Дух-хранитель: выбран</div>');
        } else {
            allValid = false;
            hints.push(miss + 'Выберите духа-хранителя</div>');
        }
    }

    // --- Render ---
    hintsContainer.innerHTML = hints.join('');

    // --- Spell status bar (unchanged) ---
    var vCantrips = 0, vMaxCantrips = 0, vSpells = 0, vMaxSpells = 0;
    if (Array.isArray(buckets)) {
        buckets.forEach(function(bd) {
            if (!bd) return;
            var arr = state.spellBuckets && state.spellBuckets[bd.key] ? state.spellBuckets[bd.key] : [];
            var lim = bd.limit || bd.max || 0;
            if (bd.type === 'cantrip') { vCantrips = Array.isArray(arr) ? arr.length : 0; vMaxCantrips = lim; }
            else if (bd.type === 'spell') { vSpells = Array.isArray(arr) ? arr.length : 0; vMaxSpells = lim; }
        });
    }
    updateSpellStatusCounters(vCantrips, vMaxCantrips, vSpells, vMaxSpells);

    // --- Validation counter ---
    var counterEl = document.querySelector('.validation-counter') || document.getElementById('validation-counter-text');
    if (counterEl) {
        var passed = hints.filter(function(h) { return h.indexOf('hint-ok') !== -1; }).length;
        var total = hints.length;
        counterEl.textContent = passed + ' / ' + total;
    }

    // --- Confirm button ---
    var confirmBtn = document.getElementById('config-confirm-btn') || document.getElementById('confirm-character-btn') || document.querySelector('.btn-confirm');
    if (confirmBtn) {
        if (allValid) {
            confirmBtn.disabled = false;
            confirmBtn.removeAttribute('disabled');
        } else {
            confirmBtn.disabled = true;
        }
    }
}

function updateSpellStatusCounters(cantrips, maxCantrips, spells, maxSpells) {
    var statusBar = document.getElementById('spell-status-bar');
    if (!statusBar) return;
    var cls = characterState.class || '';
    var secretsCount = 0;
    var secretsLimit = 0;
    if (typeof countAllMagicalSecrets === 'function') secretsCount = countAllMagicalSecrets();
    if (typeof getMagicalSecretsSlots === 'function') secretsLimit = getMagicalSecretsSlots();
    var html = '<span class="spell-counter-item">Заклинания: <strong>' + spells + '</strong> / ' + maxSpells + '</span>';
    html += '<span class="spell-counter-sep">|</span>';
    html += '<span class="spell-counter-item">Заговоры: <strong>' + cantrips + '</strong> / ' + maxCantrips + '</span>';
    if (secretsLimit > 0) {
        html += '<span class="spell-counter-sep">|</span>';
        html += '<span class="spell-counter-item magical-secrets-counter">Тайны: <strong>' + secretsCount + '</strong> / ' + secretsLimit + '</span>';
    }
    statusBar.innerHTML = html;
}

function pluralR(n) {
    var abs = Math.abs(n) % 100;
    var n1 = abs % 10;
    if (abs > 10 && abs < 20) return 'в';
    if (n1 > 1 && n1 < 5) return 'а';
    if (n1 === 1) return '';
    return 'в';
}

function addLogHTML(html) {
    const log = document.getElementById('combat-log');
    if (!log) return;
    var entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = html;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}
// Логика управления левым сайдбаром сетевой сессии и экранами
const netSidebar = document.getElementById('left-network-sidebar');
const netOpenBtn = document.getElementById('open-network-btn');
const netCloseBtn = document.getElementById('close-network-btn');
const netRoleButtons = document.querySelectorAll('.role-btn');
const netPlayerNameGroup = document.querySelector('.id-player-only');

// Новые элементы для переключения экранов
const netConnectBtn = document.getElementById('net-connect-btn');
const netStatus = document.getElementById('net-status');
const charHeader = document.querySelector('.char-header');
const leftSection = document.querySelector('.left-section');
const centerCol = document.querySelector('.center-col');
const rightCol = document.querySelector('.right-col');
const dmScreen = document.getElementById('dm-screen-root');

// Текущая выбранная роль (по умолчанию "player")
let currentRole = 'player';

// Открытие сайдбара
if (netOpenBtn && netSidebar) {
  netOpenBtn.addEventListener('click', () => {
    netSidebar.classList.add('is-open');
  });
}

// Закрытие сайдбара
if (netCloseBtn && netSidebar) {
  netCloseBtn.addEventListener('click', () => {
    netSidebar.classList.remove('is-open');
  });
}

// Переключение ролей (Игрок / ГМ) внутри сайдбара
netRoleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    netRoleButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    currentRole = btn.getAttribute('data-role');

    // Если выбран ГМ — скрываем поле ввода имени персонажа, ГМу оно не нужно
    if (currentRole === 'dm') {
      if (netPlayerNameGroup) netPlayerNameGroup.style.display = 'none';
    } else {
      if (netPlayerNameGroup) netPlayerNameGroup.style.display = 'flex';
    }
  });
});

// ОБРАБОТКА КЛИКА ПО КНОПКЕ "ПОДКЛЮЧИТЬСЯ"
if (netConnectBtn) {
  netConnectBtn.addEventListener('click', () => {
    const roomId = document.getElementById('net-room-id').value.trim();
    const playerName = document.getElementById('net-player-name')?.value.trim();
    const screenRoot = document.querySelector('.screen-root');

    if (!roomId) {
      alert('Пожалуйста, введите ID Комнаты!');
      return;
    }

    if (currentRole === 'player' && !playerName) {
      alert('Пожалуйста, введите Имя персонажа!');
      return;
    }

    // Имитируем успешное подключение
    if (netStatus) {
      netStatus.textContent = `Статус: Подключен к ${roomId}`;
      netStatus.className = 'net-status online';
    }

    // Закрываем шторку сессии после подключения
    if (netSidebar) netSidebar.classList.remove('is-open');

    // ИЗЯЩНАЯ СМЕНА ЭКРАНОВ ЧЕРЕЗ КЛАССЫ
  if (currentRole === 'dm') {
    if (screenRoot) screenRoot.classList.add('dm-mode-active');
    if (dmScreen) dmScreen.style.display = 'block';

    // 1 Панель партии (Тестовые карточки)
    const partyListContainer = document.getElementById('dm-party-list');
    if (partyListContainer) {
      const testPlayers = [
        { name: "Торгар Железный", class: "Варвар / 5 ур.", hp: 58, maxHp: 65, ac: 16, pp: 12 },
        { name: "Варис Тень", class: "Плут / 5 ур.", hp: 34, maxHp: 39, ac: 17, pp: 16 },
        { name: "Лира Светоносная", class: "Хрец / 5 ур.", hp: 12, maxHp: 42, ac: 18, pp: 14 }
      ];

      partyListContainer.innerHTML = '';

      testPlayers.forEach(player => {
        const hpPercent = Math.max(0, Math.min(100, (player.hp / player.maxHp) * 100));
        const barColor = hpPercent < 30 ? '#ff3333' : '#22aa44';

        const playerCardHTML = `
          <div class="dm-player-card">
            <div class="dm-player-info">
              <span class="dm-player-name">${player.name}</span>
              <span class="dm-player-class">${player.class}</span>
            </div>
            <div class="dm-player-hp-bar">
              <div class="dm-hp-text">ХП: ${player.hp} / ${player.maxHp}</div>
              <div class="dm-hp-progress-bg">
                <div class="dm-hp-progress-fill" style="width: ${hpPercent}%; background-color: ${barColor};"></div>
              </div>
            </div>
            <div class="dm-player-stats">
              <div class="dm-stat-badge">
                <span class="label">КД</span>
                <span class="value">${player.ac}</span>
              </div>
              <div class="dm-stat-badge">
                <span class="label">ПВ</span>
                <span class="value">${player.pp}</span>
              </div>
            </div>
          </div>
        `;
        partyListContainer.insertAdjacentHTML('beforeend', playerCardHTML);
      });
    }
    // ==========================================
    // 📡 СЕТЕВОЙ ПРИЁМНИК ГМА (Синхронизация в реальном времени)
    // ==========================================
    const roomId = document.getElementById('room-id')?.value.trim();

    // Если ГМ ввёл ID комнаты перед включением режима, открываем сетевой шлюз
    if (roomId && !window.window_gameSocket) {
      window.window_gameSocket = new WebSocket(`wss://://piesocket.com{roomId}?api_key=VCpe6vCgSOfnH62309icC2Z9Al6gbe6p&notify=1`);

      window.window_gameSocket.onopen = () => {
        console.log(`[Сеть] ГМ успешно подключился к комнате: ${roomId}`);
      };

      window.window_gameSocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // Принимаем обновления от реальных игроков
          if (data.type === 'PLAYER_UPDATE') {
            const playerName = data.sender;
            const stats = data.payload;

            // Проверяем, есть ли уже на экране карточка этого сетевого игрока
            let netCard = document.querySelector(`[data-network-player="${playerName}"]`);

            const netHpPercent = Math.max(0, Math.min(100, (stats.hp / stats.maxHp) * 100));
            const netBarColor = netHpPercent < 30 ? '#ff3333' : '#22aa44';

            // Шаблон карточки, полностью повторяющий твою идеальную вёрстку на скриншоте!
            const netPlayerHTML = `
              <div class="dm-player-card" data-network-player="${playerName}">
                <div class="dm-player-info">
                  <span class="dm-player-name">${playerName}🌐</span>
                  <span class="dm-player-class">${stats.class} / ${stats.level} ур.</span>
                </div>
                <div class="dm-player-hp-bar">
                  <div class="dm-hp-text">ХП: ${stats.hp} / ${stats.maxHp}</div>
                  <div class="dm-hp-progress-bg">
                    <div class="dm-hp-progress-fill" style="width: ${netHpPercent}%; background-color: ${netBarColor};"></div>
                  </div>
                </div>
                <div class="dm-player-stats">
                  <div class="dm-stat-badge">
                    <span class="label">КД</span>
                    <span class="value">${stats.ac}</span>
                  </div>
                </div>
              </div>
            `;

            if (!netCard) {
              // Если игрок подключился впервые — добавляем его карточку на панель
              partyListContainer.insertAdjacentHTML('beforeend', netPlayerHTML);
            } else {
              // Если игрок уже есть — реактивно обновляем его ХП и КД прямо на экране ГМа!
              netCard.querySelector('.dm-hp-text').textContent = `ХП: ${stats.hp} / ${stats.maxHp}`;
              netCard.querySelector('.dm-hp-progress-fill').style.width = `${netHpPercent}%`;
              netCard.querySelector('.dm-hp-progress-fill').style.backgroundColor = netBarColor;
              netCard.querySelectorAll('.value')[0].textContent = stats.ac;
            }
          }
        } catch (e) {
          console.error('[Сеть] Ошибка обработки пакета игрока:', e);
        }
      };
    }
    } else {
      if (screenRoot) screenRoot.classList.remove('dm-mode-active');
      if (dmScreen) dmScreen.style.display = 'none';

      // Симулятор сети: Игрок сохраняет данные в локальную память браузера
      localStorage.setItem('connected_player_name', playerName);
      localStorage.setItem('connected_room_id', roomId);

      console.log(`[Сеть] Успешный вход в комнату: ${roomId}`);
    }
  });
}

// ====== ТРЕКЕР ИНИЦИАТИВЫ ГМА ======
  const initBtn = document.querySelector('.dm-initiative-panel .dm-btn-small:nth-child(1)');
  const resetInitBtn = document.querySelector('.dm-initiative-panel .dm-btn-small:nth-child(2)');
  const initiativeList = document.getElementById('dm-initiative-list');

  // Глобальный массив для текущего боя
  let activeCombatants = [];

  // Функция для отрисовки списка инициативы
  const renderInitiativeList = () => {
    if (!initiativeList) return;

    if (activeCombatants.length === 0) {
      initiativeList.innerHTML = '<div class="dm-empty-placeholder">Бой не начат</div>';
      return;
    }

    initiativeList.innerHTML = '';

    activeCombatants.forEach((unit, index) => {
      const activeClass = index === 0 ? 'active-turn' : '';
      const unitColor = unit.type === 'enemy' ? '#ff3333' : '#00ff66';

      const rowHTML = `
        <div class="init-row ${activeClass}" style="border-left: 3px solid ${unitColor}; margin-bottom: 8px; background: #1a0505; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; flex-direction: column;">
            <span style="color: #fff; font-weight: bold; font-size: 14px;">[${unit.initiative}] ${unit.name}</span>
            <span style="color: #888; font-size: 11px;">ХП: ${unit.hp}</span>
          </div>
          <div style="display: flex; gap: 5px;">
            <button class="dm-btn-small btn-hp-minus" data-index="${index}" style="padding: 2px 6px; font-size: 11px; margin: 0;">- ХП</button>
            <button class="dm-btn-small btn-hp-plus" data-index="${index}" style="padding: 2px 6px; font-size: 11px; margin: 0; border-color: #00aa44;">+ ХП</button>
          </div>
        </div>
      `;
      initiativeList.insertAdjacentHTML('beforeend', rowHTML);
    });

    // Логика кнопок изменения ХП внутри инициативы
    document.querySelectorAll('.btn-hp-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        let hpVal = parseInt(activeCombatants[idx].hp);
        if (!isNaN(hpVal)) {
          activeCombatants[idx].hp = Math.max(0, hpVal - 5);
          renderInitiativeList();
        }
      });
    });

    document.querySelectorAll('.btn-hp-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        let hpVal = parseInt(activeCombatants[idx].hp);
        if (!isNaN(hpVal)) {
          activeCombatants[idx].hp = hpVal + 5;
          renderInitiativeList();
        }
      });
    });
  };

  if (initBtn) {
    initBtn.addEventListener('click', () => {
      // При старте боя подтягиваем базовую партию
      activeCombatants = [
        { name: "Торгар Железный", type: "player", initiative: Math.floor(Math.random() * 20) + 1 + 2, hp: 58 },
        { name: "Варис Тень", type: "player", initiative: Math.floor(Math.random() * 20) + 1 + 4, hp: 34 },
        { name: "Лира Светоносная", type: "player", initiative: Math.floor(Math.random() * 20) + 1 + 1, hp: 12 }
      ];

      activeCombatants.sort((a, b) => b.initiative - a.initiative);
      renderInitiativeList();
    });
  }

  if (resetInitBtn) {
    resetInitBtn.addEventListener('click', () => {
      activeCombatants = [];
      renderInitiativeList();
    });
  }

  // Метод добавления монстров в бой (вызывается из справочника)
  window.addMonsterToInitiative = (monster) => {
    const defaultHp = parseInt(monster.hp) || 10;

    const newEnemy = {
      name: monster.name,
      type: "enemy",
      // Бросок d20 + Модификатор Ловкости монстра
      initiative: Math.floor(Math.random() * 20) + 1 + Math.floor((monster.stats.ЛОВ - 10) / 2),
      hp: defaultHp
    };

    activeCombatants.push(newEnemy);
    activeCombatants.sort((a, b) => b.initiative - a.initiative);
    renderInitiativeList();
  };

  // ====== СЛУШАТЕЛЬ ЖИВОГО ПОИСКА В СПРАВОЧНИКЕ ======
  const searchInput = document.querySelector('.dm-search-input');
  const compendiumBody = document.querySelector('.dm-compendium-panel .dm-card-body');

  const displayMonster = (monster) => {
    const resultContainer = document.getElementById('dm-compendium-results') || document.createElement('div');
    resultContainer.id = 'dm-compendium-results';
    resultContainer.style.marginTop = '15px';

    if (!monster) {
      resultContainer.innerHTML = '<div class="dm-empty-placeholder">Существо не найдено в бестиарии</div>';
      if (!document.getElementById('dm-compendium-results')) compendiumBody.appendChild(resultContainer);
      return;
    }

    let statsHTML = '<div style="display: flex; gap: 10px; margin: 10px 0; background: #150404; padding: 8px; border-radius: 4px; border: 1px solid #2d0b0b;">';
    for (const [key, value] of Object.entries(monster.stats)) {
      statsHTML += `<div style="text-align: center; flex: 1;"><span style="font-size: 10px; color: #888; display: block;">${key}</span><span style="font-size: 13px; color: #ff3333; font-weight: bold;">${value}</span></div>`;
    }
    statsHTML += '</div>';

    let actionsHTML = '<div style="margin-top: 10px;">';
    monster.actions.forEach(act => {
      actionsHTML += `<p style="margin: 4px 0; font-size: 13px;"><strong style="color: #ff3333;">${act.name}:</strong> <span style="color: #bbb;">${act.desc}</span></p>`;
    });
    actionsHTML += '</div>';

    resultContainer.innerHTML = `
      <div style="border-top: 1px solid #4a1111; padding-top: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
          <h4 style="margin: 0; color: #fff; font-size: 18px;">${monster.name}</h4>
          <button id="add-to-combat-btn" class="dm-btn-small" style="margin: 0; border-color: #00aa44; color: #00ff66;">⚔️ Добавить в бой</button>
        </div>
        <span style="font-size: 11px; color: #888; font-style: italic;">${monster.size}</span>
        
        <div style="display: flex; gap: 20px; margin-top: 10px; font-size: 13px; color: #aaa;">
          <span><strong>КД:</strong> <span style="color: #ff3333; font-weight: bold;">${monster.ac}</span></span>
          <span><strong>ХП:</strong> <span style="color: #00ff66;">${monster.hp}</span></span>
          <span><strong>Скорость:</strong> ${monster.speed}</span>
        </div>

        ${statsHTML}
        <h5 style="margin: 10px 0 5px 0; color: #ff3333; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Действия</h5>
        ${actionsHTML}
      </div>
    `;

    if (!document.getElementById('dm-compendium-results')) {
      compendiumBody.appendChild(resultContainer);
    }

    // Слушатель кнопки "Добавить в бой" внутри карточки монстра
    const addCombatBtn = document.getElementById('add-to-combat-btn');
    if (addCombatBtn) {
      const newBtn = addCombatBtn.cloneNode(true);
      addCombatBtn.parentNode.replaceChild(newBtn, addCombatBtn);

      newBtn.addEventListener('click', () => {
        if (typeof window.addMonsterToInitiative === 'function') {
          window.addMonsterToInitiative(monster);
        }
      });
    }
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();

      if (!query) {
        const res = document.getElementById('dm-compendium-results');
        if (res) res.innerHTML = '';
        return;
      }

      const foundMonster = monsterCompendium.find(m => m.name.toLowerCase().includes(query));
      displayMonster(foundMonster);
    });
  }

  // Симулятор локальной сети: Проверка подключения новых игроков каждые 2 секунды
  setInterval(() => {
    const dmScreenElement = document.getElementById('dm-screen-root');
    if (dmScreenElement && dmScreenElement.style.display === 'block') {
      const newPlayerName = localStorage.getItem('connected_player_name');
      const room = localStorage.getItem('connected_room_id');

      if (newPlayerName) {
        const partyContainer = document.getElementById('dm-party-list');
        if (partyContainer && !partyContainer.innerHTML.includes(newPlayerName)) {

          if (partyContainer.querySelector('.dm-empty-placeholder')) {
            partyContainer.innerHTML = '';
          }

          const customPlayerHTML = `
            <div class="dm-player-card">
              <div class="dm-player-info">
                <span class="dm-player-name">${newPlayerName}</span>
                <span class="dm-player-class">Подключенный игрок / Комната: ${room}</span>
              </div>
              <div class="dm-player-hp-bar">
                <div class="dm-hp-text">ХП: 45 / 45</div>
                <div class="dm-hp-progress-bg">
                  <div class="dm-hp-progress-fill" style="width: 100%; background-color: #22aa44;"></div>
                </div>
              </div>
              <div class="dm-player-stats">
                <div class="dm-stat-badge"><span class="label">КД</span><span class="value">15</span></div>
                <div class="dm-stat-badge"><span class="label">ПВ</span><span class="value">12</span></div>
              </div>
            </div>
          `;
          partyContainer.insertAdjacentHTML('beforeend', customPlayerHTML);
          localStorage.removeItem('connected_player_name');
        }
      }
    }
  }, 2000);
