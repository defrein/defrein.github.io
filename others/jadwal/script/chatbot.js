
const schedule={
    0: [ // Minggu
        {time: "06:00",activity: "Bangun tidur (jika tidak pulkam)",type: "rest"},
        {time: "06:15-07:15",activity: "☕ Persiapan + santai",type: "personal"},
        {time: "07:15-07:45",activity: "📚 Belajar - 30 menit",type: "study"},
        {time: "08:00-08:15",activity: "🏃‍♂️ Olahraga - 15 menit",type: "exercise"},
        {time: "08:15-09:15",activity: "📝 Task list kerja - 1 jam",type: "work"},
        {time: "09:15-12:00",activity: "🎮 Waktu lepas bebas",type: "personal"},
        {time: "12:15",activity: "🍽️ Makan siang + kopi",type: "meal"},
        {time: "12:45-13:15",activity: "😴 Tidur siang - 30 menit",type: "rest"},
        {time: "13:15-15:15",activity: "🎮 Waktu lepas bebas - 2 jam",type: "personal"},
        {time: "15:15-16:15",activity: "🧹 Bersih-bersih + cuci baju",type: "personal"},
        {time: "16:15-18:00",activity: "📅 Persiapan minggu depan + santai",type: "personal"},
        {time: "18:00-19:00",activity: "🍽️ Makan malam",type: "meal"},
        {time: "19:00",activity: "💤 Tidur bebas (9-11 jam recovery)",type: "rest"}
    ],
    1: [ // Senin
        {time: "05:45",activity: "Bangun tidur",type: "rest"},
        {time: "06:00-06:30",activity: "Persiapan berangkat kerja",type: "personal"},
        {time: "06:30-07:00",activity: "📚 Belajar - 30 menit",type: "study"},
        {time: "08:00-17:00",activity: "💼 Kerja (9 jam)",type: "work"},
        {time: "12:15",activity: "🍽️ Makan siang",type: "meal"},
        {time: "12:45-13:15",activity: "😴 Tidur siang - 30 menit",type: "rest"},
        {time: "17:30-18:30",activity: "🚶‍♂️ Jalan kaki - 30 menit",type: "exercise"},
        {time: "18:30-19:30",activity: "📝 Task list kerja - 1 jam",type: "work"},
        {time: "19:30-20:00",activity: "🍽️ Makan malam",type: "meal"},
        {time: "20:30-20:40",activity: "🏃‍♂️ Olahraga - 10 menit",type: "exercise"},
        {time: "21:00-23:00",activity: "☕ Waktu lepas + kopi malam",type: "personal"},
        {time: "00:00",activity: "💤 Tidur (5 jam 45 menit)",type: "rest"}
    ],
    2: [ // Selasa
        {time: "05:45",activity: "Bangun tidur",type: "rest"},
        {time: "06:30-07:00",activity: "📚 Belajar - 30 menit",type: "study"},
        {time: "08:00-17:00",activity: "💼 Kerja (9 jam)",type: "work"},
        {time: "12:15",activity: "🍽️ Makan siang + kopi",type: "meal"},
        {time: "12:45-13:15",activity: "😴 Tidur siang - 30 menit",type: "rest"},
        {time: "17:30-18:30",activity: "🚶‍♂️ Jalan kaki - 30 menit",type: "exercise"},
        {time: "18:30-19:30",activity: "📝 Task list kerja - 1 jam",type: "work"},
        {time: "19:30-20:00",activity: "🍽️ Makan malam",type: "meal"},
        {time: "20:00-20:10",activity: "🏃‍♂️ Olahraga - 10 menit",type: "exercise"},
        {time: "20:40-21:40",activity: "👕 Cuci baju (1/2) - 1 jam",type: "personal"},
        {time: "21:40-22:40",activity: "🎮 Waktu lepas - 1 jam",type: "personal"},
        {time: "23:00",activity: "💤 Tidur (6 jam 45 menit)",type: "rest"}
    ],
    3: [ // Rabu
        {time: "05:30",activity: "Bangun tidur",type: "rest"},
        {time: "06:15-06:45",activity: "📚 Belajar - 30 menit",type: "study"},
        {time: "08:00-17:00",activity: "💼 Kerja (9 jam)",type: "work"},
        {time: "12:15",activity: "🍽️ Makan siang + jus (1/2)",type: "meal"},
        {time: "12:45-13:05",activity: "😴 Tidur siang - 20 menit",type: "rest"},
        {time: "17:30-18:30",activity: "🚶‍♂️ Jalan kaki - 30 menit",type: "exercise"},
        {time: "18:30-19:30",activity: "📝 Task list kerja - 1 jam",type: "work"},
        {time: "19:30-20:00",activity: "🍽️ Makan malam + jajan (1/3)",type: "meal"},
        {time: "20:00-20:10",activity: "🏃‍♂️ Olahraga - 10 menit",type: "exercise"},
        {time: "20:30-21:30",activity: "🎮 Waktu lepas - 1 jam",type: "personal"},
        {time: "21:30-22:00",activity: "🧹 Bersih-bersih kamar - 30 menit",type: "personal"},
        {time: "01:00",activity: "💤 Tidur (4 jam 30 menit) ⚠️",type: "rest"}
    ],
    4: [ // Kamis
        {time: "06:00",activity: "Bangun tidur",type: "rest"},
        {time: "06:45-07:15",activity: "📚 Belajar - 30 menit",type: "study"},
        {time: "08:00-17:00",activity: "💼 Kerja (9 jam)",type: "work"},
        {time: "12:15",activity: "🍽️ Makan siang + kopi",type: "meal"},
        {time: "12:45-13:05",activity: "😴 Tidur siang - 20 menit",type: "rest"},
        {time: "17:30-18:30",activity: "🚶‍♂️ Jalan kaki - 30 menit",type: "exercise"},
        {time: "18:30-19:30",activity: "📝 Task list kerja - 1 jam",type: "work"},
        {time: "19:30-20:00",activity: "🍽️ Makan malam",type: "meal"},
        {time: "20:00-20:10",activity: "🏃‍♂️ Olahraga - 10 menit",type: "exercise"},
        {time: "20:30-21:30",activity: "🎮 Waktu lepas + jajan (2/3)",type: "personal"},
        {time: "22:00",activity: "💤 Tidur (5 jam 45 menit)",type: "rest"}
    ],
    5: [ // Jumat
        {time: "06:00",activity: "Bangun tidur",type: "rest"},
        {time: "06:45-07:15",activity: "📚 Belajar - 30 menit",type: "study"},
        {time: "08:00-17:00",activity: "💼 Kerja (9 jam)",type: "work"},
        {time: "12:15",activity: "🍽️ Makan siang + jus (2/2)",type: "meal"},
        {time: "12:45-13:15",activity: "😴 Tidur siang - 30 menit",type: "rest"},
        {time: "17:30-18:30",activity: "🚶‍♂️ Jalan kaki - 30 menit",type: "exercise"},
        {time: "18:30-19:30",activity: "📝 Task list kerja - 1 jam",type: "work"},
        {time: "19:30-20:00",activity: "🍽️ Makan malam + jajan (3/3)",type: "meal"},
        {time: "20:00-20:15",activity: "🏃‍♂️ Olahraga - 15 menit",type: "exercise"},
        {time: "20:30-22:30",activity: "☕ Waktu lepas + kopi malam",type: "personal"},
        {time: "23:00",activity: "💤 Tidur (7 jam)",type: "rest"}
    ],
    6: [ // Sabtu
        {time: "05:00",activity: "Bangun tidur",type: "rest"},
        {time: "05:45-06:15",activity: "📚 Belajar - 30 menit",type: "study"},
        {time: "08:00-17:00",activity: "💼 Kerja (9 jam)",type: "work"},
        {time: "12:15",activity: "🍽️ Makan siang + kopi",type: "meal"},
        {time: "12:45-13:15",activity: "😴 Tidur siang - 30 menit",type: "rest"},
        {time: "17:15-18:45",activity: "🏠 Persiapan pulkam (sebulan sekali)",type: "personal"},
        {time: "18:45-19:00",activity: "🚗 Berangkat pulkam",type: "personal"},
        {time: "19:30-21:30",activity: "🎮 Waktu lepas (jika tidak pulkam)",type: "personal"},
        {time: "22:00",activity: "💤 Tidur (6 jam)",type: "rest"}
    ]
};

const dayNames=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];

function updateCurrentTime() {
    const now=new Date();
    const timeString=now.toLocaleTimeString('id-ID',{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const dateString=now.toLocaleDateString('id-ID',{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('currentTime').innerHTML=`
        🕐 ${timeString}<br>
        📅 ${dateString}
    `;
}

function parseTime(timeStr) {
    if(timeStr.includes('-')) {
        const [start]=timeStr.split('-');
        timeStr=start;
    }

    const [hour,minute]=timeStr.split(':').map(num => parseInt(num));
    return hour*60+(minute||0);
}

function getCurrentActivity() {
    const now=new Date();
    const currentDay=now.getDay();
    const currentTime=now.getHours()*60+now.getMinutes();

    const todaySchedule=schedule[currentDay]||[];

    let currentActivity=null;
    let nextActivity=null;

    for(let i=0;i<todaySchedule.length;i++) {
        const activity=todaySchedule[i];
        const activityTime=parseTime(activity.time);

        if(currentTime>=activityTime) {
            currentActivity=activity;
        } else {
            nextActivity=activity;
            break;
        }
    }

    // If no next activity today, get first activity of tomorrow
    if(!nextActivity) {
        const tomorrow=(currentDay+1)%7;
        const tomorrowSchedule=schedule[tomorrow]||[];
        if(tomorrowSchedule.length>0) {
            nextActivity={
                ...tomorrowSchedule[0],
                day: dayNames[tomorrow]
            };
        }
    }

    return {current: currentActivity,next: nextActivity};
}

function getTomorrowSchedule() {
    const tomorrow=(new Date().getDay()+1)%7;
    return schedule[tomorrow]||[];
}

function addMessage(content,isUser=false) {
    const messagesContainer=document.getElementById('chatMessages');
    const messageDiv=document.createElement('div');
    messageDiv.className=`message ${isUser? 'user':'bot'}`;

    const contentDiv=document.createElement('div');
    contentDiv.className='message-content';
    contentDiv.innerHTML=content;

    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop=messagesContainer.scrollHeight;
}

function askBot(type) {
    const activities=getCurrentActivity();
    let response='';

    switch(type) {
        case 'sekarang':
            addMessage('🕐 Sekarang harus apa?',true);
            if(activities.current) {
                response=`Sekarang adalah waktu untuk:<br><br>
                ⏰ <strong>${activities.current.time}</strong><br>
                📋 ${activities.current.activity}<br><br>
                ${getActivityTip(activities.current.type)}`;
            } else {
                response=`Sepertinya belum ada aktivitas yang dijadwalkan untuk saat ini. Mungkin saatnya istirahat atau persiapan untuk aktivitas selanjutnya! 😊`;
            }
            break;

        case 'selanjutnya':
            addMessage('⏰ Selanjutnya bersiap apa?',true);
            if(activities.next) {
                const nextDay=activities.next.day? ` (${activities.next.day})`:'';
                response=`Aktivitas selanjutnya${nextDay}:<br><br>
                ⏰ <strong>${activities.next.time}</strong><br>
                📋 ${activities.next.activity}<br><br>
                💡 Mulai bersiap dari sekarang ya!`;
            } else {
                response=`Tidak ada aktivitas selanjutnya yang dijadwalkan. Waktu bebas! 🎉`;
            }
            break;

        case 'hari_ini':
            addMessage('📅 Jadwal hari ini?',true);
            const today=new Date().getDay();
            const todaySchedule=schedule[today]||[];
            if(todaySchedule.length>0) {
                response=`Jadwal ${dayNames[today]} hari ini:<br><br>`;
                todaySchedule.slice(0,5).forEach(activity => {
                    response+=`⏰ ${activity.time} - ${activity.activity}<br>`;
                });
                if(todaySchedule.length>5) {
                    response+=`<br>... dan ${todaySchedule.length-5} aktivitas lainnya`;
                }
            } else {
                response=`Tidak ada jadwal khusus untuk hari ini. Hari bebas! 🎉`;
            }
            break;

        case 'besok':
            addMessage('🌅 Jadwal besok?',true);
            const tomorrowSchedule=getTomorrowSchedule();
            const tomorrow=(new Date().getDay()+1)%7;
            if(tomorrowSchedule.length>0) {
                response=`Jadwal ${dayNames[tomorrow]} besok:<br><br>`;
                tomorrowSchedule.slice(0,5).forEach(activity => {
                    response+=`⏰ ${activity.time} - ${activity.activity}<br>`;
                });
                if(tomorrowSchedule.length>5) {
                    response+=`<br>... dan ${tomorrowSchedule.length-5} aktivitas lainnya`;
                }
            } else {
                response=`Tidak ada jadwal khusus untuk besok. Hari bebas! 🎉`;
            }
            break;

        case 'tips':
            addMessage('💡 Tips produktivitas?',true);
            const tips=[
                "💤 Tidur yang cukup sangat penting! Saat ini rata-rata tidur Anda hanya 5,5 jam. Cobalah untuk tidur lebih awal.",
                "⏰ Konsistensi waktu bangun membantu mengatur ritme sirkadian tubuh Anda.",
                "🚶‍♂️ Jalan kaki 30 menit setelah kerja membantu mengurangi stress dan meningkatkan mood.",
                "📚 Belajar 30 menit setiap hari akan memberikan progress yang signifikan dalam jangka panjang.",
                "☕ Batasi konsumsi kopi di malam hari agar tidak mengganggu tidur.",
                "🧹 Rutinitas bersih-bersih yang terjadwal membantu menjaga lingkungan tetap nyaman.",
                "🎮 Waktu lepas juga penting untuk mental health, jangan merasa bersalah!",
                "📝 Task list kerja 1 jam setiap hari membantu mempersiapkan hari berikutnya."
            ];
            response=tips[Math.floor(Math.random()*tips.length)];
            break;
    }

    setTimeout(() => addMessage(response),500);
}

function getActivityTip(type) {
    const tips={
        'work': '💼 Fokus dan jangan lupa istirahat sejenak!',
        'study': '📚 Konsentrasi penuh, matikan distraksi!',
        'exercise': '🏃‍♂️ Jaga hidrasi dan lakukan pemanasan!',
        'rest': '😴 Rileks dan biarkan tubuh memulihkan energi.',
        'meal': '🍽️ Nikmati makanan dengan tenang, jangan terburu-buru.',
        'personal': '⭐ Waktu untuk diri sendiri, lakukan yang membuat bahagia!'
    };
    return tips[type]||'✨ Lakukan yang terbaik!';
}

function toggleChat() {
    const chatContainer=document.getElementById('chatContainer');
    if(chatContainer.style.display==='none'||!chatContainer.style.display) {
        chatContainer.style.display='flex';
        updateCurrentTime();
    } else {
        chatContainer.style.display='none';
    }
}

// Update time every second when chat is open
setInterval(() => {
    const chatContainer=document.getElementById('chatContainer');
    if(chatContainer.style.display==='flex') {
        updateCurrentTime();
    }
},1000);

// Initialize
updateCurrentTime();