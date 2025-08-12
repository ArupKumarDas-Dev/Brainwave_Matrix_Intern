// --- utility & slots setup ---
    const startHour = 8; // 8 AM
    const endHour = 20; // 8 PM
    const slotsContainer = document.getElementById('slots');
    const autoSaveCheckbox = document.getElementById('autoSave');

    // load saved state
    const STORAGE_KEY = 'daily_planner_tasks_v1';
    let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

    function hourLabel(h){
      const ampm = h >= 12 ? 'PM' : 'AM';
      const hour12 = ((h + 11) % 12) + 1;
      return `${hour12} ${ampm}`;
    }

    function createSlot(hour){
      const id = `h-${hour}`;
      const container = document.createElement('div');
      container.className = 'flex gap-3 items-start p-3 rounded-xl border border-slate-100 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60 shadow-sm transition hover:scale-[1.01]';

      // time label
      const time = document.createElement('div');
      time.className = 'w-20 text-sm font-medium text-slate-700 dark:text-slate-200';
      time.textContent = hourLabel(hour);

      // input area
      const inputWrap = document.createElement('div');
      inputWrap.className = 'flex-1 flex items-center gap-2';

      const input = document.createElement('textarea');
      input.className = 'flex-1 min-h-[48px] resize-none p-3 rounded-lg text-sm bg-white/80 dark:bg-slate-800/60 placeholder-slate-500 dark:placeholder-slate-400 outline-none dark:text-slate-100 text-slate-800 focus:ring-2 focus:ring-indigo-200';
      input.placeholder = 'Add a task...';
      input.value = tasks[id] || '';

      // save icon
      const saveBtn = document.createElement('button');
      saveBtn.className = 'p-2 rounded-md border hover:shadow-sm bg-white/60 dark:bg-slate-800/60';
      saveBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"/></svg>';

      saveBtn.addEventListener('click', ()=>{
        tasks[id] = input.value;
        saveTasks();
        saveBtn.classList.add('opacity-70');
        setTimeout(()=>saveBtn.classList.remove('opacity-70'),400);
      });

      // auto-save
      input.addEventListener('input', ()=>{
        if(autoSaveCheckbox.checked){
          tasks[id] = input.value;
          saveTasks();
        }
      });

      // clear single slot
      const clearSingle = document.createElement('button');
      clearSingle.className = 'p-2 rounded-md border hover:bg-slate-50 dark:hover:bg-slate-700/60';
      clearSingle.title = 'Clear this slot';
      clearSingle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/></svg>';
      clearSingle.addEventListener('click', ()=>{
        input.value = '';
        delete tasks[id];
        saveTasks();
      });

      inputWrap.appendChild(input);
      inputWrap.appendChild(saveBtn);
      inputWrap.appendChild(clearSingle);

      container.appendChild(time);
      container.appendChild(inputWrap);

      return container;
    }

    function renderSlots(){
      slotsContainer.innerHTML = '';
      for(let h=startHour; h<=endHour; h++){
        slotsContainer.appendChild(createSlot(h));
      }
    }

    function saveTasks(){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    // initial render
    renderSlots();

    // --- theme toggle (improved) ---
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');

    const savedTheme = localStorage.getItem('planner_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    function applyTheme(theme){
      body.setAttribute('data-theme', theme);
      if(theme === 'dark'){
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('planner_theme', theme);
      updateThemeIcon(theme);
    }

    function updateThemeIcon(theme = body.getAttribute('data-theme')){
      if(theme === 'dark'){
        themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />';
      } else {
        themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12h-1M18.36 5.64l-.7.7M6.34 17.66l-.7.7M18.36 18.36l-.7-.7M6.34 6.34l-.7-.7M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />';
      }
    }

    // apply initial theme
    applyTheme(initialTheme);

    themeToggle.addEventListener('click', ()=>{
      const current = body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });

    // --- clock & date ---
    function updateClock(){
      const now = new Date();
      const hh = now.getHours().toString().padStart(2,'0');
      const mm = now.getMinutes().toString().padStart(2,'0');
      const dd = now.toLocaleString(undefined, { weekday: 'short', day: 'numeric', month: 'long' });
      document.getElementById('clock').innerHTML = `${hh}<span id="clock-min" class="text-3xl">:${mm}</span>`;
      document.getElementById('date').textContent = dd;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // --- modal logic ---
    const modal = document.getElementById('modal');
    const clearBtn = document.getElementById('clearBtn');
    const cancelModal = document.getElementById('cancelModal');
    const confirmClear = document.getElementById('confirmClear');
    clearBtn.addEventListener('click', ()=> modal.classList.remove('hidden'));
    cancelModal.addEventListener('click', ()=> modal.classList.add('hidden'));
    confirmClear.addEventListener('click', ()=>{
      tasks = {};
      saveTasks();
      renderSlots();
      modal.classList.add('hidden');
    });

    // reset button restores sample demo
    document.getElementById('resetBtn').addEventListener('click', ()=>{
      tasks = {};
      tasks['h-9'] = 'Morning standup & emails';
      tasks['h-11'] = 'Work on feature X';
      tasks['h-14'] = 'Lunch & quick walk';
      saveTasks();
      renderSlots();
    });

    // export
    document.getElementById('exportBtn').addEventListener('click', ()=>{
      const dataStr = JSON.stringify(tasks, null, 2);
      const blob = new Blob([dataStr], {type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `planner-${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    // small animation helper
    (function pulseHeader(){
      const img = document.querySelector('aside > div[style]');
      if(img) img.style.animation = 'floaty 6s ease-in-out infinite';
    })();