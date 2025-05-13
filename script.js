const messages = {
    friend: [
        "Bestevenn! Håper dagen din er like fantastisk som deg!",
        "Du er en fantastisk person som sprer glede hver dag!",
        "Sender deg en stor klem og masse gode tanker!",
    ],
    love: [
        "Du er min kjærlighet, alltid og for alltid!",
        "Hjertet mitt slår for deg!",
        "Du er solen i mitt liv!",
    ],
    crush: [
        "Jeg har et hemmelig crush på deg!",
        "Du er utrolig spesiell!",
        "Håper vi kan bli bedre kjent!",
    ]
};

let currentEffect = 'none';
let currentFont = 'Dancing Script';
let currentBorder = 'none';
let currentTextColor = '#ff1493';
let currentType = 'friend';

function changeMessage() {
    const messageElement = document.getElementById('message').querySelector('p');
    const currentMessages = messages[currentType];
    let newMessage;
    do {
        newMessage = currentMessages[Math.floor(Math.random() * currentMessages.length)];
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
    
    const card = document.querySelector('.card');
    card.classList.remove('friend', 'love', 'crush');
    card.classList.add(currentType);

    const emojiElement = document.getElementById('emoji');
    
    // Endre emoji basert på korttype
    if (currentType === 'friend') {
        emojiElement.textContent = '😊';
    } else if (currentType === 'love') {
        emojiElement.textContent = '❤️';
    } else if (currentType === 'crush') {
        emojiElement.textContent = '💖';
    }
    
    const currentUrl = window.location.href.split('?')[0];
    const message = document.getElementById('message').querySelector('p').textContent;

    const url = new URL(currentUrl);
    url.searchParams.set('name', name);
    url.searchParams.set('color', card.style.backgroundColor || '#ffb6c1');
    url.searchParams.set('effect', currentEffect);
    url.searchParams.set('message', message);
    url.searchParams.set('font', currentFont);
    url.searchParams.set('border', currentBorder);
    url.searchParams.set('textColor', currentTextColor);
    url.searchParams.set('type', currentType);

    const messageElement = document.getElementById('message').querySelector('p');
    const font = document.getElementById('message').style.fontFamily;
    const textColor = document.getElementById('message').style.color;
    const border = document.querySelector('.card').style.border;
    const emoji = document.getElementById('emoji').textContent;

    url.searchParams.set('message', messageElement.textContent);
    url.searchParams.set('font', font);
    url.searchParams.set('textColor', textColor);
    url.searchParams.set('border', border);
    url.searchParams.set('emoji', emoji);

    navigator.clipboard.writeText(url.toString()).then(() => {
        alert('Link kopiert! Du kan nå dele den med en venn!');
    }).catch(err => {
        alert('Kunne ikke kopiere linken. Prøv igjen!');
    });
}

function changeCardType(type) {
    currentType = type;
    const emojiElement = document.getElementById('emoji');
    
    // Endre emoji basert på korttype
    if (type === 'friend') {
        emojiElement.textContent = '😊';
    } else if (type === 'love') {
        emojiElement.textContent = '❤️';
    } else if (type === 'crush') {
        emojiElement.textContent = '💖';
    }
    const card = document.querySelector('.card');
    card.classList.remove('friend', 'love', 'crush');
    card.classList.add(type);
    
    // Endre meldingen med det første
    changeMessage();

    console.log(`Korttype endret til: ${type}`);
}

function setEmojiFromURL() {
    const params = new URLSearchParams(window.location.search);
    const emoji = params.get('emoji');
    const emojiElement = document.getElementById('emoji');
    
    if (emoji) {
        emojiElement.textContent = emoji;
    } else {
        const type = params.get('type');
        if (type === 'friend') {
            emojiElement.textContent = '😊';
        } else if (type === 'love') {
            emojiElement.textContent = '❤️';
        } else if (type === 'crush') {
            emojiElement.textContent = '💖';
        }
    }
}

window.onload = function() {
    const params = new URLSearchParams(window.location.search);

    // Sett emoji basert på currentType
    const emojiElement = document.getElementById('emoji');
    if (emojiElement) {
        if (currentType === 'friend') {
            emojiElement.textContent = '😊';
        } else if (currentType === 'love') {
            emojiElement.textContent = '❤️';
        } else if (currentType === 'crush') {
            emojiElement.textContent = '💖';
        }
    }

    if (params.has('name')) {
        document.querySelectorAll('button, input, .options-container, .main-buttons, .button-container, .card-type-buttons').forEach(el => el.style.display = 'none');

        const card = document.querySelector('.card');
        card.classList.add('card-closed');
        
        const overlay = document.createElement('div');
        overlay.className = 'card-overlay';
        
        const openButton = document.createElement('button');
        const cardType = params.get('type') || 'friend';
        openButton.className = 'open-button';
        openButton.setAttribute('data-type', cardType);

        // Bruk emoji fra emojiElement
        let emojiText = emojiElement ? emojiElement.textContent : '😊'; // Standard emoji
        openButton.textContent = emojiText;
        
        overlay.appendChild(openButton);
        document.body.appendChild(overlay);

        openButton.addEventListener('click', function() {
            overlay.style.display = 'none';
            card.classList.add('card-open');
            
            card.style.backgroundColor = params.get('color') || '#ffb6c1';
            
            if (params.get('effect') !== 'none') {
                changeEffect(params.get('effect'));
            }

            const nameElement = document.createElement('p');
            nameElement.textContent = 'Fra ' + params.get('name');
            nameElement.style.marginBottom = '20px';
            nameElement.style.fontFamily = params.get('font') || 'Dancing Script';
            nameElement.style.color = params.get('textColor') || '#ff1493';
            
            const messageDiv = document.getElementById('message');
            messageDiv.insertBefore(nameElement, messageDiv.firstChild);

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
