const messages = [
    "Bestevenn! Håper dagen din er like fantastisk som deg!",
    "Du er en fantastisk person som sprer glede hver dag!",
    "Sender deg en stor klem og masse gode tanker!",
    "Du gjør verden til et bedre sted bare ved å være deg selv!",
    "Håper du får en dag full av smil og glede!",
    "Du er helt unik og utrolig verdifull!",
    "Takk for at du er akkurat den du er!"
];

let currentEffect = 'none';
let currentFont = 'Dancing Script';
let currentBorder = 'none';
let currentTextColor = '#ff1493';

function changeMessage() {
    const messageElement = document.getElementById('message').querySelector('p');
    let newMessage;
    do {
        newMessage = messages[Math.floor(Math.random() * messages.length)];
    } while (newMessage === messageElement.textContent);
    messageElement.textContent = newMessage;
}

function changeEffect(effect) {
    const card = document.querySelector('.card');
    card.classList.remove('effect-hearts', 'effect-sparkles', 'effect-dots', 'effect-waves');
    if (effect !== 'none') {
        card.classList.add(`effect-${effect}`);
    }
    currentEffect = effect;
}

function changeColor(color) {
    document.querySelector('.card').style.backgroundColor = color;
}

function changeFont(font) {
    const message = document.getElementById('message');
    message.style.fontFamily = font;
    currentFont = font;
}

function changeBorder(border) {
    const card = document.querySelector('.card');
    // Fjern alle eksisterende rammer først
    card.classList.remove('border-simple', 'border-hearts', 'border-dotted');
    if (border !== 'none') {
        card.classList.add(`border-${border}`);
    }
    currentBorder = border;
}

function changeTextColor(color) {
    const message = document.getElementById('message');
    message.style.color = color;
    currentTextColor = color;
}

function shareCard() {
    const name = document.getElementById('nameInput').value;
    if (!name) {
        alert('Du må skrive inn navnet ditt først!');
        return;
    }

    const currentUrl = window.location.href.split('?')[0];
    const card = document.querySelector('.card');
    const message = document.getElementById('message').querySelector('p').textContent;

    const url = new URL(currentUrl);
    url.searchParams.set('name', name);
    url.searchParams.set('color', card.style.backgroundColor || '#ffb6c1');
    url.searchParams.set('effect', currentEffect);
    url.searchParams.set('message', message);
    url.searchParams.set('font', currentFont);
    url.searchParams.set('border', currentBorder);
    url.searchParams.set('textColor', currentTextColor);

    navigator.clipboard.writeText(url.toString()).then(() => {
        alert('Link kopiert! Du kan nå dele den med en venn!');
    }).catch(err => {
        alert('Kunne ikke kopiere linken. Prøv igjen!');
    });
}

// Kryptering/dekryptering funksjoner
function encrypt(text) {
    return btoa(encodeURIComponent(text)).replace(/=/g, '_');
}

function decrypt(encoded) {
    try {
        return decodeURIComponent(atob(encoded.replace(/_/g, '=')));
    } catch (e) {
        console.error('Dekrypteringsfeil:', e);
        return '';
    }
}

function setUnlockDate() {
    const unlockDate = document.getElementById('unlockDateTime').value;
    if (!unlockDate) {
        alert('Vennligst velg en dato og tid');
        return;
    }

    // Samle kortdata for begge delklapper
    const cardData = {
        unlockDate: unlockDate,
        cardType: document.querySelector('.type-btn.active')?.id.replace('Btn', '') || 'default',
        name: document.getElementById('nameInput')?.value || '',
        frontMessage: document.getElementById('frontMessage')?.value || '',
        insideMessage: document.getElementById('insideMessage')?.value || ''
    };

    // Krypter kortdataen
    const encryptedData = encrypt(JSON.stringify(cardData));
    
    // Lag URL med kryptert data
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('data', encryptedData);
    
    // Kopier lenken
    navigator.clipboard.writeText(currentUrl.toString())
        .then(() => alert('Lenke til låst kort er kopiert til utklippstavlen!'))
        .catch(() => alert('Kunne ikke kopiere lenken automatisk. Vennligst kopier URL-en manuelt.'));

    // Lås kortet
    lockCard(unlockDate);
}

function lockCard(unlockDate) {
    const now = new Date();
    const unlockDateTime = new Date(unlockDate);
    
    // Skjul kortinnholdet og vis låsemeldingen
    document.getElementById('cardContent').style.display = 'none';
    document.getElementById('lockMessage').classList.remove('hidden');
    
    // Oppdater visningsteksten for låsetiden
    const formattedDate = unlockDateTime.toLocaleString('no-NO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    let messageText;
    if (now >= unlockDateTime) {
        messageText = '🎁 Klikk hvor som helst på kortet for å åpne det!';
        document.querySelector('.card').addEventListener('click', tryOpenCard);
    } else {
        messageText = `🔒 Dette kortet kan ikke åpnes før ${formattedDate}`;
        // Start nedtelling
        startCountdown(unlockDateTime);
    }
    
    document.getElementById('unlockTime').textContent = messageText;
}

function startCountdown(unlockDateTime) {
    const countdownInterval = setInterval(() => {
        const now = new Date();
        if (now >= unlockDateTime) {
            // Tiden er inne!
            clearInterval(countdownInterval);
            document.getElementById('unlockTime').textContent = '🎁 Klikk hvor som helst på kortet for å åpne det!';
            document.querySelector('.card').addEventListener('click', tryOpenCard);
        }
    }, 1000);
}

function tryOpenCard() {
    const urlParams = new URLSearchParams(window.location.search);
    const unlockDate = urlParams.get('unlockDate');
    
    if (!unlockDate) {
        return;
    }

    const now = new Date();
    const unlockDateTime = new Date(unlockDate);

    if (now >= unlockDateTime) {
        // Vis kortinnholdet
        document.getElementById('cardContent').style.display = 'block';
        document.getElementById('lockMessage').classList.add('hidden');
        // Fjern klikk-lytteren
        document.querySelector('.card').removeEventListener('click', tryOpenCard);
    } else {
        const formattedDate = unlockDateTime.toLocaleString('no-NO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        alert(`Dette kortet kan ikke åpnes før ${formattedDate}`);
    }
}

function selectCardType(type) {
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const typeBtn = document.getElementById(`${type}Btn`);
    if (typeBtn) {
        typeBtn.classList.add('active');
    }
    
    const selectedText = {
        'vennekort': '🤝 Du har valgt Vennekort',
        'kjaerlighetskort': '❤️ Du har valgt Kjærlighetskort',
        'hemmelig': '🤫 Du har valgt Hemmelig beundrer'
    };
    
    document.getElementById('selectedType').textContent = selectedText[type] || '';
    
    const nameInput = document.getElementById('nameInput');
    if (type === 'hemmelig') {
        nameInput.style.display = 'none';
        nameInput.value = 'Din hemmelige beundrer';
    } else {
        nameInput.style.display = 'block';
        if (nameInput.value === 'Din hemmelige beundrer') {
            nameInput.value = '';
        }
    }
}

// Legg til i window.addEventListener('load')
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const encryptedData = urlParams.get('data');
    
    if (encryptedData) {
        try {
            // Dekrypter og parse kortdata
            const cardData = JSON.parse(decrypt(encryptedData));
            
            // Skjul input-seksjoner
            document.getElementById('cardTypeSelector').style.display = 'none';
            document.getElementById('dateInputSection').style.display = 'none';
            
            // Sett korttype
            if (cardData.cardType) {
                selectCardType(cardData.cardType);
            }
            
            // Sett navn
            if (cardData.name) {
                const nameInput = document.getElementById('nameInput');
                if (nameInput) nameInput.value = cardData.name;
            }
            
            // Sett forsidemelding
            if (cardData.frontMessage) {
                const frontMessageArea = document.getElementById('frontMessage');
                if (frontMessageArea) frontMessageArea.value = cardData.frontMessage;
            }
            
            // Sett innvendig melding
            if (cardData.insideMessage) {
                const insideMessageArea = document.getElementById('insideMessage');
                if (insideMessageArea) insideMessageArea.value = cardData.insideMessage;
            }
            
            // Lås kortet
            lockCard(cardData.unlockDate);
        } catch (e) {
            console.error('Feil ved dekryptering av kortdata:', e);
            alert('Beklager, kunne ikke laste kortet.');
        }
    }
});

window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('name')) {
        // Skjul alle knapper og input
        document.querySelectorAll('button, input, .options-container, .main-buttons, .button-container, .card-type-buttons').forEach(el => el.style.display = 'none');

        // Sett alle innstillinger
        const card = document.querySelector('.card');
        card.classList.add('card-closed');
        
        // Lag overlay og åpne-knapp
        const overlay = document.createElement('div');
        overlay.className = 'card-overlay';
        
        const openButton = document.createElement('button');
        openButton.className = 'open-button';
        openButton.setAttribute('data-type', params.get('cardType') || 'friend');
        
        overlay.appendChild(openButton);
        document.body.appendChild(overlay);

        // Åpne-knapp funksjonalitet
        openButton.addEventListener('click', function() {
            overlay.style.display = 'none';
            card.classList.add('card-open');
            
            // Sett alle innstillinger etter kortet er åpnet
            card.style.backgroundColor = params.get('color') || '#ffb6c1';
            
            if (params.get('effect') !== 'none') {
                changeEffect(params.get('effect'));
            }

            // Opprett og sett inn "Fra [navn]" på toppen av kortet
            const nameElement = document.createElement('p');
            nameElement.textContent = 'Fra ' + params.get('name');
            nameElement.style.marginBottom = '20px';
            nameElement.style.fontFamily = params.get('font') || 'Dancing Script';
            nameElement.style.color = params.get('textColor') || '#ff1493';
            
            // Sett inn navnet før meldingen
            const messageDiv = document.getElementById('message');
            messageDiv.insertBefore(nameElement, messageDiv.firstChild);

            // Oppdater meldingen
            if (params.get('message')) {
                const messageElement = document.getElementById('message').querySelector('p:last-child');
                messageElement.textContent = params.get('message');
            }

            if (params.get('font')) {
                document.getElementById('message').style.fontFamily = params.get('font');
            }

            if (params.get('border') && params.get('border') !== 'none') {
                changeBorder(params.get('border'));
            }

            if (params.get('textColor')) {
                document.getElementById('message').style.color = params.get('textColor');
            }
        });
    }
};
