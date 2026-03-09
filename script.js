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

    // Lists for Dynamic Sections
    let experienceItems = [];
    let educationItems = [];
    let avatarBase64 = "";

    // Helper: Update Single Text Element
    const updateText = (input, preview, fallback = '') => {
        input.addEventListener('input', (e) => {
            preview.textContent = e.target.value || fallback;
            saveToLocalStorage();
        });
    };

    // Initialize Text Updates
    updateText(fullNameInput, previewName, 'Your Name');
    updateText(jobTitleInput, previewTitle, 'Your Job Title');
    updateText(emailInput, previewEmail, 'email@example.com');
    updateText(phoneInput, previewPhone, '00000000');
    updateText(locationInput, previewLocation, 'Location');
    updateText(websiteInput, previewWebsite, 'website.com');
    updateText(summaryInput, previewSummary, 'A brief introduction about your career journey...');

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
            // Sidebar Input Item
            const itemEl = document.createElement('div');
            itemEl.className = 'repeater-item';
            itemEl.innerHTML = `
                <button type="button" class="remove-btn" data-index="${index}">×</button>
                <div class="input-group">
                    <label>Company</label>
                    <input type="text" value="${item.company}" data-field="company" data-index="${index}" placeholder="Google">
                </div>
                <div class="input-group">
                    <label>Role</label>
                    <input type="text" value="${item.role}" data-field="role" data-index="${index}" placeholder="Senior Dev">
                </div>
                <div class="input-group">
                    <label>Duration</label>
                    <input type="text" value="${item.duration}" data-field="duration" data-index="${index}" placeholder="2020 - Present">
                </div>
                <div class="input-group full-width">
                    <label>Description</label>
                    <textarea data-field="desc" data-index="${index}" placeholder="Describe your responsibilities...">${item.desc}</textarea>
                </div>
            `;
            experienceContainer.appendChild(itemEl);

            // Preview Item
            const previewEl = document.createElement('div');
            previewEl.className = 'preview-item';
            previewEl.innerHTML = `
                <div class="preview-item-header">
                    <span>${item.company || 'Company'}</span>
                    <span>${item.duration || 'Date'}</span>
                </div>
                <div class="preview-item-sub">${item.role || 'Role'}</div>
                <div class="preview-item-desc">${item.desc || 'Responsibilities...'}</div>
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
            const itemEl = document.createElement('div');
            itemEl.className = 'repeater-item';
            itemEl.innerHTML = `
                <button type="button" class="remove-btn" data-index="${index}">×</button>
                <div class="input-group">
                    <label>Institution</label>
                    <input type="text" value="${item.school}" data-field="school" data-index="${index}" placeholder="MIT">
                </div>
                <div class="input-group">
                    <label>Degree</label>
                    <input type="text" value="${item.degree}" data-field="degree" data-index="${index}" placeholder="Computer Science">
                </div>
                <div class="input-group full-width">
                    <label>Dates</label>
                    <input type="text" value="${item.duration}" data-field="duration" data-index="${index}" placeholder="2016 - 2020">
                </div>
            `;
            educationContainer.appendChild(itemEl);

            const previewEl = document.createElement('div');
            previewEl.className = 'preview-item';
            previewEl.innerHTML = `
                <div class="preview-item-header">
                    <span>${item.school || 'University'}</span>
                    <span>${item.duration || 'Date'}</span>
                </div>
                <div class="preview-item-sub">${item.degree || 'Degree'}</div>
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
            avatar: avatarBase64
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

            // Update previews
            previewName.textContent = data.fullName || 'Your Name';
            previewTitle.textContent = data.jobTitle || 'Your Job Title';
            previewEmail.textContent = data.email || 'email@example.com';
            previewPhone.textContent = data.phone || '00000000';
            previewLocation.textContent = data.location || 'Location';
            previewWebsite.textContent = data.website || 'website.com';
            previewSummary.textContent = data.summary || 'Summary...';

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
