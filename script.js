/* ==========================================================================
   1. ESTRUTURA DE DADOS DA ROTINA SEMANAL
   ========================================================================== */
const WORKOUT_ROUTINE = {
  segunda: {
    title: "Segunda-Feira",
    modalities: "Peito • Tríceps • Ombro + Jiu-Jitsu",
    exercises: [
      { id: "seg_1", name: "Supino Reto", sets: "4 séries × 8–12 reps", type: "weight" },
      { id: "seg_2", name: "Desenvolvimento c/ Halteres", sets: "4 séries × 8–12 reps", type: "weight" },
      { id: "seg_3", name: "Tríceps Pulley", sets: "3 séries × 10–15 reps", type: "weight" },
      { id: "seg_4", name: "Elevação Lateral", sets: "4 séries × 12–15 reps", type: "weight" },
      { id: "seg_5", name: "Jiu-Jitsu (Treino/Drills)", sets: "60 min - Técnico/Rola", type: "duration" }
    ]
  },
  terca: {
    title: "Terça-Feira",
    modalities: "Costas • Bíceps • Antebraço + Muay Thai",
    exercises: [
      { id: "ter_1", name: "Puxada Alta / Barra Fixa", sets: "4 séries × 8–12 reps", type: "weight" },
      { id: "ter_2", name: "Remada Curvada", sets: "4 séries × 8–12 reps", type: "weight" },
      { id: "ter_3", name: "Rosca Direta", sets: "3 séries × 10–12 reps", type: "weight" },
      { id: "ter_4", name: "Rosca Inversa (Antebraço)", sets: "3 séries × 12–15 reps", type: "weight" },
      { id: "ter_5", name: "Muay Thai (Saco/Manopla)", sets: "60 min - Combinções", type: "duration" }
    ]
  },
  quarta: {
    title: "Quarta-Feira",
    modalities: "Perna Completa • Panturrilha + Jiu-Jitsu",
    exercises: [
      { id: "qua_1", name: "Agachamento Livre", sets: "4 séries × 8–12 reps", type: "weight" },
      { id: "qua_2", name: "Leg Press 45°", sets: "4 séries × 10–12 reps", type: "weight" },
      { id: "qua_3", name: "Cadeira Extensora", sets: "3 séries × 12–15 reps", type: "weight" },
      { id: "qua_4", name: "Gêmeos em Pé (Panturrilha)", sets: "4 séries × 15–20 reps", type: "weight" },
      { id: "qua_5", name: "Jiu-Jitsu (Treino/Passagem)", sets: "60 min - Treino Específico", type: "duration" }
    ]
  },
  quinta: {
    title: "Quinta-Feira",
    modalities: "Core • Abdômen • Mobilidade + Jiu-Jitsu",
    exercises: [
      { id: "qui_1", name: "Prancha Abdominal", sets: "4 séries × 45–60 seg", type: "duration" },
      { id: "qui_2", name: "Abdominal Infra no Banco", sets: "4 séries × 15–20 reps", type: "weight" },
      { id: "qui_3", name: "Mobilidade Quadril / Ombros", sets: "15 min de rotina", type: "duration" },
      { id: "qui_4", name: "Jiu-Jitsu (Drills de Mobilidade)", sets: "60 min - Rolo Leve", type: "duration" }
    ]
  },
  sexta: {
    title: "Sexta-Feira",
    modalities: "Full Body • Explosão + Jiu-Jitsu",
    exercises: [
      { id: "sex_1", name: "Levantamento Terra", sets: "4 séries × 6–8 reps", type: "weight" },
      { id: "sex_2", name: "Power Clean / Kettlebell Swing", sets: "4 séries × 10 reps", type: "weight" },
      { id: "sex_3", name: "Flexão de Braço Explosiva", sets: "3 séries × máximo reps", type: "duration" },
      { id: "sex_4", name: "Jiu-Jitsu (Sparring Intenso)", sets: "60 min - Rolo de Sexta", type: "duration" }
    ]
  },
  sabado: {
    title: "Sábado",
    modalities: "Treino Técnico • Cardio + Muay Thai",
    exercises: [
      { id: "sab_1", name: "Corrida / Tiro de Velocidade", sets: "20 min (HIIT)", type: "duration" },
      { id: "sab_2", name: "Sombra com Carga Leve", sets: "3 rodadas × 3 min", type: "duration" },
      { id: "sab_3", name: "Muay Thai (Sparring / Manopla)", sets: "60 min - Técnico", type: "duration" }
    ]
  }
};

/* ==========================================================================
   2. ESTADO DA APLICAÇÃO E VARIÁVEIS DE CONTROLE
   ========================================================================== */
let currentSelectedDay = "segunda";

/* ==========================================================================
   3. INICIALIZAÇÃO DA APLICAÇÃO
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initNetworkStatus();
  initDateAndDay();
  initNavigation();
});

/* Monitor de Conexão Online/Offline */
function initNetworkStatus() {
  const statusBar = document.getElementById("status-bar");
  const statusText = document.getElementById("status-text");

  function updateStatus() {
    if (navigator.onLine) {
      statusBar.className = "status-bar online";
      statusText.textContent = "Online";
    } else {
      statusBar.className = "status-bar offline";
      statusText.textContent = "Offline (Modo Local)";
    }
  }

  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);
  updateStatus();
}

/* Identificação da Data Atual e Seleção Automática do Dia */
function initDateAndDay() {
  const dateElement = document.getElementById("current-date");
  const now = new Date();

  // Formata data brasileira: DD/MM/AAAA
  const dateFormatted = now.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long"
  });
  dateElement.textContent = dateFormatted;

  // Identifica dia da semana (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
  const dayIndex = now.getDay();
  const dayMap = ["segunda", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
  
  // Define o dia padrão
  currentSelectedDay = dayMap[dayIndex];
  selectDayTab(currentSelectedDay);
}

/* Configuração dos Eventos de Navegação pelas Abas */
function initNavigation() {
  const tabs = document.querySelectorAll(".day-tab");
  
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const selectedDay = tab.getAttribute("data-day");
      selectDayTab(selectedDay);
    });
  });

  // Botão "Acessar Treino Hoje" no Dashboard
  const btnGoToday = document.getElementById("btn-go-today");
  if (btnGoToday) {
    btnGoToday.addEventListener("click", () => {
      const workoutSection = document.querySelector(".workout-content");
      workoutSection.scrollIntoView({ behavior: "smooth" });
    });
  }
}

/* Função para Alternar a Aba Selecionada */
function selectDayTab(dayKey) {
  if (!WORKOUT_ROUTINE[dayKey]) return;

  currentSelectedDay = dayKey;

  // Atualiza classes ativas nas abas
  const tabs = document.querySelectorAll(".day-tab");
  tabs.forEach(tab => {
    if (tab.getAttribute("data-day") === dayKey) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  // Atualiza títulos da seção de treinos
  const dayData = WORKOUT_ROUTINE[dayKey];
  document.getElementById("selected-day-title").textContent = dayData.title;
  document.getElementById("selected-day-modalities").textContent = dayData.modalities;
}/* ==========================================================================
   4. RENDERIZAÇÃO DINÂMICA DOS EXERCÍCIOS
   ========================================================================== */

/* Função responsável por desenhar a lista de exercícios na tela */
function renderExercises(dayKey) {
  const container = document.getElementById("exercises-container");
  container.innerHTML = ""; // Limpa a lista atual de forma segura

  const dayData = WORKOUT_ROUTINE[dayKey];
  if (!dayData || !dayData.exercises) return;

  dayData.exercises.forEach(exercise => {
    // Cria o card do exercício
    const card = document.createElement("div");
    card.className = "exercise-card";
    card.setAttribute("data-id", exercise.id);

    // Linha de título e checkbox
    const titleRow = document.createElement("div");
    titleRow.className = "exercise-title-row";

    const textGroup = document.createElement("div");
    
    const nameEl = document.createElement("div");
    nameEl.className = "exercise-name";
    nameEl.textContent = exercise.name; // textContent evita XSS/injeção de HTML

    const metaEl = document.createElement("div");
    metaEl.className = "exercise-meta";
    metaEl.textContent = exercise.sets;

    textGroup.appendChild(nameEl);
    textGroup.appendChild(metaEl);

    // Custom Checkbox
    const checkbox = document.createElement("div");
    checkbox.className = "custom-checkbox";
    checkbox.setAttribute("role", "checkbox");
    checkbox.setAttribute("aria-checked", "false");
    checkbox.textContent = "✓";
    
    // Alterna o estado visual de concluído
    checkbox.addEventListener("click", () => {
      card.classList.toggle("completed");
      const isCompleted = card.classList.contains("completed");
      checkbox.setAttribute("aria-checked", isCompleted ? "true" : "false");
    });

    titleRow.appendChild(textGroup);
    titleRow.appendChild(checkbox);

    // Linha de controles (Carga e Cronômetro)
    const controlsRow = document.createElement("div");
    controlsRow.style.display = "flex";
    controlsRow.style.justifyContent = "space-between";
    controlsRow.style.alignItems = "center";
    controlsRow.style.gap = "10px";
    controlsRow.style.marginTop = "8px";

    // Campo de Carga (kg) se aplicável
    if (exercise.type === "weight") {
      const weightContainer = document.createElement("div");
      weightContainer.className = "weight-input-container";

      const label = document.createElement("label");
      label.textContent = "Carga:";

      const input = document.createElement("input");
      input.type = "number";
      input.className = "weight-input";
      input.placeholder = "0";
      input.min = "0";
      input.max = "500";

      const unit = document.createElement("span");
      unit.style.fontSize = "0.8rem";
      unit.style.color = "var(--text-muted)";
      unit.textContent = "kg";

      weightContainer.appendChild(label);
      weightContainer.appendChild(input);
      weightContainer.appendChild(unit);
      controlsRow.appendChild(weightContainer);
    } else {
      const tag = document.createElement("span");
      tag.className = "day-badge";
      tag.textContent = "ARTES MARCIAIS";
      controlsRow.appendChild(tag);
    }

    // Botões de descanso rápido
    const timerGroup = document.createElement("div");
    timerGroup.className = "timer-btn-group";

    const btn60 = document.createElement("button");
    btn60.className = "btn-timer-trigger";
    btn60.textContent = "⏱ 60s";

    const btn90 = document.createElement("button");
    btn90.className = "btn-timer-trigger";
    btn90.textContent = "⏱ 90s";

    timerGroup.appendChild(btn60);
    timerGroup.appendChild(btn90);
    controlsRow.appendChild(timerGroup);

    // Monta o card completo
    card.appendChild(titleRow);
    card.appendChild(controlsRow);

    container.appendChild(card);
  });
}

// Atualizamos a função selectDayTab existente para chamar renderExercises
const originalSelectDayTab = selectDayTab;
selectDayTab = function(dayKey) {
  originalSelectDayTab(dayKey);
  renderExercises(dayKey);
};/* ==========================================================================
   5. GERENCIAMENTO E PERSISTÊNCIA LOCAL (LocalStorage Seguro)
   ========================================================================== */

const STORAGE_KEYS = {
  WORKOUT_STATE: "fightfit_workout_state_v1",
  USER_PIN_HASH: "fightfit_user_pin_hash_v1"
};

/* Recupera os dados salvos de forma segura com validação */
function getSavedWorkoutState() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WORKOUT_STATE);
    if (!data) return {};
    const parsed = JSON.parse(data);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch (error) {
    console.warn("Aviso: Dados salvos no LocalStorage corrompidos. Reiniciando estado local.", error);
    return {};
  }
}

/* Salva uma propriedade específica de um exercício de forma segura */
function saveExerciseData(exerciseId, field, value) {
  try {
    const currentState = getSavedWorkoutState();
    
    if (!currentState[exerciseId]) {
      currentState[exerciseId] = {};
    }

    currentState[exerciseId][field] = value;
    localStorage.setItem(STORAGE_KEYS.WORKOUT_STATE, JSON.stringify(currentState));
  } catch (error) {
    console.error("Erro ao salvar dados no LocalStorage:", error);
  }
}

/* Atualiza a função renderExercises para restaurar os dados salvos e salvar alterações */
function attachStorageToCard(card, exerciseId) {
  const savedState = getSavedWorkoutState();
  const exerciseState = savedState[exerciseId] || {};

  // Restaura Carga
  const weightInput = card.querySelector(".weight-input");
  if (weightInput) {
    if (exerciseState.weight !== undefined) {
      weightInput.value = exerciseState.weight;
    }

    weightInput.addEventListener("input", (e) => {
      // Valida para garantir apenas valores numéricos seguros
      const cleanValue = e.target.value.replace(/[^0-9.]/g, "");
      saveExerciseData(exerciseId, "weight", cleanValue);
    });
  }

  // Restaura Estado de Conclusão
  const checkbox = card.querySelector(".custom-checkbox");
  if (checkbox) {
    if (exerciseState.completed) {
      card.classList.add("completed");
      checkbox.setAttribute("aria-checked", "true");
    }

    checkbox.addEventListener("click", () => {
      const isCompleted = card.classList.contains("completed");
      saveExerciseData(exerciseId, "completed", isCompleted);
    });
  }
}

// Intercepta a renderização para acoplar a persistência nos cards
const previousRenderExercises = renderExercises;
renderExercises = function(dayKey) {
  previousRenderExercises(dayKey);

  const cards = document.querySelectorAll(".exercise-card");
  cards.forEach(card => {
    const exerciseId = card.getAttribute("data-id");
    if (exerciseId) {
      attachStorageToCard(card, exerciseId);
    }
  });
};/* ==========================================================================
   6. CRONÔMETRO DE DESCANSO E GERADOR DE SOM (Web Audio API)
   ========================================================================== */

let timerInterval = null;
let timerSecondsLeft = 0;
let isTimerPaused = false;

/* Gera um bipe sonoro de alta performance usando Web Audio API (Offline) */
function playFinishBeep() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // Nota Lá (A5) - Tom claro e esportivo
    
    // Envelope de volume rápido
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.8);
  } catch (e) {
    console.warn("Áudio não suportado ou bloqueado pela interação inicial do usuário.", e);
  }
}

/* Inicialização dos Eventos do Cronômetro */
function initTimerEvents() {
  const modal = document.getElementById("timer-modal");
  const display = document.getElementById("timer-display");
  const btnPause = document.getElementById("btn-timer-pause");
  const btnClose = document.getElementById("btn-timer-close");
  const presetBtns = document.querySelectorAll(".btn-timer-preset");

  // Presets do Modal (30s, 60s, 90s, 120s)
  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const time = parseInt(btn.getAttribute("data-time"), 10);
      startTimer(time);
    });
  });

  // Botão Pausar / Retomar
  btnPause.addEventListener("click", () => {
    if (timerSecondsLeft <= 0) return;
    
    isTimerPaused = !isTimerPaused;
    btnPause.textContent = isTimerPaused ? "Retomar" : "Pausar";
    btnPause.style.background = isTimerPaused ? "var(--accent-blue)" : "var(--border-color)";
    btnPause.style.color = isTimerPaused ? "#000" : "var(--text-main)";
  });

  // Botão Fechar / Cancelar
  btnClose.addEventListener("click", stopTimer);

  // Delegação de evento para capturar os botões ⏱ de cada card de exercício
  document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("btn-timer-trigger")) {
      const text = e.target.textContent;
      const seconds = text.includes("60s") ? 60 : 90;
      openTimerModal();
      startTimer(seconds);
    }
  });
}

function openTimerModal() {
  const modal = document.getElementById("timer-modal");
  modal.classList.remove("hidden");
}

function updateTimerDisplay(seconds) {
  const display = document.getElementById("timer-display");
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer(seconds) {
  clearInterval(timerInterval);
  timerSecondsLeft = seconds;
  isTimerPaused = false;

  const btnPause = document.getElementById("btn-timer-pause");
  btnPause.textContent = "Pausar";
  btnPause.style.background = "var(--border-color)";
  btnPause.style.color = "var(--text-main)";

  updateTimerDisplay(timerSecondsLeft);

  timerInterval = setInterval(() => {
    if (!isTimerPaused) {
      timerSecondsLeft--;
      updateTimerDisplay(timerSecondsLeft);

      if (timerSecondsLeft <= 0) {
        clearInterval(timerInterval);
        playFinishBeep();
        
        // Efeito visual no tempo zerado
        const display = document.getElementById("timer-display");
        display.style.color = "var(--text-success)";
        
        setTimeout(() => {
          display.style.color = "var(--accent-blue)";
          stopTimer();
        }, 1200);
      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerSecondsLeft = 0;
  isTimerPaused = false;
  document.getElementById("timer-modal").classList.add("hidden");
}

// Inicializa os ouvintes do timer no carregamento do DOM
document.addEventListener("DOMContentLoaded", initTimerEvents);/* ==========================================================================
   7. DASHBOARD E CÁLCULO DE PROGRESSO EM TEMPO REAL
   ========================================================================== */

/* Calcula e atualiza as estatísticas do Dashboard */
function updateDashboardMetrics() {
  const todayKey = currentSelectedDay;
  const dayData = WORKOUT_ROUTINE[todayKey];

  if (!dayData) return;

  // Atualiza nome e modalidades no Dashboard
  const todayBadge = document.getElementById("today-day-name");
  const todayModalities = document.getElementById("today-modalities");

  if (todayBadge) todayBadge.textContent = dayData.title.toUpperCase();
  if (todayModalities) todayModalities.textContent = dayData.modalities;

  // Recupera o estado dos exercícios para o dia atual
  const savedState = getSavedWorkoutState();
  const totalExercises = dayData.exercises.length;
  let completedCount = 0;

  dayData.exercises.forEach(ex => {
    if (savedState[ex.id] && savedState[ex.id].completed) {
      completedCount++;
    }
  });

  // Cálculo da porcentagem
  const percentage = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;

  // Atualiza a interface do Dashboard
  const progressCountText = document.getElementById("progress-count");
  const progressPercentText = document.getElementById("progress-percent");
  const progressBarFill = document.getElementById("progress-bar-fill");

  if (progressCountText) progressCountText.textContent = `${completedCount}/${totalExercises} concluídos`;
  if (progressPercentText) progressPercentText.textContent = `${percentage}%`;
  if (progressBarFill) progressBarFill.style.width = `${percentage}%`;
}

// Atualiza o Dashboard sempre que uma aba é selecionada ou um exercício é alterado
const originalAttachStorageToCard = attachStorageToCard;
attachStorageToCard = function(card, exerciseId) {
  originalAttachStorageToCard(card, exerciseId);

  const checkbox = card.querySelector(".custom-checkbox");
  if (checkbox) {
    checkbox.addEventListener("click", () => {
      updateDashboardMetrics();
    });
  }
};

const originalSelectDayTabForDashboard = selectDayTab;
selectDayTab = function(dayKey) {
  originalSelectDayTabForDashboard(dayKey);
  updateDashboardMetrics();
};

// Executa o cálculo inicial quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(updateDashboardMetrics, 100);
});/* ==========================================================================
   REGISTRO DO SERVICE WORKER (PWA OFFLINE)
   ========================================================================== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration.scope);
      })
      .catch((error) => {
        console.error('Falha ao registrar o Service Worker:', error);
      });
  });
}