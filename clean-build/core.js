// ===== CORE RULE ENGINE =====
// Pure math, rule logic, resource management, and validation functions.
// All functions are globally scoped via `function` declarations.

// ===== SAFE GLOBAL INITIALIZATION =====
// Prevent ReferenceError in other scripts if these are accessed before assignment
window.totalCountSpells = window.totalCountSpells || 0;
window.totalAmountSpells = window.totalAmountSpells || 0;

// ===== MATH =====

function calculateModifier(score) {
    return Math.floor((score - 10) / 2);
}

function calculateProficiencyBonus(level) {
    return PHB_TABLES.proficiencyBonus[Math.max(1, Math.min(20, level))];
}

function calculateAC(characterState) {
    if (!characterState) return { value: 10, breakdown: '10 (База)' };

    const cls = characterState.class || '';
    const dexMod = calculateModifier((characterState.abilities.dex || 10) + (RACE_STATS[characterState.race] && RACE_STATS[characterState.race].dex || 0) + getTotalFeatBonus('dex'));
    const conMod = calculateModifier((characterState.abilities.con || 10) + (RACE_STATS[characterState.race] && RACE_STATS[characterState.race].con || 0) + getTotalFeatBonus('con'));
    const wisMod = calculateModifier((characterState.abilities.wis || 10) + (RACE_STATS[characterState.race] && RACE_STATS[characterState.race].wis || 0) + getTotalFeatBonus('wis'));

    // Find equipped armor and shield from inventory
    var equippedArmor = null;
    var equippedShield = false;
    if (characterState.inventory) {
        characterState.inventory.forEach(function(item) {
            if (item.isEquipped && item.type === 'armor') {
                equippedArmor = BASE_ITEMS[item.key];
            }
            if (item.isEquipped && item.type === 'shield') {
                equippedShield = true;
            }
        });
    }

    // Also check legacy state
    if (!equippedArmor && characterState.armor) {
        if (characterState.armor === 'Light armor') equippedArmor = { name: 'Лёгкая броня', baseAC: 11, dexBonus: true };
        else if (characterState.armor === 'Medium armor') equippedArmor = { name: 'Средняя броня', baseAC: 14, dexBonus: 'max(2)' };
        else if (characterState.armor === 'Heavy armor') equippedArmor = { name: 'Тяжёлая броня', baseAC: 16 };
    }
    if (!equippedShield && characterState.hasShield) equippedShield = true;

    // Build breakdown parts
    var parts = [];
    var finalAC = 0;

    // Unarmored defense (barbarian/monk) when no armor equipped
    if (cls === 'barbarian' && !equippedArmor) {
        finalAC = 10 + dexMod + conMod;
        parts.push('10 (База)');
        parts.push((dexMod >= 0 ? '+' : '') + dexMod + ' (Ловкость)');
        parts.push((conMod >= 0 ? '+' : '') + conMod + ' (Телосложение)');
        if (equippedShield) { finalAC += 2; parts.push('+2 (Щит)'); }
        return { value: finalAC, breakdown: parts.join(' + ') };
    }

    if (cls === 'monk' && !equippedArmor) {
        finalAC = 10 + dexMod + Math.max(0, wisMod);
        parts.push('10 (База)');
        parts.push((dexMod >= 0 ? '+' : '') + dexMod + ' (Ловкость)');
        parts.push('+' + Math.max(0, wisMod) + ' (Мудрость)');
        if (equippedShield) { finalAC += 2; parts.push('+2 (Щит)'); }
        return { value: finalAC, breakdown: parts.join(' + ') };
    }

    // Calculate armor AC — track base and dex separately for breakdown
    var armorBase = 10;
    var armorName = 'Без брони';
    var dexAdd = dexMod;

    if (equippedArmor) {
        armorBase = equippedArmor.baseAC || 11;
        armorName = equippedArmor.name || 'Доспех';

        if (equippedArmor.dexBonus === true) {
            dexAdd = dexMod;
        } else if (equippedArmor.dexBonus === 'max(2)') {
            dexAdd = Math.min(2, dexMod);
        } else {
            dexAdd = 0;
        }
    }

    // Lizardfolk: take max of natural armor and equipped armor
    if (characterState.race === 'lizardfolk') {
        var naturalAC = 13 + dexMod;
        var equippedAC = armorBase + dexAdd;
        if (naturalAC > equippedAC) {
            armorBase = 13;
            armorName = 'Природная броня';
            dexAdd = dexMod;
        }
    }

    parts.push(armorBase + ' (' + armorName + ')');
    if (dexAdd !== 0) parts.push((dexAdd >= 0 ? '+' : '') + dexAdd + ' (Ловкость)');
    if (equippedShield) parts.push('+2 (Щит)');

    finalAC = armorBase + dexAdd;
    if (equippedShield) finalAC += 2;

    // Defense fighting style
    if (characterState.fightingStyle === 'defense') {
        finalAC += 1;
        parts.push('+1 (Defense)');
    }

    return { value: finalAC, breakdown: parts.join(' + ') };
}

function calculateHitPoints(level, conMod, classKey) {
    if (level <= 0) return 0;
    if (!classKey || classKey === '') return 0;

    const hitDie = CLASS_HIT_DIE[classKey] || 8;
    const raceBonus = RACE_HP_BONUS[characterState.race] || 0;

    // Level 1: max hit die + CON mod + race bonus
    let total = hitDie + conMod + raceBonus;

    // Levels 2+: average (hitDie/2 + 1) + CON mod + race bonus per level
    for (let i = 2; i <= level; i++) {
        total += Math.floor(hitDie / 2) + 1 + conMod + raceBonus;
    }

    return Math.max(total, level);
}

function calculateSpellSlots(level) {
    const sub = characterState.subclass || '';
    const isHalfCaster = (sub === 'eldritch_knight' || sub === 'arcane_trickster');
    const slotTable = isHalfCaster ? {
        1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        2: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [2, 0, 0, 0, 0, 0, 0, 0, 0],
        4: [3, 0, 0, 0, 0, 0, 0, 0, 0],
        5: [3, 0, 0, 0, 0, 0, 0, 0, 0],
        6: [4, 0, 0, 0, 0, 0, 0, 0, 0],
        7: [4, 2, 0, 0, 0, 0, 0, 0, 0],
        8: [4, 2, 0, 0, 0, 0, 0, 0, 0],
        9: [4, 3, 0, 0, 0, 0, 0, 0, 0],
        10: [4, 3, 0, 0, 0, 0, 0, 0, 0],
        11: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        12: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        13: [4, 3, 3, 0, 0, 0, 0, 0, 0],
        14: [4, 3, 3, 0, 0, 0, 0, 0, 0],
        15: [4, 3, 3, 1, 0, 0, 0, 0, 0],
        16: [4, 3, 3, 1, 0, 0, 0, 0, 0],
        17: [4, 3, 3, 1, 1, 0, 0, 0, 0],
        18: [4, 3, 3, 2, 1, 0, 0, 0, 0],
        19: [4, 3, 3, 2, 1, 0, 0, 0, 0],
        20: [4, 3, 3, 2, 1, 1, 0, 0, 0]
    } : {
        1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
        2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
        4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
        5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
        7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
        8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
        9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
        10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
        11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
        12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
        13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
        14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
        15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
        16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
        17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
        19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
        20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
    };
    return slotTable[level] || [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

// ===== SPELL RULES =====

function getSpellSaveDC() {
    const abilityKey = getSpellcastingAbility();
    if (!abilityKey) return 0;
    const base = characterState.abilities[abilityKey] || 10;
    const raceBonus = RACE_STATS[characterState.race] && RACE_STATS[characterState.race][abilityKey] || 0;
    const featBonus = getTotalFeatBonus(abilityKey);
    const mod = calculateModifier(base + raceBonus + featBonus);
    return 8 + characterState.proficiencyBonus + mod;
}

function getSpellAttackBonus() {
    const abilityKey = getSpellcastingAbility();
    if (!abilityKey) return 0;
    const base = characterState.abilities[abilityKey] || 10;
    const raceBonus = RACE_STATS[characterState.race] && RACE_STATS[characterState.race][abilityKey] || 0;
    const featBonus = getTotalFeatBonus(abilityKey);
    const mod = calculateModifier(base + raceBonus + featBonus);
    return characterState.proficiencyBonus + mod;
}

// ===== SPELL BUCKETS =====

function getRequiredSpellBuckets() {
    var cls = characterState.class || '';
    var sub = characterState.subclass || '';
    var level = characterState.level;
    if (!cls || !level) return [];

    var progression = CLASS_SPELL_PROGRESSION[cls];
    if (!progression || !progression[level]) return [];

    var cantripsCount = progression[level].cantrips || 0;
    var spellsCount = progression[level].spells || 0;

    // Prepared casters: spells = level + mod (cleric, druid) or floor(level/2) + mod (paladin, ranger, artificer)
    var fullPrepared = ['cleric', 'druid'];
    var halfPrepared = ['paladin', 'ranger', 'artificer'];

    if (fullPrepared.indexOf(cls) !== -1) {
        var statKey = (cls === 'wizard') ? 'int' : 'wis';
        var baseStat = characterState.abilities[statKey] || 10;
        var raceBonus = (RACE_STATS[characterState.race] && RACE_STATS[characterState.race][statKey]) || 0;
        var featBonus = getTotalFeatBonus(statKey);
        var effectiveStat = baseStat + raceBonus + featBonus;
        spellsCount = Math.max(1, level + calculateModifier(effectiveStat));
    } else if (halfPrepared.indexOf(cls) !== -1) {
        var hStatKey = 'wis';
        if (cls === 'paladin') hStatKey = 'cha';
        else if (cls === 'artificer') hStatKey = 'int';
        var hBaseStat = characterState.abilities[hStatKey] || 10;
        var hRaceBonus = (RACE_STATS[characterState.race] && RACE_STATS[characterState.race][hStatKey]) || 0;
        var hFeatBonus = getTotalFeatBonus(hStatKey);
        var hEffectiveStat = hBaseStat + hRaceBonus + hFeatBonus;
        spellsCount = Math.max(1, Math.floor(level / 2) + calculateModifier(hEffectiveStat));
    }

    // PHB: Bard Magical Secrets (10, 14, 18) are INCLUDED in the progression table total.
    // Subtract them from the base bucket so separate secret buckets account for the full limit.
    if (cls === 'bard') {
        var phbSecretsCount = 0;
        if (level >= 10) phbSecretsCount += 2;
        if (level >= 14) phbSecretsCount += 2;
        if (level >= 18) phbSecretsCount += 2;
        spellsCount = spellsCount - phbSecretsCount;
    }

    // Half-caster subclasses (EK, AT) use progression table
    var isHalfCaster = (sub === 'eldritch_knight' || sub === 'arcane_trickster');
    if (isHalfCaster) {
        var hcProg = CLASS_SPELL_PROGRESSION[sub];
        if (hcProg && hcProg[level]) {
            cantripsCount = hcProg[level].cantrips || 0;
            spellsCount = hcProg[level].spells || 0;
        }
    }

    var buckets = [];

    // Totem Warrior ritual spells (Spirit Seeker feature) - always available as rituals
    if (cls === 'barbarian' && sub === 'totem_warrior' && level >= 3) {
        // Level 3: Speak with Animals, Beast Sense. Level 10: Commune with Nature.
        var ritualCount = level >= 10 ? 3 : 2;
        buckets.push({ key: 'totem_rituals', limit: ritualCount, type: 'ritual', label: 'Ритуальные заклинания' });
    }

    // Cantrip bucket (spell.level === 0 or 'cantrip')
    if (cantripsCount > 0) {
        buckets.push({ key: 'class_cantrips', limit: cantripsCount, type: 'cantrip' });
    }

    // Spell bucket (spell.level >= 1)
    if (spellsCount > 0) {
        var isPrepared = fullPrepared.indexOf(cls) !== -1 || halfPrepared.indexOf(cls) !== -1;
        buckets.push({
            key: 'class_base',
            limit: spellsCount,
            type: 'spell',
            label: isPrepared ? 'Подготовленные заклинания' : 'Известные заклинания'
        });
    }

    // Bard magical secrets
    if (cls === 'bard') {
        // College of Lore bonus — OUTSIDE the PHB table limit (+2 at level 6)
        if (sub === 'college_of_lore' && level >= 6) buckets.push({ key: 'magical_secrets_6', limit: 2, type: 'secret' });
        // PHB base Magical Secrets — already subtracted from class_base above
        if (level >= 10) buckets.push({ key: 'magical_secrets_10', limit: 2, type: 'secret' });
        if (level >= 14) buckets.push({ key: 'magical_secrets_14', limit: 2, type: 'secret' });
        if (level >= 18) buckets.push({ key: 'magical_secrets_18', limit: 2, type: 'secret' });
    }

    return buckets;
}

function _findSpellInLibrary(spellName) {
    if (!spellName) return null;
    var allLevels = Object.keys(SPELL_LIBRARY);
    for (var i = 0; i < allLevels.length; i++) {
        for (var j = 0; j < SPELL_LIBRARY[allLevels[i]].length; j++) {
            if (SPELL_LIBRARY[allLevels[i]][j].name === spellName) return SPELL_LIBRARY[allLevels[i]][j];
        }
    }
    return null;
}

function getKnownSpells() {
    var result = {};
    var base = characterState.spellBuckets.class_base || [];
    base.forEach(function(name) {
        var spell = _findSpellInLibrary(name);
        if (!spell) return;
        var lv = spell.level;
        if (!result[lv]) result[lv] = [];
        result[lv].push(name);
    });
    return result;
}

function getMagicalSecrets() {
    var result = [];
    var buckets = getRequiredSpellBuckets();
    buckets.forEach(function(b) {
        if (b.key.indexOf('magical_secrets') === 0) {
            (characterState.spellBuckets[b.key] || []).forEach(function(n) { result.push(n); });
        }
    });
    return result;
}

function setKnownSpells(obj) {
    var spells = [];
    Object.keys(obj).forEach(function(k) { (obj[k] || []).forEach(function(n) { spells.push(n); }); });
    characterState.spellBuckets.class_base = spells;
}

function setMagicalSecrets(arr) {
    var buckets = getRequiredSpellBuckets();
    buckets.forEach(function(b) {
        if (b.key.indexOf('magical_secrets') === 0) characterState.spellBuckets[b.key] = [];
    });
    if (arr && arr.length > 0) {
        var buckets2 = getRequiredSpellBuckets();
        var idx = 0;
        buckets2.forEach(function(b) {
            if (b.key.indexOf('magical_secrets') !== 0) return;
            for (var i = 0; i < b.limit && idx < arr.length; i++, idx++) {
                if (!(characterState.spellBuckets[b.key])) characterState.spellBuckets[b.key] = [];
                characterState.spellBuckets[b.key].push(arr[idx]);
            }
        });
    }
}

function addSpellToKnown(spellName) {
    if (!characterState.spellBuckets.class_base) characterState.spellBuckets.class_base = [];
    if (characterState.spellBuckets.class_base.indexOf(spellName) === -1) characterState.spellBuckets.class_base.push(spellName);
}

function removeSpellFromKnown(spellName) {
    var base = characterState.spellBuckets.class_base || [];
    var idx = base.indexOf(spellName);
    if (idx !== -1) base.splice(idx, 1);
    characterState.spellBuckets.class_base = base;
}

function addSpellToSecrets(spellName) {
    var buckets = getRequiredSpellBuckets();
    for (var i = 0; i < buckets.length; i++) {
        if (buckets[i].key.indexOf('magical_secrets') !== 0) continue;
        var arr = characterState.spellBuckets[buckets[i].key] || [];
        if (arr.length < buckets[i].limit && arr.indexOf(spellName) === -1) {
            arr.push(spellName);
            characterState.spellBuckets[buckets[i].key] = arr;
            return true;
        }
    }
    return false;
}

function removeSpellFromSecrets(spellName) {
    var buckets = getRequiredSpellBuckets();
    for (var i = 0; i < buckets.length; i++) {
        if (buckets[i].key.indexOf('magical_secrets') !== 0) continue;
        var arr = characterState.spellBuckets[buckets[i].key] || [];
        var idx = arr.indexOf(spellName);
        if (idx !== -1) { arr.splice(idx, 1); characterState.spellBuckets[buckets[i].key] = arr; return; }
    }
}

function countBaseSpells() {
    var base = characterState.spellBuckets.class_base || [];
    var count = 0;
    base.forEach(function(name) { var s = _findSpellInLibrary(name); if (s && s.level !== 'cantrip') count++; });
    return count;
}

function countBaseCantrips() {
    var cantrips = characterState.spellBuckets.class_cantrips || [];
    return cantrips.length;
}

function countAllMagicalSecrets() {
    return getMagicalSecrets().length;
}

function hasKnownAtLevel(levelKey) {
    var base = characterState.spellBuckets.class_base || [];
    return base.some(function(name) { var s = _findSpellInLibrary(name); return s && s.level === levelKey; });
}

function hasSecretAtLevel(levelKey) {
    var secrets = getMagicalSecrets();
    return secrets.some(function(name) { var s = _findSpellInLibrary(name); return s && s.level === levelKey; });
}

function getAllKnownSpellNames() {
    var names = [];
    var base = characterState.spellBuckets.class_base || [];
    base.forEach(function(n) { names.push(n); });
    var secrets = getMagicalSecrets();
    secrets.forEach(function(n) { if (names.indexOf(n) === -1) names.push(n); });
    return names;
}

function isSpellMagicalSecret(spellName) {
    return getMagicalSecrets().indexOf(spellName) !== -1;
}

function migrateToSpellBuckets() {
    // Full migration from knownSpells/magicalSecrets
    if (characterState.knownSpells || characterState.magicalSecrets) {
        characterState.spellBuckets = {};
        var buckets = getRequiredSpellBuckets();
        buckets.forEach(function(b) { characterState.spellBuckets[b.key] = []; });
        if (characterState.knownSpells) {
            Object.keys(characterState.knownSpells).forEach(function(k) {
                (characterState.knownSpells[k] || []).forEach(function(n) {
                    if (!n) return;
                    var sp = _findSpellInLibrary(n);
                    var isCantrip = sp && (sp.level === 'cantrip' || sp.level === 0 || sp.level === '0');
                    var targetBucket = isCantrip ? 'class_cantrips' : 'class_base';
                    if ((characterState.spellBuckets[targetBucket]).indexOf(n) === -1) {
                        characterState.spellBuckets[targetBucket].push(n);
                    }
                });
            });
        }
        if (characterState.magicalSecrets) {
            var si = 0;
            buckets.forEach(function(b) {
                if (b.key.indexOf('magical_secrets') !== 0) return;
                for (var i = 0; i < b.limit && si < characterState.magicalSecrets.length; i++, si++) {
                    characterState.spellBuckets[b.key].push(characterState.magicalSecrets[si]);
                }
            });
        }
        delete characterState.knownSpells;
        delete characterState.magicalSecrets;
        return;
    }

    // Incremental migration: split cantrips from class_base into class_cantrips
    if (characterState.spellBuckets && characterState.spellBuckets.class_base && !characterState.spellBuckets.class_cantrips) {
        characterState.spellBuckets.class_cantrips = [];
        var baseArr = characterState.spellBuckets.class_base;
        var remaining = [];
        baseArr.forEach(function(n) {
            var sp = _findSpellInLibrary(n);
            var isCantrip = sp && (sp.level === 'cantrip' || sp.level === 0 || sp.level === '0');
            if (isCantrip) {
                characterState.spellBuckets.class_cantrips.push(n);
            } else {
                remaining.push(n);
            }
        });
        characterState.spellBuckets.class_base = remaining;
    }

    // Incremental migration: remove "Помощь" (aid) from magical_secrets buckets — it's now a native bard spell
    if (characterState.spellBuckets) {
        var aidToRemove = ['Помощь', 'aid', 'Aid'];
        for (var msKey in characterState.spellBuckets) {
            if (msKey.indexOf('magical_secrets') !== 0) continue;
            var msArr = characterState.spellBuckets[msKey];
            if (!Array.isArray(msArr)) continue;
            var cleaned = msArr.filter(function(sn) { return aidToRemove.indexOf(sn) === -1; });
            if (cleaned.length !== msArr.length) {
                characterState.spellBuckets[msKey] = cleaned;
            }
        }
    }
}


function getSpellOverLimit() {
    const cls = characterState.class || '';
    const level = characterState.level;
    const progression = CLASS_SPELL_PROGRESSION[cls];
    if (!progression || !progression[level]) return 0;

    var buckets = getRequiredSpellBuckets();
    if (buckets.length === 0) return 0;

    var cantripLimit = 0, cantripOver = 0, baseLimit = 0, baseOver = 0;

    buckets.forEach(function(b) {
        if (b.type === 'cantrip') {
            cantripLimit = b.limit;
            cantripOver = Math.max(0, countBaseCantrips() - cantripLimit);
        } else if (b.type === 'spell') {
            baseLimit = b.limit;
            baseOver = Math.max(0, countBaseSpells() - baseLimit);
        }
    });

    if (cantripOver > 0 || baseOver > 0) {
        var parts = [];
        if (cantripOver > 0) parts.push(cantripOver + ' cantrip(s) over (max ' + cantripLimit + ')');
        if (baseOver > 0) parts.push(baseOver + ' spell(s) over (max ' + baseLimit + ')');
        return parts.join(', ');
    }
    return 0;
}

// ===== RESOURCE INITIALIZATION =====

function initHitDice() {
    const cls = characterState.class;
    if (!cls) {
        characterState.hitDiceRemaining = 0;
        characterState.hitDicePool = 0;
        return;
    }
    characterState.hitDicePool = characterState.level;
    characterState.hitDiceRemaining = characterState.hitDicePool;
}

function initSpellSlots() {
    const cls = characterState.class;
    if (!cls) {
        for (let i = 1; i <= 9; i++) {
            characterState.spellSlots[i] = 0;
            characterState.maxSpellSlots[i] = 0;
        }
        return;
    }
    const slots = calculateSpellSlots(characterState.level);
    for (let i = 0; i < 9; i++) {
        const level = (i + 1).toString();
        characterState.maxSpellSlots[level] = slots[i];
        characterState.spellSlots[level] = slots[i];
    }
}

// ===== RULE LOGIC =====

function buildSenseBreakdown(mod, abilityKey, profAdd, expertiseAdd, joatAdd) {
    var parts = ['10 (База)'];
    var abilityNames = { WIS: 'МУД', INT: 'ИНТ', DEX: 'ЛОВ', STR: 'СИЛ', CON: 'ТЕЛ', CHA: 'ХАР' };
    var abilityName = abilityNames[abilityKey] || abilityKey;
    parts.push((mod >= 0 ? '+' : '') + mod + ' (' + abilityName + ')');
    if (profAdd > 0) parts.push('+' + profAdd + ' (Владение)');
    if (expertiseAdd > 0) parts.push('+' + expertiseAdd + ' (Компетентность)');
    if (joatAdd !== undefined && joatAdd > 0) parts.push('+' + joatAdd + ' (JOAT)');
    return parts.join(' + ');
}

// Master of All Trades: Bard level 2+ grants floor(profBonus/2) to non-proficient skill checks
function getJoatBonus() {
    if (characterState.class !== 'bard' || characterState.level < 2 || !characterState.isConfirmed) return 0;
    return Math.floor(characterState.proficiencyBonus / 2);
}

// Expertise limit: 2 skills at level 3+, 4 skills at level 10+
function getExpertiseLimit() {
    if (characterState.level >= 10) return 4;
    if (characterState.level >= 3) return 2;
    return 0;
}

// HP gained when leveling up (for levels 2+)
function getHPGainAtLevel(level, classKey) {
    if (level <= 1 || !classKey) return 0;
    const hitDie = CLASS_HIT_DIE[classKey] || 8;
    const conMod = calculateModifier(characterState.abilities.con || 10);
    const raceBonus = RACE_HP_BONUS[characterState.race] || 0;
    return Math.floor(hitDie / 2) + 1 + conMod + raceBonus;
}

// ===== VALIDATION =====

// Check if level-up is allowed (blocks Bard Swords level 4+ without fighting style)
function checkLevelUpRequirements(newLevel) {
    if (newLevel < 1 || newLevel > 20) return false;
    if (characterState.class === 'bard' && characterState.subclass === 'SWORDS' && newLevel >= 4 && !characterState.fightingStyle) {
        return false;
    }
    return true;
}

// ===== FEATS =====

function findFeatInLibrary(featName) {
    if (!featName) return null;
    for (var i = 0; i < FEATS_LIBRARY.length; i++) {
        if (FEATS_LIBRARY[i].name.toLowerCase() === featName.toLowerCase()) return FEATS_LIBRARY[i];
    }
    return null;
}

// ===== FEAT STAT BONUS TRACKING =====

function addFeatStatBonus(abilityKey, featNameRu) {
    if (!characterState.featStatBonuses[abilityKey]) {
        characterState.featStatBonuses[abilityKey] = [];
    }
    characterState.featStatBonuses[abilityKey].push({ nameRu: featNameRu, bonus: 1 });
}

function removeFeatStatBonus(abilityKey, featNameRu) {
    if (!characterState.featStatBonuses[abilityKey]) return;
    characterState.featStatBonuses[abilityKey] = characterState.featStatBonuses[abilityKey].filter(function(entry) {
        return entry.nameRu !== featNameRu;
    });
    if (characterState.featStatBonuses[abilityKey].length === 0) {
        delete characterState.featStatBonuses[abilityKey];
    }
}

function getTotalFeatBonus(abilityKey) {
    var entries = characterState.featStatBonuses[abilityKey];
    if (!entries || !entries.length) return 0;
    var total = 0;
    entries.forEach(function(entry) { total += entry.bonus; });
    return total;
}

function getFeatBonusTooltip(abilityKey) {
    var entries = characterState.featStatBonuses[abilityKey];
    if (!entries || !entries.length) return '';
    var parts = [];
    entries.forEach(function(entry) {
        parts.push('Бонус от черты: ' + entry.nameRu + ' (+' + entry.bonus + ')');
    });
    return parts.join(' | ');
}

// ===== SPECIAL LOGIC ENGINE =====

function getSubclassSpecialLogic() {
    var cls = characterState.class;
    var sub = characterState.subclass;
    if (!cls || !sub || !subclassData || !subclassData[cls]) return [];
    var options = subclassData[cls].options;
    if (!options) return [];
    for (var i = 0; i < options.length; i++) {
        if (options[i].value === sub && options[i].specialLogic) {
            return options[i].specialLogic;
        }
    }
    return [];
}

function applySpecialLogic() {
    var tags = getSubclassSpecialLogic();
    var lvl = characterState.level;
    var hasTag = function(t) { return tags.indexOf(t) !== -1; };

    // EXTRA ATTACK: attacksPerAction = 2 at level >= 5 (Fighter) or >= 6 (Bard etc.)
    if (hasTag('extra_attack_5')) {
        characterState.attacksPerAction = lvl >= 5 ? 2 : 1;
    } else if (hasTag('extra_attack_6')) {
        characterState.attacksPerAction = lvl >= 6 ? 2 : 1;
    } else {
        characterState.attacksPerAction = characterState.attacksPerAction || 1;
    }

    // EXTRA SKILLS: bonus skill slots (e.g. Lore +3)
    if (hasTag('extra_skills_3')) {
        characterState._bonusSkillSlots = 3;
    } else {
        characterState._bonusSkillSlots = 0;
    }

    // ADDITIONAL MAGICAL SECRETS: grant 2 bonus secrets at level >= 6
    if (hasTag('additional_magical_secrets_6') && lvl >= 6) {
        characterState._bonusMagicalSecrets = 2;
    } else {
        characterState._bonusMagicalSecrets = 0;
    }
}

function rollD20() {
    return Math.floor(Math.random() * 20) + 1;
}

function getSkillBonus(skillName) {
    if (!characterState.isConfirmed) return 0;
    const skillEntry = PHB_TABLES.skillsData[skillName];
    if (!skillEntry) return 0;
    const abilityKey = skillEntry.key;
    const base = characterState.abilities[abilityKey] || 10;
    const raceBonus = RACE_STATS[characterState.race] && RACE_STATS[characterState.race][abilityKey] || 0;
    const featBonus = getTotalFeatBonus(abilityKey);
    const mod = calculateModifier(base + raceBonus + featBonus);
    const isProficient = !!characterState.proficientSkills[skillName];
    const isExpertise = isProficient && !!characterState.expertiseSkills[skillName];
    const profBonus = isProficient ? characterState.proficiencyBonus : 0;
    const expertiseBonus = isExpertise ? characterState.proficiencyBonus : 0;
    return mod + profBonus + expertiseBonus;
}
