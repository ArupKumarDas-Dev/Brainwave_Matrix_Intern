
        // const timeSlotsContainer = document.getElementById('timeSlotsContainer');
        // const currentDateElem = document.getElementById('currentDate');
        // const currentTimeElem = document.getElementById('currentTime');
        // const toggleDarkModeBtn = document.getElementById('toggleDarkMode');
        // const resetTasksBtn = document.getElementById('resetTasks');
        // const resetModal = document.getElementById('resetModal');
        // const confirmResetBtn = document.getElementById('confirmReset');
        // const cancelResetBtn = document.getElementById('cancelReset');
        // const lightIcon = document.querySelector('.light-icon');
        // const darkIcon = document.querySelector('.dark-icon');

        // // Initialize time slots from 9 AM to 5 PM
        // const timeHours = Array.from({ length: 9 }, (_, i) => 9 + i); // 9, 10, ..., 17 (5 PM)

        // // Function to format time (e.g., 9 AM, 1 PM)
        // function formatTime(hour) {
        //     const ampm = hour >= 12 ? 'PM' : 'AM';
        //     const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        //     return `${displayHour} ${ampm}`;
        // }

        // // Function to update current date and time
        // function updateClock() {
        //     const now = new Date();
        //     const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        //     currentDateElem.textContent = now.toLocaleDateString('en-US', optionsDate);
        //     const optionsTime = { hour: 'numeric', minute: '2-digit', hour12: true };
        //     currentTimeElem.textContent = now.toLocaleTimeString('en-US', optionsTime);
        // }

        // // Function to load tasks from localStorage
        // function loadTasks() {
        //     // Clear existing slots to prevent duplicates if loadTasks is called multiple times
        //     timeSlotsContainer.innerHTML = '';

        //     timeHours.forEach(hour => {
        //         const taskId = `task-${hour}`;
        //         const taskText = localStorage.getItem(taskId);
        //         const timeSlotDiv = document.createElement('div');
        //         timeSlotDiv.classList.add('time-slot', 'flex', 'items-center', 'space-x-4', 'p-4', 'rounded-lg', 'shadow-sm', 'bg-gray-50', 'dark:bg-gray-700', 'border', 'border-gray-200', 'dark:border-gray-600', 'input-active-glow');

        //         const formattedTime = formatTime(hour);
        //         timeSlotDiv.innerHTML = `
        //             <div class="font-bold text-lg w-20 flex-shrink-0 text-gray-700 dark:text-gray-300">${formattedTime}</div>
        //             <input type="text" id="${taskId}" class="flex-grow p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Plan your task here...">
        //             <button class="save-task-btn p-3 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-md flex items-center justify-center w-10 h-10">
        //                 <i class="fas fa-save save-icon"></i>
        //             </button>
        //         `;
        //         timeSlotsContainer.appendChild(timeSlotDiv);

        //         const inputField = timeSlotDiv.querySelector(`#${taskId}`);
        //         const saveButton = timeSlotDiv.querySelector('.save-task-btn');

        //         if (taskText) {
        //             inputField.value = taskText;
        //             // Switch to edit mode by default if task exists
        //             saveButton.innerHTML = '<i class="fas fa-edit edit-icon"></i>'; // Change icon to edit
        //             saveButton.classList.remove('bg-green-500', 'hover:bg-green-600');
        //             saveButton.classList.add('bg-blue-500', 'hover:bg-blue-600');
        //             inputField.setAttribute('readonly', true); // Make input readonly initially
        //         }

        //         // Event listener for saving/editing tasks
        //         saveButton.addEventListener('click', () => {
        //             if (inputField.readOnly) {
        //                 // Currently in read-only (edit) mode, switch to editable (save) mode
        //                 inputField.removeAttribute('readonly');
        //                 inputField.focus();
        //                 saveButton.innerHTML = '<i class="fas fa-save save-icon"></i>'; // Change icon to save
        //                 saveButton.classList.remove('bg-blue-500', 'hover:bg-blue-600');
        //                 saveButton.classList.add('bg-green-500', 'hover:bg-green-600');
        //             } else {
        //                 // Currently in editable (save) mode, save the task and switch to read-only
        //                 localStorage.setItem(taskId, inputField.value);
        //                 inputField.setAttribute('readonly', true);
        //                 saveButton.innerHTML = '<i class="fas fa-edit edit-icon"></i>'; // Change icon to edit
        //                 saveButton.classList.remove('bg-green-500', 'hover:bg-green-600');
        //                 saveButton.classList.add('bg-blue-500', 'hover:bg-blue-600');
        //             }
        //         });

        //         // Save task on Enter key press
        //         inputField.addEventListener('keypress', (e) => {
        //             if (e.key === 'Enter') {
        //                 e.preventDefault(); // Prevent new line in input
        //                 if (!inputField.readOnly) {
        //                     localStorage.setItem(taskId, inputField.value);
        //                     inputField.setAttribute('readonly', true);
        //                     saveButton.innerHTML = '<i class="fas fa-edit edit-icon"></i>';
        //                     saveButton.classList.remove('bg-green-500', 'hover:bg-green-600');
        //                     saveButton.classList.add('bg-blue-500', 'hover:bg-blue-600');
        //                 }
        //             }
        //         });
        //     });
        // }

        // // Dark/Light Mode functionality
        // function applyTheme(theme) {
        //     if (theme === 'dark') {
        //         document.documentElement.classList.add('dark');
        //         lightIcon.classList.add('hidden');
        //         darkIcon.classList.remove('hidden');
        //     } else {
        //         document.documentElement.classList.remove('dark');
        //         lightIcon.classList.remove('hidden');
        //         darkIcon.classList.add('hidden');
        //     }
        //     localStorage.setItem('theme', theme);
        // }

        // // Toggle Dark/Light Mode
        // toggleDarkModeBtn.addEventListener('click', () => {
        //     const currentTheme = localStorage.getItem('theme') || 'light';
        //     if (currentTheme === 'dark') {
        //         applyTheme('light');
        //     } else {
        //         applyTheme('dark');
        //     }
        // });

        // // Initialize theme on load
        // const savedTheme = localStorage.getItem('theme') || 'light';
        // applyTheme(savedTheme);

        // // Reset functionality
        // resetTasksBtn.addEventListener('click', () => {
        //     resetModal.classList.remove('hidden');
        //     setTimeout(() => {
        //         resetModal.classList.remove('opacity-0');
        //     }, 10); // Small delay to allow transition
        //     resetModal.querySelector('.transform').classList.remove('scale-95'); // Animate modal in
        //     resetModal.querySelector('.transform').classList.add('scale-100');
        // });

        // cancelResetBtn.addEventListener('click', () => {
        //     resetModal.classList.add('opacity-0');
        //     resetModal.querySelector('.transform').classList.remove('scale-100'); // Animate modal out
        //     resetModal.querySelector('.transform').classList.add('scale-95');
        //     setTimeout(() => {
        //         resetModal.classList.add('hidden');
        //     }, 300); // Hide after transition
        // });

        // confirmResetBtn.addEventListener('click', () => {
        //     localStorage.clear();
        //     location.reload(); // Reload the page to reset all tasks
        // });

        // // Initial calls
        // updateClock();
        // setInterval(updateClock, 1000); // Update clock every second
        // loadTasks();