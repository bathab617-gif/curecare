document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const userInput = document.getElementById('userInput');
    const loginBtn = document.getElementById('loginBtn');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });

    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleLogin();
    });

    function handleLogin() {
        const username = usernameInput.value.trim();
        const inputValue = userInput.value.trim();
        const countryCode = document.getElementById('countryCode').value;

        if (!username) {
            alert('يرجى إدخال اسم المستخدم');
            usernameInput.focus();
            return;
        }

        if (!inputValue) {
            alert('يرجى إدخال البريد الإلكتروني أو رقم الهاتف');
            userInput.focus();
            return;
        }

        // Check if it's an email or phone
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);
        const isPhone = /^\d{7,15}$/.test(inputValue); // Basic phone check

        if (!isEmail && !isPhone) {
            alert('يرجى إدخال بريد إلكتروني صحيح أو رقم هاتف صحيح (أرقام فقط)');
            userInput.focus();
            return;
        }

        if (isPhone && !countryCode) {
            alert('يرجى اختيار رمز الدولة للرقم');
            return;
        }

        // For phone, combine with country code
        const finalInput = isPhone ? countryCode + inputValue : inputValue;

        try {
            localStorage.setItem('username', username);
            localStorage.setItem('user', finalInput);
            window.location.href = 'dashboard.html';
        } catch (error) {
            alert('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.');
            console.error('Login error:', error);
        }
    }

    // Auto-focus username on page load
    usernameInput.focus();

    // Allow Enter key to trigger login
    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            userInput.focus();
        }
    });

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
});