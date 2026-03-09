document.addEventListener('DOMContentLoaded', () => {
    // Form Elements
    const fullNameInput = document.getElementById('full-name');
    const jobTitleInput = document.getElementById('job-title');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const locationInput = document.getElementById('location');
    const websiteInput = document.getElementById('website');
    const summaryInput = document.getElementById('summary');
    const skillsInput = document.getElementById('skills');
    const photoInput = document.getElementById('profile-photo');

    // Preview Elements
    const previewName = document.getElementById('preview-name');
    const previewTitle = document.getElementById('preview-title');
    const previewEmail = document.getElementById('preview-email');
    const previewPhone = document.getElementById('preview-phone');
    const previewLocation = document.getElementById('preview-location');
    const previewWebsite = document.getElementById('preview-website');
    const previewSummary = document.getElementById('preview-summary');
    const previewSkillsList = document.getElementById('preview-skills-list');
    const previewExperienceList = document.getElementById('preview-experience-list');
    const previewEducationList = document.getElementById('preview-education-list');
    const previewAvatar = document.getElementById('preview-avatar');
    const previewAvatarContainer = document.getElementById('preview-avatar-container');
    const langSelect = document.getElementById('lang-select');

    // Translations Object
    const translations = {
        en: {
            appTitle: "CV Studio",
            appSubtitle: "Build your professional presence.",
            personalInfo: "Personal Info",
            photo: "Profile Photo",
            name: "Full Name",
            jobTitle: "Job Title",
            email: "Email",
            phone: "Phone",
            location: "Location",
            website: "Portfolio/LinkedIn",
            summary: "Professional Summary",
            experience: "Work Experience",
            education: "Education",
            skills: "Skills",
            addBtn: "+ Add",
            downloadBtn: "Download PDF",
            placeholders: {
                name: "John Doe",
                job: "Senior Product Designer",
                email: "john@example.com",
                phone: "+1 (555) 000-0000",
                location: "New York, NY",
                website: "linkedin.com/in/johndoe",
                summary: "Briefly describe your expertise...",
                skills: "UI/UX, React, Node.js",
                company: "Google",
                role: "Senior Dev",
                duration: "2020 - Present",
                desc: "Describe your responsibilities...",
                school: "MIT",
                degree: "Computer Science"
            }
        },
        uz_lat: {
            appTitle: "CV Studio",
            appSubtitle: "Professional qiyofangizni yarating.",
            personalInfo: "Shaxsiy ma'lumotlar",
            photo: "Profil rasmi",
            name: "To'liq ism",
            jobTitle: "Kasp/Lavozim",
            email: "Email",
            phone: "Telefon",
            location: "Manzil",
            website: "Portfolio/LinkedIn",
            summary: "Professional xulosa",
            experience: "Ish tajribasi",
            education: "Ta'lim",
            skills: "Ko'nikmalar",
            addBtn: "+ Qo'shish",
            downloadBtn: "PDF yuklab olish",
            placeholders: {
                name: "Ali Valiyev",
                job: "Senior Dasturchi",
                email: "ali@example.com",
                phone: "+998 90 123 45 67",
                location: "Toshkent, O'zbekiston",
                website: "linkedin.com/in/alivaliyev",
                summary: "O'z tajribangiz haqida qisqacha...",
                skills: "Dasturlash, Menejment",
                company: "Kompaniya nomi",
                role: "Lavozim",
                duration: "2020 - Hozir",
                desc: "Vazifalaringizni tavsiflang...",
                school: "Universitet",
                degree: "Mutaxassislik"
            }
        },
        uz_cyr: {
            appTitle: "CV Studio",
            appSubtitle: "Профессионал қиёфангизни яратинг.",
            personalInfo: "Шахсий маълумотлар",
            photo: "Профил расми",
            name: "Тўлиқ исм",
            jobTitle: "Касп/Лавозим",
            email: "Email",
            phone: "Телефон",
            location: "Манзил",
            website: "Portfolio/LinkedIn",
            summary: "Профессионал хулоса",
            experience: "Иш тажрибаси",
            education: "Таълим",
            skills: "Кўникмалар",
            addBtn: "+ Қўшиш",
            downloadBtn: "PDF юклаб олиш",
            placeholders: {
                name: "Али Валиев",
                job: "Senior Дастурчи",
                email: "ali@example.com",
                phone: "+998 90 123 45 67",
                location: "Тошкент, Ўзбекистон",
                website: "linkedin.com/in/alivaliyev",
                summary: "Ўз тажрибангиз ҳақида қисқача...",
                skills: "Дастурлаш, Менежмент",
                company: "Компания номи",
                role: "Лавозим",
                duration: "2020 - Ҳозир",
                desc: "Вазифаларингизни тавсифланг...",
                school: "Университет",
                degree: "Мутахассислик"
            }
        },
        ru: {
            appTitle: "CV Studio",
            appSubtitle: "Создайте свой профессиональный образ.",
            personalInfo: "Личная информация",
            photo: "Фото профиля",
            name: "Полное имя",
            jobTitle: "Должность",
            email: "Email",
            phone: "Телефон",
            location: "Местоположение",
            website: "Портфолио/LinkedIn",
            summary: "Профессиональное резюме",
            experience: "Опыт работы",
            education: "Образование",
            skills: "Навыки",
            addBtn: "+ Добавить",
            downloadBtn: "Скачать PDF",
            placeholders: {
                name: "Иван Иванов",
                job: "Старший разработчик",
                email: "ivan@example.com",
                phone: "+7 (999) 000-00-00",
                location: "Москва, Россия",
                website: "linkedin.com/in/ivanov",
                summary: "Кратко опишите ваш опыт...",
                skills: "Дизайн, Разработка",
                company: "Название компании",
                role: "Должность",
                duration: "2020 - Настоящее время",
                desc: "Опишите ваши обязанности...",
                school: "Университет",
                degree: "Специальность"
            }
        }
    };

    let currentLang = 'en';

    // Lists for Dynamic Sections
    let experienceItems = [];
    let educationItems = [];
    let avatarBase64 = "";

    // Helper: Update UI Language
    const updateUILanguage = (lang) => {
        currentLang = lang;
        const t = translations[lang];

        // Header
        document.getElementById('label-app-title').textContent = t.appTitle;
        document.getElementById('label-app-subtitle').textContent = t.appSubtitle;

        // Sections
        document.getElementById('label-personal-info').textContent = t.personalInfo;
        document.getElementById('label-photo').textContent = t.photo;
        document.getElementById('label-name').textContent = t.name;
        document.getElementById('label-job-title').textContent = t.jobTitle;
        document.getElementById('label-email').textContent = t.email;
        document.getElementById('label-phone').textContent = t.phone;
        document.getElementById('label-location').textContent = t.location;
        document.getElementById('label-website').textContent = t.website;
        document.getElementById('label-summary').textContent = t.summary;
        document.getElementById('label-experience').textContent = t.experience;
        document.getElementById('label-education').textContent = t.education;
        document.getElementById('label-skills').textContent = t.skills;

        // Preview Headers
        document.getElementById('preview-label-summary').textContent = t.summary;
        document.getElementById('preview-label-experience').textContent = t.experience;
        document.getElementById('preview-label-education').textContent = t.education;
        document.getElementById('preview-label-skills').textContent = t.skills;

        // Buttons
        document.getElementById('add-experience').textContent = t.addBtn;
        document.getElementById('add-education').textContent = t.addBtn;
        document.getElementById('download-btn').textContent = t.downloadBtn;

        // Placeholders
        fullNameInput.placeholder = t.placeholders.name;
        jobTitleInput.placeholder = t.placeholders.job;
        emailInput.placeholder = t.placeholders.email;
        phoneInput.placeholder = t.placeholders.phone;
        locationInput.placeholder = t.placeholders.location;
        websiteInput.placeholder = t.placeholders.website;
        summaryInput.placeholder = t.placeholders.summary;
        skillsInput.placeholder = t.placeholders.skills;

        renderExperience();
        renderEducation();
    };

    langSelect.addEventListener('change', (e) => {
        updateUILanguage(e.target.value);
        saveToLocalStorage();
    });

    // Helper: Update Single Text Element
    const updateText = (input, preview, fallbackKey) => {
        input.addEventListener('input', (e) => {
            preview.textContent = e.target.value || translations[currentLang].placeholders[fallbackKey];
            saveToLocalStorage();
        });
    };

    // Initialize Text Updates
    updateText(fullNameInput, previewName, 'name');
    updateText(jobTitleInput, previewTitle, 'job');
    updateText(emailInput, previewEmail, 'email');
    updateText(phoneInput, previewPhone, 'phone');
    updateText(locationInput, previewLocation, 'location');
    updateText(websiteInput, previewWebsite, 'website');
    updateText(summaryInput, previewSummary, 'summary');

    // Photo Handling
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                avatarBase64 = event.target.result;
                previewAvatar.src = avatarBase64;
                previewAvatarContainer.classList.remove('hidden');
                saveToLocalStorage();
            };
            reader.readAsDataURL(file);
        }
    });

    // Skills Update
    skillsInput.addEventListener('input', (e) => {
        const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
        previewSkillsList.innerHTML = skills.map(s => `<span class="skill-tag">${s}</span>`).join('');
        saveToLocalStorage();
    });

    // Dynamic Section: Experience
    const addExperienceBtn = document.getElementById('add-experience');
    const experienceContainer = document.getElementById('experience-list');

    const renderExperience = () => {
        experienceContainer.innerHTML = '';
        previewExperienceList.innerHTML = '';

        experienceItems.forEach((item, index) => {
            const t = translations[currentLang];
            // Sidebar Input Item
            const itemEl = document.createElement('div');
            itemEl.className = 'repeater-item';
            itemEl.innerHTML = `
                <button type="button" class="remove-btn" data-index="${index}">×</button>
                <div class="input-grid">
                    <div class="input-group">
                        <label>${t.experience.split(' ')[0]}</label>
                        <input type="text" value="${item.company}" data-field="company" data-index="${index}" placeholder="${t.placeholders.company}">
                    </div>
                    <div class="input-group">
                        <label>Role</label>
                        <input type="text" value="${item.role}" data-field="role" data-index="${index}" placeholder="${t.placeholders.role}">
                    </div>
                    <div class="input-group">
                        <label>Duration</label>
                        <input type="text" value="${item.duration}" data-field="duration" data-index="${index}" placeholder="${t.placeholders.duration}">
                    </div>
                    <div class="input-group full-width">
                        <label>Description</label>
                        <textarea data-field="desc" data-index="${index}" placeholder="${t.placeholders.desc}">${item.desc}</textarea>
                    </div>
                </div>
            `;
            experienceContainer.appendChild(itemEl);

            // Preview Item
            const previewEl = document.createElement('div');
            previewEl.className = 'preview-item';
            previewEl.innerHTML = `
                <div class="preview-item-header">
                    <span>${item.company || t.placeholders.company}</span>
                    <span>${item.duration || t.placeholders.duration}</span>
                </div>
                <div class="preview-item-sub">${item.role || t.placeholders.role}</div>
                <div class="preview-item-desc">${item.desc || t.placeholders.desc}</div>
            `;
            previewExperienceList.appendChild(previewEl);
        });
    };

    addExperienceBtn.addEventListener('click', () => {
        experienceItems.push({ company: '', role: '', duration: '', desc: '' });
        renderExperience();
        saveToLocalStorage();
    });

    experienceContainer.addEventListener('input', (e) => {
        const { index, field } = e.target.dataset;
        if (index !== undefined && field) {
            experienceItems[index][field] = e.target.value;
            renderExperience();
            // Re-focus the element to keep editing smooth
            const focusedId = `${field}-${index}`;
            e.target.id = focusedId;
            document.getElementById(focusedId).focus();
            saveToLocalStorage();
        }
    });

    experienceContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.dataset.index;
            experienceItems.splice(index, 1);
            renderExperience();
            saveToLocalStorage();
        }
    });

    // Dynamic Section: Education
    const addEducationBtn = document.getElementById('add-education');
    const educationContainer = document.getElementById('education-list');

    const renderEducation = () => {
        educationContainer.innerHTML = '';
        previewEducationList.innerHTML = '';

        educationItems.forEach((item, index) => {
            const t = translations[currentLang];
            const itemEl = document.createElement('div');
            itemEl.className = 'repeater-item';
            itemEl.innerHTML = `
                <button type="button" class="remove-btn" data-index="${index}">×</button>
                <div class="input-grid">
                    <div class="input-group">
                        <label>${t.education}</label>
                        <input type="text" value="${item.school}" data-field="school" data-index="${index}" placeholder="${t.placeholders.school}">
                    </div>
                    <div class="input-group">
                        <label>Degree</label>
                        <input type="text" value="${item.degree}" data-field="degree" data-index="${index}" placeholder="${t.placeholders.degree}">
                    </div>
                    <div class="input-group full-width">
                        <label>Dates</label>
                        <input type="text" value="${item.duration}" data-field="duration" data-index="${index}" placeholder="${t.placeholders.duration}">
                    </div>
                </div>
            `;
            educationContainer.appendChild(itemEl);

            const previewEl = document.createElement('div');
            previewEl.className = 'preview-item';
            previewEl.innerHTML = `
                <div class="preview-item-header">
                    <span>${item.school || t.placeholders.school}</span>
                    <span>${item.duration || t.placeholders.duration}</span>
                </div>
                <div class="preview-item-sub">${item.degree || t.placeholders.degree}</div>
            `;
            previewEducationList.appendChild(previewEl);
        });
    };

    addEducationBtn.addEventListener('click', () => {
        educationItems.push({ school: '', degree: '', duration: '' });
        renderEducation();
        saveToLocalStorage();
    });

    educationContainer.addEventListener('input', (e) => {
        const { index, field } = e.target.dataset;
        if (index !== undefined && field) {
            educationItems[index][field] = e.target.value;
            renderEducation();
            saveToLocalStorage();
        }
    });

    educationContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.dataset.index;
            educationItems.splice(index, 1);
            renderEducation();
            saveToLocalStorage();
        }
    });

    // Local Storage
    const saveToLocalStorage = () => {
        const data = {
            fullName: fullNameInput.value,
            jobTitle: jobTitleInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            location: locationInput.value,
            website: websiteInput.value,
            summary: summaryInput.value,
            skills: skillsInput.value,
            experience: experienceItems,
            education: educationItems,
            avatar: avatarBase64,
            language: currentLang
        };
        localStorage.setItem('cv-draft', JSON.stringify(data));
    };

    const loadFromLocalStorage = () => {
        const saved = localStorage.getItem('cv-draft');
        if (saved) {
            const data = JSON.parse(saved);
            fullNameInput.value = data.fullName || '';
            jobTitleInput.value = data.jobTitle || '';
            emailInput.value = data.email || '';
            phoneInput.value = data.phone || '';
            locationInput.value = data.location || '';
            websiteInput.value = data.website || '';
            summaryInput.value = data.summary || '';
            skillsInput.value = data.skills || '';
            experienceItems = data.experience || [];
            educationItems = data.education || [];
            avatarBase64 = data.avatar || "";
            currentLang = data.language || 'en';
            langSelect.value = currentLang;

            // Update UI with correct language
            updateUILanguage(currentLang);

            // Update previews
            previewName.textContent = data.fullName || translations[currentLang].placeholders.name;
            previewTitle.textContent = data.jobTitle || translations[currentLang].placeholders.job;
            previewEmail.textContent = data.email || translations[currentLang].placeholders.email;
            previewPhone.textContent = data.phone || translations[currentLang].placeholders.phone;
            previewLocation.textContent = data.location || translations[currentLang].placeholders.location;
            previewWebsite.textContent = data.website || translations[currentLang].placeholders.website;
            previewSummary.textContent = data.summary || translations[currentLang].placeholders.summary;

            if (avatarBase64) {
                previewAvatar.src = avatarBase64;
                previewAvatarContainer.classList.remove('hidden');
            } else {
                previewAvatarContainer.classList.add('hidden');
            }

            const skills = (data.skills || '').split(',').map(s => s.trim()).filter(s => s !== '');
            previewSkillsList.innerHTML = skills.map(s => `<span class="skill-tag">${s}</span>`).join('');

            renderExperience();
            renderEducation();
        } else {
            // Load Sample Data
            loadSampleData();
        }
    };

    const loadSampleData = () => {
        fullNameInput.value = "Abdurahmon G'ulomov";
        jobTitleInput.value = "Expert AI Solutions Architect";
        emailInput.value = "abdurahmon@example.com";
        phoneInput.value = "+998 90 123 45 67";
        locationInput.value = "Tashkent, Uzbekistan";
        websiteInput.value = "github.com/abdurahmon";
        summaryInput.value = "Experienced software engineer specializing in AI integration, modern web architectures, and premium user experience design. Passionate about building tools that empower users.";
        skillsInput.value = "JavaScript, React, Node.js, Python, OpenAI API, UI/UX Design";

        experienceItems = [
            { company: "Tech Global Solutions", role: "Senior Developer", duration: "2022 - Present", desc: "Leading a team of 15 developers in building next-gen AI platforms.\n- Optimized backend performance by 40%.\n- Implemented real-time data streaming." },
            { company: "Innovation Labs", role: "Frontend Engineer", duration: "2020 - 2022", desc: "Crafted beautiful, responsive user interfaces for high-traffic applications." }
        ];

        educationItems = [
            { school: "Tashkent University of Information Technologies", degree: "B.Sc. in Computer Science", duration: "2016 - 2020" }
        ];

        // Trigger updates
        fullNameInput.dispatchEvent(new Event('input'));
        jobTitleInput.dispatchEvent(new Event('input'));
        emailInput.dispatchEvent(new Event('input'));
        phoneInput.dispatchEvent(new Event('input'));
        locationInput.dispatchEvent(new Event('input'));
        websiteInput.dispatchEvent(new Event('input'));
        summaryInput.dispatchEvent(new Event('input'));
        skillsInput.dispatchEvent(new Event('input'));
        renderExperience();
        renderEducation();
    };

    // Download PDF
    document.getElementById('download-btn').addEventListener('click', () => {
        window.print();
    });

    loadFromLocalStorage();
});
