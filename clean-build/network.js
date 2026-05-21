// ==========================================
// 📡 ИЗОЛИРОВАННЫЙ СЕТЕВОЙ МОДУЛЬ «LORE WEAVER»
// ==========================================
window.window_mqttClient = null;

// Функция ИГРОКА: собирает статы напрямую по тексту на экране
window.sendCharacterNetworkData = function() {
  const currentRoomId = document.getElementById('room-id')?.value.trim();
  const currentPlayerName = document.getElementById('player-name')?.value.trim();
  const partyListContainer = document.getElementById('dm-party-list');

  // Если это экран ГМа, игроку отсюда слать ничего не нужно
  if (partyListContainer || !currentRoomId || !currentPlayerName || !window.window_mqttClient || !window.window_mqttClient.isConnected()) return;

  let currentHp = 10;
  let maxHp = 10;
  let armorClass = 10;
  let charClass = 'Игрок';
  let charLevel = 1;

  // Парсим ХП из текста страницы (например, "13 / 13")
  const hpMatch = document.body.innerText.match(/(\d+)\s*\/\s*(\d+)/);
  if (hpMatch) {
    currentHp = parseInt(hpMatch[1]) || 10;
    maxHp = parseInt(hpMatch[2]) || 10;
  }

  // Парсим КД
  const acMatch = document.body.innerText.match(/КД\s*:\s*(\d+)/i) || document.body.innerText.match(/(\d+)\s*КД/i);
  if (acMatch) {
    armorClass = parseInt(acMatch[1]) || 10;
  }

  if (typeof characterState !== 'undefined') {
    if (characterState.class) charClass = characterState.class;
    if (characterState.level) charLevel = parseInt(characterState.level) || 1;
  }

  const packet = JSON.stringify({
    type: 'PLAYER_UPDATE',
    sender: currentPlayerName,
    payload: { hp: currentHp, maxHp: maxHp, ac: armorClass, class: charClass, level: charLevel }
  });

  try {
    const message = new Paho.MQTT.Message(packet);
    message.destinationName = `lw_vtt_global_room_${currentRoomId}`;
    window.window_mqttClient.send(message);
    console.log(`%c[Сеть ПЕРЕДАТЧИК] Отправлен пакет от Игрока (${currentPlayerName})`, 'color: #00ff00; font-weight: bold;');
  } catch (e) {
    console.error('[Сеть] Ошибка отправки пакета:', e);
  }
};

// Функция инициализации сети MQTT
window.initNetworkSession = function(roomId, playerName) {
  if (!roomId) return;
  if (typeof Paho === 'undefined') {
    console.error('[Сеть] Библиотека Paho MQTT не найдена!');
    return;
  }

  if (window.window_mqttClient && window.window_mqttClient.isConnected()) {
    window.window_mqttClient.disconnect();
  }

  const clientId = 'lw_client_' + Math.random().toString(36).substring(2, 10);
  window.window_mqttClient = new Paho.MQTT.Client('://hivemq.com', 8884, '/mqtt', clientId);

  window.window_mqttClient.onMessageArrived = (message) => {
    try {
      const data = JSON.parse(message.payloadString);
      const partyListContainer = document.getElementById('dm-party-list');
      
      if (partyListContainer && data.type === 'PLAYER_UPDATE') {
        const pName = data.sender;
        const stats = data.payload;
        
        console.log(`%c[Сеть ПРИЁМНИК ГМА] Получен пакет от: ${pName}`, 'color: #00ffff; font-weight: bold;', stats);

        if (partyListContainer.textContent.includes('Ожидание подключения')) partyListContainer.innerHTML = '';
        
        let netCard = partyListContainer.querySelector(`[data-network-player="${pName}"]`);
        const netHpPercent = Math.max(0, Math.min(100, (stats.hp / stats.maxHp) * 100));
        const netBarColor = netHpPercent < 30 ? '#ff3333' : '#22aa44';

        const netPlayerHTML = `
          <div class="dm-player-card" data-network-player="${pName}">
            <div class="dm-player-info">
              <span class="dm-player-name">${pName} 🌐</span>
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
                <span class="value net-ac-val">${stats.ac}</span>
              </div>
            </div>
          </div>
        `;

        if (!netCard) {
          partyListContainer.insertAdjacentHTML('beforeend', netPlayerHTML);
        } else {
          netCard.querySelector('.dm-hp-text').textContent = `ХП: ${stats.hp} / ${stats.maxHp}`;
          const hpFill = netCard.querySelector('.dm-hp-progress-fill');
          if (hpFill) {
            hpFill.style.width = `${netHpPercent}%`;
            hpFill.style.backgroundColor = netBarColor;
          }
          const acVal = netCard.querySelector('.net-ac-val');
          if (acVal) acVal.textContent = stats.ac;
        }
      }
    } catch (e) {
      console.error('[Сеть] Ошибка парсинга сообщения:', e);
    }
  };

  window.window_mqttClient.connect({
    onSuccess: () => {
      console.log(`%c[Сеть] ПОДКЛЮЧЕНО К СЕРВЕРУ! Комната: ${roomId}`, 'color: #00ff00; font-weight: bold;');
      window.window_mqttClient.subscribe(`lw_vtt_global_room_${roomId}`);

      const partyListContainer = document.getElementById('dm-party-list');
      if (!partyListContainer && playerName) {
        setTimeout(() => {
          if (typeof window.sendCharacterNetworkData === 'function') window.sendCharacterNetworkData();
        }, 500);
      }
    },
    onFailure: (err) => console.error('[Сеть] Ошибка коннекта:', err),
    useSSL: true
  });
};

// Перехватчик клика по кнопке подключения
document.addEventListener('click', (e) => {
  if (e.target && (e.target.id === 'netConnectBtn' || e.target.textContent.includes('ПОДКЛЮЧИТЬСЯ'))) {
    setTimeout(() => {
      const roomId = document.getElementById('room-id')?.value.trim();
      const playerName = document.getElementById('player-name')?.value.trim();
      if (roomId) {
        console.log(`[Сеть] Запуск сессии для комнаты: ${roomId}`);
        window.initNetworkSession(roomId, playerName);
      }
    }, 150);
  }
});

// Реактивный триггер апдейта ХП на клики
document.addEventListener('click', () => {
  setTimeout(() => {
    if (typeof window.sendCharacterNetworkData === 'function') window.sendCharacterNetworkData();
  }, 100);
});
