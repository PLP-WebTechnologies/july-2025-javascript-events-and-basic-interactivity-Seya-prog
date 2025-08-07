// ========================================
// PART 1: EVENT HANDLING AND INTERACTIVE ELEMENTS
// ========================================

// Wait for DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
        
        // Show feedback message
        showEventMessage(`Switched to ${newTheme} mode!`);
    });
    
    function updateThemeButton(theme) {
        themeToggle.textContent = theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
    }
    
    // Event Handling Demo Section
    const clickBtn = document.getElementById('click-btn');
    const hoverBtn = document.getElementById('hover-btn');
    const keyboardInput = document.getElementById('keyboard-input');
    const eventOutput = document.getElementById('event-output');
    
    // Click event handler
    let clickCount = 0;
    clickBtn.addEventListener('click', function(event) {
        clickCount++;
        showEventMessage(`Button clicked ${clickCount} time(s)! 🎉`);
        
        // Add visual feedback
        clickBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clickBtn.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Hover events
    hoverBtn.addEventListener('mouseenter', function() {
        showEventMessage('Mouse entered the hover button! 🐭');
        hoverBtn.style.backgroundColor = '#4CAF50';
    });
    
    hoverBtn.addEventListener('mouseleave', function() {
        showEventMessage('Mouse left the hover button! 👋');
        hoverBtn.style.backgroundColor = '';
    });
    
    // Keyboard events
    keyboardInput.addEventListener('input', function(event) {
        const value = event.target.value;
        if (value.length > 0) {
            showEventMessage(`You typed: "${value}" ⌨️`);
        }
    });
    
    keyboardInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            showEventMessage('Enter key pressed! 🚀');
        }
    });
    
    // Function to display event messages
    function showEventMessage(message) {
        const timestamp = new Date().toLocaleTimeString();
        eventOutput.innerHTML = `<p><strong>[${timestamp}]</strong> ${message}</p>` + eventOutput.innerHTML;
        
        // Keep only the last 5 messages
        const messages = eventOutput.querySelectorAll('p');
        if (messages.length > 5) {
            messages[messages.length - 1].remove();
        }
    }
    
    // ========================================
    // PART 2: INTERACTIVE FEATURES
    // ========================================
    
    // Counter Game
    const counterValue = document.getElementById('counter-value');
    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    let counter = 0;
    
    incrementBtn.addEventListener('click', function() {
        counter++;
        updateCounter();
        showEventMessage(`Counter incremented to ${counter}`);
    });
    
    decrementBtn.addEventListener('click', function() {
        counter--;
        updateCounter();
        showEventMessage(`Counter decremented to ${counter}`);
    });
    
    resetBtn.addEventListener('click', function() {
        counter = 0;
        updateCounter();
        showEventMessage('Counter reset to 0');
    });
    
    function updateCounter() {
        counterValue.textContent = counter;
        
        // Add color coding based on value
        counterValue.className = '';
        if (counter > 0) {
            counterValue.classList.add('positive');
        } else if (counter < 0) {
            counterValue.classList.add('negative');
        }
    }
    
    // Collapsible FAQ Section
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('.faq-icon');
            
            // Toggle the active state
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            faqQuestions.forEach(otherQuestion => {
                const otherItem = otherQuestion.parentElement;
                const otherIcon = otherQuestion.querySelector('.faq-icon');
                otherItem.classList.remove('active');
                otherIcon.textContent = '+';
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
                icon.textContent = '-';
                showEventMessage(`FAQ opened: ${this.textContent.replace(' +', '').replace(' -', '')}`);
            } else {
                faqItem.classList.remove('active');
                icon.textContent = '+';
                showEventMessage('FAQ closed');
            }
        });
    });
    
    // Tabbed Interface
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            showEventMessage(`Switched to ${this.textContent} tab`);
        });
    });
    
    // ========================================
    // PART 3: FORM VALIDATION
    // ========================================
    
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    // Form field references
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    const messageField = document.getElementById('message');
    const termsField = document.getElementById('terms');
    
    // Real-time validation on input
    nameField.addEventListener('input', () => validateName());
    emailField.addEventListener('input', () => validateEmail());
    phoneField.addEventListener('input', () => validatePhone());
    passwordField.addEventListener('input', () => validatePassword());
    confirmPasswordField.addEventListener('input', () => validateConfirmPassword());
    messageField.addEventListener('input', () => validateMessage());
    termsField.addEventListener('change', () => validateTerms());
    
    // Form submission handler
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isMessageValid = validateMessage();
        const isTermsValid = validateTerms();
        
        // Check if all validations pass
        const isFormValid = isNameValid && isEmailValid && isPhoneValid && 
                           isPasswordValid && isConfirmPasswordValid && 
                           isMessageValid && isTermsValid;
        
        if (isFormValid) {
            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            showEventMessage('Form submitted successfully! ✅');
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';
                clearAllErrors();
                showEventMessage('Form reset for new submission');
            }, 3000);
        } else {
            showEventMessage('Please fix the errors in the form ❌');
        }
    });
    
    // Validation Functions
    function validateName() {
        const name = nameField.value.trim();
        const nameError = document.getElementById('name-error');
        
        if (name.length === 0) {
            showError(nameError, 'Name is required');
            return false;
        } else if (name.length < 2) {
            showError(nameError, 'Name must be at least 2 characters long');
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            showError(nameError, 'Name can only contain letters and spaces');
            return false;
        } else {
            clearError(nameError);
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailField.value.trim();
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email.length === 0) {
            showError(emailError, 'Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailError, 'Please enter a valid email address');
            return false;
        } else {
            clearError(emailError);
            return true;
        }
    }
    
    function validatePhone() {
        const phone = phoneField.value.trim();
        const phoneError = document.getElementById('phone-error');
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        
        if (phone.length === 0) {
            clearError(phoneError);
            return true; // Phone is optional
        } else if (!phoneRegex.test(phone)) {
            showError(phoneError, 'Please enter a valid phone number');
            return false;
        } else {
            clearError(phoneError);
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordField.value;
        const passwordError = document.getElementById('password-error');
        
        if (password.length === 0) {
            showError(passwordError, 'Password is required');
            return false;
        } else if (password.length < 8) {
            showError(passwordError, 'Password must be at least 8 characters long');
            return false;
        } else if (!/(?=.*[a-z])/.test(password)) {
            showError(passwordError, 'Password must contain at least one lowercase letter');
            return false;
        } else if (!/(?=.*[A-Z])/.test(password)) {
            showError(passwordError, 'Password must contain at least one uppercase letter');
            return false;
        } else if (!/(?=.*\d)/.test(password)) {
            showError(passwordError, 'Password must contain at least one number');
            return false;
        } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
            showError(passwordError, 'Password must contain at least one special character (!@#$%^&*)');
            return false;
        } else {
            clearError(passwordError);
            return true;
        }
    }
    
    function validateConfirmPassword() {
        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;
        const confirmPasswordError = document.getElementById('confirm-password-error');
        
        if (confirmPassword.length === 0) {
            showError(confirmPasswordError, 'Please confirm your password');
            return false;
        } else if (password !== confirmPassword) {
            showError(confirmPasswordError, 'Passwords do not match');
            return false;
        } else {
            clearError(confirmPasswordError);
            return true;
        }
    }
    
    function validateMessage() {
        const message = messageField.value.trim();
        const messageError = document.getElementById('message-error');
        
        if (message.length > 500) {
            showError(messageError, 'Message must be less than 500 characters');
            return false;
        } else {
            clearError(messageError);
            return true;
        }
    }
    
    function validateTerms() {
        const terms = termsField.checked;
        const termsError = document.getElementById('terms-error');
        
        if (!terms) {
            showError(termsError, 'You must agree to the terms and conditions');
            return false;
        } else {
            clearError(termsError);
            return true;
        }
    }
    
    // Helper functions for error handling
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.parentElement.classList.add('error');
    }
    
    function clearError(errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        errorElement.parentElement.classList.remove('error');
    }
    
    function clearAllErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(clearError);
    }
    
    // Initialize the page
    showEventMessage('Page loaded successfully! Try out the interactive features. 🚀');
});
